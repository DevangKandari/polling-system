import ChatPanel from "../components/ChatPanel";

export default function KickedOut() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">You were removed</h1>
        <p className="text-muted">
          The teacher has removed you from the session.
        </p>
      </div>
      <ChatPanel></ChatPanel>
    </div>
  );
}
