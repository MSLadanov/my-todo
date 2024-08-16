import { useState } from "react"
import styled from "styled-components"
import { useLocation } from "react-router-dom"

const Bar = styled.div`
    & h1{
        margin: 0px;
    }
`

function TopBar(){
    const [ barContent, setBarContent ] = useState('')
    const location = useLocation()
    const locationArray = location.pathname.split('/').filter((item) => item !== '')
    function getSubDirectory(rootDir : string){
        switch (rootDir) {
            case 'contacts':
                
                break;
            case 'chat':
                
                break;
            case 'todolists':
                
                break;
            default:
                break;
        }
    }
    return (
        locationArray.length === 1 ?
        <Bar>
            <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
        </Bar> :
        <Bar>
            <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
            <h1>{locationArray[1]}</h1>
        </Bar>
    )
}

export default TopBar