from ultralytics import YOLO
import cv2

# Load a pretrained YOLOv8n model
model = YOLO(r'C:\Users\21650\Desktop\YOLO\runs\detect\train12\weights\best.pt')

# Define path to the image file
source = r'C:\Users\21650\Desktop\Image'

# Run inference on the source
model.predict(r'C:\Users\21650\Desktop\Image', save= True, save_txt=True)
  