import ReactDOM from 'react-dom'

function usePopup(){
    function togglePopup(){

    }
    function Popup (){
        return ReactDOM.createPortal(
            <div>
              <div/>
              <div>
                  <h1>Popup</h1>
                  <button >Close Popup</button>
              </div>    
            </div>,
            document.getElementById('portal')!
          )
    }
}

export default { usePopup }