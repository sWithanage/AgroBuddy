from __future__ import absolute_import, division, print_function, unicode_literals
import sys
import tensorflow as tf
import numpy as np
import pandas as pd
from Models.Components import AccurancyCalculator
from Models.Components import FileDownloader
from Models.Components import CustomLogger as logger


# physical_devices = tf.config.list_physical_devices('GPU')
# tf.config.experimental.set_memory_growth(physical_devices[0], enable=True)

def predict():
    try:
        # zip_path = tf.keras.utils.get_file(origin='https://agrobuddy.tk/getData?type=rnn', fname='weatherdataa.csv',
        #                                    extract=False)

        # print("Zip File Downloaded Location : " + zip_path)

        df = pd.read_csv("weatherdata.csv")
        df.head()

        # if os.path.exists(zip_path):
        #     os.remove(zip_path)
        #     print("Dataset file is deleted successfully. ")
        # else:
        #     print("Data set file is not found to delete.")

        # print(df.head())
        # print(6500 - (len(df.index)))

        tf.random.set_seed(13)

        def create_time_steps(length):
            return list(range(-length, 0))

        features_considered = ['rainFall', 'rainFall']

        features = df[features_considered]
        features.index = df['Date Time']
        features.head()

        features.plot(subplots=True)

        dataset = features.values

        # data_mean = dataset[:TRAIN_SPLIT].mean(axis=0)
        # data_std = dataset[:TRAIN_SPLIT].std(axis=0)
        # dataset = (dataset-data_mean)/data_std

        def multivariate_data(dataset, target, start_index, end_index, history_size,
                              target_size, step):
            data = []
            labels = []

            print(start_index)
            start_index = start_index + history_size
            if end_index is None:
                end_index = len(dataset) - target_size

            for i in range(start_index, end_index):
                indices = range(i - history_size, i, step)
                data.append(dataset[indices])
                labels.append(target[i:i + target_size])

            print(data)
            return np.array(data), np.array(labels)

        TRAIN_SPLIT = 6500
        past_history = 500
        future_target = 90
        STEP = 6
        BATCH_SIZE = 256  # divide dataset into Number of Batches or sets or parts
        BUFFER_SIZE = 10000
        EVALUATION_INTERVAL = 200
        EPOCHS = 10

        x_train_multi, y_train_multi = multivariate_data(dataset=dataset,
                                                         target=dataset[:, 1],
                                                         start_index=0,
                                                         end_index=TRAIN_SPLIT,
                                                         history_size=past_history,
                                                         target_size=future_target,
                                                         step=STEP)
        x_val_multi, y_val_multi = multivariate_data(dataset=dataset,
                                                     target=dataset[:, 1],
                                                     start_index=TRAIN_SPLIT,
                                                     end_index=None,
                                                     history_size=past_history,
                                                     target_size=future_target,
                                                     step=STEP)

        # print('Single window of past history : {}'.format(x_train_multi[0].shape))
        # print('\n Target temperature to predict : {}'.format(y_train_multi[0].shape))

        train_data_multi = tf.data.Dataset.from_tensor_slices((x_train_multi, y_train_multi))
        train_data_multi = train_data_multi.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE).repeat()

        val_data_multi = tf.data.Dataset.from_tensor_slices((x_val_multi, y_val_multi))
        val_data_multi = val_data_multi.batch(BATCH_SIZE).repeat()

        multi_step_model = tf.keras.models.Sequential()
        multi_step_model.add(tf.keras.layers.LSTM(32, return_sequences=True, input_shape=x_train_multi.shape[-2:]))
        multi_step_model.add(tf.keras.layers.LSTM(16, activation='relu'))
        multi_step_model.add(tf.keras.layers.Dense(90))

        multi_step_model.compile(optimizer=tf.keras.optimizers.RMSprop(clipvalue=1.0), loss='mae')

        # for x, y in val_data_multi.take(1):
        #     print(multi_step_model.predict(x).shape)

        multi_step_model.fit(train_data_multi, epochs=EPOCHS,
                             steps_per_epoch=EVALUATION_INTERVAL,
                             validation_data=val_data_multi,
                             validation_steps=50)

        # multi_step_model.save("model.h5")
        accuracy = 0

        logger.log(multi_step_model.summary())

        def multi_step_plot(history, true_future, prediction):
            if prediction.any():
                accuracy = AccurancyCalculator.calculate(true_future, prediction, "rnn")
                print("Average of prediction : " + str(accuracy))

        for x, y in val_data_multi.take(1):
            multi_step_plot(x[0], y[0], multi_step_model.predict(x)[0])

        return str(accuracy)
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(exceptionDetails,"ERROR")
        return "Error occurred in the source code"
predict()
