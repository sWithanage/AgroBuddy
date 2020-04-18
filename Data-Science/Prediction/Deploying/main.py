from flask import Flask, request, send_file

# ML Packages
from Models.ARIMA import ARIMA
from Models.ARMA import ARMA
from Models.VAR import VAR
from Models.RNN import MultivaratePrediction as RNN
from Models.AR import AR
from Models.AutoARIMA import Auto_ARIMA
from Models.Components import CustomLogger as logger

app = Flask(__name__)


# ************************************************* ACCURACY DETAILS *************************************************

@app.route("/accuracy")
def getAccuracyDetails():
    dataType = request.args.get('type', default='', type=str)
    model = request.args.get('model', default='', type=str)
    plant = request.args.get('plant', default='', type=str)

    # ======================================== AR Model =====================================================

    if model == "ar" and dataType == "temp":
        logger.log("Requested for accuracy of AR temperature prediction model")
        return AR.predict("Temperature", "arima-model-temperature-dataset")

    elif model == "ar" and dataType == "rain":
        logger.log("Requested for accuracy of AR rainfall prediction model")
        return AR.predict("Precipitation", "arima-model-precipitation-dataset")

    elif model == "ar" and dataType == "market":
        logger.log("Requested for accuracy of AR market price prediction model")
        if plant == "AshPlantain":
            logger.log("Requested accuracy of from AR market price (Ash Plantain) prediction model")
            return AR.predict("AshPlantain-ARIMA", "AshPlantain", defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for accuracy of AR market price (Brinjal) prediction model")
            return AR.predict("Brinjal-ARIMA", "Brinjal", defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for accuracy of AR market price (Cucumber) prediction model")
            return AR.predict("Cucumber-ARIMA", "Cucumber", defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for accuracy of AR market price (LadiesFinger) prediction model")
            return AR.predict("LadiesFinger-ARIMA", "LadiesFinger", defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for accuracy of AR market price (RedPumpkin) prediction model")
            return AR.predict("RedPumpkin-ARIMA", "RedPumpkin",defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== ARIMA Model =====================================================

    if model == "arima" and dataType == "temp":
        logger.log("Requested for accuracy of ARIMA temperature prediction model")
        return ARIMA.predict("Temperature", "arima-model-temperature-dataset")

    elif model == "arima" and dataType == "rain":
        logger.log("Requested for accuracy of ARIMA rainfall prediction model")
        return ARIMA.predict("Precipitation", "arima-model-precipitation-dataset")

    elif model == "arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested accuracy of from ARIMA market price (Ash Plantain) prediction model")
            return ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for accuracy of ARIMA market price (Brinjal) prediction model")
            return ARIMA.predict("Brinjal-ARIMA", "Brinjal", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for accuracy of ARIMA market price (Cucumber) prediction model")
            return ARIMA.predict("Cucumber-ARIMA", "Cucumber", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for accuracy of ARIMA market price (LadiesFinger) prediction model")
            return ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for accuracy of ARIMA market price (RedPumpkin) prediction model")
            return ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== auto_arima Model =====================================================

    if model == "auto_arima" and dataType == "temp":
        logger.log("Requested for accuracy of Auto Arima temperature prediction model")
        return Auto_ARIMA.predict("Temperature", "arima-model-temperature-dataset")

    elif model == "auto_arima" and dataType == "rain":
        logger.log("Requested for accuracy of Auto Arima rainfall prediction model")
        return Auto_ARIMA.predict("Precipitation", "arima-model-precipitation-dataset")

    elif model == "auto_arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested accuracy of from Auto Arima market price (Ash Plantain) prediction model")
            return Auto_ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for accuracy of Auto Arima market price (Brinjal) prediction model")
            return Auto_ARIMA.predict("Brinjal-ARIMA", "Brinjal", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for accuracy of Auto Arima market price (Cucumber) prediction model")
            return Auto_ARIMA.predict("Cucumber-ARIMA", "Cucumber", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for accuracy of Auto Arima market price (LadiesFinger) prediction model")
            return Auto_ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for accuracy of Auto Arima market price (RedPumpkin) prediction model")
            return Auto_ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== ARMA Model =====================================================

    elif model == "arma" and dataType == "temp":
        logger.log("Requested for accuracy of ARMA temperature prediction model")
        return ARMA.predict("Temperature", "arima-model-temperature-dataset")

    elif model == "arma" and dataType == "rain":
        logger.log("Requested for accuracy of ARMA rainfall prediction model")
        return ARMA.predict("Precipitation", "arima-model-precipitation-dataset")

    elif model == "arma" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested accuracy of from ARMA market price (Ash Plantain) prediction model")
            return ARMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for accuracy of ARMA market price (Brinjal) prediction model")
            return ARMA.predict("Brinjal-ARIMA", "Brinjal", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for accuracy of ARMA market price (Cucumber) prediction model")
            return ARMA.predict("Cucumber-ARIMA", "Cucumber", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for accuracy of ARMA market price (LadiesFinger) prediction model")
            return ARMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for accuracy of ARMA market price (RedPumpkin) prediction model")
            return ARMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2,defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== VAR Model =====================================================
    elif model == "var" and dataType == "temp":
        logger.log("Requested for forecast from VAR temperature prediction model")
        return VAR.predict("Temperature", "arima-model-temperature-dataset", defaultRatio=True, getAccuracy=True, sizeOfTrainingDataSet=90)

    elif model == "var" and dataType == "rain":
        logger.log("Requested for forecast from VAR rainfall prediction model")
        return VAR.predict("Precipitation", "arima-model-precipitation-dataset", defaultRatio=True, getAccuracy=True,sizeOfTrainingDataSet=90)

    elif model == "var" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested for forecast from VAR market price (Ash Plantain) prediction model")
            return VAR.predict("VAR", "AshPlantain", defaultRatio=True, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for forecast from VAR market price (Brinjal) prediction model")
            return VAR.predict("VAR", "Brinjal", defaultRatio=True, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for forecast from VAR market price (Cucumber) prediction model")
            return VAR.predict("VAR", "Cucumber", defaultRatio=True, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for forecast from VAR market price (LadiesFinger) prediction model")
            return VAR.predict("VAR", "LadiesFinger", defaultRatio=True, getAccuracy=True, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for forecast from VAR market price (RedPumpkin) prediction model")
            return VAR.predict("VAR", "RedPumpkin", defaultRatio=True, getAccuracy=True, sizeOfTrainingDataSet=90)

    return "Entered parameters are not correct. Please check them and try again."






# ************************************************* FORECASTING DETAILS *************************************************


@app.route("/forecast")
def getForecastedValues():
    dataType = request.args.get('type', default='', type=str)
    model = request.args.get('model', default='', type=str)
    plant = request.args.get('plant', default='', type=str)

    # ======================================== AR Model Forecasting =====================================================

    if model == "ar" and dataType == "temp":
        logger.log("Requested for forecast from AR temperature prediction model")
        return AR.predict("Temperature", "arima-model-temperature-dataset", defaultRatio=False, getAccuracy=False,sizeOfTrainingDataSet=90)

    elif model == "ar" and dataType == "rain":
        logger.log("Requested for forecast from AR rainfall prediction model")
        return AR.predict("Precipitation", "arima-model-precipitation-dataset", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

    elif model == "ar" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested for forecast from AR market price (Ash Plantain) prediction model")
            return AR.predict("AshPlantain-ARIMA", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for forecast from AR market price (Brinjal) prediction model")
            return AR.predict("Brinjal-ARIMA", "Brinjal", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for forecast from AR market price (Cucumber) prediction model")
            return AR.predict("Cucumber-ARIMA", "Cucumber", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for forecast from AR market price (LadiesFinger) prediction model")
            return AR.predict("LadiesFinger-ARIMA", "LadiesFinger", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for forecast from AR market price (RedPumpkin) prediction model")
            return AR.predict("RedPumpkin-ARIMA", "RedPumpkin",defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"

# ======================================== AutoArima Model Forecasting =====================================================

    if model == "auto_arima" and dataType == "temp":
        logger.log("Requested for forecast from AutoArima temperature prediction model")
        return Auto_ARIMA.predict("Temperature", "arima-model-temperature-dataset", defaultRatio=False, getAccuracy=False,sizeOfTrainingDataSet=90)

    elif model == "auto_arima" and dataType == "rain":
        logger.log("Requested for forecast from AutoArima rainfall prediction model")
        return Auto_ARIMA.predict("Precipitation", "arima-model-precipitation-dataset", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

    elif model == "auto_arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested for forecast from AutoArima market price (Ash Plantain) prediction model")
            return Auto_ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for forecast from AutoArima market price (Brinjal) prediction model")
            return Auto_ARIMA.predict("Brinjal-ARIMA", "Brinjal", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for forecast from AutoArima market price (Cucumber) prediction model")
            return Auto_ARIMA.predict("Cucumber-ARIMA", "Cucumber", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for forecast from AutoArima market price (LadiesFinger) prediction model")
            return Auto_ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for forecast from AutoArima market price (RedPumpkin) prediction model")
            return Auto_ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"



# ======================================== ARIMA Model Forecasting =====================================================

    if model == "arima" and dataType == "temp":
        logger.log("Requested for forecast from ARIMA temperature prediction model")
        return ARIMA.predict("Temperature", "arima-model-temperature-dataset", defaultRatio=False, getAccuracy=False,
                             sizeOfTrainingDataSet=90)

    elif model == "arima" and dataType == "rain":
        logger.log("Requested for forecast from ARIMA rainfall prediction model")
        return ARIMA.predict("Precipitation", "arima-model-precipitation-dataset", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

    elif model == "arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested for forecast from ARMA market price (Ash Plantain) prediction model")
            return ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for forecast from ARMA market price (Brinjal) prediction model")
            return ARIMA.predict("Brinjal-ARIMA", "Brinjal", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for forecast from ARMA market price (Cucumber) prediction model")
            return ARIMA.predict("Cucumber-ARIMA", "Cucumber", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for forecast from ARMA market price (LadiesFinger) prediction model")
            return ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for forecast from ARMA market price (RedPumpkin) prediction model")
            return ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"


    # ======================================== ARMA Model Forecasting =====================================================

    if model == "arma" and dataType == "temp":
        logger.log("Requested for forecast from ARMA temperature prediction model")
        return ARMA.predict("Temperature", "arima-model-temperature-dataset", defaultRatio=False, getAccuracy=False,
                             sizeOfTrainingDataSet=90)

    elif model == "arma" and dataType == "rain":
        logger.log("Requested for forecast from ARMA rainfall prediction model")
        return ARMA.predict("Precipitation", "arima-model-precipitation-dataset", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

    elif model == "arma" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested for forecast from ARMA market price (Ash Plantain) prediction model")
            return ARMA.predict("VAR", "AshPlantain", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for forecast from ARMA market price (Brinjal) prediction model")
            return ARMA.predict("VAR", "Brinjal", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for forecast from ARMA market price (Cucumber) prediction model")
            return ARMA.predict("VAR", "Cucumber", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for forecast from ARMA market price (LadiesFinger) prediction model")
            return ARMA.predict("VAR", "LadiesFinger", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for forecast from ARMA market price (RedPumpkin) prediction model")
            return ARMA.predict("VAR", "RedPumpkin", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== VAR Model Forecasting =====================================================

    elif model == "var" and dataType == "temp":
        logger.log("Requested for forecast from VAR temperature prediction model")
        return VAR.predict("Temperature", "arima-model-temperature-dataset", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

    elif model == "var" and dataType == "rain":
        logger.log("Requested for forecast from VAR rainfall prediction model")
        return VAR.predict("Precipitation", "arima-model-precipitation-dataset", defaultRatio=False, getAccuracy=False,sizeOfTrainingDataSet=90)

    elif model == "var" and dataType == "market":
        if plant == "AshPlantain":
            logger.log("Requested for forecast from VAR market price (Ash Plantain) prediction model")
            return VAR.predict("VAR", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Brinjal":
            logger.log("Requested for forecast from VAR market price (Brinjal) prediction model")
            return VAR.predict("VAR", "Brinjal", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "Cucumber":
            logger.log("Requested for forecast from VAR market price (Cucumber) prediction model")
            return VAR.predict("VAR", "Cucumber", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "LadiesFinger":
            logger.log("Requested for forecast from VAR market price (LadiesFinger) prediction model")
            return VAR.predict("VAR", "LadiesFinger", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        elif plant == "RedPumpkin":
            logger.log("Requested for forecast from VAR market price (RedPumpkin) prediction model")
            return VAR.predict("VAR", "RedPumpkin", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)

        else:
            logger.log("Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    return "Entered parameters are not correct. Please check them and try again."


@app.route("/multi")
def getMulti():
    logger.log("Requested for accuracy for multivariate prediction model")
    return RNN.predict()


@app.route("/log")
def getLog():
    try:
        logger.log("Requested for log report")
        return send_file('Log/Log.txt', attachment_filename='Log File.txt')
    except Exception as e:
        return str(e)


@app.route("/log/clear")
def cleanLog():
    try:
        logger.cleanLog()
        logger.log("File cleared successfully with web request")
        return send_file('Log/Log.txt', attachment_filename='Log File.txt')
    except Exception as e:
        return str(e)


@app.route("/auto_arima")
def getSarimaValue():
    return Auto_ARIMA.predict()


@app.route('/sasa')
def getPredictedArima():
    logger.log("Requested for values in arima")
    return ARIMA.predict("Temperature", "arima-model-temperature-dataset", defaultRatio=False, getAccuracy=False,
                         sizeOfTrainingDataSet=90)


@app.errorhandler(404)
def resource_not_found(e):
    return "Page is not found. Please check the url and try again."


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
