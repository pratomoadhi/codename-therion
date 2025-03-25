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
    <div>
      <h1>Item List</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="text"
        value={newPhoto}
        onChange={(e) => setNewPhoto(e.target.value)}
      />
      <button onClick={createItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div><img src={item.photo}></img>{item.title}</div>
            <div><button onClick={() => deleteItem(item.id)}>Delete</button></div>
          </li>
        ))}
      </ul>
    </div>
  );
}