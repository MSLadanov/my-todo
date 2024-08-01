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
    const date = new Date(Number(timestamp)).toDateString();
    const MessageContainer = styled.div`
        display: flex;
        justify-content: ${userId !== currentUserId ? 'left' : 'right'}
    `
    const MessageBox = styled.div`
        display: flex;
        width: 70%;
        justify-content: space-between;
        flex-direction: ${userId !== currentUserId ? 'row' : 'row-reverse'};
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        background-color: ${userId !== currentUserId ? 'chartreuse' : 'aquamarine'};
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