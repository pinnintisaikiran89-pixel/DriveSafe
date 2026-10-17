from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import pandas as pd


# ============================================================
# INITIALIZE FLASK APP
# ============================================================

app = Flask(__name__)

CORS(app)


# ============================================================
# LOAD TRAINED PIPELINE
# ============================================================

model = joblib.load("model.pkl")

print("Model pipeline loaded successfully.")


# ============================================================
# HOME ROUTE
# ============================================================

@app.route("/")
def home():

    return jsonify({
        "message": "DriveSafe ML Service Running"
    })


# ============================================================
# HEALTH CHECK ROUTE
# ============================================================

@app.route("/health")
def health():

    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None
    })


# ============================================================
# PREDICTION ROUTE
# ============================================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        # ----------------------------------------------------
        # Get JSON data
        # ----------------------------------------------------

        data = request.get_json()

        print("\n========================================")
        print("ML PREDICTION REQUEST")
        print("========================================")

        print(data)


        # ----------------------------------------------------
        # Validate request
        # ----------------------------------------------------

        if not data:

            return jsonify({
                "error": "No data received."
            }), 400


        required_fields = [
            "weather",
            "road_type",
            "road_condition",
            "lighting",
            "traffic_control",
            "speed_limit",
            "age",
            "gender",
            "license_status",
            "alcohol",
            "vehicle_type"
        ]


        missing_fields = [
            field
            for field in required_fields
            if field not in data
        ]


        if missing_fields:

            return jsonify({
                "error": "Missing required fields.",
                "fields": missing_fields
            }), 400


        # ----------------------------------------------------
        # Create DataFrame
        # ----------------------------------------------------

        input_data = pd.DataFrame([{

            "Weather Conditions":
                data["weather"],

            "Road Type":
                data["road_type"],

            "Road Condition":
                data["road_condition"],

            "Lighting Conditions":
                data["lighting"],

            "Traffic Control Presence":
                data["traffic_control"],

            "Speed Limit (km/h)":
                float(data["speed_limit"]),

            "Driver Age":
                int(data["age"]),

            "Driver Gender":
                data["gender"],

            "Driver License Status":
                data["license_status"],

            "Alcohol Involvement":
                data["alcohol"],

            "Vehicle Type Involved":
                data["vehicle_type"]

        }])


        print("\n========================================")
        print("MODEL INPUT")
        print("========================================")

        print(input_data)


        # ----------------------------------------------------
        # Make prediction
        # ----------------------------------------------------

        prediction = model.predict(input_data)

        predicted_severity = str(prediction[0])


        # ----------------------------------------------------
        # Calculate confidence
        # ----------------------------------------------------

        confidence = None

        if hasattr(model, "predict_proba"):

            probabilities = model.predict_proba(
                input_data
            )[0]

            confidence = round(
                float(max(probabilities)) * 100,
                2
            )


        # ----------------------------------------------------
        # Get probabilities for every class
        # ----------------------------------------------------

        probability_details = {}

        if (
            hasattr(model, "predict_proba")
            and hasattr(model, "classes_")
        ):

            probabilities = model.predict_proba(
                input_data
            )[0]

            for class_name, probability in zip(
                model.classes_,
                probabilities
            ):

                probability_details[str(class_name)] = round(
                    float(probability) * 100,
                    2
                )


        # ----------------------------------------------------
        # Determine risk level
        # ----------------------------------------------------

        if predicted_severity == "Fatal":

            risk_level = "High"

        elif predicted_severity == "Serious":

            risk_level = "Medium"

        elif predicted_severity == "Minor":

            risk_level = "Low"

        else:

            risk_level = "Unknown"


        # ----------------------------------------------------
        # Final response
        # ----------------------------------------------------

        response = {

            "accident_severity":
                predicted_severity,

            "risk_level":
                risk_level,

            "confidence":
                confidence,

            "probabilities":
                probability_details

        }


        print("\n========================================")
        print("ML RESULT")
        print("========================================")

        print(response)


        return jsonify(response), 200


    # ========================================================
    # ERROR HANDLING
    # ========================================================

    except ValueError as e:

        print("VALUE ERROR:", str(e))

        return jsonify({
            "error": "Invalid numeric value.",
            "details": str(e)
        }), 400


    except Exception as e:

        print("ML ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )