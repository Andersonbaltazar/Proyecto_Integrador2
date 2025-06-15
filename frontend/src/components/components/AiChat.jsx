import { useState } from 'react';
import Message from './Message';

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: 'Esta es una respuesta automática del asistente AI.' },
      ]);
    }, 500);

    setInput('');
  };

  return (
    <aside className="ai-chat-section">
      <h2 className="title-ai-chat">Asistente AI</h2>
      <div className="ai-chat-box">
        <div className="message-historial d-flex flex-column">
          {messages.length === 0 ? (
            <p className="paragraph-new-chat">¿Cómo puedo ayudarte hoy?</p>
          ) : (
            messages.map((message, index) => (
              <Message key={index} message={message} />
            ))
          )}
        </div>
        <div className="d-flex gap-2 mt-2 justify-center">
          <button>Enviar</button>
          <input
            type="text"
            className="form-input"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </aside>
  );
};

export default AiChat;
