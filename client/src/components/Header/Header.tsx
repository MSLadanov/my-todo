import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const HeaderContainer = styled.header`
`;
  const Menu = styled.ul`
    display:flex;
    justify-content: space-between;
  `
  const MenuItem = styled.li`

  `
  return (
    <HeaderContainer>
      <nav>
        <Menu>
            <MenuItem>
              <Link to={`contacts/`}>Contacts</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`todos/`}>Todos</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`user/`}>User</Link>
            </MenuItem>
        </Menu>
    </nav>
    </HeaderContainer>
  );
}

export default Header;