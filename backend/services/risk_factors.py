# ============================================================
# DRIVESAFE AUTOMATIC RISK FACTORS
# ============================================================


# ============================================================
# WEATHER RISK
# ============================================================

WEATHER_RISK = {

    "Clear": 10,

    "Sunny": 10,

    "Cloudy": 20,

    "Hazy": 40,

    "Rainy": 60,

    "Foggy": 75,

    "Stormy": 90

}


# ============================================================
# ROAD CONDITION RISK
# ============================================================

ROAD_CONDITION_RISK = {

    "Dry": 10,

    "Wet": 50,

    "Damaged": 70,

    "Under Construction": 80

}


# ============================================================
# LIGHTING RISK
# ============================================================

LIGHTING_RISK = {

    "Daylight": 10,

    "Dusk": 40,

    "Dark": 70

}


# ============================================================
# TRAFFIC RISK
# ============================================================

TRAFFIC_RISK = {

    "Low": 10,

    "Moderate": 40,

    "High": 80

}


# ============================================================
# SPEED RISK
# ============================================================

def get_speed_risk(speed):

    speed = float(speed)

    if speed <= 40:

        return 10

    elif speed <= 60:

        return 25

    elif speed <= 80:

        return 45

    elif speed <= 100:

        return 65

    elif speed <= 120:

        return 85

    else:

        return 100


# ============================================================
# WEATHER
# ============================================================

def get_weather_risk(weather):

    return WEATHER_RISK.get(
        weather,
        30
    )


# ============================================================
# ROAD
# ============================================================

def get_road_risk(road_condition):

    return ROAD_CONDITION_RISK.get(
        road_condition,
        30
    )


# ============================================================
# LIGHTING
# ============================================================

def get_lighting_risk(lighting):

    return LIGHTING_RISK.get(
        lighting,
        30
    )


# ============================================================
# TRAFFIC
# ============================================================

def get_traffic_risk(traffic):

    return TRAFFIC_RISK.get(
        traffic,
        30
    )


# ============================================================
# ALL RISK FACTORS
# ============================================================

def calculate_risk_factors(
    weather,
    road_condition,
    lighting,
    traffic,
    speed
):

    return {

        "weather_score":
            get_weather_risk(
                weather
            ),

        "road_score":
            get_road_risk(
                road_condition
            ),

        "lighting_score":
            get_lighting_risk(
                lighting
            ),

        "traffic_score":
            get_traffic_risk(
                traffic
            ),

        "speed_score":
            get_speed_risk(
                speed
            )

    }