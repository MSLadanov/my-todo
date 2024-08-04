import styled from "styled-components";

interface MessageProps{
    id: string, 
    text: string,
    timestamp: string,
    userId: string,
    userName: string,
    userAvatar: string | undefined,
    currentUserId: string | undefined,
    senderName: string, 
    receiverName: string, 
    senderAvatar: string | undefined,
    receiverAvatar: string | undefined,
}

function Message({id, text, timestamp, userId, userName, userAvatar, currentUserId, senderName, receiverName, senderAvatar, receiverAvatar} : MessageProps){
    const date = new Date(Number(timestamp)).toDateString();
    const MessageContainer = styled.div`
        display: flex;
        justify-content: ${userId === currentUserId ? 'right' : 'left'}
    `
    const MessageBox = styled.div`
        display: flex;
        width: 70%;
        justify-content: space-between;
        flex-direction: ${userId !== currentUserId ? 'row' : 'row-reverse'};
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        background-color: ${userName === receiverName ? 'chartreuse' : 'aquamarine'};
    ` 
    const UserImg = styled.img`
        width: 50px;
        height: 50px;
        border-radius: 50%;
    `
    return (
        <MessageContainer>
            <MessageBox>
                <UserImg src={userName === senderName ? senderAvatar : receiverAvatar} alt="" />
                <p>{text}</p>
                <p>{date}</p>
            </MessageBox>
        </MessageContainer>
    )
}
export default Message