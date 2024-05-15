from ultralytics import YOLO
from flask import request, Flask, send_file
from waitress import serve
from flask_cors import CORS  # Import CORS from flask_cors
import cv2
import io
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def root():
    """
    Site main page handler function.
    :return: Content of index.html file
    """
    with open("templates/index.html") as file:
        return file.read()

@app.route("/detect", methods=["POST"])
def detect():
    """
    Handler of /detect POST endpoint.
    Receives uploaded file, passes it through YOLOv8 object detection network,
    and returns the processed image directly.
    """
    buf = request.files["file"]
    print("Received image:", buf.filename)  # Print the filename of the received image
    processed_image = detect_objects_on_image(buf.stream)

    # Return the processed image as a JPEG file
    return send_file(processed_image, mimetype='image/jpeg')

def detect_objects_on_image(buf):
    """
    Function receives an image,
    passes it through YOLOv8 neural network
    and returns an image with detected objects annotated
    :param buf: Input image file stream
    :return: Image with bounding boxes drawn around detected objects
    """
    model = YOLO("amir.pt")
    # Convert the image stream to a numpy array
    img_np = np.frombuffer(buf.read(), np.uint8)
    # Decode the numpy array to an OpenCV image
    img_cv2 = cv2.imdecode(img_np, cv2.IMREAD_COLOR)
    
    # Perform object detection
    results = model.predict(img_cv2)
    result = results[0]

    # Draw bounding boxes and labels on the image
    for box in result.boxes:
        x1, y1, x2, y2 = [round(x) for x in box.xyxy[0].tolist()]
        class_id = box.cls[0].item()
        prob = round(box.conf[0].item(), 2)
        label = result.names[class_id]
        
        cv2.rectangle(img_cv2, (x1, y1), (x2, y2), (0,255,255), 2)
        
        cv2.putText(img_cv2, f'{label}: {prob}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,255), 2)
    
    
    # Convert the annotated image back to bytes
    _, img_encoded = cv2.imencode('.jpg', img_cv2)
    
    return io.BytesIO(img_encoded)

serve(app, host='0.0.0.0', port=8080)
