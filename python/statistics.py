import matplotlib.pyplot as plt
from datetime import datetime
import matplotlib as mpl
import pandas as pd
import numpy as np
import warnings
import json
import os

warnings.filterwarnings("ignore")

# Obtener la fecha de hoy en formato día-mes-año
today = datetime.today().strftime('%d-%m-%Y')
routeData = f'../back/data/{today}/statistics.json'  # Ruta del archivo de estadísticas

# Verificar si el archivo de estadísticas existe
if os.path.exists(routeData):
    with open(routeData) as file:
        dataToday = json.load(file)
else:
    print('No data available:', today)
    exit()

# Cargar las preguntas desde el archivo JSON correspondiente
Data = []
with open('../back/data/questions.json') as file:
    dataQuestions = json.load(file)

# Procesar los datos para calcular el porcentaje de respuestas correctas
for question in dataToday["questionsStatistics"]:
    percentageCorrect = round((question["correctAnswers"] / question["attempts"]) * 100, 2)
    for data in dataQuestions["questions"]:
        if data["id"] == question['id']:
            Data.append({
                "question": data["question"],
                "percentageCorrect": percentageCorrect
            })

# Crear un DataFrame con los datos procesados
df = pd.DataFrame(Data)
df.set_index('question', inplace=True)

# Configurar la figura y generar la gráfica
plt.figure(figsize=(10, 6))
df['percentageCorrect'].sort_values().plot(kind='barh', color='skyblue')
plt.xlabel('Percentage Correct')
plt.ylabel('Questions')
plt.title('Percentage Correct by Question')
plt.xticks(rotation=45, ha='right')

plt.tight_layout()
plt.subplots_adjust(bottom=0.3)

# Crear la ruta para guardar la imagen
output_dir = f'../back/data/{today}/'
os.makedirs(output_dir, exist_ok=True)  # Crear el directorio si no existe
image_path = os.path.join(output_dir, 'question_statistics.png')

# Eliminar la imagen anterior si existe
if os.path.exists(image_path):
    os.remove(image_path)
    print(f'Previous image deleted: {image_path}')

# Guardar la nueva imagen
plt.savefig(image_path)
plt.close()  # Cerrar la figura para liberar memoria

print(f'Image saved at: {image_path}')