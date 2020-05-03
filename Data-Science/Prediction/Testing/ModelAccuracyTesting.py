# =====================================================
# Title                 :   Unit Testing
# Author                :   Sasanka Withanage
# Last modified Date    :   03 May 2020
# =====================================================

import unittest
import AppController as app


class TestStringMethods(unittest.TestCase):

    # -------------------------------------------------------------------------
    # Testing AR models.
    # -------------------------------------------------------------------------
    def test_AR_Temperature(self):
        self.assertGreaterEqual(float(app.AR.predict("Temperature", "temp", logOnTelegram=False)), 70)

    def test_AR_AshPlantain(self):
        self.assertGreaterEqual(float(app.AR.predict("AshPlantain-AR", "AshPlantain", logOnTelegram=False)), 70)

    def test_AR_Brinjal(self):
        self.assertGreaterEqual(float(app.AR.predict("Brinjal-AR", "Brinjal", logOnTelegram=False)), 70)

    def test_AR_Cucumber(self):
        self.assertGreaterEqual(float(app.AR.predict("Cucumber-AR", "Cucumber", logOnTelegram=False)), 70)

    def test_AR_LadiesFinger(self):
        self.assertGreaterEqual(float(app.AR.predict("LadiesFinger-AR", "LadiesFinger", logOnTelegram=False)), 70)

    def test_AR_RedPumpkin(self):
        self.assertGreaterEqual(float(app.AR.predict("RedPumpkin-AR", "RedPumpkin", logOnTelegram=False)), 70)

    # -------------------------------------------------------------------------
    # Testing ARIMA models.
    # -------------------------------------------------------------------------
    def test_ARIMA_Temperature(self):
        self.assertGreaterEqual(float(app.ARIMA.predict("Temperature", "temp", logOnTelegram=False)), 70)

    def test_ARIMA_AshPlantain(self):
        self.assertGreaterEqual(float(app.ARIMA.predict("AshPlantain-ARIMA", "AshPlantain", 2, logOnTelegram=False)), 70)

    def test_ARIMA_Brinjal(self):
        self.assertGreaterEqual(float(app.ARIMA.predict("Brinjal-ARIMA", "Brinjal", 2, logOnTelegram=False)), 70)

    def test_ARIMA_Cucumber(self):
        self.assertGreaterEqual(float(app.ARIMA.predict("Cucumber-ARIMA", "Cucumber", 2, logOnTelegram=False)), 70)

    def test_ARIMA_LadiesFinger(self):
        self.assertGreaterEqual(float(app.ARIMA.predict("LadiesFinger-ARIMA", "LadiesFinger", 2, logOnTelegram=False)), 70)

    def test_ARIMA_RedPumpkin(self):
        self.assertGreaterEqual(float(app.ARIMA.predict("RedPumpkin-ARIMA", "RedPumpkin", 2, logOnTelegram=False)), 70)

    # -------------------------------------------------------------------------
    # Testing ARMA models.
    # -------------------------------------------------------------------------
    def test_ARMA_Temperature(self):
        self.assertGreaterEqual(float(app.ARMA.predict("Temperature", "temp", logOnTelegram=False)), 70)

    def test_ARMA_AshPlantain(self):
        self.assertGreaterEqual(float(app.ARMA.predict("AshPlantain-ARMA", "AshPlantain", 2, logOnTelegram=False)), 70)

    def test_ARMA_Brinjal(self):
        self.assertGreaterEqual(float(app.ARMA.predict("Brinjal-ARMA", "Brinjal", 2, logOnTelegram=False)), 70)

    def test_ARMA_Cucumber(self):
        self.assertGreaterEqual(float(app.ARMA.predict("Cucumber-ARMA", "Cucumber", 2, logOnTelegram=False)), 70)

    def test_ARMA_LadiesFinger(self):
        self.assertGreaterEqual(float(app.ARMA.predict("LadiesFinger-ARMA", "LadiesFinger", 2, logOnTelegram=False)), 70)

    def test_ARMA_RedPumpkin(self):
        self.assertGreaterEqual(float(app.ARMA.predict("RedPumpkin-ARMA", "RedPumpkin", 2, logOnTelegram=False)), 70)

    # -------------------------------------------------------------------------
    # Testing AUTO ARIMA models.
    # -------------------------------------------------------------------------
    def test_Auto_ARIMA_Temperature(self):
        self.assertGreaterEqual(float(app.Auto_ARIMA.predict("Temperature", "temp", logOnTelegram=False)), 70)

    def test_Auto_ARIMA_AshPlantain(self):
        self.assertGreaterEqual(float(app.Auto_ARIMA.predict("AshPlantain-Auto_ARIMA", "AshPlantain", 2, logOnTelegram=False)), 70)

    def test_Auto_ARIMA_Brinjal(self):
        self.assertGreaterEqual(float(app.Auto_ARIMA.predict("Brinjal-Auto_ARIMA", "Brinjal", 2, logOnTelegram=False)), 70)

    def test_Auto_ARIMA_Cucumber(self):
        self.assertGreaterEqual(float(app.Auto_ARIMA.predict("Cucumber-Auto_ARIMA", "Cucumber", 2, logOnTelegram=False)), 70)

    def test_Auto_ARIMA_LadiesFinger(self):
        self.assertGreaterEqual(float(app.Auto_ARIMA.predict("LadiesFinger-Auto_ARIMA", "LadiesFinger", 2, logOnTelegram=False)), 70)

    def test_Auto_ARIMA_RedPumpkin(self):
        self.assertGreaterEqual(float(app.Auto_ARIMA.predict("RedPumpkin-Auto_ARIMA", "RedPumpkin", 2, logOnTelegram=False)), 70)

    # -------------------------------------------------------------------------
    # Testing RNN models.
    # -------------------------------------------------------------------------
    def test_RNN_Temperature(self):
        self.assertGreaterEqual(float(
            app.RNN.predict("Temperature", "temp", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True, logOnTelegram=False)), 70)

    def test_RNN_AshPlantain(self):
        self.assertGreaterEqual(float(
            app.RNN.predict("AshPlantain-Auto_ARIMA", "AshPlantain", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True, logOnTelegram=False)), 70)

    def test_RNN_Brinjal(self):
        self.assertGreaterEqual(float(
            app.RNN.predict("Brinjal-Auto_ARIMA", "Brinjal", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True, logOnTelegram=False)), 70)

    def test_RNN_Cucumber(self):
        self.assertGreaterEqual(float(
            app.RNN.predict("Cucumber-Auto_ARIMA", "Cucumber", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True, logOnTelegram=False)), 70)

    def test_RNN_LadiesFinger(self):
        self.assertGreaterEqual(float(
            app.RNN.predict("LadiesFinger-Auto_ARIMA", "LadiesFinger", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True, logOnTelegram=False)), 70)

    def test_RNN_RedPumpkin(self):
        self.assertGreaterEqual(float(
            app.RNN.predict("RedPumpkin-Auto_ARIMA", "RedPumpkin", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True, logOnTelegram=False)), 70)

    # -------------------------------------------------------------------------
    # Testing VAR models.
    # -------------------------------------------------------------------------
    def test_VAR_Temperature(self):
        self.assertGreaterEqual(float(app.VAR.predict("Temperature", "temp", logOnTelegram=False)), 70)

    def test_VAR_AshPlantain(self):
        self.assertGreaterEqual(float(app.VAR.predict("AshPlantain-VAR", "AshPlantain", logOnTelegram=False)), 70)

    def test_VAR_Brinjal(self):
        self.assertGreaterEqual(float(app.VAR.predict("Brinjal-VAR", "Brinjal", logOnTelegram=False)), 70)

    def test_VAR_Cucumber(self):
        self.assertGreaterEqual(float(app.VAR.predict("Cucumber-VAR", "Cucumber", logOnTelegram=False)), 70)

    def test_VAR_LadiesFinger(self):
        self.assertGreaterEqual(float(app.VAR.predict("LadiesFinger-VAR", "LadiesFinger", logOnTelegram=False)), 70)

    def test_VAR_RedPumpkin(self):
        self.assertGreaterEqual(float(app.VAR.predict("RedPumpkin-VAR", "RedPumpkin", logOnTelegram=False)), 70)

    # -------------------------------------------------------------------------
    # Testing SARIMA models.
    # -------------------------------------------------------------------------
    def test_SARIMA_Temperature(self):
        self.assertGreaterEqual(float(app.SARIMA.predict("Temperature", "temp", logOnTelegram=False)), 70)

    def test_SARIMA_AshPlantain(self):
        self.assertGreaterEqual(float(app.SARIMA.predict("AshPlantain-SARIMA", "AshPlantain", logOnTelegram=False)), 70)

    def test_SARIMA_Cucumber(self):
        self.assertGreaterEqual(float(app.SARIMA.predict("Cucumber-SARIMA", "Cucumber", logOnTelegram=False)), 70)

    def test_SARIMA_LadiesFinger(self):
        self.assertGreaterEqual(float(app.SARIMA.predict("LadiesFinger-SARIMA", "LadiesFinger", logOnTelegram=False)), 70)

    # Both prediction in bellow does not have a better accuracy.
    def test_SARIMA_RedPumpkin(self):
        self.assertGreaterEqual(float(app.SARIMA.predict("RedPumpkin-SARIMA", "RedPumpkin", logOnTelegram=False)), 70)

    def test_SARIMA_Brinjal(self):
        self.assertGreaterEqual(float(app.SARIMA.predict("Brinjal-SARIMA", "Brinjal", logOnTelegram=False)), 70)


# Testing class main method.
if __name__ == '__main__':
    unittest.main()

