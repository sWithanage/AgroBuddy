# =====================================================
# Title                 :   AUTO_ARIMA Model
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================

import sys
import pmdarima as pm
from Models.Components import FileDownloader
from sklearn.metrics import mean_squared_error
from Models.Components import AccurancyCalculator
from Models.Components import CustomLogger as logger

validationDatasetSize = 0


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True):
    global validationDatasetSize
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log("Client requested for " + predictionName + " accuracy")
        else:
            logger.log("Client requested for " + predictionName + " forecast")

        # Import relevant file from the server.
        series = FileDownloader.getFileData(datasetType)
        logger.log("Dataset retrieved successfully")

        # Set splitting point of the dataset.
        logger.log("Finding splitting point")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * 0.2))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        # Splitting data set according to the splitting point.
        trainingDataSet, validationDataSet = series[0:split_point], series[split_point:]
        logger.log("Data Splitting successful")

        # Set length into variables.
        trainingDataSetSize = len(trainingDataSet)
        testingDataSetSize = len(validationDataSet)

        trainingDataSetSizeString = 'Training Data Set Size : ' + str(trainingDataSetSize)
        testingDataSetSizeString = 'Testing  Data Set Size : ' + str(testingDataSetSize)

        logger.log(trainingDataSetSizeString)
        logger.log(testingDataSetSizeString)

        # If user required for forecast, testing data size will set to future requirement.
        if not getAccuracy:
            validationDatasetSize = sizeOfTrainingDataSet
            logger.log("Testing data set is updated with new value. New value is " + str(testingDataSetSize))

        # Seasonal - fit stepwise auto-ARIMA
        bestFitSarimaModel = pm.auto_arima(trainingDataSet,  # Providing data set to the model.
                                           start_p=1,  # Starting of the moving average (MA) p.
                                           start_q=1,  # Starting of the moving average (MA) q.
                                           test='adf',  # Testing type is set in here.
                                           max_p=3, max_q=3,  # Max size of p and q.
                                           m=7,  # Period of each section. 7 means daily.
                                           start_P=0,  # It's Auto-Regression potion of seasonal model.
                                           seasonal=True,  # Set to sarima model.
                                           d=None,  # The order of first differing the model.
                                           D=1,  # The order of seasonal differencing value.
                                           trace=True,  # Print status on the fits.
                                           error_action='ignore',
                                           # If unable to fit to model remove the warning message and lines.
                                           suppress_warnings=True,  # Warning might be
                                           stepwise=True  # This will help to find the optimum model properly.
                                           )
        logger.log("Seasonal auto arima model initialized")

        # Log model summery details.
        logger.log(bestFitSarimaModel.summary())

        # Forecast
        forecastResult = bestFitSarimaModel.predict(
            n_periods=validationDatasetSize)  # Number of predicting days for future.

        # Log summery details.
        validationData = validationDataSet.values

        # Check for the user requirement whether accuracy or forecast details.
        if getAccuracy:

            # If rain fall return mean squared error.
            if datasetType == "precipitation":

                # Calculate mean squared error value.
                meanSquaredError = mean_squared_error(validationData, forecastResult, squared=False)

                # Log and return accuracy.
                logger.log("Mean squared error : " + str(meanSquaredError))
                return str(meanSquaredError)
            else:
                # Calculate accuracy with predicted and testing data.
                accuracy = AccurancyCalculator.calculate(validationData, forecastResult, arrayType="sarima")

                # Log and return accuracy.
                logger.log("Accuracy Percentage : " + str(accuracy))
                return str(accuracy)
        else:
            # Return json array after calculation.
            jsonArray = AccurancyCalculator.jsonConverter(forecastResult, arrayType="sarima")
            logger.log("JSON Array is : " + str(jsonArray))
            return str(jsonArray)
    except Exception:
        # Display proper error message with error and error line.
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(
            exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(exceptionDetails, "ERROR")
        return "Error occurred in the source code"


# Model Training callers with out Api

# --------------------------------------------------- Accuracy ---------------------------------------------------
# predict("Temperature", "temp")
# predict("Precipitation", "precipitation")
# predict("AshPlantain-Auto_arima", "AshPlantain", 2)
# predict("Brinjal-Auto_arima", "Brinjal", 2)
# predict("Cucumber-Auto_arima", "Cucumber", 2)
# predict("LadiesFinger-Auto_arima", "LadiesFinger", 2)
# predict("RedPumpkin-Auto_arima", "RedPumpkin", 2)

# ------------------------------------------------- Forecasting -------------------------------------------------
# predict("Temperature", "temp", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("AshPlantain-ARIMA", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("Brinjal-ARIMA", "Brinjal", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("Cucumber-ARIMA", "Cucumber", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("LadiesFinger-ARIMA", "LadiesFinger", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("RedPumpkin-ARIMA", "RedPumpkin", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
