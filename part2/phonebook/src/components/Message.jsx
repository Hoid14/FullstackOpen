const Message = ({message}) => {
    const messageStyle = {
        color: 'green',
        padding: 10,
        backgroundColor: 'lightgray',
        fontSize: 40,
        borderStyle: 'solid',
        borderRadius: 8
    }
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Message