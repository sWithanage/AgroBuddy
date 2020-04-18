import sys
import warnings
from statsmodels.tsa.ar_model import AR
from Models.Components import FileDownloader
from Models.Components import AccurancyCalculator
from Models.Components import CustomLogger as logger


def predict(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True):
    try:
        if getAccuracy:
            print("Client requested for AR accuracy")
            logger.log("Client requested for AR accuracy")
        else:
            print("Client requested for AR Forecast")
            logger.log("Client requested for AR Forecast")

        # Import relevant file from the server.
        series = FileDownloader.getFileData(datasetType)

        # split dataset
        importedDataValues = series.values

        logger.log("Splitting dataset into training and testing")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * 0.2))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet


        trainingDataSet, testingDataSet = importedDataValues[1:split_point], importedDataValues[split_point:]

        trainingDataSetSize = len(trainingDataSet)
        testingDataSetSize = len(testingDataSet)

        if not getAccuracy:
            testingDataSetSize = sizeOfTrainingDataSet

        # train auto-regression
        model = AR(trainingDataSet)
        model_fit = model.fit()

        print(model_fit.summary())

        # make predictions
        predictions = model_fit.predict(start=trainingDataSetSize, end=trainingDataSetSize + testingDataSetSize - 1,
                                        dynamic=True)

        if (getAccuracy):
            accuracy = AccurancyCalculator.calculate(testingDataSet, predictions,"ar")
            logger.log("Accuracy Percentage : " + str(accuracy))
            return str(accuracy)
        else:
            jsonArray = AccurancyCalculator.jsonConverter(predictions,"ar")
            logger.log("JSON Array is : " + str(jsonArray))
            return str(jsonArray)
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(exceptionDetails, "ERROR")
        return "Error occurred in the source code"


# predict("Temperature", "arima-model-temperature-dataset")
