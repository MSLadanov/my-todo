import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { getDatabase, ref, child, get, set, update, push} from "firebase/database";

const Bar = styled.div`
    & h1{
        margin: 0px;
    }
`

function TopBar(){
    interface IState {
        displayName: string,
        email: string,
        token: string 
        userId: string,
    }
    const userName = useSelector((state : IState) => state.displayName)
    const userId  = useSelector((state : IState) => state.userId)
    const dbRef = ref(getDatabase());
    const [ barContent, setBarContent ] = useState('')
    const location = useLocation()
    const locationArray = location.pathname.split('/').filter((item) => item !== '')
    async function getSubDirectory(rootDir : string){
        switch (rootDir) {
            case 'contacts':
                    try {
                        const data = (await get(child(dbRef, `users/${locationArray[1]}`))).val()
                        setBarContent(data.name)
                    } catch (error) {
                        console.log(error)
                    }
                break;
            case 'chats':
                console.log(locationArray[1])
                try {
                    const data = (await get(child(dbRef, `chats/${locationArray[1]}`))).val()
                    const name = [userName, data.senderName, data.receiverName].filter((item) => item !== userName)[0]
                    setBarContent(name)
                } catch (error) {
                    console.log(error)
                }
                break;
            case 'todolists':
                const data = (await get(child(dbRef, `todos/${locationArray[1]}`))).val()
                console.log(data,'sd')
                break;
            default:
                setBarContent('')
        }
    }
    useEffect(() => {
        if (locationArray.length > 1){
            getSubDirectory(locationArray[0])
        }
    },[location.pathname])
    return (
        locationArray.length === 1 ?
        <Bar>
            <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
        </Bar> :
        <Bar>
            <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
            <h1>{barContent}</h1>
        </Bar>
    )
}

export default TopBar