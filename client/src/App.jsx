import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import StudentName from "./pages/StudentName";
import Waiting from "./pages/Waiting";
import PollStudent from "./pages/PollStudent";
import PollTeacher from "./pages/PollTeacher";
import TeacherCreatePoll from "./pages/TeacherCreatePoll";
import PollHistory from "./pages/PollHistory";
import KickedOut from "./pages/KickedOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/student/name" element={<StudentName />} />
        <Route path="/student/waiting" element={<Waiting />} />
        <Route path="/student/poll" element={<PollStudent />} />
        <Route path="/student/kicked" element={<KickedOut />} />

        <Route path="/teacher/history" element={<PollHistory />} />

        <Route path="/teacher/create" element={<TeacherCreatePoll />} />
        <Route path="/teacher/poll" element={<PollTeacher />} />
        <Route path="/teacher/history" element={<PollHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
