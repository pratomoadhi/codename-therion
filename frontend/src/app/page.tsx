'use client';
import { useState, useEffect } from 'react';
import { fetchItems, createItem, deleteItem, Item } from '@/lib/api';
import { FaThLarge, FaList } from 'react-icons/fa'; // grid & list icons
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') setDarkMode(true);
  }, []);
  
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

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
    <main className={`${styles.wrapper} ${darkMode ? styles.darkMode : ''}`}>
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

          <div className={styles.iconToggle}>
            <button
              onClick={() => setIsGridView(true)}
              className={isGridView ? styles.activeIcon : styles.iconButton}
              title="Grid View"
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={!isGridView ? styles.activeIcon : styles.iconButton}
              title="List View"
            >
              <FaList />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={darkMode ? styles.activeIcon : styles.iconButton}
              title="Toggle Dark Mode"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>

        <ul className={isGridView ? styles.grid : styles.list}>
          {items.map((item) => (
            <li key={item.id} className={isGridView ? styles.card : styles.rowItem}>
              {isGridView ? (
                <>
                  <div className={styles.imageWrapper}>
                    <img src={item.photo} alt={item.title} className={styles.itemImage} />
                  </div>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <span className={styles.rowText}>{item.title}</span>
                  <div className={styles.rowActions}>
                    <a href={item.photo} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>View</a>
                    <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
