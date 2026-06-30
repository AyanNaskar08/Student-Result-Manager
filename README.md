# Student Result Manager

A simple web application for managing student academic results, built with **Flask** (Python) on the backend and a lightweight **HTML/CSS/JavaScript** frontend. Student records are stored in a local `students.json` file, making the app easy to run with no database setup required.

## Features

- View a list of all students and their subject marks
- Add a new student record (Math, Physics, Chemistry scores)
- Update an existing student's marks
- Delete a student record
- Simple JSON file storage — no external database needed

## Tech Stack

| Layer    | Technology              |
|----------|--------------------------|
| Backend  | Python, Flask            |
| Frontend | HTML, CSS, JavaScript    |
| Storage  | JSON file (`students.json`) |

## Project Structure

```
Student-Result-Manager/
├── static/                   # CSS and JavaScript assets
├── templates/
│   └── index.html            # Main frontend page
├── student_result_manager.py # Flask application (routes & logic)
└── students.json             # Student data store
```

## API Endpoints

| Method | Endpoint         | Description                          |
|--------|------------------|---------------------------------------|
| GET    | `/`              | Renders the main page                 |
| GET    | `/students`      | Returns all student records as JSON   |
| POST   | `/add`           | Adds a new student record             |
| POST   | `/update`        | Updates an existing student's marks   |
| DELETE | `/delete/<name>` | Deletes a student by name             |

### Request body example (`/add` and `/update`)

```json
{
  "name": "John Doe",
  "math": 85,
  "physics": 78,
  "chemistry": 92
}
```

## Getting Started

### Prerequisites

- Python 3.x
- Flask

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/AyanNaskar08/Student-Result-Manager.git
   cd Student-Result-Manager
   ```

2. Install dependencies
   ```bash
   pip install flask
   ```

3. Run the application
   ```bash
   python student_result_manager.py
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## How It Works

The Flask backend (`student_result_manager.py`) reads and writes student data to `students.json`. Each student is stored as a key (their name) mapped to an object containing their `math`, `physics`, and `chemistry` scores. The frontend (in `templates/` and `static/`) communicates with the backend through the API endpoints above to display and manage records dynamically.

## Future Improvements

- Calculate and display total/average marks and grades
- Add input validation and duplicate-name handling on the frontend
- Migrate from JSON file storage to a proper database (e.g., SQLite)
- Add user authentication for restricted access

## License

No license has been specified for this repository yet. Consider adding one (e.g., MIT) if you plan to share or accept contributions.

## Author

[AyanNaskar08](https://github.com/AyanNaskar08)
