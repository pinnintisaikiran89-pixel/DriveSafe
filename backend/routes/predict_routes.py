
from flask import Blueprint, request, jsonify
import requests
import os

from services.risk_engine import calculate_risk_score
from services.risk_factors import calculate_risk_factors


predict_bp = Blueprint("predict", __name__)

ML_SERVICE_URL = os.getenv(
    "ML_SERVICE_URL",
    "http://127.0.0.1:5000"
).rstrip("/") + "/predict"


@predict_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "success": False,
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
            field for field in required_fields
            if field not in data
        ]

        if missing_fields:
            return jsonify({
                "success": False,
                "error": "Missing required fields.",
                "fields": missing_fields
            }), 400

        try:
            response = requests.post(
                ML_SERVICE_URL,
                json=data,
                timeout=60
            )
        except requests.exceptions.Timeout:
            return jsonify({
                "success": False,
                "error": "ML service request timed out."
            }), 504
        except requests.exceptions.RequestException as e:
            print("ML SERVICE CONNECTION ERROR:", repr(e))
            return jsonify({
                "success": False,
                "error": "Unable to connect to ML service."
            }), 503

        if response.status_code != 200:
            try:
                details = response.json()
            except ValueError:
                details = {"message": response.text}

            print("ML SERVICE ERROR:", details)

            return jsonify({
                "success": False,
                "error": "ML service returned an error.",
                "details": details
            }), 502

        try:
            ml_result = response.json()
        except ValueError:
            return jsonify({
                "success": False,
                "error": "ML service returned invalid JSON."
            }), 502

        prediction = ml_result.get("accident_severity")

        if prediction is None:
            return jsonify({
                "success": False,
                "error": "ML response is missing accident severity."
            }), 502

        confidence = float(ml_result.get("confidence", 0))
        probabilities = ml_result.get("probabilities", {})

        factors = calculate_risk_factors(
            weather=data.get("weather", "Clear"),
            road_condition=data.get("road_condition", "Dry"),
            lighting=data.get("lighting", "Daylight"),
            traffic={
                "None": "High",
                "Signs": "Moderate",
                "Signals": "Low",
                "Police Checkpost": "Low"
            }.get(data.get("traffic_control", "Signals"), "Moderate"),
            speed=data["speed_limit"]
        )

        hotspot_count = 0

        risk_result = calculate_risk_score(
            ml_prediction=prediction,
            ml_confidence=confidence,
            hotspot_count=hotspot_count,
            weather_risk=factors["weather_score"],
            road_risk=factors["road_score"],
            traffic_risk=factors["traffic_score"],
            speed_risk=factors["speed_score"],
            lighting_risk=factors["lighting_score"]
        )

        return jsonify({
            "success": True,
            "prediction": prediction,
            "confidence": confidence,
            "probabilities": probabilities,
            "risk_level": risk_result["risk_level"],
            "risk_score": risk_result["risk_score"],
            "risk_components": risk_result["components"]
        }), 200

    except Exception as e:
        print("PREDICTION ERROR:", repr(e))
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
