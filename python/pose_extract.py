#!/usr/bin/env python3
import cv2, json, argparse, sys
import mediapipe as mp

mp_pose = mp.solutions.pose
parser = argparse.ArgumentParser()
parser.add_argument("--image")
parser.add_argument("--serve", type=int, nargs="?", const=8000)  # microservice mode
args = parser.parse_args()

def extract(path):
    img = cv2.imread(path)
    if img is None:
        raise ValueError("cannot read image")
    with mp_pose.Pose(static_image_mode=True) as pose:
        res = pose.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        points = []
        if res.pose_landmarks:
            for idx, lm in enumerate(res.pose_landmarks.landmark):
                points.append({
                    "id": idx,
                    "x": round(lm.x, 4),
                    "y": round(lm.y, 4),
                    "z": round(lm.z, 4),
                    "v": round(lm.visibility, 4)
                })
        return points

if args.serve:
    from flask import Flask, request, jsonify
    app = Flask(__name__)
    @app.post("/extract")
    def api():
        f = request.files.get("file")
        path = "/tmp/pose.jpg"; f.save(path)
        return jsonify(extract(path))
    app.run(host="0.0.0.0", port=args.serve)
else:
    pts = extract(args.image)
    json.dump(pts, sys.stdout)