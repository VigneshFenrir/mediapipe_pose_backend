import cron from "node-cron";
import archiver from "archiver";
import fs from "fs";
import path from "path";
import { sendBackupEmail } from "../utils/mailer.js";
import { execAsync } from "../utils/childExec.js";

cron.schedule("59 11 * * *", async () => {
  const date = new Date().toISOString().slice(0, 10);
  const outFile = path.join(process.env.BACKUP_DIR, `${date}-backup.zip`);
  const sqlDump = `dump-${date}.sql`;
  const mongoDump = `dump-${date}.archive`;
  console.log("send");

  try {
    // SQL
    if (process.env.SQL_DIALECT === "postgres") {
      await execAsync(
        `pg_dump -U ${process.env.SQL_USER} -h ${process.env.SQL_HOST} -p ${process.env.SQL_PORT} -d ${process.env.SQL_DB} > ${sqlDump}`
      );
    } else {
      await execAsync(
        `mysqldump -u${process.env.SQL_USER} -p${process.env.SQL_PASS} ${process.env.SQL_DB} > ${sqlDump}`
      );
    }

    // Mongo
    await execAsync(
      `mongodump --uri="mongodb://localhost:27017" --db=pose_db --archive=${mongoDump}`
    );

    // Zip
    await fs.promises.mkdir(process.env.BACKUP_DIR, { recursive: true });
    const output = fs.createWriteStream(outFile);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    archive.file(sqlDump, { name: sqlDump });
    archive.file(mongoDump, { name: mongoDump });
    await archive.finalize();

    // Email
    await sendBackupEmail(outFile, date);
    console.log(`Backup & mail sent for ${date}`);
  } catch (err) {
    console.error("Backup failed", err);
  } finally {
    [sqlDump, mongoDump].forEach((f) => fs.existsSync(f) && fs.unlinkSync(f));
  }
});
