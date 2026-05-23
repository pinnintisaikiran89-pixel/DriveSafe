from flask import Blueprint, jsonify

hotspot_bp = Blueprint('hotspots', __name__)

@hotspot_bp.route('/hotspots', methods=['GET'])
def get_hotspots():

    hotspots = [

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

    return jsonify(hotspots)