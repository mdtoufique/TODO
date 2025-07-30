import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const token = localStorage.getItem("token");
export async function fetchTasks(category = "", status = "") {
	try {
		const params = {};
		if (category) params.category = category;
		if (status) params.status = status;

		const response = await axios.get(`${API_BASE_URL}/api/tasks`, { params ,
      
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
  });
		return response.data; 
	} catch (error) {
		console.error("Failed to fetch tasks:",  error?.response?.data?.message);
    
		throw error;
	}
}


export async function editTask(updatedTask) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/tasks`, updatedTask,
       {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log('Task updated:', response.data);
    // Optionally close modal or update UI
  } catch (error) {
    console.error('Error updating task:', error?.response?.data?.message);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    
    const response = await fetch("${API_BASE_URL}/api/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const data = await response.json();
    // Assuming your API returns { categories: [...] }
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:",  error?.response?.data?.message);
    return [];
  }
}


export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Task deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:",  error?.response?.data?.message);
    throw error;
  }
}



export async function addTasks(taskData) {
  try {

    const response = await axios.post(`${API_BASE_URL}/api/tasks`, taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding task:",  error?.response?.data?.message);
    throw error;
  }
}


export async function signupUser(userData) {
  try {
    // userData = { name, email, password, confirmPassword }
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, userData);
    return response.data; // e.g. user info or success message
  } catch (error) {
    console.error("Error signing up:",  error?.response?.data?.message);
    throw error;
  }
}

export async function loginUser(credentials) {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
    // Backend should return { token: "JWT_TOKEN", user: { ... } }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error?.response?.data?.message);
    throw error;
  }
}