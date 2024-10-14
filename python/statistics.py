import matplotlib.pyplot as plt
from datetime import datetime
import matplotlib as mpl
import pandas as pd
import numpy as np
import warnings
import json
import os

warnings.filterwarnings("ignore")

today = datetime.today().strftime('%d-%m-%Y')
routeData = '../back/data/'+today+'/statistics.json'

if os.path.exists(routeData):
    with open(routeData) as file:
        dataToday = json.load(file)
        file.close()
else:
    print('No data available: ', today)
    exit()

# Data
Data = []
with open('../back/data/questions.json') as file:
    dataQuestions = json.load(file)
    file.close()

for question in dataToday["questionsStatistics"]:
    percentageCorrect = round((question["correctAnswers"] / question["attempts"]) * 100, 2)
    for data in dataQuestions["questions"]:
        if data["id"] == question['id']:
            Data.append({
                "question": data["question"],
                "percentageCorrect": percentageCorrect
            })

df = pd.DataFrame(Data)
df.set_index('question', inplace=True)

plt.figure(figsize=(10, 6))
df['percentageCorrect'].sort_values().plot(kind='barh', color='skyblue')
plt.xlabel('Questions')
plt.ylabel('Percentage Correct')
plt.title('Percentage Correct by Question')
plt.xticks(rotation=45, ha='right')

plt.tight_layout()
plt.subplots_adjust(bottom=0.3)

plt.show()