# =====================================================
# Title                 :   Custom logging component
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================
import json
import sys
import os.path
import requests
from pytz import timezone
from datetime import datetime

# Get asia time and format it.
dateFormat = "%Y-%m-%d %H:%M:%S"
currentTimeInUTC = datetime.now(timezone('UTC'))
currentTimeInAsia = currentTimeInUTC.astimezone(timezone('Asia/Colombo'))
dateAndTime = currentTimeInAsia.strftime(dateFormat)

# Create path for log file.
baseDirectoryPath = os.path.dirname(os.path.abspath(__file__))
customLogFilePath = os.path.join(baseDirectoryPath, "../../Log/Log.txt")


# -------------------------------------------------------------------------
# Print log message with proper format.
# -------------------------------------------------------------------------
def log(logOnTelegram, message, logErrorType="info"):
    logFile = open(customLogFilePath, "a")
    customMessageLine = "\n[", logErrorType, "] ", str(dateAndTime), " | ", str(message), "."
    customMessageForTelegram = "[" + str(logErrorType) + "] " + str(dateAndTime) + " | " + str(message) + "."
    logFile.writelines(customMessageLine)
    if logOnTelegram:
        messageToTelegram(customMessageForTelegram)
    logFile.close()


# -------------------------------------------------------------------------
# Return whole content in the log file.
# -------------------------------------------------------------------------
def getContent():
    logFile = open(customLogFilePath, "r")
    contentInLogFile = logFile.read()
    logFile.close()
    return contentInLogFile


# -------------------------------------------------------------------------
# Read by log file and put to json file.
# -------------------------------------------------------------------------
def getLogInJSON():
    testsite_array = []
    with open(customLogFilePath) as my_file:
        for line in my_file:
            testsite_array.append(line)

    row_json = json.dumps(testsite_array)
    return row_json

# -------------------------------------------------------------------------
# Clear the whole content of the log file.
# -------------------------------------------------------------------------
def cleanLog():
    open(customLogFilePath, "w").close()


# -------------------------------------------------------------------------
# Send message to telegram.
# -------------------------------------------------------------------------
def messageToTelegram(message):
    print("Telegram Message sent : ", message)
    url = "https://api.telegram.org/bot1186123737:AAE9w3B9xin6WoxTkFwARF-ZedAG_cokRO8/sendMessage?chat_id=703976962&text=" + str(
        message)
    requests.post(url)


# -------------------------------------------------------------------------
# Displaying progress bar with percentages.
# -------------------------------------------------------------------------
def progressBar(current, totalCount=100, message="Loading", nextLine=False):
    percentageDivideValue = current / totalCount
    percentage = int(percentageDivideValue * 100)

    if (percentage + percentageDivideValue) > 100:
        percentage = 100

    if nextLine or current == 0:
        sys.stdout.write(("\r\n" + message + " : |%s%s|(%d%s)" % (
            (percentage * "█"), ((100 - percentage) * "-"), percentage, "%") + " "))
    else:
        sys.stdout.write(("\r" + message + " : |%s%s|(%d%s)" % (
            (percentage * "█"), ((100 - percentage) * "-"), percentage, "%") + " "))
    sys.stdout.flush()
