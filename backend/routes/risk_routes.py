from flask import Blueprint, request, jsonify

from services.risk_engine import calculate_risk_score
from services.risk_factors import calculate_risk_factors
from services.hotspot_service import find_nearest_hotspot


# ============================================================
# BLUEPRINT
# ============================================================

risk_bp = Blueprint(
    "risk",
    __name__
)


# ============================================================
# RISK ROUTE
# ============================================================

@risk_bp.route(
    "/risk",
    methods=["POST"]
)
def calculate_route_risk():

    try:

        # ----------------------------------------------------
        # GET JSON
        # ----------------------------------------------------

        data = request.get_json(silent=True)

        print("\n========================================")
        print("RISK REQUEST")
        print("========================================")
        print(data)


        if not data:

            return jsonify({

                "success": False,

                "error": "No JSON data received."

            }), 400


        # ----------------------------------------------------
        # GET VALUES
        # ----------------------------------------------------

        ml_prediction = data.get(
            "ml_prediction",
            "Minor"
        )


        ml_confidence = float(
            data.get(
                "ml_confidence",
                0
            )
        )


        hotspot_count = int(
            data.get(
                "hotspot_count",
                0
            )
        )


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


        traffic = data.get(
            "traffic",
            "Moderate"
        )


        speed = float(
            data.get(
                "speed",
                60
            )
        )


        # ----------------------------------------------------
        # PRINT INPUT
        # ----------------------------------------------------

        print("\nRisk Inputs:")

        print(
            "ML Prediction:",
            ml_prediction
        )

        print(
            "ML Confidence:",
            ml_confidence
        )

        print(
            "Hotspot Count:",
            hotspot_count
        )

        print(
            "Weather:",
            weather
        )

        print(
            "Road:",
            road_condition
        )

        print(
            "Lighting:",
            lighting
        )

        print(
            "Traffic:",
            traffic
        )

        print(
            "Speed:",
            speed
        )


        # ====================================================
        # RISK FACTORS
        # ====================================================

        factors = calculate_risk_factors(

            speed=speed,

            weather=weather,

            road_condition=road_condition,

            lighting=lighting,

            traffic=traffic

        )


        print("\nCalculated Risk Factors:")
        print(factors)


        # ====================================================
        # RISK SCORE
        # ====================================================

        result = calculate_risk_score(

            ml_prediction=ml_prediction,

            ml_confidence=ml_confidence,

            hotspot_count=hotspot_count,

            weather_risk=factors.get(
                "weather_score",
                0
            ),

            road_risk=factors.get(
                "road_score",
                0
            ),

            traffic_risk=factors.get(
                "traffic_score",
                0
            ),

            speed_risk=factors.get(
                "speed_score",
                0
            ),

            lighting_risk=factors.get(
                "lighting_score",
                0
            )

        )


        # ====================================================
        # RESPONSE
        # ====================================================

        response = {

            "success": True,

            "risk_score":
                result.get(
                    "risk_score",
                    0
                ),

            "risk_level":
                result.get(
                    "risk_level",
                    "Low"
                ),

            "components": {

                **result.get(
                    "components",
                    {}
                ),

                "weather_score":
                    factors.get(
                        "weather_score",
                        0
                    ),

                "road_score":
                    factors.get(
                        "road_score",
                        0
                    ),

                "traffic_score":
                    factors.get(
                        "traffic_score",
                        0
                    ),

                "speed_score":
                    factors.get(
                        "speed_score",
                        0
                    ),

                "lighting_score":
                    factors.get(
                        "lighting_score",
                        0
                    )

            }

        }


        print("\n========================================")
        print("RISK RESPONSE")
        print("========================================")

        print(response)


        return jsonify(response), 200


    # ========================================================
    # ERROR
    # ========================================================

    except Exception as e:

        print("\n========================================")
        print("RISK ENGINE ERROR")
        print("========================================")

        print(
            type(e).__name__,
            str(e)
        )


        return jsonify({

            "success": False,

            "error": str(e)

        }), 500