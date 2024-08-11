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

const MessageContainer = styled.div`
        display: flex;
    `
    const MessageBox = styled.div`
        display: flex;
        width: 70%;
        justify-content: space-between;
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
    ` 
    const UserImg = styled.img`
        width: 50px;
        height: 50px;
        border-radius: 50%;
    `

function Message({id, text, timestamp, userId, userName, userAvatar, currentUserId, senderName, receiverName, senderAvatar, receiverAvatar} : MessageProps){
    const date = new Date(Number(timestamp)).toDateString();
    return (
        <MessageContainer style={{flexDirection : userId !== currentUserId ? 'row' : 'row-reverse'}}>
            <MessageBox style={{ 
                flexDirection : userId !== currentUserId ? 'row' : 'row-reverse',
                backgroundColor : userName === receiverName ? '#D7E8FF' : '#D9F2E6'
            }}>
                <UserImg src={userName === senderName ? senderAvatar : receiverAvatar} alt="" />
                <p>{text}</p>
                <p>{date}</p>
            </MessageBox>
        </MessageContainer>
    )
}
export default Message