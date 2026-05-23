import joblib
import numpy as np

# Load Trained Model
model = joblib.load("models/accident_model.pkl")

def predict_accident(data):

    try:

        # Convert input into model format
        features = np.array([[
            data['weather'],
            data['road_type'],
            data['speed'],
            data['age'],
            data['alcohol']
        ]])

        # Predict
        prediction = model.predict(features)

        # Convert prediction labels
        severity_labels = {
            0: "Minor",
            1: "Serious",
            2: "Fatal"
        }

        result = severity_labels.get(
            prediction[0],
            "Unknown"
        )

        return result

    except Exception as e:

        return str(e)