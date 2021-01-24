import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Form = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("")
  const [errors, setErrors] = useState({});
  const status = "backlog"; 

  const create = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/projects/new", { title, dueDate, status })
    .then(res => {
      console.log(res.data);
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        navigate("/");
        }
      }).catch(err => {
        console.error(err);
      });
    }
  return (
    <div>
      <h1 className="my-5 text-center">Project Manager</h1>
      <div className="offset-2">
        <h5><a href="/" className="offset-6">Back to Dashboard</a></h5>
        <form onSubmit={create}>
          <div className="col-10">
            <h4 className="mb-3">Plan a new project:</h4>

            <label>Title: </label>
            <input className="form-control" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title in here"/>
            <p className="text-danger">{errors.title ? errors.title.message : ''}</p>

            <label>Due Date: </label>
            <input className="form-control" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}/>
            <p className="text-danger">{errors.dueDate ? errors.dueDate.message : ''}</p>

            <button className="my-3 btn btn-block btn-primary" type="submit">Plan Project</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Form
