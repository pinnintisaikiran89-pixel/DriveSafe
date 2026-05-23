from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize Flask App
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load Trained ML Model
model = joblib.load("model.pkl")

# Severity Labels
severity_labels = {
    0: "Minor",
    1: "Serious",
    2: "Fatal"
}

# Home Route
@app.route('/')
def home():

    return jsonify({
        "message": "DriveSafe ML Service Running"
    })

# Prediction Route
@app.route('/predict', methods=['POST'])
def predict():

    try:

        # Get JSON data from frontend
        data = request.json

        # Extract values
        weather = int(data['weather'])
        road_type = int(data['road_type'])
        speed = int(data['speed'])
        age = int(data['age'])
        alcohol = int(data['alcohol'])

        # Create input array
        input_data = np.array([
            [
                weather,
                road_type,
                speed,
                age,
                alcohol
            ]
        ])

        # Predict using ML model
        prediction = model.predict(input_data)

        # Convert prediction to label
        result = severity_labels[int(prediction[0])]

        # Send response
        return jsonify({
            "accident_severity": result
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        })

# Run Flask Server
if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )