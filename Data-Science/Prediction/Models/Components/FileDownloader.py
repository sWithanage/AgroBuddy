# =====================================================
# Title                 :   Download file from server
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================

import os
import tensorflow as tf
from pandas import read_csv
from Models.Components import CustomLogger as logger


# -------------------------------------------------------------------------
# Download csv file from the server.
# -------------------------------------------------------------------------
def getFileData(datasetType, filePathOnly=False, logOnTelegram=True):
    downloadingFilePath = "https://agrobuddy.tk/getData?type=" + datasetType
    logger.log(logOnTelegram, "Downloading data set file from : " + str(downloadingFilePath))

    # Download relevant dataset from the server.
    downloadedFilePath = tf.keras.utils.get_file(
        origin=downloadingFilePath,
        fname=datasetType + '.csv',
        extract=False)

    # Return only the file path.
    if filePathOnly:
        return downloadedFilePath

    # Get csv data into memory.
    series = read_csv(downloadedFilePath, header=0, index_col=0)

    # Removing downloaded and converted file from the storage.
    os.remove(downloadedFilePath)

    return series
