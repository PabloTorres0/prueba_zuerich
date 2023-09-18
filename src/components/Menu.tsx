import React from 'react'

const Menu = () => {
  return (
    <div>

        <form className="px-4 py-3">

        <ul className="list-group">
        <li className="list-group-item active" aria-current="true">MENU</li>
        <li className="list-group-item">
        <button type="button" className="btn btn-secondary">LISTA DE CONTACTOS</button>
        </li>
        <li className="list-group-item">
        <button type="button" className="btn btn-secondary"></button>
        </li>
        <li className="list-group-item"></li>
        <li className="list-group-item">And a fifth one</li>
        </ul>
        </form>

    </div>
  )
}

export default Menu