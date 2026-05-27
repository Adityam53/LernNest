# Student Management App – Redux Toolkit

A fullstack application to manage students and school data with full CRUD functionality, filtering, sorting, and reporting. The app uses Redux Toolkit for state management and integrates async operations for handling API-based data.
Developed using React JS, React Router and Redux Toolkit, Express, Node.js, MongoDB, Chart.js. 

---

## Demo Link

[Live Demo](https://lern-nest.vercel.app/)

---

## Quick Start

```
git clone https://github.com/Adityam53/LernNest.git
cd LearNest
cd FrontEnd
npm install
npm run dev
```

---

## Technologies

* React JS
* React Router
* Redux Toolkit
* Axios
* Express
* Node JS
* MongoDB

---

## Demo Video

Watch a walkthrough of all major features of this app: [Loom Video](https://www.loom.com/share/33a9209a622e4102a618efca60c70db5)

---

## Features
---

**Student View**

* Fetch and display list of students
* Loading and error handling
* Uses async thunk to fetch data
* Displays student list using reusable components

---

**Add Student**

* Form to add new students
* Fields include:

  * Name
  * Age
  * Grade
  * Gender
* Form validation and error handling
* Dispatch async action to add student

---

**Update Student**

* Edit existing student details
* Pre-filled form for editing
* Uses route state to pass data
* Updates Redux store after editing

---

**Delete Student**

* Delete student from detail view
* Updates Redux store instantly
* Removes student using filter logic

---

**Student Details**

* View detailed information of a student
* Includes:

  * Name
  * Grade
  * Gender
  * Marks
  * Attendance
* Option to edit or delete

---

**Class View**

* Filter students by:

  * All
  * Boys
  * Girls
* Sort students by:

  * Name
  * Marks
  * Attendance
* Dynamic filtering and sorting using Redux state

---

**School View**

* Displays school-level statistics:

  * Total students
  * Average attendance
  * Average marks
  * Top-performing student
* Data calculated using student records

---

**Filtering & Sorting**

* Centralized filter and sort logic using Redux
* Real-time UI updates based on selected filters
* Efficient state updates

---

## API Reference

### Students Endpoints

#### GET `/students`

Fetch all students from the database.

**Response**

```json
[
  {
    "_id": "65f123abc456",
    "name": "John Doe",
    "age": 16,
    "grade": "10th",
    "gender": "Male",
    "marks": 88,
    "attendance": 95
  }
]
```

---

#### POST `/students`

Create a new student record.

**Sample Request**

```json
{
  "name": "John Doe",
  "age": 16,
  "grade": "10th",
  "gender": "Male",
  "marks": 88,
  "attendance": 95
}
```

**Response**

```json
{
  "_id": "65f123abc456",
  "name": "John Doe",
  "age": 16,
  "grade": "10th",
  "gender": "Male",
  "marks": 88,
  "attendance": 95
}
```

---

#### PUT `/students/:id`

Update an existing student's information.

**Sample Request**

```json
{
  "marks": 92,
  "attendance": 97
}
```

**Response**

```json
{
  "_id": "65f123abc456",
  "name": "John Doe",
  "age": 16,
  "grade": "10th",
  "gender": "Male",
  "marks": 92,
  "attendance": 97
}
```

---

#### DELETE `/students/:id`

Delete a student by ID.

**Response**

```json
{
  "message": "Student deleted successfully",
  "student": {
    "_id": "65f123abc456",
    "name": "John Doe"
  }
}
```

---

### Teachers Endpoints

#### GET `/teachers`

Fetch all teachers from the database.

**Response**

```json
[
  {
    "_id": "65f456def789",
    "name": "Sarah Johnson",
    "subject": "Mathematics",
    "experience": 8
  }
]
```

---

#### POST `/teachers`

Create a new teacher record.

**Sample Request**

```json
{
  "name": "Sarah Johnson",
  "subject": "Mathematics",
  "experience": 8
}
```

**Response**

```json
{
  "_id": "65f456def789",
  "name": "Sarah Johnson",
  "subject": "Mathematics",
  "experience": 8
}
```

---

#### PUT `/teachers/:id`

Update an existing teacher's information.

**Sample Request**

```json
{
  "experience": 10
}
```

**Response**

```json
{
  "_id": "65f456def789",
  "name": "Sarah Johnson",
  "subject": "Mathematics",
  "experience": 10
}
```

---

#### DELETE `/teachers/:id`

Delete a teacher by ID.

**Response**

```json
{
  "message": "Teacher deleted successfully!",
  "deletedTeacher": {
    "_id": "65f456def789",
    "name": "Sarah Johnson"
  }
}
```
## Contact

For bugs or feature requests, please reach out to ([adityamoorjmalani53@gmail.com](mailto:adityamoorjmalani53@gmail.com))
