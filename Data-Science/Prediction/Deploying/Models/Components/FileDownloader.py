import os
import tensorflow as tf
from pandas import read_csv
from Models.Components import CustomLogger as logger


def getFileData(datasetType):
    downloadingFilePath = "https://agrobuddy.tk/getData?type=" + datasetType
    logger.log("Downloading data set file from : " + str(downloadingFilePath))

    # Download relevant dataset from the server.
    downloadedFilePath = tf.keras.utils.get_file(
        origin = downloadingFilePath,
        fname=datasetType + '.csv',
        extract=False)

    # Get csv data into memory.
    series = read_csv(downloadedFilePath, header=0, index_col=0)

    # Removing downloaded and converted file from the storage.
    os.remove(downloadedFilePath)

    return series
