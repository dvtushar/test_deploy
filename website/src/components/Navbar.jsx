import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="font-weight-light display-1 text-center">Easy Restaurant</h1>
        </Link>
        <nav className="navbar navbar-expand-sm navbar-light">
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/AddRestaurant">Add Restaurant</a>
                    <a className="nav-item nav-link" href="/ApiDocs">Api Docs</a>
                    <a className="nav-item nav-link" href="/Developers">Developers</a>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar


