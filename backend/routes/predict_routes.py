from flask import Blueprint, request, jsonify

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        print("===== REQUEST RECEIVED =====")
        print(data)

        weather = data.get("weather")
        speed = int(data.get("speed"))
        vehicles = int(data.get("vehicles"))

        print("Weather =", weather)
        print("Speed =", speed)
        print("Vehicles =", vehicles)

        # Prediction Logic

        # FATAL
        if speed >= 120 or vehicles >= 6:

            result = "Fatal"

        # SERIOUS
        elif speed >= 70 or vehicles >= 3:

            result = "Serious"

        # MINOR
        else:

            result = "Minor"

        print("RESULT =", result)

        return jsonify({
            "prediction": result
        })

    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({
            "error": str(e)
        })