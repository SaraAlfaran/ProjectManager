import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Dashboard = () => {
  const [allProjects, setAllProjects] = useState([]);
  const dateFormat = "MM/DD/YYYY";

  var today = new Date();
  today.setDate(today.getDate())

  useEffect(() => {
    getAllProjects();
  }, []);

  function getAllProjects() {
    axios.get("http://localhost:8000/api/projects")
      .then(res => { setAllProjects(res.data) })
      .catch(err => { console.error(err) });
  }
  const updateStatus = (id, statusChange) => {
    axios.put(`http://localhost:8000/api/projects/update/${id}`, { "status": statusChange })
      .then(res => {
        getAllProjects();
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      }, [])
  }

  const remove = _id => {
    axios.delete(`http://localhost:8000/api/projects/delete/${_id}`)
      .then(res => {
        console.log(res);
        getAllProjects();
      }).catch(err => console.error(err));
  }


  //For a black belt:
  // Note I worked two options from black belt
  //Ensure the Project is unique when adding it to the database
  //Indicate if the project is past due (due date is earlier than today)

  
  return (
    <div className="my-3 text-center">
      <div className=" row justify-content-center" >
        <div className="card my-3 border border-dark">
      <h1>Project Manager</h1>
          <div className="card-group   ">
            <div className="card border border-dark">
              <h3 className="card-header bg-primary border border-dark">BackLog</h3>
              <div className="overflow-auto" style={{ maxHeight: "500px" }}>

                {allProjects.slice(0).reverse().filter(status => status.status === "backlog").map((Projects, i) =>
                  <div className="card-body" key={i}>
                    <div className="border border-dark">
                      <div className="m-3">
                        <h4 className="card-title">{Projects.title}</h4>
                        <p className={moment(Projects.dueDate) < moment(today) ? 'text-danger' : ""}>Due Date: {moment(Projects.dueDate).format(dateFormat)}</p>
                        <button className="btn btn-warning btn-block" onClick={(e) => { updateStatus(Projects._id, "inProgress") }}>Start Project</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
            <div className="card border border-dark">
              <h3 className="card-header bg-warning border border-dark">In Progress</h3>
              <div className="overflow-auto" style={{ maxHeight: "500px" }}>

                {allProjects.slice(0).reverse().filter(status => status.status === "inProgress").map((Projects, i) =>
                  <div className="card-body" key={i}>
                    <div className="border border-dark">
                      <div className="m-3">
                        <h4 className="card-title">{Projects.title}</h4>
                        <p className={moment(Projects.dueDate) < moment(today) ? 'text-danger' : ""}>Due Date: {moment(Projects.dueDate).format(dateFormat)}</p>
                        <button className="btn btn-success btn-block" onClick={(e) => { updateStatus(Projects._id, "completed") }}>Move to Completed</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="card border border-dark">
              <h3 className="card-header bg-success border border-dark">Completed</h3>
              <div className="overflow-auto" style={{ maxHeight: "300px" }}>

                {allProjects.slice(0).reverse().filter(status => status.status === "completed").map((Projects, i) =>
                  <div className="card-body" key={i}>
                    <div className="border border-dark">
                      <div className="m-3">
                        <h4 className="card-title">{Projects.title}</h4>
                        <p className={moment(Projects.dueDate) < moment(today) ? 'text-danger' : ""}>Due Date: {moment(Projects.dueDate).format(dateFormat)}</p>
                        <button className="btn btn-danger btn-block" onClick={e => remove(Projects._id)}>Remove Project</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
          <a href="/projects/new" className="btn btn-primary btn-block col-3 ml-4 my-2"><strong >Add New Project</strong></a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
