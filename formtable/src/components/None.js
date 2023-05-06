import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function None() {
  const [courses, setCourses] = useState([]);
  const [examschedule,setExamSchedule]=useState([]);
  const [courseSchedule,setCourseSchedule]=useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectCourse, setSelectedCourse] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [duration, setDuration] = useState('');

  const username = 'fariha';
  const password = '123';

  useEffect(() => {
    axios
      .get("http://localhost:8000/dropdown/courses/",
      {
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
          }
    })
      .then((response) => setSelectedCourse(response.data))
      .catch((error) => console.log(error));
  }, []);

  const [rows, setRows] = useState([{course_code:"", }]);

  const handleAddRow = () => {
    const newRow = {course_code:"",};
    setRows([...rows, newRow]);
  };

  const handleDateChange = (date, index) => {
    const updatedRows = [...rows];
    updatedRows[index].date = date;
    setRows(updatedRows);
  };

  const handleCourseCodeChange = (e, index) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index].course_code = value;
    setRows(updatedRows);
  };

  const handleDurationChange = (e, index) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index].duration = value;
    setRows(updatedRows);
  };

  const postCourseData = () => {
    const coursesData = rows.map((row) => ({
      course_code: row.course_code,
      date: row.date,
      duration: row.duration
    }));
   
    axios
      .post("http://localhost:8000/dropdown/courseschedule/", coursesData, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="Title">
        <h1 className='dept '>Dept.of Computer Science and Engineering</h1>
        <h2 className="align-items-center">Jahangirnagar University</h2>
        <h2>Savar,Dhaka </h2>
        <br />
        <span className='right'>Date:</span>
        <h2 className='align-items-center'>Examination Schedule <br /></h2>
        <h3><span className='align-items-center'>For</span></h3> 
        <a href="">2nd year 2nd semester BSC(honors) Final Exam 2019</a>
        <br />
        <br />
      </div>

      <form onSubmit={postCourseData}>
       
       <div className="table-container">
         <table>
           <thead>
             <tr>
             <th>Date</th>
               <th>Course No</th>
               {/* <th>Course Name</th> */}
               <th>Duration</th>
               </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  value={row.exam_date}
                  onChange={(e) => handleDateChange(e, index)}
                >
                  <option value="">Select a Date</option>
                  {courseSchedule.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.exam_date}
                    </option>
                  ))}
                </select>
                </td>

<td>
                {/* <DatePicker
                  selected={row.exam_date}
                  onChange={(date) => handleDateChange(date, index)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  isClearable
                  placeholderText="Select a Date"
                /> */}
                <input type="date"  id="today"></input>
              </td>

              

              {/* Course no */}
              <td>
                <select
                  value={row.course_code}
                  onChange={(e) => handleCourseCodeChange(e, index)}
                >
                  <option value="">Select a course code</option>
                  {selectCourse.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_code}
                    </option>
                  ))}
                </select>
                </td>
                {/* course name */}
                {/* <td>
                <select
                  value={row.course}
                  onChange={(e) => handleCourseChange(e, index)}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                </td> */}



            


              <td>
                <input
                  type="text"
                  value={row.time}
                  onChange={(e) => handleDurationChange(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
      </div>
      <button onClick={handleAddRow}>Add Row</button>
  
    <button type="submit">Submit</button>
    </form>
    </div>
    
  );
}

export default None;
