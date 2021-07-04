from collections import OrderedDict
import pandas as pd;
import json

#step 1: create a function which reads a csv and transforms into a dataframe
def readData():
  data = pd.read_csv("anonoymous_data.csv")
  return data

#step 2: create a new dataframe which counts the number of times each emotion appears
def countEmotions():
  dataFrame = readData()
  emotionCount = dataFrame['emotion'].value_counts()

  return emotionCount

#step 4: Export the new dataframe to a json file in the js_task folder to be used in part 2 - visualising

# Now need to add the emotionCount into the dataFrame
def insertCountIntoDf():
  df = readData()
  numOfEmotions = countEmotions()

  # Convert emotions count into a dictionary
  emotions_dict = numOfEmotions.to_dict(into=OrderedDict)

  # Drop unused/unwanted columns from dataframe
  df = df.drop(['log_id', 'user_id', 'Unnamed: 6', 'Unnamed: 7', 'Unnamed: 8'], 1)

  # Add the count of emotions to the dataframe
  df["log_count"] = df['emotion'].map(emotions_dict)

  return df

# Using the updated dataframe, export to json file
def exportDataToJson():
  updatedData = insertCountIntoDf()
  resultToJson = updatedData.to_json(orient = 'records')
  parseData = json.loads(resultToJson)

  with open('js_task/data/emotion_data.json', 'w') as output:
    json.dump(parseData, output, indent=4, sort_keys=True)
  
exportDataToJson()