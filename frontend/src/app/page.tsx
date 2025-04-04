'use client';
import { useState, useEffect } from 'react';
import { fetchItems, createItem, deleteItem, Item } from '@/lib/api';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  const handleCreate = async () => {
    if (!newTitle || !newPhoto) return;
    const newItem = await createItem(newTitle, newPhoto);
    if (newItem) setItems((prev) => [...prev, newItem]);
    setNewTitle('');
    setNewPhoto('');
  };

  const handleDelete = async (id: number) => {
    if (await deleteItem(id)) {
      setItems((prev) => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>📸 Gallery</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleCreate} className={styles.addButton}>Add Item</button>
        </div>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.card}>
              <img src={item.photo} alt={item.title} className={styles.itemImage} />
              <span className={styles.itemTitle}>{item.title}</span>
              <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
