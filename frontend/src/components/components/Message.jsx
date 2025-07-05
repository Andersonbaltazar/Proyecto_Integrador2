import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";

const Message = ({ message }) => {
  return (
    <div className={`chat-message fs-3-5 ${message.from === 'user' ? 'user-message' : 'ai-message'}` }>
      <ReactMarkdown >{message.text}</ReactMarkdown>
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