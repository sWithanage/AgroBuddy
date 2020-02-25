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


# It will create graphs. 8 mean 8 inches. and 6 means 6 inches.
mpl.rcParams['figure.figsize'] = (8, 6)

# It will hide the grid lines in diagrams.
mpl.rcParams['axes.grid'] = False


# Downloading file from the dedicated link & extracting in allocated location.
zip_path = tf.keras.utils.get_file(
    origin='https://agrobuddy.tk/DataSet/weatherdata.csv.zip',
    fname='weatherdata.csv.zip',
    extract=True)

print("Zip File Downloaded Location : "+zip_path)

# split the path name into a pair root and ext.
csv_path, _ = os.path.splitext(zip_path)

# Read CSV file using pandas library.
df = pd.read_csv(csv_path)
df.head()

# Check weather data correctly imported or not.
print(df.head())

# One variable is varying overtime.
# History size is the size of the past window of data.
# Target size : How far we wanted to predict the weather.
def univariate_data(dataset, start_index, end_index, history_size, target_size):
    # Array to store data temporary.
    data = []
    labels = []

    # Getting starting index.
    start_index = start_index + history_size
    if end_index is None:
        end_index = len(dataset) - target_size

    for i in range(start_index, end_index):
        indices = range(i-history_size, i)
        # Reshape data from (history_size,) to (history_size, 1)
        data.append(np.reshape(dataset[indices], (history_size, 1)))
        labels.append(dataset[i+target_size])

    # Returning the arrays with values.
    return np.array(data), np.array(labels)

# Set value for training dataset. Number of rows defined in here.
TRAIN_SPLIT = 5000

# Make Tensor-flow output more stable. Ensuring reproducibility.
tf.random.set_seed(13)

# Reading from excel & setting values to array.
# Set values into the array.
uni_data = df['T (degC)']

# Set date into the index.
uni_data.index = df['Date Time']

# Displaying example data.
print("\nSuccessfully data added.\nExample :")
print(uni_data.head())
print("\n")

# Enabling plotting in graphs. (Increasing publication quality)
uni_data.plot(subplots=True)

# Get data values into an array.
uni_data = uni_data.values
print("Data values added into numpy array : " + str(uni_data))

# Calculating mean of the values of array.
uni_train_mean = uni_data[:TRAIN_SPLIT].mean()
print("Mean of the training data : " + str(uni_train_mean))

# Calculating standard deviation of array.
uni_train_std = uni_data[:TRAIN_SPLIT].std()
print("Standard deviation of the training data : " + str(uni_train_std))

# Standardize the dataset. This makes conform to a standard.
uni_data = (uni_data-uni_train_mean)/uni_train_std
print("Standardized data : " + str(uni_data))

# Set dataset size and the required prediction date.
univariate_past_history = 20
univariate_future_target = 0


# # Train model from last 20 recodes and predict temp for next time.
# x_train_uni, y_train_uni = univariate_data(uni_data, 0, TRAIN_SPLIT, univariate_past_history,univariate_future_target)
# x_val_uni, y_val_uni = univariate_data(uni_data, TRAIN_SPLIT, None,univariate_past_history, univariate_future_target)


# # Print model output.
# print ('Single window of past history')
# print (x_train_uni[0])
# print ('\n Target temperature to predict')
# print (y_train_uni[0])

# Create timing in the plot.
def create_time_steps(length):
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
      plt.plot(future, (plot_data[i]+uni_train_mean), marker[i], markersize=10,
               label=labels[i])
    else:
      plt.plot(time_steps, (plot_data[i].flatten()+uni_train_mean), marker[i], label=labels[i])
  plt.legend()
  plt.xlim([time_steps[0], (future+5)*2])
  plt.xlabel('Time-Step')
  return plt

# show_plot([x_train_uni[0], y_train_uni[0]], 0, 'Sample Example')

#
# def baseline(history):
#   return np.mean(history)

# show_plot([x_train_uni[0], y_train_uni[0], baseline(x_train_uni[0])], 0,'Baseline Prediction Example')

