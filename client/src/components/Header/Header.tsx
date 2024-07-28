import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const HeaderContainer = styled.header`
`;
  const Menu = styled.ul`
    display:flex;
    justify-content: space-between;
    padding: 0;
  `
  const MenuItem = styled.li`
    list-style-type: none;
    & a{
      text-decoration: none;
      color: black;
    }
  `
  return (
    <HeaderContainer>
      <hr />
      <nav>
        <Menu>
            <MenuItem>
              <Link to={`contacts/`}>Contacts</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`todolists/`}>Todo Lists</Link>
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