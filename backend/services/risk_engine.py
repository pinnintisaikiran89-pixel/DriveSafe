# ============================================================
# DRIVESAFE RISK ENGINE
# ============================================================


def calculate_risk_score(
    ml_prediction=None,
    ml_confidence=0,
    hotspot_count=0,
    weather_risk=0,
    road_risk=0,
    traffic_risk=0,
    speed_risk=0,
    lighting_risk=0
):

    # --------------------------------------------------------
    # ML SEVERITY SCORE
    # --------------------------------------------------------

    severity_scores = {

        "Minor": 20,

        "Serious": 60,

        "Fatal": 90

    }

    ml_score = severity_scores.get(
        ml_prediction,
        0
    )


    # --------------------------------------------------------
    # HOTSPOT SCORE
    # --------------------------------------------------------

    if hotspot_count == 0:

        hotspot_score = 0

    elif hotspot_count <= 2:

        hotspot_score = 20

    elif hotspot_count <= 5:

        hotspot_score = 50

    else:

        hotspot_score = 80


    # --------------------------------------------------------
    # WEIGHTED RISK SCORE
    # --------------------------------------------------------
    #
    # ML Severity       = 30%
    # Hotspot           = 20%
    # Weather           = 15%
    # Road Condition    = 10%
    # Lighting          = 10%
    # Traffic           = 5%
    # Speed             = 10%
    #
    # TOTAL             = 100%
    # --------------------------------------------------------

    score = (

        ml_score * 0.30 +

        hotspot_score * 0.20 +

        weather_risk * 0.15 +

        road_risk * 0.10 +

        lighting_risk * 0.10 +

        traffic_risk * 0.05 +

        speed_risk * 0.10

    )


    # --------------------------------------------------------
    # ROUND SCORE
    # --------------------------------------------------------

    score = round(
        score,
        2
    )


    # --------------------------------------------------------
    # KEEP SCORE BETWEEN 0 AND 100
    # --------------------------------------------------------

    score = max(
        0,
        min(
            score,
            100
        )
    )


    # --------------------------------------------------------
    # RISK LEVEL
    # --------------------------------------------------------

    if score < 35:

        risk_level = "Low"

    elif score < 65:

        risk_level = "Medium"

    else:

        risk_level = "High"


    # --------------------------------------------------------
    # FINAL RESULT
    # --------------------------------------------------------

    return {

        "risk_score": score,

        "risk_level": risk_level,

        "components": {

            "ml_score":
                ml_score,

            "hotspot_score":
                hotspot_score,

            "weather_score":
                weather_risk,

            "road_score":
                road_risk,

            "lighting_score":
                lighting_risk,

            "traffic_score":
                traffic_risk,

            "speed_score":
                speed_risk

        }

    }