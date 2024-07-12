import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
        <ul>
            <li>
              <Link to={`contacts/`}>Contacts</Link>
            </li>
            <li>
              <Link to={`todos/`}>Todos</Link>
            </li>
            <li>
              <Link to={`user/`}>User</Link>
            </li>
        </ul>
    </nav>
  );
}

export default Header;