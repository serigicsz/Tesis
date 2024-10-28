import sys
import json
import numpy as np
import joblib
from flask import Flask, request, jsonify
import pandas as pd

# Intentar cargar el modelo entrenado con manejo de errores
model_path = 'modelo_entrenado.pkl'
try:
    modelo = joblib.load(model_path)
    print("Modelo cargado correctamente.")
except FileNotFoundError:
    print(f"Error: No se encontró el archivo del modelo en la ruta '{model_path}'")
    sys.exit(1)
except Exception as e:
    print(f"Error al cargar el modelo: {e}")
    sys.exit(1)


def make_prediction(form_data):
    data_dict = {
        'Edad': form_data['edad'],
        'Grado': form_data['grado'],
        'Conducta': form_data['conducta'],
        'Asistencia': form_data['asistencia'],
        'Matematica': form_data['matematicas'],
        'Comunicacion': form_data['comunicacion'],
        'Ciencias_Sociales': form_data['ciencias_sociales'],
        'CTA': form_data['cta'],
        'Ingles': form_data['ingles']
    }

    # Convert the dictionary to a DataFrame
    df = pd.DataFrame([data_dict])

    # Ensure the DataFrame has the same feature names as the training data
    feature_names = ['Edad', 'Grado', 'Conducta', 'Asistencia', 'Matematica', 
                     'Comunicacion', 'Ciencias_Sociales', 'CTA', 'Ingles']
    X = df[feature_names]

    # Make the prediction using the trained model
    prediction = modelo.predict(X)[0]
    return bool(prediction)

app = Flask(__name__)

@app.route('/prediction', methods=['POST'])
def prediction():
    form_data = request.get_json()
    
    if not form_data:
        return jsonify({"error": "No se recibieron datos de entrada."}), 400
    
    print('making prediction with data:', form_data)
    try:
        response = make_prediction(form_data=form_data)
        return jsonify({"prediction": response}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": f"Error al realizar la predicción: {e}"}), 500


if __name__ == '__main__':
    app.run(port=3001)