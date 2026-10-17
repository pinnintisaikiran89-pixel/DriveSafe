# ============================================================
# DRIVESAFE SAFE ROUTE SERVICE
# ============================================================

import math


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

    return round(R * c, 2)


# ============================================================
# HOTSPOT RISK SCORE
# ============================================================

def get_hotspot_risk_score(risk):

    risk = str(risk).lower()

    if risk == "critical":
        return 100

    elif risk == "high":
        return 80

    elif risk == "medium":
        return 50

    return 20


# ============================================================
# ROUTE SAFETY SCORE
# ============================================================

def calculate_route_safety_score(
    hotspots=None,
    traffic_score=50,
    road_score=50,
    weather_score=50
):

    if hotspots is None:
        hotspots = []


    # --------------------------------------------------------
    # Hotspot Risk
    # --------------------------------------------------------

    if len(hotspots) == 0:

        hotspot_score = 0

    else:

        scores = []

        for hotspot in hotspots:

            scores.append(
                get_hotspot_risk_score(
                    hotspot.get(
                        "risk",
                        "Low"
                    )
                )
            )

        hotspot_score = max(scores)


    # --------------------------------------------------------
    # Overall Risk
    # --------------------------------------------------------

    risk_score = (

        hotspot_score * 0.40

        +

        traffic_score * 0.25

        +

        road_score * 0.20

        +

        weather_score * 0.15

    )


    risk_score = round(
        risk_score,
        2
    )


    # --------------------------------------------------------
    # Safety Score
    # --------------------------------------------------------

    safety_score = round(
        100 - risk_score,
        2
    )


    # --------------------------------------------------------
    # Risk Level
    # --------------------------------------------------------

    if risk_score < 35:

        risk_level = "Low"

    elif risk_score < 65:

        risk_level = "Medium"

    else:

        risk_level = "High"


    return {

        "risk_score": risk_score,

        "safety_score": safety_score,

        "risk_level": risk_level,

        "hotspot_score": hotspot_score,

        "traffic_score": traffic_score,

        "road_score": road_score,

        "weather_score": weather_score

    }


# ============================================================
# ROUTE RECOMMENDATION
# ============================================================

def generate_route_recommendation(
    safety_score,
    risk_level,
    hotspots
):

    if risk_level == "Low":

        recommendation = (
            "This route has a low accident risk. "
            "You can proceed while following normal "
            "road-safety practices."
        )

    elif risk_level == "Medium":

        recommendation = (
            "Moderate risk detected on this route. "
            "Drive carefully and maintain a safe speed."
        )

    else:

        recommendation = (
            "High accident risk detected. "
            "Consider an alternative route if available."
        )


    # --------------------------------------------------------
    # Hotspot Information
    # --------------------------------------------------------

    if hotspots:

        names = [
            hotspot.get(
                "name",
                "Unknown"
            )
            for hotspot in hotspots
        ]

        hotspot_text = ", ".join(names)

        recommendation += (
            f" Accident-prone areas detected near: "
            f"{hotspot_text}."
        )


    return recommendation