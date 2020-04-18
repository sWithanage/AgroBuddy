# VAR example
from statsmodels.tsa.vector_ar.var_model import VAR
from random import random
import pandas as pd
from Models.Components import AccurancyCalculator
from Models.Components import CustomLogger as logger
from Models.Components import FileDownloader


def predict(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True):
    if getAccuracy:
        print("Client requested for VAR accuracy")
        logger.log("Client requested for VAR accuracy")
    else:
        print("Client requested for VAR Forecast")
        logger.log("Client requested for VAR Forecast")

    if datasetType == "arima-model-temperature-dataset" or datasetType == "arima-model-precipitation-dataset":
        series = FileDownloader.getFileData("rnn")
        logger.log("Dataset retrieved successfully")
    else:
        series = FileDownloader.getFileData("market")
        logger.log("Dataset retrieved successfully")

    if defaultRatio:
        split_point = int(len(series) - (len(series) * 0.2))
    elif not getAccuracy:
        split_point = int(len(series))
    else:
        split_point = len(series) - sizeOfTrainingDataSet

    if datasetType == "arima-model-temperature-dataset":
        features_considered = ['T (degC)', 'minHumidity']
    elif datasetType == "arima-model-precipitation-dataset":
        features_considered = ['rainFall', 'rainFall']
    elif datasetType == "AshPlantain":
        features_considered = ['AshPlantain', 'AshPlantain']
    elif datasetType == "Brinjal":
        features_considered = ['Brinjal', 'Brinjal']
    elif datasetType == "Cucumber":
        features_considered = ['Cucumber', 'Cucumber']
    elif datasetType == "LadiesFinger":
        features_considered = ['LadiesFinger', 'LadiesFinger']
    elif datasetType == "RedPumpkin":
        features_considered = ['RedPumpkin', 'RedPumpkin']

    features = series[features_considered]
    dataset = features.values

    dataset, validation = dataset[0:split_point], dataset[split_point:]

    validationDatasetSize = len(validation)

    if not getAccuracy:
        validationDatasetSize = sizeOfTrainingDataSet

    print(dataset)

    # fit model
    model = VAR(dataset)
    model_fit = model.fit()

    # make prediction
    forecastResult = model_fit.forecast(model_fit.y, steps=validationDatasetSize)

    if getAccuracy:
        accuracy = AccurancyCalculator.calculate(validation, forecastResult, "var")
        logger.log("Accuracy Percentage : " + str(accuracy))
        return str(accuracy)
    else:
        jsonArray = AccurancyCalculator.jsonConverter(forecastResult, "var")
        logger.log("JSON Array is : " + str(jsonArray))
        return str(jsonArray)

# Get Accuracy for 90 days.
# predict("VAR", "rnn", defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)
# predict("VAR", "AshPlantain", defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90, downloadFile="market")

# Get Prediction Data for 90 days.
# print(predict("VAR", "rnn", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90))
# predict("VAR", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90, downloadFile="market")

# print(predict("VAR", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90))
