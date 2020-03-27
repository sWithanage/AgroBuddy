from flask import Flask, request

# ML Packages
from Models.ARIMA import ARIMA
from Models.ARMA import ARMA
from Models.RNN import MultivaratePrediction as RNN
from Models.SARIMA import SARIMA

app = Flask(__name__)


@app.route("/accuracy")
def routeHomePage():
    dataType = request.args.get('type', default='', type=str)
    model = request.args.get('model', default='', type=str)

    # ======================================== ARIMA Model =====================================================

    if model == "arima" and dataType == "temp":
        return ARIMA.getAccuracy("Temperature", "arima-model-temperature-dataset")

    elif model == "arima" and dataType == "rainfall":
        return ARIMA.getAccuracy("Precipitation", "arima-model-precipitation-dataset")

    elif model == "arima" and dataType == "market":
        return ARIMA.getAccuracy("Market", "ash-plantain", 2, False, 30)

    # ======================================== ARMA Model =====================================================

    elif model == "arma" and dataType == "temp":
        return ARMA.getAccuracy("Temperature", "arima-model-temperature-dataset")

    elif model == "arma" and dataType == "rain":
        return ARMA.getAccuracy("Precipitation", "arima-model-precipitation-dataset")

    elif model == "arma" and dataType == "market":
        return ARMA.getAccuracy("Market", "ash-plantain", 2, False, 30)

    return "Entered parameters " \
           "are not correct. Please check them and try again."


@app.route("/multi")
def getMulti():
    return RNN.getAccuracy()


@app.route("/sarima")
def getSarimaValue():
    return SARIMA.getAccuracy()


@app.errorhandler(404)
def resource_not_found(e):
    return "Page is not found. Please check the url and try again."


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
