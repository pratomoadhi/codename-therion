// pages/index.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  title: string;
  photo: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPhoto, setNewPhoto] = useState<string>('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get<Item[]>('http://localhost:3000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const createItem = async () => {
    try {
      await axios.post('http://localhost:3000/items', { title: newTitle, photo: newPhoto });
      setNewTitle('');
      setNewPhoto('');
      fetchItems();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Item List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={newPhoto}
          onChange={(e) => setNewPhoto(e.target.value)}
          style={styles.input}
        />
        <button onClick={createItem} style={styles.addButton}>
          Add Item
        </button>
      </div>
      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <div style={styles.itemInfo}>
              <img src={item.photo} alt={item.title} style={styles.itemImage} />
              <span style={styles.itemTitle}>{item.title}</span>
            </div>
            <button onClick={() => deleteItem(item.id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    // textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  itemImage: {
    width: '50px',
    height: '50px',
    // objectFit: 'cover',
    borderRadius: '4px',
  },
  itemTitle: {
    fontSize: '16px',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};