import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import joblib

# Cargar el dataset desde un archivo CSV
df = pd.read_csv('dataset.csv')

# Calcular la deserción basado en las condiciones que mencionaste:
# - Más de 3 cursos con nota menor a 13
# - Asistencia menor a 14
# - Conducta menor a 13

# Primero, calculamos cuántos cursos tiene el alumno con nota menor a 13
df['cursos_bajo_13'] = (df[['Matematica', 'Comunicacion', 'Ciencias_Sociales', 'CTA', 'Ingles']] < 13).sum(axis=1)

# Ahora, creamos una nueva columna 'desercion' basada en las reglas:
df['desercion'] = ((df['cursos_bajo_13'] > 3) & (df['Asistencia'] < 14) | (df['Conducta'] < 13)).astype(int)

# Separar las características (X) y la etiqueta (y)
X = df[['Edad', 'Grado', 'Conducta', 'Asistencia', 'Matematica', 'Comunicacion', 'Ciencias_Sociales', 'CTA', 'Ingles']]  # Variables predictoras
y = df['desercion']  # Etiqueta de deserción calculada

# Dividir el dataset en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear el modelo de Árbol de Decisión
modelo = DecisionTreeClassifier(random_state=42)

# Entrenar el modelo
modelo.fit(X_train, y_train)

# Hacer predicciones en el conjunto de prueba
y_pred = modelo.predict(X_test)

# Evaluar la precisión del modelo
accuracy = accuracy_score(y_test, y_pred)
print(f"Precisión del modelo: {accuracy * 100:.2f}%")

# Guardar el modelo entrenado en un archivo .pkl
joblib.dump(modelo, 'modelo_entrenado.pkl')
