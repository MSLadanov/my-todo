import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import  useAvatar  from '../../hooks/useAvatar'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
 
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
    height: 40px;
    width: 40px;
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
              <Link to={`contacts/`}><FontAwesomeIcon icon={faAddressBook} size='2x' /></Link>
            </MenuItem>
            <MenuItem>
              <Link to={`chats/`}><FontAwesomeIcon icon={faComments} size='2x' /></Link>
            </MenuItem>
            <MenuItem>
              <Link to={`todolists/`}><FontAwesomeIcon icon={faClipboardCheck} size='2x' /></Link>
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