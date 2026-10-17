from flask import Blueprint, jsonify
import pandas as pd
from geopy.geocoders import Nominatim
import time


# ============================================================
# BLUEPRINT
# ============================================================

hotspot_bp = Blueprint(
    "hotspots",
    __name__
)


# ============================================================
# LOAD DATASET
# ============================================================

dataset = pd.read_csv(
    "dataset/accidents.csv"
)


# ============================================================
# GEOLOCATOR
# ============================================================

geolocator = Nominatim(
    user_agent="drivesafe"
)


# ============================================================
# HELPER — CALCULATE RISK
# ============================================================

def calculate_hotspot_risk(accident_count):

    if accident_count >= 100:

        return "Critical"

    elif accident_count >= 50:

        return "High"

    elif accident_count >= 20:

        return "Medium"

    else:

        return "Low"


# ============================================================
# HOTSPOTS ROUTE
# ============================================================

@hotspot_bp.route(
    "/hotspots",
    methods=["GET"]
)
def get_hotspots():

    try:

        # ----------------------------------------------------
        # Count accidents city-wise
        # ----------------------------------------------------

        city_counts = (
            dataset["City Name"]
            .dropna()
            .astype(str)
            .str.strip()
            .value_counts()
        )


        # ----------------------------------------------------
        # Remove Unknown
        # ----------------------------------------------------

        city_counts = city_counts[
            city_counts.index.str.lower() != "unknown"
        ]


        # ----------------------------------------------------
        # Top 10 cities
        # ----------------------------------------------------

        top_cities = city_counts.head(10)


        hotspot_data = []


        # ----------------------------------------------------
        # Process cities
        # ----------------------------------------------------

        for city, count in top_cities.items():

            try:

                print(
                    f"Processing hotspot: {city}"
                )


                # ------------------------------------------------
                # Geocode city
                # ------------------------------------------------

                location = geolocator.geocode(
                    f"{city}, India"
                )


                # ------------------------------------------------
                # Prevent Nominatim overload
                # ------------------------------------------------

                time.sleep(1)


                if not location:

                    print(
                        f"Location not found: {city}"
                    )

                    continue


                # ------------------------------------------------
                # Calculate risk
                # ------------------------------------------------

                risk = calculate_hotspot_risk(
                    int(count)
                )


                # ------------------------------------------------
                # Create hotspot
                # ------------------------------------------------

                hotspot = {

                    "name": city,

                    "lat":
                        float(
                            location.latitude
                        ),

                    "lng":
                        float(
                            location.longitude
                        ),

                    "risk": risk,

                    "accidents":
                        int(count)

                }


                hotspot_data.append(
                    hotspot
                )


                print(
                    f"Added hotspot: {hotspot}"
                )


            except Exception as inner_error:

                print(
                    "Hotspot processing error:",
                    inner_error
                )


        # ----------------------------------------------------
        # Return response
        # ----------------------------------------------------

        return jsonify(
            hotspot_data
        )


    except Exception as e:

        print(
            "Hotspot API error:",
            str(e)
        )


        return jsonify({

            "error": str(e)

        }), 500