import StatusColor from "./StatusColor";

export default function TaskCard({ task, onClick }) {
	const { title, status, description, category, timestamp } = task;

	return (
		<div
			className="mb-10 h-[100px] border rounded shadow hover:shadow-lg cursor-pointer pt-1 pl-3"
			onClick={onClick}
		>
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-sm">{description.slice(0, 40)}</p>

			<div className="flex items-center justify-between mt-6 mr-2 text-xs text-gray-400">
				<span>
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
