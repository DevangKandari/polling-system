import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "../redux/roleSlice";
import { joinSocket } from "../services/socket";

export default function StudentName() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const joinAsStudent = () => {
    if (!name.trim()) return;

    dispatch(setRole({ role: "student", name }));
    joinSocket(name, "student");

    navigate("/student/waiting");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded bg-light"
        />

        <button
          onClick={joinAsStudent}
          className="mt-6 w-full bg-primary text-white py-3 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
