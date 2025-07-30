import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function fetchTasks(category = "", status = "") {
	try {
		const params = {};
		if (category) params.category = category;
		if (status) params.status = status;
		const token = localStorage.getItem("token");
		const response = await axios.get(`${API_BASE_URL}/api/tasks`, {
			params,

			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		if (error.response?.status === 401) {
			localStorage.removeItem("token");

			window.location.href = "/login";
		}
		throw error;
	}
}

export async function editTask(updatedTask) {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.put(
			`${API_BASE_URL}/api/tasks`,
			updatedTask,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log("Task updated:", response.data);
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		if (error.response?.status === 401) {
			localStorage.removeItem("token");

			window.location.href = "/login";
		}
		throw error;
	}
}

export async function deleteTask(id) {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("Task deleted:", response.data);
		return response.data;
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		if (error.response?.status === 401) {
			localStorage.removeItem("token");

			window.location.href = "/login";
		}

		throw error;
	}
}

export async function addTasks(taskData) {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.post(
			`${API_BASE_URL}/api/tasks`,
			taskData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		if (error.response?.status === 401) {
			localStorage.removeItem("token");

			window.location.href = "/login";
		}

		throw error;
	}
}

export async function signupUser(userData) {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/api/auth/signup`,
			userData
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		throw error;
	}
}

export async function loginUser(credentials) {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/api/auth/login`,
			credentials
		);

		return response.data;
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		throw error;
	}
}
