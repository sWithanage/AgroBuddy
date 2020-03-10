# Importing random libraries for prediction
from __future__ import absolute_import, division, print_function, unicode_literals

# Importing for fast numerical computing.
import tensorflow as tf

# Manage multi-dimensional arrays & matrices
import numpy as np

# Operating system dependent functionality.
import os

# Importing for the Python programming language for data manipulation and analysis.
import pandas as pd

# Matplotlib is a graph generating library.
import matplotlib as mpl
import matplotlib.pyplot as plt


import sklearn

# It will create graphs. 8 mean 8 inches. and 6 means 6 inches.
mpl.rcParams['figure.figsize'] = (8, 6)

# It will hide the grid lines in diagrams.
mpl.rcParams['axes.grid'] = False


# Downloading file from the dedicated link & extracting in allocated location.
zip_path = tf.keras.utils.get_file(
    origin='https://agrobuddy.tk/DataSet/marketprice.csv.zip',
    fname='marketprice.csv.zip',
    extract=True)

print("Zip File Downloaded Location : "+zip_path)

# split the path name into a pair root and ext.
csv_path, _ = os.path.splitext(zip_path)

# Read CSV file using pandas library.
df = pd.read_csv(csv_path)
df.head()

# Check weather data correctly imported or not.
print(df.head())

# Set value for training dataset. Number of rows defined in here.
TRAIN_SPLIT = 300

# Make Tensor-flow output more stable. Ensuring reproducibility.
tf.random.set_seed(13)

# Create timing in the plot.
def create_time_steps(length):
    print("Create Time Step Length : "+str(list(range(-length, 0))))
    return list(range(-length, 0))

# Create plot to display the data.
def show_plot(plot_data, delta, title):
  # Setting labels to plot.
  labels = ['History', 'True Future', 'Model Prediction']

  # Set marker type for each label.
  marker = ['.-', 'rx', 'go']

  # Create appropriate time slots.
  time_steps = create_time_steps(plot_data[0].shape[0])

  # Checking delta value.
  if delta:
    future = delta
  else:
    future = 0


  plt.title(title)
  for i, x in enumerate(plot_data):
    if i:
      plt.plot(future, plot_data[i], marker[i], markersize=10,
               label=labels[i])
    else:
      plt.plot(time_steps, plot_data[i].flatten(), marker[i], label=labels[i])
  plt.legend()
  plt.xlim([time_steps[0], (future+5)*2])
  plt.xlabel('Time-Step')
  return plt

BATCH_SIZE = 600
BUFFER_SIZE = 10000

EVALUATION_INTERVAL = 200
EPOCHS = 10


print("---------------------------------------------------------- Multivarate in processing ------------------------------------------------------")



# Multivarate prediction

features_considered = ['AshPlantain', 'AshPlantain']

features = df[features_considered]
features.index = df['Number']
features.head()

features.plot(subplots=True)

dataset = features.values
# data_mean = dataset[:TRAIN_SPLIT].mean(axis=0)
# data_std = dataset[:TRAIN_SPLIT].std(axis=0)
#
# dataset = (dataset-data_mean)/data_std

def multivariate_data(dataset, target, start_index, end_index, history_size,
                      target_size, step, single_step=False):
  data = []
  labels = []

  start_index = start_index + history_size
  if end_index is None:
    end_index = len(dataset) - target_size

  for i in range(start_index, end_index):
    indices = range(i-history_size, i, step)
    data.append(dataset[indices])

    if single_step:
      labels.append(target[i+target_size])
    else:
      labels.append(target[i:i+target_size])

  return np.array(data), np.array(labels)

past_history = 50
future_target = 10
STEP = 1

# x_train_single, y_train_single = multivariate_data(dataset, dataset[:, 1], 0,
#                                                    TRAIN_SPLIT, past_history,
#                                                    future_target, STEP,
#                                                    single_step=True)
# x_val_single, y_val_single = multivariate_data(dataset, dataset[:, 1],
#                                                TRAIN_SPLIT, None, past_history,
#                                                future_target, STEP,
#                                                single_step=True)

# print ('Single window of past history : {}'.format(x_train_single[0].shape))
#
# train_data_single = tf.data.Dataset.from_tensor_slices((x_train_single, y_train_single))
# train_data_single = train_data_single.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE).repeat()
#
# val_data_single = tf.data.Dataset.from_tensor_slices((x_val_single, y_val_single))
# val_data_single = val_data_single.batch(BATCH_SIZE).repeat()
#
# single_step_model = tf.keras.models.Sequential()
# single_step_model.add(tf.keras.layers.LSTM(32,input_shape=x_train_single.shape[-2:]))
# single_step_model.add(tf.keras.layers.Dense(1))
#
# single_step_model.compile(optimizer=tf.keras.optimizers.RMSprop(), loss='mae')
#
# for x, y in val_data_single.take(1):
#   print(single_step_model.predict(x).shape)

