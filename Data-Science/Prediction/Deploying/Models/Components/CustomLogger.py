from datetime import datetime

import requests
import os.path
from pytz import timezone

dateFormat = "%Y-%m-%d %H:%M:%S"
currentTimeInUTC = datetime.now(timezone('UTC'))
currentTimeInAsia = currentTimeInUTC.astimezone(timezone('Asia/Colombo'))
dateAndTime = currentTimeInAsia.strftime(dateFormat)



baseDirectoryPath = os.path.dirname(os.path.abspath(__file__))
customLogFilePath = os.path.join(baseDirectoryPath, "../../Log/Log.txt")


def log(message, type="info"):
    logFile = open(customLogFilePath, "a")
    customMessageLine = "\n[", type, "] ", str(dateAndTime), " | ", str(message), "."
    customMessageForTelegram = "[" + str(type) + "] " + str(dateAndTime) + " | " + str(message) + "."
    logFile.writelines(customMessageLine)
    messageToTelegram(customMessageForTelegram)
    logFile.close()


def getContent():
    logFile = open(customLogFilePath, "r")
    contentInLogFile = logFile.read()
    logFile.close()
    return contentInLogFile


def cleanLog():
    open(customLogFilePath, "w").close()


def messageToTelegram(message):
    print("Telegram message sent.")
    # url = "https://api.telegram.org/bot1186123737:AAE9w3B9xin6WoxTkFwARF-ZedAG_cokRO8/sendMessage?chat_id=703976962&text=" + str(message)
    # requests.post(url)
