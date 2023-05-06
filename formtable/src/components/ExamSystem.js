import React, { useState,useEffect } from "react";
import axios from "axios";
function ExamSystem() {
    const username = 'fariha';
    const password = '123';
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
     department:"",
     year:"",
    });

    // const exam_system = {
    //     department: parseInt(formData.department),
    //     year: formData.year
    //   };
    useEffect(() => {
        // Fetch the list of departments from your backend API
        axios.get("http://localhost:8000/dropdown/departments/",{
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
              }

        }).then(response => {
          setDepartments(response.data);
        });
      }, []);
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }
      function handleSubmit(event) {
        event.preventDefault();
        axios
          .post("http://localhost:8000/dropdown/examsystems/", formData,
          {
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
              }
        })
          
          .then((response) => {
            console.log(response.data);
            // TODO: Handle successful form submission
          })
          // .catch((error) => {
          //   console.log(error);
          //   // TODO: Handle form submission error
          // });



          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      }
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="dept">Department:</label>
          <select
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
     <option value="">Select a department</option>
        {departments.map(department => (
          <option key={department.id} value={ department.id}>
          {department.name}
          </option>
        ))}
      </select>


    <label htmlFor="year">Year:</label>
      <select
        id="year"
        name="year"
        value={formData.year}
        onChange={handleInputChange}
      >
        <option value="">--Select year--</option>
        <option value="1st">1st</option>
        <option value="2nd">2nd</option>
        <option value="3rd">3rd</option>
        <option value="4th">4th</option>
      </select>
    
          
    
          <button type="submit">Submit</button>
        </form>
      );
}
      export default ExamSystem;                  