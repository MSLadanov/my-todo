import { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledPopup = styled.div`
      
`
function usePopup(){
    interface PopupProps{
      text : string
      type: 'success' | 'warning' | 'error',
    }
    const colors = {
      error: '#FFCDD2',
      warning: '#FFF3CD',
      success: '#C8E6C9'
    }
    const [ showPopup, setShowPopup ] = useState(false)
    function togglePopup(){
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 2000);
    }
    function Popup ({text , type} : PopupProps){
        if(showPopup){
          return ReactDOM.createPortal(
            <StyledPopup style={{'backgroundColor': colors[type]}}>
              <h1>{text}</h1> 
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