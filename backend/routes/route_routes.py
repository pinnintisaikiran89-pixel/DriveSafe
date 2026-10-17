from flask import Blueprint, request, jsonify
import requests


# ============================================================
# BLUEPRINT
# ============================================================

route_bp = Blueprint(
    "route",
    __name__
)


# ============================================================
# ROUTE API
# ============================================================

@route_bp.route(
    "/route",
    methods=["POST"]
)
def calculate_route():

    try:

        # ----------------------------------------------------
        # Get request data
        # ----------------------------------------------------

        data = request.get_json(
            silent=True
        )


        print("\n========================================")
        print("ROUTE REQUEST")
        print("========================================")

        print(data)


        # ----------------------------------------------------
        # Validate
        # ----------------------------------------------------

        if not data:

            return jsonify({

                "success": False,

                "error":
                    "No route data received."

            }), 400


        source = data.get(
            "source",
            ""
        )


        destination = data.get(
            "destination",
            ""
        )


        avoid_high_risk = data.get(
            "avoidHighRisk",
            True
        )


        avoid_traffic = data.get(
            "avoidTraffic",
            True
        )


        well_lit_roads = data.get(
            "wellLitRoads",
            True
        )


        if not source or not destination:

            return jsonify({

                "success": False,

                "error":
                    "Source and destination are required."

            }), 400


        # ====================================================
        # GEOCODING
        # ====================================================

        headers = {

            "User-Agent":
                "DriveSafe/1.0"

        }


        source_response = requests.get(

            "https://nominatim.openstreetmap.org/search",

            params={

                "q": source,

                "format": "json",

                "limit": 1

            },

            headers=headers,

            timeout=10

        )


        destination_response = requests.get(

            "https://nominatim.openstreetmap.org/search",

            params={

                "q": destination,

                "format": "json",

                "limit": 1

            },

            headers=headers,

            timeout=10

        )


        source_data = (
            source_response.json()
        )


        destination_data = (
            destination_response.json()
        )


        if not source_data:

            return jsonify({

                "success": False,

                "error":
                    "Source location not found."

            }), 404


        if not destination_data:

            return jsonify({

                "success": False,

                "error":
                    "Destination location not found."

            }), 404


        # ----------------------------------------------------
        # Coordinates
        # ----------------------------------------------------

        source_lat = float(
            source_data[0]["lat"]
        )

        source_lng = float(
            source_data[0]["lon"]
        )


        destination_lat = float(
            destination_data[0]["lat"]
        )

        destination_lng = float(
            destination_data[0]["lon"]
        )


        # ====================================================
        # OSRM ROUTE
        # ====================================================

        osrm_url = (

            "https://router.project-osrm.org/route/v1/driving/"

            f"{source_lng},{source_lat};"

            f"{destination_lng},{destination_lat}"

        )


        route_response = requests.get(

            osrm_url,

            params={

                "overview": "full",

                "geometries": "geojson"

            },

            timeout=20

        )


        route_data = route_response.json()


        if (
            route_data.get("code")
            != "Ok"
        ):

            return jsonify({

                "success": False,

                "error":
                    "Unable to calculate route."

            }), 500


        route = route_data[
            "routes"
        ][0]


        # ====================================================
        # DISTANCE
        # ====================================================

        distance_km = round(

            route["distance"] / 1000,

            1

        )


        # ====================================================
        # DURATION
        # ====================================================

        duration_minutes = round(

            route["duration"] / 60

        )


        # ====================================================
        # BASIC SAFETY SCORE
        # ====================================================

        safety_score = 90


        if avoid_high_risk:

            safety_score += 2


        if avoid_traffic:

            safety_score += 2


        if well_lit_roads:

            safety_score += 1


        # Distance adjustment

        if distance_km > 250:

            safety_score -= 20

        elif distance_km > 100:

            safety_score -= 10

        elif distance_km > 50:

            safety_score -= 5


        safety_score = max(

            0,

            min(
                100,
                safety_score
            )

        )


        # ====================================================
        # RECOMMENDATION
        # ====================================================

        if safety_score >= 80:

            recommendation = (

                "Safe route found. "

                "Maintain the speed limit, "

                "keep a safe distance, "

                "and stay alert."

            )

        elif safety_score >= 60:

            recommendation = (

                "Moderate route risk detected. "

                "Drive carefully and "

                "avoid heavy traffic areas."

            )

        else:

            recommendation = (

                "Higher route risk detected. "

                "Consider an alternative route "

                "and drive with extra caution."

            )


        # ====================================================
        # RESPONSE
        # ====================================================

        response = {

            "success": True,

            "source": {

                "name": source,

                "lat": source_lat,

                "lng": source_lng

            },

            "destination": {

                "name": destination,

                "lat": destination_lat,

                "lng": destination_lng

            },

            "distance":
                f"{distance_km} km",

            "duration":
                f"{duration_minutes} mins",

            "safetyScore":
                safety_score,

            "recommendation":
                recommendation,

            "preferences": {

                "avoidHighRisk":
                    avoid_high_risk,

                "avoidTraffic":
                    avoid_traffic,

                "wellLitRoads":
                    well_lit_roads

            }

        }


        print("\n========================================")
        print("ROUTE RESPONSE")
        print("========================================")

        print(response)


        return jsonify(
            response
        ), 200


    # ========================================================
    # ERROR
    # ========================================================

    except requests.exceptions.Timeout:

        return jsonify({

            "success": False,

            "error":
                "External routing service timed out."

        }), 504


    except Exception as e:

        print(
            "ROUTE ERROR:",
            str(e)
        )


        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500