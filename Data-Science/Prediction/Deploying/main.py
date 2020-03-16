from flask import Flask

# ML Packages
from Models.ARIMA import ARIMA

app = Flask(__name__)


@app.route("/")
def routeHomePage():
    return "Hello this is AgroBuddy model training section."


@app.route("/accuracy/arima/temp")
def getArimaTempPredictionAccuracy():
    return ARIMA.getAccuracy("Temperature", "arima-model-temperature-dataset")


@app.route("/accuracy/arima/rain")
def getArimaPrecipitationPredictionAccuracy():
    return ARIMA.getAccuracy("Precipitation", "arima-model-precipitation-dataset")


@app.route("/accuracy/arima/market")
def getArimaMarketPredictionAccuracy():
    return ARIMA.getAccuracy("Market", "ash-plantain", 2, False, 30)


@app.errorhandler(404)
def resource_not_found(e):
    return "Page is not found. Please check the url and try again."


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
