import PropTypes from 'prop-types';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.from === 'user' ? 'user-message' : 'ai-message'}`}>
      <p className="chat-message">{message.text}</p>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    from: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;