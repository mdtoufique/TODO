import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function fetchTasks(category = "", status = "") {
	try {
		const params = {};
		if (category) params.category = category;
		if (status) params.status = status;

		const response = await axios.get(`${API_BASE_URL}/api/tasks`, { params });
		return response.data; 
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		throw error;
	}
}


export async function editTask(updatedTask) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/tasks`, updatedTask, {
    });
    console.log('Task updated:', response.data);
    // Optionally close modal or update UI
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch("${API_BASE_URL}/api/tasks");
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const data = await response.json();
    // Assuming your API returns { categories: [...] }
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}


export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/tasks/${id}`);
    console.log("Task deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}