import math
import pandas as pd


# ============================================================
# HOTSPOT CACHE
# ============================================================

HOTSPOTS_CACHE = []


# ============================================================
# HOTSPOT RISK
# ============================================================

def calculate_hotspot_risk(accident_count):

    if accident_count >= 100:
        return "Critical"

    elif accident_count >= 50:
        return "High"

    elif accident_count >= 20:
        return "Medium"

    return "Low"


# ============================================================
# HAVERSINE DISTANCE
# ============================================================

def calculate_distance(
    lat1,
    lon1,
    lat2,
    lon2
):

    R = 6371.0

    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)

    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        +
        math.cos(lat1)
        *
        math.cos(lat2)
        *
        math.sin(dlon / 2) ** 2
    )

    c = 2 * math.atan2(
        math.sqrt(a),
        math.sqrt(1 - a)
    )

    return round(
        R * c,
        2
    )


# ============================================================
# LOAD HOTSPOTS
# ============================================================

def load_hotspots():

    global HOTSPOTS_CACHE

    HOTSPOTS_CACHE = [

        {
            "name": "Mumbai",
            "lat": 19.0760,
            "lng": 72.8777,
            "risk": "High",
            "accidents": 80
        },

        {
            "name": "Pune",
            "lat": 18.5204,
            "lng": 73.8567,
            "risk": "Medium",
            "accidents": 33
        },

        {
            "name": "Ahmedabad",
            "lat": 23.0225,
            "lng": 72.5714,
            "risk": "Medium",
            "accidents": 30
        },

        {
            "name": "Delhi",
            "lat": 28.6139,
            "lng": 77.2090,
            "risk": "High",
            "accidents": 75
        },

        {
            "name": "Bengaluru",
            "lat": 12.9716,
            "lng": 77.5946,
            "risk": "High",
            "accidents": 65
        },

        {
            "name": "Hyderabad",
            "lat": 17.3850,
            "lng": 78.4867,
            "risk": "Medium",
            "accidents": 40
        }

    ]

    return HOTSPOTS_CACHE


# ============================================================
# GET HOTSPOTS
# ============================================================

def get_hotspots():

    if not HOTSPOTS_CACHE:

        load_hotspots()

    return HOTSPOTS_CACHE


# ============================================================
# FIND NEAREST HOTSPOT
# ============================================================

def find_nearest_hotspot(
    user_latitude,
    user_longitude,
    hotspots=None
):

    if hotspots is None:

        hotspots = get_hotspots()


    if not hotspots:

        return {

            "nearest_hotspot": None,

            "distance_km": None,

            "hotspot_score": 0

        }


    nearest = None

    nearest_distance = float("inf")


    for hotspot in hotspots:

        distance = calculate_distance(

            user_latitude,

            user_longitude,

            hotspot["lat"],

            hotspot["lng"]

        )


        if distance < nearest_distance:

            nearest_distance = distance

            nearest = hotspot


    # ========================================================
    # HOTSPOT SCORE
    # ========================================================

    if nearest_distance <= 1:

        hotspot_score = 100

    elif nearest_distance <= 2:

        hotspot_score = 70

    elif nearest_distance <= 5:

        hotspot_score = 40

    elif nearest_distance <= 10:

        hotspot_score = 20

    else:

        hotspot_score = 0


    return {

        "nearest_hotspot": nearest,

        "distance_km": nearest_distance,

        "hotspot_score": hotspot_score

    }


# ============================================================
# DATASET HELPER
# ============================================================

def get_hotspots_from_dataset(dataset):

    city_counts = (

        dataset["City Name"]

        .dropna()

        .astype(str)

        .str.strip()

        .value_counts()

    )


    city_counts = city_counts[

        city_counts.index.str.lower()
        != "unknown"

    ]


    return city_counts.head(10).to_dict()