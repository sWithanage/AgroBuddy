from flask import Flask

# ML Packages
from Models.ARIMA import ArimaMarketAccuracy as priceAccuracy_ARIMA, ArimaTemperatureAccuracy as tempAccuracy_ARIMA

app = Flask(__name__)


@app.route("/")
def routeHomePage():
    return "Hello this is AgroBuddy model training section."


@app.route("/accuracy/arima/temp")
def getArimaTempPredictionAccuracy():
    return tempAccuracy_ARIMA.getAccuracy()


@app.route("/accuracy/arima/market")
def getArimaMarketPredictionAccuracy():
    return priceAccuracy_ARIMA.getAccuracy()


@app.errorhandler(404)
def resource_not_found(e):
    return "Page is not found. Please check the url and try again."


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
