# =====================================================
# Title                 :   Retrieve data from server
# Author                :   Sasanka Withanage
# Last modified Date    :   03 May 2020
# =====================================================
import json
import urllib
from datetime import datetime
import pandas as pd
from Models.Components import CustomLogger as logger


# -------------------------------------------------------------------------
# Download csv file from the server.
# -------------------------------------------------------------------------
def getFileData(variable, varModel=False, logOnTelegram=True):
    # Initialize attempt counting variable.
    attemptCount = 1

    # Try for 10 times until data downloaded.
    while attemptCount != 11:
        try:
            # Log the data receiving details.
            logger.log(logOnTelegram, 'Attempt number ' + str(attemptCount) + 'of data retrieving deployed')

            # Retrieve data from allocated url.
            with urllib.request.urlopen(
                    "https://agrobuddybackend.nn.r.appspot.com/trainingdata/" + str(variable)) as url:
                data = json.loads(url.read().decode())

                # Initializing temporary data array.
                dataArray = []
                dateArray = []

                # Loop all retrieved data and add into temporary array.
                for dataElement in data:
                    if variable == 'temp' or variable == 'precipitation':
                        dateObject = datetime.strptime(dataElement['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
                    else:
                        dateObject = datetime.strptime(dataElement['date'], '%Y-%W')

                    temporaryDateObject = str(dateObject.date())
                    dataArray.append(float(dataElement['value']))
                    dateArray.append(temporaryDateObject)

                # Check whether var model or not. If var model change the data frame structure.
                if varModel:
                    dataFrame = pd.DataFrame(data={'column1': dataArray, 'column2': dataArray}, index=dateArray)
                else:
                    dataFrame = pd.DataFrame(data=dataArray, index=dateArray)

                # Return the data frame structure.
                return dataFrame
        except:

            # Log the error message with attempt count.
            logger.log(logOnTelegram, str(
                attemptCount) + ' Attempt Failed. Url is : https://agrobuddybackend.nn.r.appspot.com/trainingdata/' + str(
                variable))
            attemptCount = attemptCount + 1
