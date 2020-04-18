import pmdarima as pm
import sys
from Models.Components import CustomLogger as logger
from Models.Components import AccurancyCalculator
from Models.Components import FileDownloader

def predict(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True):
    try:
        if getAccuracy:
            print("Client requested for ARIMA accuracy")
            logger.log("Client requested for ARIMA accuracy")
        else:
            print("Client requested for ARIMA Forecast")
            logger.log("Client requested for ARIMA Forecast")

        series = FileDownloader.getFileData(datasetType)
        logger.log("Dataset retrieved successfully")

        logger.log("Splitting dataset into training and testing")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * 0.2))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        dataset, validation = series[0:split_point], series[split_point:]

        validationDatasetSize = len(validation)

        if not getAccuracy:
            validationDatasetSize = sizeOfTrainingDataSet

        # Seasonal - fit stepwise auto-ARIMA
        bestFitSarimaModel = pm.auto_arima(dataset,                 # Providing data set to the model.
                                           start_p=1,               # Starting of the moving average (MA) p.
                                           start_q=1,               # Starting of the moving average (MA) q.
                                           test='adf',              # Testing type is set in here.
                                           max_p=3, max_q=3,        # Max size of p and q.
                                           m=7,                     # Period of each section. 7 means daily.
                                           start_P=0,               # It's Auto-Regression potion of seasonal model.
                                           seasonal=True,           # Set to sarima model.
                                           d=None,                  # The order of first differing the model.
                                           D=1,                     # The order of seasonal differencing value.
                                           trace=True,              # Print status on the fits.
                                           error_action='ignore',   # If unable to fit to model remove the warning message and lines.
                                           suppress_warnings=True,  # Warning might be
                                           stepwise=True            # This will help to find the optimum model properly.
                                          )

        print(bestFitSarimaModel.summary())

        # Forecast
        fitted = bestFitSarimaModel.predict(n_periods=validationDatasetSize)  # Number of predicting days for future.

        validationData = validation.values

        if (getAccuracy):
            accuracy = AccurancyCalculator.calculate(validationData, fitted, arrayType="sarima")
            logger.log("Accuracy Percentage : " + str(accuracy))
            return str(accuracy)
        else:
            jsonArray = AccurancyCalculator.jsonConverter(fitted, arrayType="sarima")
            logger.log("JSON Array is : " + str(jsonArray))
            return str(jsonArray)
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(exceptionDetails, "ERROR")
        return "Error occurred in the source code"

predict("SARIMA","arima-model-temperature-dataset",getAccuracy=False,sizeOfTrainingDataSet=90)