import { useRef, useState, useEffect } from "react";
import Message from "./Message";
import Button from "../widgets/Button";
import { useChatStore } from "../../store/useChatStore";
import Swal from "sweetalert2";

const AiChat = ({ cultivoId, onBack }) => {
  const [input, setInput] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [pendingMessage, setPendingMessage] = useState(null);
  const messagesEndRef = useRef(null);

  // Obtener el store completo y derivar valores sin usar useCallback
  const {
    chats,
    loading,
    initialLoading,
    loadChats,
    sendMessage,
    clearChat,
  } = useChatStore();

  const chatList = chats[cultivoId] || [];
  const isInitialLoading = !!initialLoading?.[cultivoId];
  const isSendingMessage = !!loading?.[cultivoId];

  // Cargar chats al montar o cambiar cultivoId
  useEffect(() => {
    if (cultivoId) {
      loadChats(cultivoId);
    }
  }, [cultivoId]);

  // Loader de 2 segundos al montar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll automático al fondo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList, pendingMessage]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    
    // Crear mensaje temporal del usuario
    const userMessage = {
      id: `temp-${Date.now()}`,
      pregunta: input,
      respuesta: null,
      isPending: true
    };
    
    setPendingMessage(userMessage);
    const currentInput = input;
    setInput("");

    try {
      await sendMessage(cultivoId, currentInput);
      // Limpiar mensaje temporal cuando se recibe la respuesta
      setPendingMessage(null);
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setPendingMessage(null);
    }
  };

  const handleClear = async () => {

    const result = await Swal.fire({
      title: "¿Estas seguro de eliminar el chat?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire(
          "¡Eliminado!",
          "El chat ha sido eliminado correctamente.",
          "success"
        );
        await clearChat(cultivoId);
        setPendingMessage(null);
      } catch {
        Swal.fire("Error", "No se pudo eliminar el chat.", "error");
      }
    }
  };

  // Crear lista de mensajes intercalados
  const createMessageList = () => {
    const messages = [];
    
    // Agregar mensajes existentes
    chatList.forEach((chat) => {
      // Mensaje del usuario
      messages.push({
        id: chat.id,
        from: "user",
        text: chat.pregunta,
        timestamp: chat.fechaCreacion
      });
      
      // Respuesta de la IA
      if (chat.respuesta) {
        messages.push({
          id: `${chat.id}-resp`,
          from: "ai",
          text: chat.respuesta,
          timestamp: chat.fechaCreacion
        });
      }
    });
    
    // Agregar mensaje temporal del usuario si existe
    if (pendingMessage) {
      messages.push({
        id: pendingMessage.id,
        from: "user",
        text: pendingMessage.pregunta,
        isPending: true
      });
    }
    
    return messages;
  };

  const messageList = createMessageList();

  // Mostrar loader inicial de 2 segundos
  if (showLoader) {
    return (
      <div className="ai-chat-section w-full h-full">
        <div className="ai-chat-box d-flex flex-column">
          <div className="ai-chat-loader">
            <div className="ai-chat-loader-icon"></div>
            <div className="ai-chat-loader-text">Inicializando asistente...</div>
            <div className="ai-chat-loader-subtitle">Preparando todo para ayudarte</div>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar loading inicial mientras se cargan los chats
  if (isInitialLoading) {
    return (
      <div className="ai-chat-section w-full h-full">
        <div className="ai-chat-box d-flex flex-column">
          <div className="ai-chat-loader">
            <div className="ai-chat-loader-icon"></div>
            <div className="ai-chat-loader-text">Cargando conversación...</div>
            <div className="ai-chat-loader-subtitle">Recuperando mensajes anteriores</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-chat-section w-full h-full">
      <div className="ai-chat-box d-flex flex-column">
        {/* Header con botón de volver */}
        <div className="ai-chat-header">
          <button 
            className="ai-chat-back-button"
            onClick={onBack}
            type="button"
          >
            <ion-icon name="arrow-back"></ion-icon>
            <span>Volver</span>
          </button>
          <h3 className="ai-chat-title">Asistente Virtual</h3>
        </div>

        <div className="message-historial d-flex flex-column gap-2 w-full h-full">
          {messageList.length === 0 ? (
            <div className="ai-chat-welcome">
              <div className="ai-chat-welcome-icon">
                <ion-icon name="chatbubble-ellipses"></ion-icon>
              </div>
              <h2 className="ai-chat-welcome-title">
                ¿Cómo puedo ayudarte?
              </h2>
              <p className="ai-chat-welcome-text">
                Hola 👋, soy tu asistente virtual. Estoy aquí para ayudarte con
                tus cultivos. Escribe tu mensaje y comencemos.
              </p>
            </div>
          ) : (
            messageList.map((message) => (
              <Message
                key={message.id}
                message={message}
              />
            ))
          )}

          {/* Mostrar "Pensando..." solo cuando se está enviando un mensaje */}
          {isSendingMessage && (
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

        {/* Área de input y botones separados */}
        <div className="ai-chat-bottom-section">
          {/* Contenedor de input */}
          <div className="ai-chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              disabled={isSendingMessage}
            />
          </div>

          {/* Botones de acción separados */}
          <div className="ai-chat-actions">
            <button
              className="chat-button clear-chat"
              type="button"
              onClick={handleClear}
            >
              <ion-icon name="trash-outline"></ion-icon>
              Nueva Conversación
            </button>

            <Button
              className="chat-button send-button"
              type="submit"
              onClick={handleSend}
              disabled={isSendingMessage}
            >
              <ion-icon name="arrow-up"></ion-icon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
