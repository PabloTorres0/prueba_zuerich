import React from 'react'

const NavBar = () => {
  return (
    <div className='mx-auto w-50'>
        
        <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary"data-bs-theme="dark"> 
  <div className="container-fluid">
    <a className="navbar-brand" href="/">HOME</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/contacts">CONTACTOS</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
       
    </div>
  )
}

export default NavBar