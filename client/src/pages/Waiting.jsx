import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";

export default function Waiting() {
  const participants = useSelector((state) => state.participants);
  console.log("Participants:", participants);
  const poll = useSelector((state) => state.poll);
  const navigate = useNavigate();

  useEffect(() => {
    if (poll.active) {
      navigate("/student/poll");
    }
  }, [poll.active, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-xl">Wait for the teacher to ask questions..</p>
      <ChatPanel></ChatPanel>
    </div>
  );
}
