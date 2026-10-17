from flask import Flask, jsonify
from flask_cors import CORS
from geopy.geocoders import Nominatim


# ============================================================
# IMPORT BLUEPRINTS
# ============================================================

from routes.hotspot_routes import hotspot_bp
from routes.predict_routes import predict_bp
from routes.risk_routes import risk_bp
from routes.route_routes import route_bp


# ============================================================
# CREATE FLASK APP
# ============================================================

app = Flask(__name__)


# ============================================================
# ENABLE CORS
# ============================================================

CORS(app)


# ============================================================
# GEOLOCATOR
# ============================================================

geolocator = Nominatim(
    user_agent="drivesafe"
)


# ============================================================
# REGISTER BLUEPRINTS
# ============================================================

app.register_blueprint(
    hotspot_bp
)

app.register_blueprint(
    predict_bp
)

app.register_blueprint(
    risk_bp
)

app.register_blueprint(
    route_bp
)


# ============================================================
# HOME / HEALTH CHECK
# ============================================================

@app.route("/")
def home():

    return jsonify({

        "success": True,

        "message":
            "DriveSafe Backend Running",

        "services": {

            "hotspots":
                "/hotspots",

            "prediction":
                "/predict",

            "risk":
                "/risk",

            "route_analysis":
                "/route/analyze",

            "geocode":
                "/geocode/<place>"

        }

    })


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route(
    "/health",
    methods=["GET"]
)
def health():

    return jsonify({

        "success": True,

        "status":
            "healthy",

        "service":
            "DriveSafe Backend"

    })


# ============================================================
# GEOCODE ROUTE
# ============================================================

@app.route(
    "/geocode/<path:place>",
    methods=["GET"]
)
def geocode(place):

    try:

        # ----------------------------------------------------
        # Find location
        # ----------------------------------------------------

        location = geolocator.geocode(
            place
        )


        # ----------------------------------------------------
        # Location not found
        # ----------------------------------------------------

        if not location:

            return jsonify({

                "success": False,

                "error":
                    "Location not found",

                "place":
                    place

            }), 404


        # ----------------------------------------------------
        # Return coordinates
        # ----------------------------------------------------

        return jsonify({

            "success": True,

            "place":
                place,

            "latitude":
                float(
                    location.latitude
                ),

            "longitude":
                float(
                    location.longitude
                )

        })


    except Exception as e:

        print(
            "GEOCODE ERROR:",
            str(e)
        )


        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500


# ============================================================
# 404 HANDLER
# ============================================================

@app.errorhandler(404)
def not_found(error):

    return jsonify({

        "success": False,

        "error":
            "Endpoint not found.",

        "message":
            "Please check the API URL and HTTP method."

    }), 404


# ============================================================
# 500 HANDLER
# ============================================================

@app.errorhandler(500)
def internal_error(error):

    return jsonify({

        "success": False,

        "error":
            "Internal server error."

    }), 500


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    print("\n========================================")
    print("        DRIVESAFE BACKEND")
    print("========================================")
    print("Server: http://127.0.0.1:8000")
    print("")
    print("Available APIs:")
    print("GET  /")
    print("GET  /health")
    print("GET  /hotspots")
    print("POST /predict")
    print("POST /risk")
    print("POST /route/analyze")
    print("GET  /geocode/<place>")
    print("========================================\n")


    app.run(

        host="0.0.0.0",

        port=8000,

        debug=False

    )