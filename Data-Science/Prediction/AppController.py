# =====================================================
# Title                 :   Flask Application
# Author                :   Sasanka Withanage
# Last modified Date    :   03 May 2020
# =====================================================


# ML Packages
from Models.AR import AR
from Models.VAR import VAR
from Models.RNN import RNN
from Models.ARMA import ARMA
from Models.ARIMA import ARIMA
from Models.SARIMA import SARIMA
from Models.AutoARIMA import Auto_ARIMA
from flask import Flask, request, send_file
from Models.BestCropFinder import BestCropFinder
from Models.Components import CustomLogger as logger

app = Flask(__name__)


# ************************************************* INDEX PAGE *************************************************

@app.route("/")
def homePage():
    return "This is an api to get accuracies and forecast."


# ********************************************* Finding Best Plant *************************************************

@app.route("/bestPlant")
def findingBestPlant():
    return str(BestCropFinder.getBestPlant())


# ************************************************* ACCURACY DETAILS *************************************************

@app.route("/accuracy")
def getAccuracyDetails():
    dataType = request.args.get('type', default='', type=str)
    model = request.args.get('model', default='', type=str)
    plant = request.args.get('plant', default='', type=str)
    requiredRatio = request.args.get('ratio', default='', type=str)

    # Check split point ratio and if there is no requirement set default ratio as 80 : 20
    if requiredRatio == '':
        requiredRatio = 0.2
    else:
        requiredRatio = float(requiredRatio)

    # ======================================== AR Model =====================================================


    if model == "ar" and dataType == "temp":
        logger.log(True, "Requested for accuracy of AR temperature prediction model")
        return AR.predict("Temperature", "temp", ratio=requiredRatio)

    elif model == "ar" and dataType == "rain":
        logger.log(True, "Requested for accuracy of AR rainfall prediction model")
        return AR.predict("Precipitation", "precipitation", ratio=requiredRatio)

    elif model == "ar" and dataType == "market":
        logger.log(True, "Requested for accuracy of AR market price prediction model")
        if plant == "AshPlantain":
            logger.log(True, "Requested accuracy of from AR market price (Ash Plantain) prediction model")
            return AR.predict("AshPlantain-AR", "AshPlantain", ratio=requiredRatio)

        elif plant == "Brinjal":
            logger.log(True, "Requested for accuracy of AR market price (Brinjal) prediction model")
            return AR.predict("Brinjal-AR", "Brinjal", ratio=requiredRatio)

        elif plant == "Cucumber":
            logger.log(True, "Requested for accuracy of AR market price (Cucumber) prediction model")
            return AR.predict("Cucumber-AR", "Cucumber", ratio=requiredRatio)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for accuracy of AR market price (LadiesFinger) prediction model")
            return AR.predict("LadiesFinger-AR", "LadiesFinger", ratio=requiredRatio)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for accuracy of AR market price (RedPumpkin) prediction model")
            return AR.predict("RedPumpkin-AR", "RedPumpkin", ratio=requiredRatio)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== ARIMA Model =====================================================

    if model == "arima" and dataType == "temp":
        logger.log(True, "Requested for accuracy of ARIMA temperature prediction model")
        return ARIMA.predict("Temperature", "temp", ratio=requiredRatio)

    elif model == "arima" and dataType == "rain":
        logger.log(True, "Requested for accuracy of ARIMA rainfall prediction model")
        return ARIMA.predict("Precipitation", "precipitation", ratio=requiredRatio)

    elif model == "arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested accuracy of from ARIMA market price (Ash Plantain) prediction model")
            return ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, ratio=requiredRatio)

        elif plant == "Brinjal":
            logger.log(True, "Requested for accuracy of ARIMA market price (Brinjal) prediction model")
            return ARIMA.predict("Brinjal-ARIMA", "Brinjal", 2, ratio=requiredRatio)

        elif plant == "Cucumber":
            logger.log(True, "Requested for accuracy of ARIMA market price (Cucumber) prediction model")
            return ARIMA.predict("Cucumber-ARIMA", "Cucumber", 2, ratio=requiredRatio)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for accuracy of ARIMA market price (LadiesFinger) prediction model")
            return ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, ratio=requiredRatio)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for accuracy of ARIMA market price (RedPumpkin) prediction model")
            return ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2, ratio=requiredRatio)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== auto_arima Model =====================================================

    if model == "auto_arima" and dataType == "temp":
        logger.log(True, "Requested for accuracy of Auto Arima temperature prediction model")
        return Auto_ARIMA.predict("Temperature", "temp", ratio=requiredRatio)

    elif model == "auto_arima" and dataType == "rain":
        logger.log(True, "Requested for accuracy of Auto Arima rainfall prediction model")
        return Auto_ARIMA.predict("Precipitation", "precipitation", ratio=requiredRatio)

    elif model == "auto_arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested accuracy of from Auto Arima market price (Ash Plantain) prediction model")
            return Auto_ARIMA.predict("AshPlantain-Auto_arima", "AshPlantain", 2, ratio=requiredRatio)

        elif plant == "Brinjal":
            logger.log(True, "Requested for accuracy of Auto Arima market price (Brinjal) prediction model")
            return Auto_ARIMA.predict("Brinjal-Auto_arima", "Brinjal", 2, ratio=requiredRatio)

        elif plant == "Cucumber":
            logger.log(True, "Requested for accuracy of Auto Arima market price (Cucumber) prediction model")
            return Auto_ARIMA.predict("Cucumber-Auto_arima", "Cucumber", 2, ratio=requiredRatio)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for accuracy of Auto Arima market price (LadiesFinger) prediction model")
            return Auto_ARIMA.predict("LadiesFinger-Auto_arima", "LadiesFinger", 2, ratio=requiredRatio)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for accuracy of Auto Arima market price (RedPumpkin) prediction model")
            return Auto_ARIMA.predict("RedPumpkin-Auto_arima", "RedPumpkin", 2, ratio=requiredRatio)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== ARMA Model =====================================================

    elif model == "arma" and dataType == "temp":
        logger.log(True, "Requested for accuracy of ARMA temperature prediction model")
        return ARMA.predict("Temperature", "temp", ratio=requiredRatio)

    elif model == "arma" and dataType == "rain":
        logger.log(True, "Requested for accuracy of ARMA rainfall prediction model")
        return ARMA.predict("Precipitation", "precipitation", ratio=requiredRatio)

    elif model == "arma" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested accuracy of from ARMA market price (Ash Plantain) prediction model")
            return ARMA.predict("AshPlantain-ARMA", "AshPlantain", 2, ratio=requiredRatio)

        elif plant == "Brinjal":
            logger.log(True, "Requested for accuracy of ARMA market price (Brinjal) prediction model")
            return ARMA.predict("Brinjal-ARMA", "Brinjal", 2, ratio=requiredRatio)

        elif plant == "Cucumber":
            logger.log(True, "Requested for accuracy of ARMA market price (Cucumber) prediction model")
            return ARMA.predict("Cucumber-ARMA", "Cucumber", 2,  ratio=requiredRatio)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for accuracy of ARMA market price (LadiesFinger) prediction model")
            return ARMA.predict("LadiesFinger-ARMA", "LadiesFinger", 2, ratio=requiredRatio)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for accuracy of ARMA market price (RedPumpkin) prediction model")
            return ARMA.predict("RedPumpkin-ARMA", "RedPumpkin", 2, ratio=requiredRatio)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== SARIMA Model =====================================================

    elif model == "sarima" and dataType == "temp":
        logger.log(True, "Requested for accuracy of SARIMA temperature prediction model")
        return SARIMA.predict("Temperature", "temp", ratio=requiredRatio)

    elif model == "sarima" and dataType == "rain":
        logger.log(True, "Requested for accuracy of SARIMA rainfall prediction model")
        return SARIMA.predict("Precipitation", "precipitation", ratio=requiredRatio)

    elif model == "sarima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested accuracy of from SARIMA market price (Ash Plantain) prediction model")
            return SARIMA.predict("AshPlantain-ARIMA", "AshPlantain", ratio=requiredRatio)

        elif plant == "Brinjal":
            logger.log(True, "Requested for accuracy of SARIMA market price (Brinjal) prediction model")
            return SARIMA.predict("Brinjal-ARIMA", "Brinjal", ratio=requiredRatio)

        elif plant == "Cucumber":
            logger.log(True, "Requested for accuracy of SARIMA market price (Cucumber) prediction model")
            return SARIMA.predict("Cucumber-ARIMA", "Cucumber", ratio=requiredRatio)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for accuracy of SARIMA market price (LadiesFinger) prediction model")
            return SARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", ratio=requiredRatio)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for accuracy of SARIMA market price (RedPumpkin) prediction model")
            return SARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", ratio=requiredRatio)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== VAR Model =====================================================
    elif model == "var" and dataType == "temp":
        logger.log(True, "Requested for accuracy from VAR temperature prediction model")
        return VAR.predict("Temperature", "temp", ratio=requiredRatio)

    elif model == "var" and dataType == "rain":
        logger.log(True, "Requested for accuracy from VAR rainfall prediction model")
        return VAR.predict("Precipitation", "precipitation", ratio=requiredRatio)

    elif model == "var" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for accuracy from VAR market price (Ash Plantain) prediction model")
            return VAR.predict("VARAshPlantain", "AshPlantain", ratio=requiredRatio)

        elif plant == "Brinjal":
            logger.log(True, "Requested for accuracy from VAR market price (Brinjal) prediction model")
            return VAR.predict("VARBrinjal", "Brinjal", ratio=requiredRatio)

        elif plant == "Cucumber":
            logger.log(True, "Requested for accuracy from VAR market price (Cucumber) prediction model")
            return VAR.predict("VARCucumber", "Cucumber", ratio=requiredRatio)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for accuracy from VAR market price (LadiesFinger) prediction model")
            return VAR.predict("VARLadiesFinger", "LadiesFinger", ratio=requiredRatio)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for accuracy from VAR market price (RedPumpkin) prediction model")
            return VAR.predict("VARRedPumpkin", "RedPumpkin", ratio=requiredRatio)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== RNN Model =====================================================
    elif model == "rnn" and dataType == "temp":
        logger.log(True, "Requested for accuracy from RNN temperature prediction model")
        return RNN.predict("Temperature", "temp", ratio=requiredRatio)

    elif model == "rnn" and dataType == "rain":
        logger.log(True, "Requested for accuracy from RNN rainfall prediction model")
        return RNN.predict("Precipitation", "precipitation", ratio=requiredRatio)

    elif model == "rnn" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for accuracy from RNN market price (Ash Plantain) prediction model")
            return RNN.predict("RNNAshPlantain", "AshPlantain", ratio=requiredRatio)

        elif plant == "Brinjal":
            logger.log(True, "Requested for accuracy from RNN market price (Brinjal) prediction model")
            return RNN.predict("RNNBrinjal", "Brinjal", ratio=requiredRatio)

        elif plant == "Cucumber":
            logger.log(True, "Requested for accuracy from RNN market price (Cucumber) prediction model")
            return RNN.predict("RNNCucumber", "Cucumber", ratio=requiredRatio)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for accuracy from RNN market price (LadiesFinger) prediction model")
            return RNN.predict("RNNLadiesFinger", "LadiesFinger", ratio=requiredRatio)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for accuracy from RNN market price (RedPumpkin) prediction model")
            return RNN.predict("RNNRedPumpkin", "RedPumpkin", ratio=requiredRatio)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    return "Entered parameters are not correct. Please check them and try again."


