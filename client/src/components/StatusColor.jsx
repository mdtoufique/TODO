export default function StatusColor({ status }) {
	const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
	const statusColors = {
		PENDING: "bg-yellow-200 text-gray-800",
		ONGOING: "bg-blue-200 text-blue-800",
		COLLABORATIVE_TASK: "bg-indigo-200 text-yellow-800",
		DONE: "bg-green-200 text-green-800",
		FAILED: "bg-red-200 text-red-800",
	};
	return (
		<span
			className={`${baseClasses} ${
				statusColors[status] || "bg-gray-200 text-gray-800"
			}`}
		>
			{status.replace(/_/g, " ")}
		</span>
	);
}
