from flask import Blueprint, request, jsonify
import requests

from services.risk_engine import calculate_risk_score
from services.risk_factors import calculate_risk_factors


# ============================================================
# CREATE BLUEPRINT
# ============================================================

predict_bp = Blueprint(
    "predict",
    __name__
)


# ============================================================
# ML SERVICE
# ============================================================

ML_SERVICE_URL = "http://127.0.0.1:5000/predict"


# ============================================================
# PREDICTION ROUTE
# ============================================================

@predict_bp.route(
    "/predict",
    methods=["POST"]
)
def predict():

    try:

        # ----------------------------------------------------
        # Get React request
        # ----------------------------------------------------

        data = request.get_json()

        print("\n========================================")
        print("DRIVESAFE PREDICTION REQUEST")
        print("========================================")

        print(data)


        # ----------------------------------------------------
        # Validate request
        # ----------------------------------------------------

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

            field

            for field in required_fields

            if field not in data

        ]


        if missing_fields:

            return jsonify({

                "success": False,

                "error":
                    "Missing required fields.",

                "fields":
                    missing_fields

            }), 400


        # ----------------------------------------------------
        # Send data to ML service
        # ----------------------------------------------------

        print("\nSending data to ML service...")


        response = requests.post(

            ML_SERVICE_URL,

            json=data,

            timeout=10

        )


        # ----------------------------------------------------
        # Check ML response
        # ----------------------------------------------------

        if response.status_code != 200:

            try:

                ml_error = response.json()

            except Exception:

                ml_error = {
                    "message": response.text
                }


            return jsonify({

                "success": False,

                "error":
                    "ML service returned an error.",

                "details":
                    ml_error

            }), response.status_code


        # ----------------------------------------------------
        # Get ML result
        # ----------------------------------------------------

        ml_result = response.json()


        print("\n========================================")
        print("ML SERVICE RESPONSE")
        print("========================================")

        print(ml_result)


        # ----------------------------------------------------
        # Extract ML values
        # ----------------------------------------------------

        prediction = ml_result.get(
            "accident_severity"
        )


        confidence = float(
            ml_result.get(
                "confidence",
                0
            )
        )


        probabilities = ml_result.get(
            "probabilities",
            {}
        )


        # ====================================================
        # AUTOMATIC RISK FACTORS
        # ====================================================

        weather = data.get(
            "weather",
            "Clear"
        )


        road_condition = data.get(
            "road_condition",
            "Dry"
        )


        lighting = data.get(
            "lighting",
            "Daylight"
        )


        # ----------------------------------------------------
        # Traffic
        #
        # Your current prediction form doesn't yet send
        # "traffic" as one of the ML fields.
        #
        # Therefore we temporarily derive traffic risk from
        # traffic control presence.
        # ----------------------------------------------------

        traffic_control = data.get(
            "traffic_control",
            "Signals"
        )


        traffic_map = {

            "None": "High",

            "Signs": "Moderate",

            "Signals": "Low",

            "Police Checkpost": "Low"

        }


        traffic = traffic_map.get(

            traffic_control,

            "Moderate"

        )


        # ----------------------------------------------------
        # Calculate automatic factors
        # ----------------------------------------------------

        factors = calculate_risk_factors(

            weather=weather,

            road_condition=road_condition,

            lighting=lighting,

            traffic=traffic,
            speed=data["speed_limit"]

        )


        print("\n========================================")
        print("AUTOMATIC RISK FACTORS")
        print("========================================")

        print(factors)


        # ====================================================
        # TEMPORARY HOTSPOT VALUE
        # ====================================================

        # We will connect real route/hotspot data later.
        #
        # For now this remains 0 so that the prediction
        # system doesn't pretend that a hotspot was detected.

        hotspot_count = 0


        # ====================================================
        # DRIVE SAFE RISK ENGINE
        # ====================================================

        risk_result = calculate_risk_score(

            ml_prediction=prediction,

            ml_confidence=confidence,

            hotspot_count=hotspot_count,

            weather_risk=
                factors["weather_score"],

            road_risk=
                factors["road_score"],

            traffic_risk=
                factors["traffic_score"],

            speed_risk=
                factors["speed_score"],
            
            lighting_risk=
                factors["lighting_score"]


        )


        print("\n========================================")
        print("DRIVESAFE RISK RESULT")
        print("========================================")

        print(risk_result)


        # ====================================================
        # FINAL RESPONSE
        # ====================================================

        return jsonify({

            "success": True,

            "prediction":
                prediction,

            "confidence":
                confidence,

            "probabilities":
                probabilities,

            "risk_level":
                risk_result[
                    "risk_level"
                ],

            "risk_score":
                risk_result[
                    "risk_score"
                ],

            "risk_components": 
                risk_result[
                    "components"
                ]

            }

        ), 200


    # ========================================================
    # ML CONNECTION ERROR
    # ========================================================

    except requests.exceptions.ConnectionError:

        return jsonify({

            "success": False,

            "error":
                "Unable to connect to ML service.",

            "message":
                "Make sure ML service is running on port 5000."

        }), 503


    # ========================================================
    # ML TIMEOUT
    # ========================================================

    except requests.exceptions.Timeout:

        return jsonify({

            "success": False,

            "error":
                "ML service request timed out."

        }), 504


    # ========================================================
    # GENERAL ERROR
    # ========================================================

    except Exception as e:

        print(
            "\nPREDICTION ERROR:",
            str(e)
        )


        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500