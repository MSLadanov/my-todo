import styled from "styled-components"

interface MessageProps{
    id: string, 
    text: string,
    timestamp: string,
    userId: string,
    userName: string,
    userAvatar: string | undefined
    currentUserId: string | undefined
}

function Message({id, text, timestamp, userId, userName, userAvatar, currentUserId} : MessageProps){
    const MessageBox = styled.div`
        display: flex;
    `
    const UserImg = styled.img`
        width: 50px;
        height: 50px;
        border-radius: 50%;
    `
    return (
        <MessageBox>
            <UserImg src={userAvatar} alt="" />
            <p>{text}</p>
        </MessageBox>
    )
}
export default Message