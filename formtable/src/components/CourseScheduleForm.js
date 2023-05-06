import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseScheduleForm() {
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [examDate, setExamDate] = useState('');
  const [time, setTime] = useState('');
  const username = 'fariha';
  const password = '123';
 

  useEffect(() => {
    axios.get('http://localhost:8000/api/courses/',{
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
          }
    })
      .then(response => {
        setCourseList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCourseSelect = event => {
    setSelectedCourse(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const scheduleData = {
      course_code: selectedCourse,
      exam_date: examDate,
      time: time
    }
    axios.post('http://localhost:8000/api/courseschedule/', scheduleData,{
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
          }
    }
    )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="course-select">Select a course:</label>
          <select id="course-select" value={selectedCourse} onChange={handleCourseSelect}>
            <option value="">--Please choose an option--</option>
            {courseList.map(course => (
              <option key={course.id} value={course.course_code}>{course.course_code} - {course.course_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="exam-date">Exam date:</label>
          <input type="date" id="exam-date" value={examDate} onChange={event => setExamDate(event.target.value)} />
        </div>
        <div>
          <label htmlFor="time">Exam time:</label>
          <input type="text" id="time" value={time} onChange={event => setTime(event.target.value)} />
        </div>
        <button type="submit">Schedule exam</button>
      </form>
    </div>
  );
}

export default CourseScheduleForm;
