import React, { useState, useEffect } from "react";
import axios from "axios";

function ExamScheduleForm() {
const username = 'fariha';
const password = '123';

  const [examSchedule, setExamSchedule] = useState({
    sem: "",
    exam_year: "",
    exam_date: "",
    course: "",
    time: "",
  });

  const [semesterOptions, setSemesterOptions] = useState([]);

  useEffect(() => {
    // Fetch the list of semesters from the API
    axios.get("http://localhost:8000/dropdown/semesters/").then((response) => {
      const options = response.data.map((semester) => ({
        label: semester.semester_name,
        value: semester.id,
      }));
      setSemesterOptions(options);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExamSchedule((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/dropdown/examschedule/",{
    headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      }
}
     ,examSchedule).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="sem">Semester:</label>
        <select
          id="sem"
          name="sem"
          value={examSchedule.sem}
          onChange={handleInputChange}
        >
          <option value="">-- Select Semester --</option>
          {semesterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="exam_year">Exam Year:</label>
        <input
          type="text"
          id="exam_year"
          name="exam_year"
          value={examSchedule.exam_year}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="exam_date">Exam Date:</label>
        <input
          type="date"
          id="exam_date"
          name="exam_date"
          value={examSchedule.exam_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="course">Course:</label>
        <select
          id="course"
          name="course"
          value={examSchedule.course}
          onChange={handleInputChange}
        >
          <option value="">-- Select Course --</option>
          {/* Fetch the list of courses for the selected semester */}
        </select>
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={examSchedule.time}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default ExamScheduleForm;
