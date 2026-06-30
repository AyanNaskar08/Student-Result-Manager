import json
import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
DATA_FILE = 'students.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return {}
    return {}

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(load_data())

@app.route('/add', methods=['POST'])
def add_student():
    data = request.json
    name = data.get('name')
    students = load_data()
    if not name:
        return jsonify({"error": "Name is required"}), 400
    if name in students:
        return jsonify({"error": "Student already exists"}), 400
    
    students[name] = {
        "math": data.get('math', 0),
        "physics": data.get('physics', 0),
        "chemistry": data.get('chemistry', 0)
    }
    save_data(students)
    return jsonify({"message": "Student added successfully"})

@app.route('/update', methods=['POST'])
def update_student():
    data = request.json
    name = data.get('name')
    students = load_data()
    if name not in students:
        return jsonify({"error": "Student not found"}), 404
    
    students[name] = {
        "math": data.get('math', 0),
        "physics": data.get('physics', 0),
        "chemistry": data.get('chemistry', 0)
    }
    save_data(students)
    return jsonify({"message": "Student updated successfully"})

@app.route('/delete/<name>', methods=['DELETE'])
def delete_student(name):
    students = load_data()
    if name in students:
        del students[name]
        save_data(students)
        return jsonify({"message": "Student deleted successfully"})
    return jsonify({"error": "Student not found"}), 404

if __name__ == '__main__':
    # Make sure static and templates directories exist
    os.makedirs('static', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    app.run(debug=True)