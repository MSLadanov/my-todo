import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";

const Bar = styled.div`
    position: fixed;
    background-color: white;
    width: 100%;
    height: 120px;
    z-index: 1;
    & h1{
        margin: 0px;
    }
`

const PrimaryBar = styled.div`
    padding: 10px 20px;
`

const SecondaryBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
                try {
                    const data = (await get(child(dbRef, `chats/${locationArray[1]}`))).val()
                    const name = [userName, data.senderName, data.receiverName].filter((item) => item !== userName)[0]
                    setBarContent(name)
                } catch (error) {
                    console.log(error)
                }
                break;
            case 'todolists':
                const data = (await get(child(dbRef, `todos/${userId}/`))).val()
                const todoListName = data.todoLists.find((item : any) => item.id === locationArray[1]).name
                setBarContent(todoListName)
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
        <Bar>
            {locationArray.length === 1 ?
        <PrimaryBar>
            <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
        </ PrimaryBar> :
        <>
            <PrimaryBar>
                <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
            </PrimaryBar>
            <SecondaryBar>
                <h1>{barContent}</h1>
            </SecondaryBar>
        </>}
        </Bar>
    )
}

export default TopBar