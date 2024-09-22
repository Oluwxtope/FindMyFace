import numpy as np
import os
import cv2

# Load the pre-trained models for face detection and face recognition
face_detector = cv2.dnn.readNetFromCaffe(
    '/Users/emmanuel/Desktop/find-my-face/backend/server/face_recognition_models/deploy.prototxt', 
    '/Users/emmanuel/Desktop/find-my-face/backend/server/face_recognition_models/res10_300x300_ssd_iter_140000.caffemodel'
)
face_recognizer = cv2.dnn.readNetFromTorch('/Users/emmanuel/Desktop/find-my-face/backend/server/face_recognition_models/openface.nn4.small2.v1.t7')

def get_face_embedding(face_image):
    face_blob = cv2.dnn.blobFromImage(face_image, 1.0/255, (96, 96), (0, 0, 0), swapRB=True, crop=False)
    face_recognizer.setInput(face_blob)
    face_embedding = face_recognizer.forward()
    return face_embedding

def detect_face(image):
    (h, w) = image.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))
    face_detector.setInput(blob)
    detections = face_detector.forward()

    if len(detections) > 0:
        i = detections[0, 0, :, 2].argmax()
        confidence = detections[0, 0, i, 2]

        if confidence > 0.2:  # Confidence threshold
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")  # Unpack into four values
            face = image[startY:endY, startX:endX]  # Corrected slicing
            return face

    return None

def get_average_face_embedding(face_image_directory):
    embeddings = []
    
    for filename in os.listdir(face_image_directory):
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.webp')):
            continue
        
        face_image_path = os.path.join(face_image_directory, filename)
        face_image = cv2.imread(face_image_path)  # Read the image from the provided path
        if face_image is None:
            print(f"Failed to load face image {face_image_path}. Skipping.")
            continue

        face = detect_face(face_image)
        if face is None:
            print(f"No face detected in the image {face_image_path}. Skipping.")
            continue

        embedding = get_face_embedding(face)
        embeddings.append(embedding)
    
    if len(embeddings) == 0:
        print("No valid face embeddings found.")
        return None
    
    # Average the embeddings
    average_embedding = np.mean(embeddings, axis=0)
    return average_embedding

def find_matching_images(face_image_directory, image_directory):
    face_embedding = get_average_face_embedding(face_image_directory)
    if face_embedding is None:
        return []

    matching_images = []

    for filename in os.listdir(image_directory):
        file_path = os.path.join(image_directory, filename)
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.webp')):
            continue

        image = cv2.imread(file_path)
        if image is None:
            print(f"Failed to load image {file_path}.")
            continue

        detected_face = detect_face(image)
        if detected_face is not None:
            detected_embedding = get_face_embedding(detected_face)
            distance = np.linalg.norm(face_embedding - detected_embedding)

            if distance < 0.7:  # Threshold for similarity
                matching_images.append(file_path)

    return matching_images

