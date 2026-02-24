import React, { useState } from "react";
import "./chat.css";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hi! How can we help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: input },
      { type: "bot", text: "Thanks! Our team will respond shortly 😊" }
    ]);
    setInput("");
  };

  return (
    <>
      {/* ===== Floating Button ===== */}
      <div className="chat-float">
        <button className="chat-float-btn" onClick={() => setOpen(!open)}>
          💬
        </button>
      </div>

      {/* ===== Chat Window ===== */}
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>Live Support</span>
            <button className="chat-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
