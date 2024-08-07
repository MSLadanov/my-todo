import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import  useAvatar  from '../../hooks/useAvatar'
import { useSelector } from 'react-redux';
 
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
  const MenuAvatar = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
  `

function Header() {
 
  interface IState {
    displayName: string,
    email: string,
    token: string,
    userId: string | undefined  
  }

  const userId = useSelector((state : IState) => state.userId)
  const { getCurrentAvatarURL } = useAvatar(userId)
  const query = useQuery({ queryKey: ['avatarURL'], queryFn: getCurrentAvatarURL })
  return (
    <HeaderContainer>
      <hr />
      <nav>
        <Menu>
            <MenuItem>
              <Link to={`contacts/`}>Contacts</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`chats/`}>Chats</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`todolists/`}>Todo Lists</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`user/`}><MenuAvatar src={query.data}/></Link>
            </MenuItem>
        </Menu>
    </nav>
    </HeaderContainer>
  );
}

export default Header;