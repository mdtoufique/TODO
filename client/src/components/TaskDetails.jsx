export default function TaskDetails({
  isOpen,
  onClose,
  title,
  description,
  loading,
  status,
  timestamp,
}) {
  if (!isOpen) return null;

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
        <div className="fixed z-50 inset-1/4 bg-white w-[50%] p-6 rounded-xl shadow-xl flex items-center justify-center">
          <p className="text-gray-600 font-semibold">Loading data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed z-50  bg-white fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] p-6 rounded-xl shadow-xl flex flex-col gap-4">
        {/* Top: Header row */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Task Details</h2>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit Task
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-[80%] mx-auto border-b border-gray-300"></div>

        {/* Content area */}
        <div className="flex gap-6">
          {/* Left: Logo */}
          <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
            Logo
          </div>

          {/* Right: title, description, date, status */}
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-700 text-sm">
              Description: {description || "No description available."}
            </p>
            <p className="text-xs text-gray-500">
              Date:{" "}
              {new Date(timestamp).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-gray-600">
              Status: <span className="font-semibold text-blue-600">{status}</span>
            </p>
          </div>
        </div>

        {/* Footer: Submit & Delete */}
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700">
            Submit
          </button>
          <button className="px-4 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700">
            Delete Task
          </button>
        </div>
      </div>
    </>
  );
}