BATCH_SIZE = 256
BUFFER_SIZE = 10000
#
# train_univariate = tf.data.Dataset.from_tensor_slices((x_train_uni, y_train_uni))
# train_univariate = train_univariate.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE).repeat()
#
# val_univariate = tf.data.Dataset.from_tensor_slices((x_val_uni, y_val_uni))
# val_univariate = val_univariate.batch(BATCH_SIZE).repeat()
#
# simple_lstm_model = tf.keras.models.Sequential([
#     tf.keras.layers.LSTM(8, input_shape=x_train_uni.shape[-2:]),
#     tf.keras.layers.Dense(1)
# ])
#
# simple_lstm_model.compile(optimizer='adam', loss='mae')

# for x, y in val_univariate.take(1):
#     print(simple_lstm_model.predict(x).shape)

EVALUATION_INTERVAL = 200
EPOCHS = 10

# simple_lstm_model.fit(train_univariate, epochs=EPOCHS,
#                       steps_per_epoch=EVALUATION_INTERVAL,
#                       validation_data=val_univariate, validation_steps=50)

# for x, y in val_univariate.take(3):
#   plot = show_plot([x[0].numpy(), y[0].numpy(),
#                     simple_lstm_model.predict(x)[0]], 0, 'Simple LSTM model')
#   plot.show()




print("---------------------------------------------------------- Multivarate in processing ------------------------------------------------------")



# Multivarate prediction

features_considered = ['rainFall', 'cloudCover', 'T (degC)']

features = df[features_considered]
features.index = df['Date Time']
features.head()

features.plot(subplots=True)

dataset = features.values
data_mean = dataset[:TRAIN_SPLIT].mean(axis=0)
data_std = dataset[:TRAIN_SPLIT].std(axis=0)

dataset = (dataset-data_mean)/data_std

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

past_history = 720
future_target = 90
STEP = 6

x_train_single, y_train_single = multivariate_data(dataset, dataset[:, 1], 0,
                                                   TRAIN_SPLIT, past_history,
                                                   future_target, STEP,
                                                   single_step=True)
x_val_single, y_val_single = multivariate_data(dataset, dataset[:, 1],
                                               TRAIN_SPLIT, None, past_history,
                                               future_target, STEP,
                                               single_step=True)

print ('Single window of past history : {}'.format(x_train_single[0].shape))

train_data_single = tf.data.Dataset.from_tensor_slices((x_train_single, y_train_single))
train_data_single = train_data_single.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE).repeat()

val_data_single = tf.data.Dataset.from_tensor_slices((x_val_single, y_val_single))
val_data_single = val_data_single.batch(BATCH_SIZE).repeat()

single_step_model = tf.keras.models.Sequential()
single_step_model.add(tf.keras.layers.LSTM(32,
                                           input_shape=x_train_single.shape[-2:]))
single_step_model.add(tf.keras.layers.Dense(1))

single_step_model.compile(optimizer=tf.keras.optimizers.RMSprop(), loss='mae')

for x, y in val_data_single.take(1):
  print(single_step_model.predict(x).shape)

single_step_history = single_step_model.fit(train_data_single, epochs=EPOCHS,
                                            steps_per_epoch=EVALUATION_INTERVAL,
                                            validation_data=val_data_single,
                                            validation_steps=50)

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

plot_train_history(single_step_history,'Single Step Training and validation loss')

for x, y in val_data_single.take(3):
  plot = show_plot([x[0][:, 1].numpy(), y[0].numpy(),
                    single_step_model.predict(x)[0]], 12,
                   'Single Step Prediction')
  plot.show()


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

def multi_step_plot(history, true_future, prediction):
  plt.figure(figsize=(12, 6))
  num_in = create_time_steps(len(history))
  num_out = len(true_future)

  plt.plot(num_in, np.array(history[:, 1]), label='History')
  plt.plot(np.arange(num_out)/STEP, np.array(true_future), 'bo',
           label='True Future')
  if prediction.any():
    plt.plot(np.arange(num_out)/STEP, np.array(prediction), 'ro',
             label='Predicted Future')
  plt.legend(loc='upper left')
  plt.show()

for x, y in train_data_multi.take(1):
  multi_step_plot(x[0], y[0], np.array([0]))


multi_step_model = tf.keras.models.Sequential()
multi_step_model.add(tf.keras.layers.LSTM(32,
                                          return_sequences=True,
                                          input_shape=x_train_multi.shape[-2:]))
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