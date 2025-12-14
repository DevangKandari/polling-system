import { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../services/socket";

export default function ChatPanel({ name }) {
  const [open, setOpen] = useState(false); // ✅ START CLOSED
  const [tab, setTab] = useState("chat");
  const [text, setText] = useState("");

  const messages = useSelector((state) => state.chat);
  const participants = useSelector((state) => state.participants);
  const role = useSelector((state) => state.role.role);

  const send = () => {
    if (!text.trim()) return;

    socket.emit("send_message", {
      message: text,
    });

    setText("");
  };

  const kick = (socketId) => {
    socket.emit("kick_user", { socketId });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg text-white"
      >
        💬
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[520px] bg-white border rounded-xl shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <div className="flex gap-6 text-sm font-medium">
              <button
                onClick={() => setTab("chat")}
                className={`pb-2 ${
                  tab === "chat"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted"
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setTab("participants")}
                className={`pb-2 ${
                  tab === "participants"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted"
                }`}
              >
                Participants
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-muted text-lg"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 text-sm">
            {tab === "chat" &&
              messages.map((m, i) => {
                const isMe = m.socketId === socket.id;

                return (
                  <div
                    key={i}
                    className={`mb-6 flex flex-col ${
                      isMe ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Name */}
                    <div
                      className={`mb-1 text-sm font-semibold ${
                        isMe
                          ? "text-primary text-right"
                          : "text-primary text-left"
                      }`}
                    >
                      {m.sender}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        isMe
                          ? "bg-primary text-white"
                          : "bg-[#373737] text-white"
                      }`}
                    >
                      {m.message}
                    </div>
                  </div>
                );
              })}

            {tab === "participants" && (
              <div>
                <div className="flex justify-between text-xs text-muted mb-3">
                  <span>Name</span>
                  {role === "teacher" && <span>Action</span>}
                </div>

                {participants.map((p) => (
                  <div
                    key={p.socketId}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                  >
                    <span>{p.name}</span>

                    {role === "teacher" && p.role === "student" && (
                      <button
                        onClick={() => kick(p.socketId)}
                        className="text-primary text-xs font-medium"
                      >
                        Kick out
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          {tab === "chat" && (
            <div className="flex items-center gap-2 px-3 py-3 border-t">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 bg-light rounded-full px-4 py-2 text-sm outline-none"
                placeholder="Type your message"
              />
              <button
                onClick={send}
                className="text-primary text-sm font-medium"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
