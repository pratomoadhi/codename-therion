import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/items'; // Update if needed

export interface Item {
  id: number;
  title: string;
  photo: string;
}

/* 🚀 Fetch All Items */
export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

/* ➕ Create New Item */
export const createItem = async (title: string, photo: string): Promise<Item | null> => {
  try {
    const response = await axios.post<Item>(API_BASE_URL, { title, photo });
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    return null;
  }
};

/* ❌ Delete Item */
export const deleteItem = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting item:', error);
    return false;
  }
};
