import React from 'react'
import "./Navbar.css"


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Admin</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Logout</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Add Admin</a>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
  )
}

export default Navbar
