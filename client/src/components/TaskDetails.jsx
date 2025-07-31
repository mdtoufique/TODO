import { useState, useEffect } from "react";
import { editTask, deleteTask } from "../api";
import toast from "react-hot-toast";
export default function TaskDetails({
	isOpen,
	onClose,
	reloadTrigger,
	_id,
	title,
	category,
	description,
	loading,
	status,
	timestamp,
}) {
	const statusColors = {
		PENDING: "bg-yellow-200 text-gray-800",
		ONGOING: "bg-blue-200 text-blue-800",
		COLLABORATIVE_TASK: "bg-indigo-200 text-yellow-800",
		DONE: "bg-green-200 text-green-800",
	};

	const [editTitle, setEditTitle] = useState(title || "");
	const [editDescription, setEditDescription] = useState(description || "");
	const [editStatus, setEditStatus] = useState(status || "");
	const [editCategory, setEditCategory] = useState(category || "");
	const [editTimestamp, setEditTimestamp] = useState(() =>
		timestamp ? new Date(timestamp).toISOString().split("T")[0] : ""
	);

	const [infoVisible, setInfoVisible] = useState(true);
	const [inputVisible, setInputVisible] = useState(false);
	const statuses = ["PENDING", "ONGOING", "COLLABORATIVE_TASK", "DONE"];
	const handleEditClick = () => {
		setInfoVisible((prev) => !prev);
		setInputVisible((prev) => !prev);
	};

	useEffect(() => {
		if (isOpen) {
			setInfoVisible(true);
			setInputVisible(false);
			setShowDeleteConfirm(false);

			setEditTitle(title);
			setEditDescription(description);
			setEditStatus(status);
			setEditCategory(category);
			setEditTimestamp(timestamp);
		}
	}, [isOpen, title, description, status, timestamp, category]);
	useEffect(() => {
		if (onClose) {
			setInfoVisible(true);
			setInputVisible(false);
			setShowDeleteConfirm(false);
		}
	}, [onClose, title, description, status, category, timestamp]);

	const [congrats, setCongrats] = useState(false);

	async function handleSubmit() {
		const updatedTask = {
			_id,
			title: editTitle,
			description: editDescription,
			status: editStatus,
			timestamp: editTimestamp,
			category: editCategory,
		};
		try {
			await editTask(updatedTask);
			if (editStatus === "DONE") {
				setCongrats(true);
			} else {
				toast.success("Task Updated Successfully!!!");
				onClose();
			}
			reloadTrigger();
		} catch (err) {
			const msg =
				err.response?.data?.message ||
				"Edit Task failed : UNKNOWN ERROR.";
			toast.error(`Edit task failed: ${msg}`);
		}
	}
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	async function handleDelete() {
		try {
			await deleteTask(_id);
			toast.success("Task Deleted Successfully.");
			setShowDeleteConfirm(false);
			reloadTrigger();

			onClose();
		} catch (err) {
			const msg =
				err.response?.data?.message ||
				"Delete Task failed : UNKNOWN ERROR.";
			toast.error(`Delete task failed: ${msg}`);
		}
	}
	if (!isOpen) return null;

	if (loading) {
		return (
			<>
				<div
					className="fixed inset-0 bg-black opacity-50 z-40"
					onClick={onClose}
				></div>
				<div className="fixed z-50 inset-1/4 bg-white w-[50%] p-6 rounded-xl shadow-xl flex items-center justify-center">
					<p className="text-gray-600 font-semibold">
						Loading data...
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			<div
				className="fixed inset-0 bg-black opacity-50 z-40"
				onClick={onClose}
			></div>
			<div className="fixed z-50 bg-white fixed top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 w-[90%] h-[85%] p-6 rounded-xl shadow-xl flex flex-col gap-4">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-xl font-bold">Task Details</h2>
					{inputVisible && (
						<h1 className="text-sm font-bold text-center rounded text-red-600 bg-gray-100">
							✏️ Editing Task ✏️
						</h1>
					)}
					<div className="flex gap-2">
						<button
							onClick={handleEditClick}
							className="px-4 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500"
						>
							✏️ Edit Task
						</button>
						<button
							onClick={onClose}
							className="px-4 py-1 text-sm bg-emerald-400 text-gray-800 rounded hover:bg-emerald-500"
						>
							Back
						</button>
					</div>
				</div>

				<div className="border-b border-gray-300 w-full"></div>

				<div className="flex gap-6 p-4">
					{/* Logo */}
					<div className="w-20 h-20 bg-emerald-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
						🖌️
					</div>

					<div className="flex-1">
						{infoVisible && (
							<h3 className="text-2xl mb-[20px] font-bold text-gray-900 cursor-pointer">
								{title}
							</h3>
						)}

						{/* {inputVisible && (
							<input
								type="text"
								className="text-2xl font-bold text-gray-900 w-full border-b border-gray-300 p-1 focus:outline-none"
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
								placeholder={editTitle}
							/>
						)} */}
						{inputVisible && (
							<input
								type="text"
								maxLength={50}
								className="bg-gray-100 text-base font-medium text-gray-700 border border-gray-300 rounded p-2 mb-[20px] w-full text-xl font-bold text-gray-900 rounded bg-gray-100 border-b border-gray-300 pb-1
               			placeholder-gray-400 "
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
								placeholder={editTitle}
							/>
						)}

						{infoVisible && (
							<p className="mb-[20px] text-gray-600 text-sm leading-relaxed">
								{description || "No description available. "}
							</p>
						)}

						{/* {inputVisible && (
							<textarea
								className="w-[100%] text-gray-600 text-sm leading-relaxed"
								placeholder={editDescription}
								value={editDescription}
								onChange={(e) =>
									setEditDescription(e.target.value)
								}
							/>
						)} */}

						{inputVisible && (
							<textarea
								maxLength={200}
								className="bg-gray-100 mb-[20px] w-full h-24 p-2 text-gray-700 text-sm leading-relaxed border border-gray-300 rounded resize-none
               					focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
								placeholder={editDescription}
								value={editDescription}
								onChange={(e) =>
									setEditDescription(e.target.value)
								}
							/>
						)}

						<div className=" flex items-center  gap-6 mb-[15px]">
							<div>
								<p className="text-sm text-gray-500">
									End Date
								</p>
								<div className="flex items-center gap-2">
									<span className="text-lg">📅</span>
									{infoVisible && (
										<p className="text-base font-medium text-gray-700">
											{new Date(
												timestamp
											).toLocaleDateString("en-US", {
												weekday: "long",
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									)}

									{inputVisible && (
										<input
											type="date"
											className="bg-gray-100 text-base font-medium text-gray-700 border border-gray-300 rounded p-2"
											value={editTimestamp}
											onChange={(e) =>
												setEditTimestamp(e.target.value)
											}
										/>
									)}
								</div>
							</div>
							<div>
								<p className="text-sm text-gray-500">
									Category
								</p>
								<div className="flex items-center gap-2">
									{infoVisible && (
										<span className="text-base font-medium text-gray-700 ">
											{editCategory}
										</span>
									)}
									{inputVisible && (
										<input
											type="text"
											maxLength={50}
											className="bg-gray-100 text-base font-medium text-gray-700 border border-gray-300 rounded p-2"
											value={editCategory}
											placeholder={editCategory}
											onChange={(e) =>
												setEditCategory(e.target.value)
											}
										/>
									)}
								</div>
							</div>
						</div>

						<div className=" mt-4">
							<div className="mb-[20px]">
								<p className="text-xl">Status</p>
								<div className="flex items-center gap-2">
									<span
										className={`w-3 h-3 rounded-full inline-block ${
											status === "PENDING"
												? "bg-yellow-500"
												: status === "ONGOING"
												? "bg-blue-500"
												: status ===
												  "COLLABORATIVE_TASK"
												? "bg-indigo-500"
												: "bg-green-500"
										}`}
									/>
									<span
										className={`text-base rounded-full font-medium p-1 ${statusColors[status]}`}
									>
										{status}
									</span>
								</div>
							</div>

							<label className="block text-sm text-gray-600 font-medium mb-1">
								Change Status
							</label>
							<select
								className="bg-gray-100 w-[200px] p-2 border border-gray-300 rounded"
								value={editStatus}
								onChange={(e) => setEditStatus(e.target.value)}
							>
								{statuses.map((status) => (
									<option key={status} value={status}>
										{status}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-4 mt-auto">
					<button
						onClick={() => setShowDeleteConfirm(true)}
						className="px-6 py-2 bg-red-200 text-red-700 rounded hover:bg-red-300"
					>
						Delete Task
					</button>
					<button
						onClick={handleSubmit}
						className="px-6 py-2 bg-emerald-400 text-white rounded hover:bg-emerald-500"
					>
						Submit
					</button>
				</div>
				{showDeleteConfirm && (
					<div className="absolute inset-0 bg-white z-50 rounded-xl flex items-center justify-center">
						<div className="bg-white  max-w-md p-6 rounded-xl  text-center flex flex-col items-center gap-6">
							<img
								src="/delete.jpg"
								loading="lazy"
								alt="Delete Icon"
								className="w-[100%]"
							/>
							<p className="text-lg font-semibold text-gray-800">
								Are you sure you want to delete this task?
							</p>
							<div className="flex gap-4">
								<button
									onClick={handleDelete}
									className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								>
									Yes, Delete
								</button>
								<button
									onClick={() => setShowDeleteConfirm(false)}
									className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
								>
									No, Cancel
								</button>
							</div>
						</div>
					</div>
				)}
				{congrats && (
					<div
						onClick={() => {
							setCongrats(false);
							onClose();
						}}
						className="absolute inset-0 bg-white z-50 rounded-xl flex items-center justify-center"
					>
						<div className="bg-white  max-w-md p-6 rounded-xl  text-center flex flex-col items-center gap-6">
							<img
								src="/congrats.jpg"
								loading="lazy"
								alt="Delete Icon"
								className="w-[100%]"
							/>
							<p className="text-lg font-semibold text-gray-800">
								SUCCESSFULLY COMPLETED THE TASK!!!
							</p>
							<div className="flex gap-4">
								<button
									onClick={() => {
										setCongrats(false);
										onClose();
									}}
									className="px-6 py-2 bg-green-500 text-white rounded hover:bg-red-600"
								>
									Thanks!!!
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
