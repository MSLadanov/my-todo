import styled from "styled-components";
import getDate from "../../helpers/getDate";

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

    const MessageBody = styled.div`
        display: flex;
        & img{
            margin: 0px 20px;
        }
    `
    const MessageDate = styled.span`
        position: relative;
        top: -10px;
        height: 20px;
        & p{
            font-size: xx-small;
        }
    `
function Message({id, text, timestamp, userId, userName, userAvatar, currentUserId, senderName, receiverName, senderAvatar, receiverAvatar} : MessageProps){
    const date = getDate(timestamp)
    return (
        <MessageContainer style={{flexDirection : userId !== currentUserId ? 'row' : 'row-reverse'}}>
            <MessageBox style={{ 
                flexDirection : userId !== currentUserId ? 'row' : 'row-reverse',
                backgroundColor : userName === receiverName ? '#D7E8FF' : '#D9F2E6'
            }}>
                <MessageBody style={{flexDirection : userId !== currentUserId ? 'row' : 'row-reverse'}}>
                    <UserImg src={userName === senderName ? senderAvatar : receiverAvatar} alt="" />
                    <p>{text}</p>
                </MessageBody>
                <MessageDate>
                    <p>{date}</p>
                </MessageDate>
            </MessageBox>
        </MessageContainer>
    )
}
export default Message