import StatusColor from "./StatusColor";
export default function TaskCard({ task }) {
  const { title, status, description, category, timestamp } = task;

  return (
    <div className="mb-10 h-[150px] border rounded shadow hover:shadow-lg cursor-pointer p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description.slice(0, 40)}</p>
      <div className="mt-2">
        <StatusColor status={status} />
      </div>
      <span className="text-xs text-gray-500 block mt-2">Category: {category}</span>
      <span className="text-xs text-gray-400 block mt-1">
        {new Date(timestamp).toLocaleString()}
      </span>
    </div>
  );
}
