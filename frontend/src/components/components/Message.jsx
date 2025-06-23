import PropTypes from 'prop-types';

const Message = ({ message }) => {
  return (
    <div className={` ${message.from === 'user' ? 'user-message' : 'ai-message'}`}>
      <p className="chat-message fs-3-5">{message.text}</p>
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