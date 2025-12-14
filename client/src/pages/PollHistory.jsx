import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PollHistory() {
  const history = useSelector((state) => state.poll.history);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white px-10 py-8 relative">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-dark">View Poll History</h1>
      </div>

      {/* History List */}
      <div className="space-y-14 max-w-[900px] mx-auto">
        {history.map((poll, index) => {
          const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

          return (
            <div key={index}>
              <h2 className="text-lg font-medium mb-4">Question {index + 1}</h2>

              <div className="border rounded-lg overflow-hidden">
                {/* Question */}
                <div className="bg-[#4A4A4A] text-white px-4 py-3 text-sm">
                  {poll.question}
                </div>

                {/* Options */}
                <div className="p-4 space-y-4">
                  {poll.options.map((opt, idx) => {
                    const percent = totalVotes
                      ? Math.round((opt.votes / totalVotes) * 100)
                      : 0;

                    return (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-28 text-sm">{opt.text}</div>

                        <div className="flex-1 bg-light rounded">
                          <div
                            className="bg-primary text-white px-3 py-2 rounded"
                            style={{ width: `${percent}%` }}
                          >
                            {percent}%
                          </div>
                        </div>

                        <span className="w-12 text-right text-sm">
                          {opt.votes}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {history.length === 0 && (
          <div className="text-muted text-center">No polls conducted yet.</div>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-primary px-10 py-4 text-white"
        >
          Back
        </button>
      </div>

      {/* Chat Button */}
      <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg text-white">
        💬
      </button>
    </div>
  );
}
