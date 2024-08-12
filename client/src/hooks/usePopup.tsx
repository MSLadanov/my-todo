import { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledPopup = styled.div<{ isVisible: boolean; bgColor: string }>`
    display: flex;
    background-color: ${({ bgColor }) => bgColor};
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    height: 35px;
    padding: 8px 16px;
    position: fixed;
    bottom: ${({ isVisible }) => (isVisible ? '90px' : '-100px')}; /* Используем fixed для правильного позиционирования */
    left: 50%;
    transform: translateX(-50%);
    transition: bottom 0.5s ease-in-out, opacity 0.5s ease-in-out;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    z-index: 1000;
    color: #000;
`;
function usePopup(){
    interface PopupProps{
      text : string
      type: 'success' | 'warning' | 'error',
    }
    const colors = {
      error: 'rgba(255, 205, 210, 0.8)',
      warning: 'rgba(255, 243, 205, 0.8)',
      success: 'rgba(200, 230, 201, 0.8)'
    }
    const [ showPopup, setShowPopup ] = useState(false)
    function togglePopup(){
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 3000);
    }
    function Popup ({text , type} : PopupProps){
        if(showPopup){
          return ReactDOM.createPortal(
            <StyledPopup bgColor={colors[type]} isVisible={showPopup}>
              <p>{text}</p> 
            </StyledPopup>,
            document.getElementById('portal')!
          )
        } else {
          return null
        }
    }
    return { togglePopup, Popup }
}

export default usePopup 