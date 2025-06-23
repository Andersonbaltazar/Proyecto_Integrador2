import { useRef, useState, useEffect } from "react";
import Message from "./Message";
import Button from "../widgets/Button";
import DropUp from "./DropUp";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now() + Math.random(),
      from: "user",
      text: input,
    };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          from: "ai",
          text: "Esta es una respuesta automática del asistente AI.",
        },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <div className="ai-chat-section w-full h-full">
      <div className="ai-chat-box d-flex flex-column">
        <div className="message-historial d-flex flex-column gap-2 w-full h-full">
          {messages.length === 0 ? (
            <div className="d-flex w-full h-full justify-center align-center flex-column">
              <h2 className="paragraph-new-chat text-center ">
                ¿Cómo puedo ayudarte?
              </h2>
              <p className="text-center w-60">
                Hola 👋, soy tu asistente virtual. Estoy aquí para ayudarte con
                tus cultivos, resolver tus dudas o darte recomendaciones
                personalizadas. Escribe tu mensaje y comencemos.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="d-flex flex-column mt-2 justify-center align-center mt-a w-fulls">
          <div className="d-flex flex-column w-80 br-3 background-secondary p-2 gap-3">
            <div className="w-full">
              <input
                type="text"
                className="chat-input"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
            <div className="d-flex justify-between w-full">
              <DropUp>
                <button
                  className="dropup-item button w-full"
                  type="button"
                  onClick={() => setMessages([])}
                >
                  Nueva Conversación
                </button>
                <button className="dropup-item button w-full">Agregar Archivo</button>
                <button className="dropup-item button w-full">Añadir Experiencia</button>
              </DropUp>
              <Button
                className="chat-button"
                type="sumbit"
                onClick={handleSend}
              >
                <ion-icon name="arrow-up"></ion-icon>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
