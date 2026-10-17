from services.hotspot_service import (
    calculate_distance,
    calculate_hotspot_score,
    find_nearest_hotspot
)


# ============================================================
# TEST 1 — DISTANCE
# ============================================================

distance = calculate_distance(

    19.0760,
    72.8777,

    19.0800,
    72.8800

)

print(
    "Distance:",
    distance,
    "km"
)


# ============================================================
# TEST 2 — SCORE
# ============================================================

score = calculate_hotspot_score(
    distance
)

print(
    "Hotspot Score:",
    score
)


# ============================================================
# TEST 3 — FIND NEAREST HOTSPOT
# ============================================================

hotspots = [

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
        "accidents": 35
    }

]


result = find_nearest_hotspot(

    19.0800,

    72.8800,

    hotspots

)


print(
    "Nearest Hotspot:"
)

print(result)