from flask import Flask, jsonify
from flask_cors import CORS

from routes.predict_routes import predict_bp

app = Flask(__name__)

CORS(app)

# Register Prediction Route
app.register_blueprint(predict_bp)

# Home Route
@app.route('/')
def home():

    return {
        "message": "DriveSafe Backend Running"
    }

# Hotspot Route
@app.route('/hotspots')
def hotspots():

    hotspot_data = [

        {
            "name": "Vijayawada",
            "lat": 16.5062,
            "lng": 80.6480,
            "risk": "High"
        },

        {
            "name": "Visakhapatnam",
            "lat": 17.6868,
            "lng": 83.2185,
            "risk": "Medium"
        },

        {
            "name": "Tirupati",
            "lat": 13.6288,
            "lng": 79.4192,
            "risk": "High"
        }

    ]

    return jsonify(hotspot_data)

# Run Flask
if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )