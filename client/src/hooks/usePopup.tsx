import { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

function usePopup(){
    interface PopupProps{
      text : string
      type: 'success' | 'warning' | 'error',
    }
    const errorMessage = '#FFCDD2'
    const warningMessage = '#FFF3CD'
    const successMessage = '#C8E6C9'
    const StyledPopup = styled.div`
      background-color: red;
     `
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
            <StyledPopup>
              <div/>
              <div>
                  <h1>{text}</h1>
                  <button >Close Popup</button>
              </div>    
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