# single_step_history = single_step_model.fit(train_data_single, epochs=EPOCHS,steps_per_epoch=EVALUATION_INTERVAL,validation_data=val_data_single,validation_steps=50)

def plot_train_history(history, title):
  loss = history.history['loss']
  val_loss = history.history['val_loss']

  epochs = range(len(loss))

  plt.figure()

  plt.plot(epochs, loss, 'b', label='Training loss')
  plt.plot(epochs, val_loss, 'r', label='Validation loss')
  plt.title(title)
  plt.legend()

  plt.show()

# plot_train_history(single_step_history,'Single Step Training and validation loss')
#
# for x, y in val_data_single.take(3):
#   plot = show_plot([x[0][:, 1].numpy(), y[0].numpy(),
#                     single_step_model.predict(x)[0]], 12,
#                    'Single Step Prediction')
#   plot.show()


# multi step model for the users.
future_target = 72
x_train_multi, y_train_multi = multivariate_data(dataset, dataset[:, 1], 0,
                                                 TRAIN_SPLIT, past_history,
                                                 future_target, STEP)
x_val_multi, y_val_multi = multivariate_data(dataset, dataset[:, 1],
                                             TRAIN_SPLIT, None, past_history,
                                             future_target, STEP)

print ('Single window of past history : {}'.format(x_train_multi[0].shape))
print ('\n Target temperature to predict : {}'.format(y_train_multi[0].shape))

train_data_multi = tf.data.Dataset.from_tensor_slices((x_train_multi, y_train_multi))
train_data_multi = train_data_multi.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE).repeat()

val_data_multi = tf.data.Dataset.from_tensor_slices((x_val_multi, y_val_multi))
val_data_multi = val_data_multi.batch(BATCH_SIZE).repeat()

accuracyArray =[]
def accuracyCalculator(true_future,prediction):
    print("Accuracy is calculating")
    for x in range(len(true_future)):
        difference = prediction[x]-true_future[x]
        if difference<0:
            difference = difference * -1;

        if true_future[x] != 0:
            accuracy = 100 - ((difference / true_future[x] ) * 100)
        else:
            accuracy = 100 - ((difference / 1) * 100)

        # if accuracy<0:
        #     accuracy = accuracy * -1

        accuracyArray.append(accuracy)
        print("Difference :"+str(difference)+" | True Future :"+str(true_future[x])+" | Predicted Future :"+str(prediction[x])+"Meka methana wada karnawa " + str(accuracy))


def multi_step_plot(history, true_future, prediction):

  plt.figure(figsize=(12, 6))
  num_in = create_time_steps(len(history))
  num_out = len(true_future)

  plt.plot(num_in, np.array(history[:, 1]), label='History')
  plt.plot(np.arange(num_out)/STEP, np.array(true_future), 'bo',
           label='True Future')
  if prediction.any():
    plt.plot(np.arange(num_out)/STEP, np.array(prediction), 'ro',label='Predicted Future')
    accuracyCalculator(true_future,prediction)
    print("Average of prediction : "+str(np.average(accuracyArray)))
    print("True Future : " + str(true_future) + " | Prediction Value :" + str(prediction))
  plt.legend(loc='upper left')
  plt.show()

for x, y in train_data_multi.take(1):
  multi_step_plot(x[0], y[0], np.array([0]))


multi_step_model = tf.keras.models.Sequential()
multi_step_model.add(tf.keras.layers.LSTM(32,return_sequences=True,input_shape=x_train_multi.shape[-2:]))
multi_step_model.add(tf.keras.layers.LSTM(16, activation='relu'))
multi_step_model.add(tf.keras.layers.Dense(72))

multi_step_model.compile(optimizer=tf.keras.optimizers.RMSprop(clipvalue=1.0), loss='mae')

for x, y in val_data_multi.take(1):
  print (multi_step_model.predict(x).shape)

multi_step_history = multi_step_model.fit(train_data_multi, epochs=EPOCHS,
                                          steps_per_epoch=EVALUATION_INTERVAL,
                                          validation_data=val_data_multi,
                                          validation_steps=50)
plot_train_history(multi_step_history, 'Multi-Step Training and validation loss')

for x, y in val_data_multi.take(3):
  multi_step_plot(x[0], y[0], multi_step_model.predict(x)[0])