# app.py (Flask)
from flask import Flask, request, jsonify
from pymongo import MongoClient
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.naive_bayes import MultinomialNB
import joblib
import re

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb+srv://priyanshu_baghel:Pb%4012345678@db1.zq6yi.mongodb.net/sahayata_setu?retryWrites=true&w=majority&appName=DB1")
db = client["sahayata_setu"]
complaints_collection = db["complaints"]
employees_collection = db["employees"]

# Load pre-trained model and vectorizer
model = joblib.load("complaint_classifier(new).pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Preprocess text
def preprocess_text(text):
    if not isinstance(text, str):  # Ensure text is a string
        return ""

    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)  # Remove special characters
    tokens = text.split()
    return " ".join(tokens)

# Predict organization based on complaint description
def predict_organization(description):
    processed_text = preprocess_text(description)
    vectorized_text = vectorizer.transform([processed_text])
    prediction = model.predict(vectorized_text)
    return prediction[0]


# Route to process complaint and assign to employee
@app.route("/api/process-complaint", methods=["POST"])
def process_complaint():
    data = request.json
    complaint_id = data.get("Complaint_id")
    

    # Fetch complaint from MongoDB
    complaint = complaints_collection.find_one({"Complained_id": complaint_id})
    print(complaint)
    if not complaint:
        return jsonify({"error": "Complaint not found"}), 404

    # Predict organization
    organization = predict_organization(complaint["description"])
    print(organization)
    # Assign complaint to an employee in the predicted organization
    employee = employees_collection.find_one({"department": organization, "isActive": True})
    if not employee:
        return jsonify({"error": "No active employee found for the organization"}), 404

    # Update complaint with assigned employee
    complaints_collection.update_one(
        {"_id": complaint_id},
        {"$set": {"assignedTo": employee["_id"], "status": "Assigned"}}
    )

    return jsonify({
        "message": "Complaint processed and assigned successfully",
        "complaint_id": complaint_id,
        "assigned_to": employee["name"],
        "organization": organization
    })

# Start the Flask server
if __name__ == "__main__":
    app.run(debug=True, port=5000)