# ************************************************* FORECASTING DETAILS *************************************************

tempPredictionSizeReq = 90
rainPredictionSizeReq = 90
marketPredictionSizeReq = 16


@app.route("/forecast")
def getForecastedValues():
    dataType = request.args.get('type', default='', type=str)
    model = request.args.get('model', default='', type=str)
    plant = request.args.get('plant', default='', type=str)

    # ======================================== AR Model Forecasting =====================================================

    if model == "ar" and dataType == "temp":
        logger.log(True, "Requested for forecast from AR temperature prediction model")
        return AR.predict("Temperature", "temp", defaultRatio=False, getAccuracy=False,
                          sizeOfTrainingDataSet=tempPredictionSizeReq)

    elif model == "ar" and dataType == "rain":
        logger.log(True, "Requested for forecast from AR rainfall prediction model")
        return AR.predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False,
                          sizeOfTrainingDataSet=rainPredictionSizeReq)

    elif model == "ar" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for forecast from AR market price (Ash Plantain) prediction model")
            return AR.predict("AshPlantain-ARIMA", "AshPlantain", defaultRatio=False, getAccuracy=False,
                              sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Brinjal":
            logger.log(True, "Requested for forecast from AR market price (Brinjal) prediction model")
            return AR.predict("Brinjal-ARIMA", "Brinjal", defaultRatio=False, getAccuracy=False,
                              sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Cucumber":
            logger.log(True, "Requested for forecast from AR market price (Cucumber) prediction model")
            return AR.predict("Cucumber-ARIMA", "Cucumber", defaultRatio=False, getAccuracy=False,
                              sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for forecast from AR market price (LadiesFinger) prediction model")
            return AR.predict("LadiesFinger-ARIMA", "LadiesFinger", defaultRatio=False, getAccuracy=False,
                              sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for forecast from AR market price (RedPumpkin) prediction model")
            return AR.predict("RedPumpkin-ARIMA", "RedPumpkin", defaultRatio=False, getAccuracy=False,
                              sizeOfTrainingDataSet=marketPredictionSizeReq)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== AutoArima Model Forecasting =====================================================

    if model == "auto_arima" and dataType == "temp":
        logger.log(True, "Requested for forecast from AutoArima temperature prediction model")
        return Auto_ARIMA.predict("Temperature", "temp", defaultRatio=False,
                                  getAccuracy=False, sizeOfTrainingDataSet=tempPredictionSizeReq)

    elif model == "auto_arima" and dataType == "rain":
        logger.log(True, "Requested for forecast from AutoArima rainfall prediction model")
        return Auto_ARIMA.predict("Precipitation", "precipitation", defaultRatio=False,
                                  getAccuracy=False, sizeOfTrainingDataSet=rainPredictionSizeReq)

    elif model == "auto_arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for forecast from AutoArima market price (Ash Plantain) prediction model")
            return Auto_ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", defaultRatio=False, getAccuracy=False,
                                      sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Brinjal":
            logger.log(True, "Requested for forecast from AutoArima market price (Brinjal) prediction model")
            return Auto_ARIMA.predict("Brinjal-ARIMA", "Brinjal", defaultRatio=False, getAccuracy=False,
                                      sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Cucumber":
            logger.log(True, "Requested for forecast from AutoArima market price (Cucumber) prediction model")
            return Auto_ARIMA.predict("Cucumber-ARIMA", "Cucumber", defaultRatio=False, getAccuracy=False,
                                      sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for forecast from AutoArima market price (LadiesFinger) prediction model")
            return Auto_ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", defaultRatio=False, getAccuracy=False,
                                      sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for forecast from AutoArima market price (RedPumpkin) prediction model")
            return Auto_ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", defaultRatio=False, getAccuracy=False,
                                      sizeOfTrainingDataSet=marketPredictionSizeReq)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== ARIMA Model Forecasting =====================================================

    if model == "arima" and dataType == "temp":
        logger.log(True, "Requested for forecast from ARIMA temperature prediction model")
        return ARIMA.predict("Temperature", "temp", defaultRatio=False, getAccuracy=False,
                             sizeOfTrainingDataSet=tempPredictionSizeReq)

    elif model == "arima" and dataType == "rain":
        logger.log(True, "Requested for forecast from ARIMA rainfall prediction model")
        return ARIMA.predict("Precipitation", "precipitation", defaultRatio=False,
                             getAccuracy=False, sizeOfTrainingDataSet=rainPredictionSizeReq)

    elif model == "arima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for forecast from ARMA market price (Ash Plantain) prediction model")
            return ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=False,
                                 sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Brinjal":
            logger.log(True, "Requested for forecast from ARMA market price (Brinjal) prediction model")
            return ARIMA.predict("Brinjal-ARIMA", "Brinjal", 2, defaultRatio=False, getAccuracy=False,
                                 sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Cucumber":
            logger.log(True, "Requested for forecast from ARMA market price (Cucumber) prediction model")
            return ARIMA.predict("Cucumber-ARIMA", "Cucumber", 2, defaultRatio=False, getAccuracy=False,
                                 sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for forecast from ARMA market price (LadiesFinger) prediction model")
            return ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, defaultRatio=False, getAccuracy=False,
                                 sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for forecast from ARMA market price (RedPumpkin) prediction model")
            return ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2, defaultRatio=False, getAccuracy=False,
                                 sizeOfTrainingDataSet=marketPredictionSizeReq)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== ARMA Model Forecasting =====================================================

    if model == "arma" and dataType == "temp":
        logger.log(True, "Requested for forecast from ARMA temperature prediction model")
        return ARMA.predict("Temperature", "temp", defaultRatio=False, getAccuracy=False,
                            sizeOfTrainingDataSet=tempPredictionSizeReq)

    elif model == "arma" and dataType == "rain":
        logger.log(True, "Requested for forecast from ARMA rainfall prediction model")
        return ARMA.predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False,
                            sizeOfTrainingDataSet=rainPredictionSizeReq)

    elif model == "arma" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for forecast from ARMA market price (Ash Plantain) prediction model")
            return ARMA.predict("ARMA_AshPlantain", "AshPlantain", 2, defaultRatio=False, getAccuracy=False,
                                sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Brinjal":
            logger.log(True, "Requested for forecast from ARMA market price (Brinjal) prediction model")
            return ARMA.predict("ARMA_Brinjal", "Brinjal", 2, defaultRatio=False, getAccuracy=False,
                                sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Cucumber":
            logger.log(True, "Requested for forecast from ARMA market price (Cucumber) prediction model")
            return ARMA.predict("ARMA_Cucumber", "Cucumber", 2, defaultRatio=False, getAccuracy=False,
                                sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for forecast from ARMA market price (LadiesFinger) prediction model")
            return ARMA.predict("ARMA_LadiesFinger", "LadiesFinger", 2, defaultRatio=False, getAccuracy=False,
                                sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for forecast from ARMA market price (RedPumpkin) prediction model")
            return ARMA.predict("ARMA_RedPumpkin", "RedPumpkin", 2, defaultRatio=False, getAccuracy=False,
                                sizeOfTrainingDataSet=marketPredictionSizeReq)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== SARIMA Model Forecasting =====================================================

    if model == "sarima" and dataType == "temp":
        logger.log(True, "Requested for forecast from SARIMA temperature prediction model")
        return SARIMA.predict("Temperature", "temp", defaultRatio=False, getAccuracy=False,
                              sizeOfTrainingDataSet=tempPredictionSizeReq)

    elif model == "sarima" and dataType == "rain":
        logger.log(True, "Requested for forecast from SARIMA rainfall prediction model")
        return SARIMA.predict("Precipitation", "precipitation", defaultRatio=False,
                              getAccuracy=False, sizeOfTrainingDataSet=rainPredictionSizeReq)

    elif model == "sarima" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for forecast from SARIMA market price (Ash Plantain) prediction model")
            return SARIMA.predict("SARIMA_AshPlantain", "AshPlantain", defaultRatio=False, getAccuracy=False,
                                  sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Brinjal":
            logger.log(True, "Requested for forecast from SARIMA market price (Brinjal) prediction model")
            return SARIMA.predict("SARIMA_Brinjal", "Brinjal", defaultRatio=False, getAccuracy=False,
                                  sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Cucumber":
            logger.log(True, "Requested for forecast from SARIMA market price (Cucumber) prediction model")
            return SARIMA.predict("SARIMA_Cucumber", "Cucumber", defaultRatio=False, getAccuracy=False,
                                  sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for forecast from SARIMA market price (LadiesFinger) prediction model")
            return SARIMA.predict("SARIMA_LadiesFinger", "LadiesFinger", defaultRatio=False, getAccuracy=False,
                                  sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for forecast from SARIMA market price (RedPumpkin) prediction model")
            return SARIMA.predict("SARIMA_RedPumpkin", "RedPumpkin", defaultRatio=False, getAccuracy=False,
                                  sizeOfTrainingDataSet=marketPredictionSizeReq)
        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    # ======================================== VAR Model Forecasting =====================================================

    elif model == "var" and dataType == "temp":
        logger.log(True, "Requested for forecast from VAR temperature prediction model")
        return VAR.predict("Temperature", "temp", defaultRatio=False, getAccuracy=False,
                           sizeOfTrainingDataSet=tempPredictionSizeReq)

    elif model == "var" and dataType == "rain":
        logger.log(True, "Requested for forecast from VAR rainfall prediction model")
        return VAR.predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False,
                           sizeOfTrainingDataSet=rainPredictionSizeReq)

    elif model == "var" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for forecast from VAR market price (Ash Plantain) prediction model")
            return VAR.predict("VAR_AshPlantain", "AshPlantain", defaultRatio=False, getAccuracy=False,
                               sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Brinjal":
            logger.log(True, "Requested for forecast from VAR market price (Brinjal) prediction model")
            return VAR.predict("VAR_Brinjal", "Brinjal", defaultRatio=False, getAccuracy=False,
                               sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "Cucumber":
            logger.log(True, "Requested for forecast from VAR market price (Cucumber) prediction model")
            return VAR.predict("VAR_Cucumber", "Cucumber", defaultRatio=False, getAccuracy=False,
                               sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for forecast from VAR market price (LadiesFinger) prediction model")
            return VAR.predict("VAR_LadiesFinger", "LadiesFinger", defaultRatio=False, getAccuracy=False,
                               sizeOfTrainingDataSet=marketPredictionSizeReq)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for forecast from VAR market price (RedPumpkin) prediction model")
            return VAR.predict("VAR_RedPumpkin", "RedPumpkin", defaultRatio=False, getAccuracy=False,
                               sizeOfTrainingDataSet=marketPredictionSizeReq)

        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

        # ======================================== RNN Model =====================================================
    elif model == "rnn" and dataType == "temp":
        logger.log(True, "Requested for forecast from RNN temperature prediction model")
        return RNN.predict("Temperature", "temp", defaultRatio=False, getAccuracy=False,
                           futureRequirement=tempPredictionSizeReq)

    elif model == "rnn" and dataType == "rain":
        logger.log(True, "Requested for forecast from RNN rainfall prediction model")
        return RNN.predict("Precipitation", "precipitation", defaultRatio=False,
                           getAccuracy=False, futureRequirement=rainPredictionSizeReq)

    elif model == "rnn" and dataType == "market":
        if plant == "AshPlantain":
            logger.log(True, "Requested for accuracy from RNN market price (Ash Plantain) prediction model")
            return RNN.predict("RNN_AshPlantain", "AshPlantain", defaultRatio=False,
                               getAccuracy=False, futureRequirement=marketPredictionSizeReq)

        elif plant == "Brinjal":
            logger.log(True, "Requested for forecast from RNN market price (Brinjal) prediction model")
            return RNN.predict("RNN_Brinjal", "Brinjal", defaultRatio=False, getAccuracy=False,
                               futureRequirement=marketPredictionSizeReq)

        elif plant == "Cucumber":
            logger.log(True, "Requested for forecast from RNN market price (Cucumber) prediction model")
            return RNN.predict("RNN_Cucumber", "Cucumber", defaultRatio=False, getAccuracy=False,
                               futureRequirement=marketPredictionSizeReq)

        elif plant == "LadiesFinger":
            logger.log(True, "Requested for forecast from RNN market price (LadiesFinger) prediction model")
            return RNN.predict("RNN_LadiesFinger", "LadiesFinger", defaultRatio=False,
                               getAccuracy=False, futureRequirement=marketPredictionSizeReq)

        elif plant == "RedPumpkin":
            logger.log(True, "Requested for forecast from RNN market price (RedPumpkin) prediction model")
            return RNN.predict("RNN_RedPumpkin", "RedPumpkin", defaultRatio=False,
                               getAccuracy=False, futureRequirement=marketPredictionSizeReq)

        else:
            logger.log(True, "Invalid plant name entered")
            return "Please enter valid plant name and try again!"

    return "Entered parameters are not correct. Please check them and try again."


@app.route("/log")
def getLog():
    try:
        logger.log(True, "Requested for log report")
        return send_file('Log/Log.txt', attachment_filename='Log File.txt')
    except Exception as e:
        return str(e)


@app.route("/log/json")
def getJsonLog():
    return str(logger.getLogInJSON())


@app.route("/log/clear")
def cleanLog():
    try:
        logger.cleanLog()
        logger.log(True, "File cleared successfully with web request")
        return send_file('Log/Log.txt', attachment_filename='Log File.txt')
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
