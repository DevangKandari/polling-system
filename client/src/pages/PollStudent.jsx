import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../services/socket";

export default function PollStudent() {
  const poll = useSelector((state) => state.poll);

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  /* =========================
     RESET ON NEW POLL
  ========================= */
  useEffect(() => {
    if (poll.active) {
      setSelected(null);
      setSubmitted(false);
    }
  }, [poll.active, poll.question]);

  /* =========================
     SUBMIT ANSWER
  ========================= */
  const submit = () => {
    if (selected === null || submitted || !poll.active) return;

    socket.emit("submit_answer", {
      optionIndex: selected,
    });

    setSubmitted(true);
  };

  /* =========================
     WAITING STATE
  ========================= */
  if (poll.ended) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-muted">
          Wait for the teacher to ask a new question..
        </div>

        <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg text-white">
          💬
        </button>
      </div>
    );
  }

  /* =========================
     NO POLL YET
  ========================= */
  if (!poll.question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-muted">
          Waiting for the teacher to start the poll...
        </div>
      </div>
    );
  }

  /* =========================
     ACTIVE POLL UI
  ========================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="w-full max-w-[900px] px-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-medium">{poll.question}</h2>
        </div>

        <div className="space-y-4">
          {poll.options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => !submitted && setSelected(idx)}
              className={`cursor-pointer border p-4 rounded-lg transition
                ${selected === idx ? "border-primary" : "border-gray-200"}
                ${submitted ? "opacity-50 pointer-events-none" : ""}`}
            >
              {opt.text}
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={submit}
            disabled={submitted || !poll.active}
            className="rounded-full bg-primary px-12 py-3 text-white font-medium disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>

      {/* CHAT BUTTON */}
      <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg text-white">
        💬
      </button>
    </div>
  );
}
