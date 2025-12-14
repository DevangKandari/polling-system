import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "../redux/roleSlice";

export default function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.role.role);

  const handleContinue = () => {
    if (role === "student") navigate("/student/name");
    if (role === "teacher") navigate("/teacher/create");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[1100px] text-center px-6">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-base font-medium text-white">
            ✦ Intervue Poll
          </span>
        </div>

        <h1 className="text-[36px] font-semibold text-dark">
          Welcome to the <span className="font-bold">Live Polling System</span>
        </h1>

        <p className="mt-4 text-muted text-base max-w-2xl mx-auto">
          Please select the role that best describes you to begin using the live
          polling system
        </p>

        <div className="mt-14 flex justify-center gap-10">
          <div
            onClick={() => dispatch(setRole({ role: "student" }))}
            className={`w-[320px] rounded-xl border p-7 text-left cursor-pointer
              ${role === "student" ? "border-primary" : "border-gray-200"}`}
          >
            <h3 className="text-lg font-semibold text-dark mb-2">
              I’m a Student
            </h3>
            <p className="text-sm text-muted">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
          </div>

          <div
            onClick={() => dispatch(setRole({ role: "teacher" }))}
            className={`w-[320px] rounded-xl border p-7 text-left cursor-pointer
              ${role === "teacher" ? "border-primary" : "border-gray-200"}`}
          >
            <h3 className="text-lg font-semibold text-dark mb-2">
              I’m a Teacher
            </h3>
            <p className="text-sm text-muted">
              Submit answers and view live poll results in real-time.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <button
            onClick={handleContinue}
            className="rounded-full bg-primary px-14 py-4 text-base font-medium text-white hover:bg-secondary transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
