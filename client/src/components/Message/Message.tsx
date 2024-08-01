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
    return (
        <div>
            <img src={userAvatar} alt="" />
        </div>
    )
}
export default Message