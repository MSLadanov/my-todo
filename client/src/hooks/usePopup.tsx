import { useState } from 'react'
import ReactDOM from 'react-dom'

function usePopup(){
    interface PopupProps{
      text : string
    }
    const [ showPopup, setShowPopup ] = useState(false)
    function togglePopup(){
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 2000);
    }
    function Popup ({text} : PopupProps){
        if(showPopup){
          return ReactDOM.createPortal(
            <div>
              <div/>
              <div>
                  <h1>Popup</h1>
                  <h1>{text}</h1>
                  <button >Close Popup</button>
              </div>    
            </div>,
            document.getElementById('portal')!
          )
        } else {
          return null
        }
    }
    return { togglePopup, Popup }
}

export default usePopup 