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
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <h1 className={styles.heading}>📸 Gallery</h1>

        <div className={styles.inputSection}>
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
          <button onClick={handleCreate} className={styles.addButton}>Add</button>
        </div>

        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={item.photo} alt={item.title} className={styles.itemImage} />
              </div>
              <span className={styles.itemTitle}>{item.title}</span>
              <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
