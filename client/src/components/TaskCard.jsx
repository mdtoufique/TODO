import StatusColor from "./StatusColor";

export default function TaskCard({ task, onClick }) {
	const { title, status, description, category, timestamp } = task;

	return (
		<div
			className="mb-8 h-[105px] border rounded shadow hover:shadow-lg cursor-pointer pt-1 pl-3"
			onClick={onClick}
		>
			<div className="flex items-center justify-between gap-2">
  <div className="flex items-center gap-2">
    <div className="mt-1 w-6 h-6 bg-gray-300 rounded flex items-center justify-center text-sm font-bold text-white">
      📝
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>

  <span className="text-xs mr-2 font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full select-none">
    {category}
  </span>
</div>

			<p className="text-sm">{description.slice(0, 40)}</p>

			<div className="flex items-center justify-between mt-6 mr-2 text-xs text-black-400">
				<span className="text-sm font-bold">
					📅{" "}
					{new Date(timestamp).toLocaleDateString("en-US", {
						day: "2-digit",
						month: "long",
						year: "numeric",
					})}
				</span>
				<div>
					<StatusColor status={status} />
				</div>
			</div>
		</div>
	);
}
