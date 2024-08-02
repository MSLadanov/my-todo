import styled from "styled-components"

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
}

function Message({id, text, timestamp, userId, userName, userAvatar, currentUserId, senderName, receiverName} : MessageProps){
    const date = new Date(Number(timestamp)).toDateString();
    const MessageContainer = styled.div`
        display: flex;
        justify-content: ${userName !== receiverName ? 'left' : 'right'}
    `
    const MessageBox = styled.div`
        display: flex;
        width: 70%;
        justify-content: space-between;
        flex-direction: ${userName !== receiverName ? 'row' : 'row-reverse'};
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        background-color: ${userName !== receiverName ? 'chartreuse' : 'aquamarine'};
    ` 
    const UserImg = styled.img`
        width: 50px;
        height: 50px;
        border-radius: 50%;
    `
    return (
        <MessageContainer>
            <MessageBox>
                <UserImg src={userAvatar} alt="" />
                <p>{text}</p>
                <p>{date}</p>
            </MessageBox>
        </MessageContainer>
    )
}
export default Message