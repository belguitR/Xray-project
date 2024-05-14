# AI Dental X-ray Detector

Welcome to our AI Dental X-ray Detector app! This repository contains the code for an application that detects various dental diseases, cavities, and carries in X-ray images using YOLOv8 model trained on diverse datasets. The app utilizes Flask for the backend and Angular for the frontend.

# Prerequisites

 For Python:
 
     Flask
     
     Flask-CORS
     
     Waitress
     
     OpenCV (cv2)
     
     numpy
     
     Ultralytics YOLO
     
     Python Imaging Library (PIL)
     
For Angular:

     Angular CLI
     
     HttpClientModule
     
     rxjs



## How to Run

To run the app, follow these simple steps:

1. Navigate to the `DentalXrayAi` directory and run the Flask app:

     cd dentalXrayAi

     python app.py 
2. Then, navigate to the `angular-drag-drop` directory and run the Angular interface:

     cd angular-drag-drop

     ng serve

Once both the Flask app and Angular interface are running, you can access the application on `localhost:4200`.

## Overview

- **Backend**: Flask is used to create the RESTful API endpoints for processing the images with the YOLOv8 model.
- **Frontend**: Angular provides the user interface for uploading X-ray images and displaying the results with annotations of detected diseases and abnormalities.

## Workflow

1. User uploads an X-ray image through the Angular interface.
2. The image is sent to the Flask backend via API request.
3. Flask processes the image using the YOLOv8 model.
4. Detected diseases and abnormalities are annotated on the image.
5. Processed image with annotations is sent back to the Angular frontend.
6. The Angular frontend displays the annotated image to the user and grants a download feature.

## Dataset and Training

We trained the YOLOv8 model on various datasets containing labeled X-ray images for training and validation. The classic process of data preparation, model training, and validation was followed to achieve accurate detection results.


## Screenshots


![image](https://github.com/l3miage-belguitr/Xray-project/assets/116873286/b2422098-15cb-42fd-80cb-29f636d9d419)

![image](https://github.com/l3miage-belguitr/Xray-project/assets/116873286/24cc9daa-45ad-4273-9e5f-44ab81169b3f)




Feel free to explore the code and contribute to the project! If you have any questions or suggestions, please don't hesitate to reach out.

We hope you find it useful! 🦷🔍

