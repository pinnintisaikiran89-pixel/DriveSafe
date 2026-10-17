from flask import Blueprint, request, jsonify

from services.hotspot_service import find_nearest_hotspot
from services.risk_engine import calculate_risk_score
from services.risk_factors import calculate_risk_factors


location_risk_bp = Blueprint(
    "location_risk",
    __name__
)


@location_risk_bp.route(
    "/location-risk",
    methods=["POST"]
)
def location_risk():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "error": "No data received."
            }), 400


        # --------------------------------------------------
        # LOCATION
        # --------------------------------------------------

        latitude = float(
            data.get("latitude")
        )

        longitude = float(
            data.get("longitude")
        )


        # --------------------------------------------------
        # DRIVING CONDITIONS
        # --------------------------------------------------

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


        # --------------------------------------------------
        # FIND NEAREST HOTSPOT
        # --------------------------------------------------

        hotspot_result = find_nearest_hotspot(
            latitude,
            longitude
        )


        hotspot_count = 0

        if hotspot_result:

            hotspot_count = int(
                hotspot_result.get(
                    "accidents",
                    0
                )
            )


        # --------------------------------------------------
        # RISK FACTORS
        # --------------------------------------------------

        factors = calculate_risk_factors(

            weather=weather,

            road_condition=road_condition,

            lighting=lighting,

            traffic=traffic,

            speed=speed

        )


        # --------------------------------------------------
        # ML PREDICTION
        # --------------------------------------------------

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


        # --------------------------------------------------
        # FINAL RISK
        # --------------------------------------------------

        result = calculate_risk_score(

            ml_prediction=ml_prediction,

            ml_confidence=ml_confidence,

            hotspot_count=hotspot_count,

            weather_risk=factors[
                "weather_score"
            ],

            road_risk=factors[
                "road_score"
            ],

            traffic_risk=factors[
                "traffic_score"
            ],

            speed_risk=factors[
                "speed_score"
            ],

            lighting_risk=factors[
                "lighting_score"
            ]

        )


        # --------------------------------------------------
        # RESPONSE
        # --------------------------------------------------

        return jsonify({

            "success": True,

            "latitude": latitude,

            "longitude": longitude,

            "risk_score":
                result["risk_score"],

            "risk_level":
                result["risk_level"],

            "components":
                result["components"],

            "nearest_hotspot":
                hotspot_result

        })


    except Exception as e:

        print(
            "LOCATION RISK ERROR:",
            str(e)
        )

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500