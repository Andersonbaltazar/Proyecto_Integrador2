import { useRef, useState, useEffect } from "react";
import Message from "./Message";
import Button from "../widgets/Button";
import DropUp from "./DropUp";
import { useChatStore } from "../../store/useChatStore";

const AiChat = ({ cultivoId }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Obtener el store completo y derivar valores sin usar useCallback
  const {
    chats,
    loading,
    loadChats,
    sendMessage,
    clearChat,
  } = useChatStore();

  const chatList = chats[cultivoId] || [];
  const isLoading = !!loading?.[cultivoId];

  // Cargar chats al montar o cambiar cultivoId
  useEffect(() => {
    if (cultivoId) {
      loadChats(cultivoId);
    }
  }, [cultivoId]);

  // Scroll automático al fondo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    await sendMessage(cultivoId, input);
    setInput("");
  };

  const handleClear = async () => {
    const confirm = window.confirm("¿Borrar toda la conversación?");
    if (confirm) {
      await clearChat(cultivoId);
    }
  };

  return (
    <div className="ai-chat-section w-full h-full">
      <div className="ai-chat-box d-flex flex-column">
        <div className="message-historial d-flex flex-column gap-2 w-full h-full">
          {chatList.length === 0 && !isLoading ? (
            <div className="d-flex w-full h-full justify-center align-center flex-column">
              <h2 className="paragraph-new-chat text-center">
                ¿Cómo puedo ayudarte?
              </h2>
              <p className="text-center w-60">
                Hola 👋, soy tu asistente virtual. Estoy aquí para ayudarte con
                tus cultivos. Escribe tu mensaje y comencemos.
              </p>
            </div>
          ) : (
            chatList.map((message) => (
              <Message
                key={message.id}
                message={{
                  id: message.id,
                  from: "user",
                  text: message.pregunta,
                }}
              />
            ))
          )}

          {/* Respuestas IA */}
          {chatList.map((message) => (
            <Message
              key={message.id + "-resp"}
              message={{
                id: message.id + "-resp",
                from: "ai",
                text: message.respuesta,
              }}
            />
          ))}

          {isLoading && (
            <Message
              message={{
                id: "loading",
                from: "ai",
                text: "✍️ Pensando...",
              }}
            />
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
                  if (e.key === "Enter") handleSend();
                }}
                disabled={isLoading}
              />
            </div>

            <div className="d-flex justify-between w-full">
              <DropUp>
                <button
                  className="dropup-item button w-full"
                  type="button"
                  onClick={handleClear}
                >
                  Nueva Conversación
                </button>
                <button className="dropup-item button w-full">
                  Agregar Archivo
                </button>
                <button className="dropup-item button w-full">
                  Añadir Experiencia
                </button>
              </DropUp>

              <Button
                className="chat-button"
                type="submit"
                onClick={handleSend}
                disabled={isLoading}
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
