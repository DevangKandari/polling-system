import { useState, useEffect } from "react";
import { socket, joinSocket } from "../services/socket";
import { useNavigate } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";

export default function TeacherCreatePoll() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [timer, setTimer] = useState(60);

  // ✅ Join ONCE as teacher
  useEffect(() => {
    joinSocket("Teacher", "teacher");
  }, []);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const createPoll = () => {
    if (!question.trim() || correctIndex === null) return;

    socket.emit("create_poll", {
      question,
      options,
      correctOptionIndex: correctIndex,
      timer,
    });

    navigate("/teacher/poll");
  };

  return (
    <div className="min-h-screen bg-white px-12 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Create Poll</h1>

      <label className="block mb-2 font-medium">Question</label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full bg-light rounded p-4 mb-6"
      />

      <label className="block mb-2 font-medium">Options</label>

      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={opt}
            onChange={(e) => updateOption(e.target.value, idx)}
            className="flex-1 bg-light rounded p-3"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="correct"
              checked={correctIndex === idx}
              onChange={() => setCorrectIndex(idx)}
            />
            Correct
          </label>
        </div>
      ))}

      <button onClick={addOption} className="text-primary text-sm mb-6">
        + Add more option
      </button>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Timer</label>
        <select
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="bg-light rounded p-2"
        >
          <option value={60}>60 seconds</option>
          <option value={30}>30 seconds</option>
        </select>
      </div>

      <button
        onClick={createPoll}
        className="rounded-full bg-primary px-16 py-4 text-white font-medium"
      >
        Ask Question
      </button>

      <ChatPanel />
    </div>
  );
}
