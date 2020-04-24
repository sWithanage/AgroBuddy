import json
import urllib.request


def getForecast(variable):
    with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/forecast/" + str(variable)) as url:
        data = json.loads(url.read().decode())
        modelSelected = data["model"]
        temporaryList = []
        for x in data[modelSelected]:
            temporaryList.append(x["value"])
        return temporaryList


print("temperature ", getForecast("temperature"))
print("rainfall ", getForecast("rainfall"))
print("ashPlantainMPrice ", getForecast("ashPlantainMPrice"))
print("brinjalMPrice ", getForecast("brinjalMPrice"))
print("cucumberMPrice ", getForecast("cucumberMPrice"))
print("ladiesFingersMPrice ", getForecast("ladiesFingersMPrice"))
print("redPumpkinMPrice ", getForecast("redPumpkinMPrice"))
