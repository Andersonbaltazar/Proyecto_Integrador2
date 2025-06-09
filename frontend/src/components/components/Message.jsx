const Message = ({ message }) => {
  return (
    <div className={`message ${message.from === 'user' ? 'user-message' : 'ai-message'}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default Message;