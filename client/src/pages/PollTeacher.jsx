import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../services/socket";
import { useDispatch } from "react-redux";
import { setPoll } from "../redux/pollSlice";
import { useState, useEffect } from "react";

export default function PollTeacher() {
  const [pollEnded, setPollEnded] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const poll = useSelector((state) => state.poll);

  useEffect(() => {
    socket.on("poll_ended", (finalPoll) => {
      dispatch(setPoll(finalPoll)); // ✅ keep data
      setPollEnded(true);
    });

    return () => socket.off("poll_ended");
  }, []);

  // If no poll yet
 // Case 1: No poll has ever been asked
if (!poll.question && !poll.ended) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      Waiting for responses...
    </div>
  );
}


 {poll.ended && (
  <div className="mt-10 flex justify-center gap-6">
    <button
      onClick={() => navigate("/teacher/create")}
      className="rounded-full bg-primary px-10 py-4 text-white"
    >
      + Ask a new question
    </button>

    <button
      onClick={() => {
        socket.emit("get_poll_history");
        navigate("/teacher/history");
      }}
      className="rounded-full bg-primary px-8 py-3 text-white"
    >
      View Poll history
    </button>
  </div>
)}


  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="w-full max-w-[900px] px-6">
        {/* QUESTION */}
        <h2 className="text-xl font-semibold mb-8 text-center">
          {poll.question}
        </h2>

        {/* OPTIONS */}
        {poll.options.map((opt, idx) => {
          const percent = totalVotes
            ? Math.round((opt.votes / totalVotes) * 100)
            : 0;

          return (
            <div key={idx} className="flex items-center gap-4 mb-5">
              <div className="w-32 text-dark">{opt.text}</div>

              <div className="flex-1 bg-light rounded">
                <div
                  className="bg-primary text-white px-3 py-2 rounded transition-all"
                  style={{ width: `${percent}%` }}
                >
                  {percent}%
                </div>
              </div>

              <span className="w-10 text-right text-dark">{opt.votes}</span>
            </div>
          );
        })}

        {/* ACTION BUTTONS (ONLY AFTER POLL ENDS) */}
        {poll.hasEnded && (
          <div className="mt-12 flex justify-center gap-6">
            <button
              onClick={() => navigate("/teacher/create")}
              className="rounded-full bg-primary px-10 py-4 text-white font-medium"
            >
              + Ask a new question
            </button>

            <button
              onClick={() => {
                socket.emit("get_poll_history");
                navigate("/teacher/history");
              }}
              className="rounded-full bg-primary px-8 py-3 text-white font-medium"
            >
              View Poll history
            </button>
          </div>
        )}
      </div>

      {/* CHAT BUTTON */}
      <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg text-white">
        💬
      </button>
    </div>
  );
}
