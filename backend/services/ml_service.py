import requests


ML_SERVICE_URL = "http://localhost:5000"


def predict_accident(data):

    try:

        response = requests.post(
            f"{ML_SERVICE_URL}/predict",
            json=data,
            timeout=10
        )

        response.raise_for_status()

        return response.json()

    except requests.exceptions.Timeout:

        raise Exception(
            "ML service request timed out."
        )

    except requests.exceptions.ConnectionError:

        raise Exception(
            "Unable to connect to ML service."
        )

    except requests.exceptions.RequestException as e:

        raise Exception(
            f"ML service error: {str(e)}"
        )