import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";

const Message = ({ message }) => {
  const isUser = message.from === 'user';
  const isPending = message.isPending;
  const isLoading = message.text === "✍️ Pensando...";

  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'ai-message'} ${isPending ? 'pending' : ''} ${isLoading ? 'loading' : ''}`}>
      <div className="message-avatar">
        <ion-icon name={isUser ? "person" : "chatbubble-ellipses"}></ion-icon>
      </div>
      <div className="message-bubble">
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    from: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isPending: PropTypes.bool,
  }).isRequired,
};

export default Message;