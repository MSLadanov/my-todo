import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

const Bar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: white;
    width: 100%;
    height: 86px;
    z-index: 1;
    border-bottom: 1px solid grey;
    & h1{
        margin: 0px;
    }
`

const PrimaryBar = styled.div`
    display: flex;
    padding: 10px 20px;
    & h1{
        margin-left: 20px;
    }
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
    function getIcon(){
        switch (locationArray[0]){
            case 'contacts':
                return <FontAwesomeIcon icon={faAddressBook} size='2x'></FontAwesomeIcon>
            case 'chats':
                return <FontAwesomeIcon icon={faComments} size='2x'></FontAwesomeIcon>
            case 'todolists':
                return <FontAwesomeIcon icon={faClipboardCheck} size='2x'></FontAwesomeIcon>
            case 'user':
                    return <FontAwesomeIcon icon={faUser} size='2x'></FontAwesomeIcon>
            case 'addtodolist':
                return <FontAwesomeIcon icon={faSquarePen} size='2x'></FontAwesomeIcon>
            default:
                return <FontAwesomeIcon icon={faQuestion} size='2x'></FontAwesomeIcon>
        } 
    }
    useEffect(() => {
        if (locationArray.length > 1){
            getSubDirectory(locationArray[0])
        }
    },[location.pathname])
    if(locationArray.length !== 0){
        return (
            <Bar>
                {locationArray.length === 1 ?
            <PrimaryBar>
                {getIcon()} 
                <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
            </ PrimaryBar> :
            <>
                <PrimaryBar>
                    {getIcon()} 
                    <h1>{locationArray[0].charAt(0).toUpperCase() + locationArray[0].slice(1)}</h1>
                </PrimaryBar>
                <SecondaryBar>
                    <h1>{barContent}</h1>
                </SecondaryBar>
            </>}
            </Bar>
        )
    } else {
        return <div></div>
    }
}

export default TopBar