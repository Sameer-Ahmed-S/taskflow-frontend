import { useEffect, useState } from 'react';
import { api } from './api.js';

// FR-6: tasks grouped by status columns
const COLUMNS = [
  { key: 'todo', label: 'To do' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'done', label: 'Done' },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  async function refresh() {
    try {
      setTasks(await api.listTasks());
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function onCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.createTask({ title: title.trim() }); // FR-1
      setTitle('');
      refresh();
    } catch (err) { setError(err.message); }
  }

  async function onStatusChange(task, status) {
    try {
      await api.updateTask(task.id, { status }); // FR-4
      refresh();
    } catch (err) { setError(err.message); }
  }

  async function onDelete(task) {
    try {
      await api.deleteTask(task.id); // FR-5
      refresh();
    } catch (err) { setError(err.message); }
  }

  return (
    <main>
      <h1>TaskFlow</h1>
      <form onSubmit={onCreate} className="new-task">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title…"
          maxLength={200}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="board">
        {COLUMNS.map((col) => (
          <section key={col.key} className="column">
            <h2>{col.label}</h2>
            {tasks.filter((t) => t.status === col.key).map((task) => (
              <article key={task.id} className="card">
                <strong>{task.title}</strong>
                {task.description && <p>{task.description}</p>}
                <div className="card-actions">
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task, e.target.value)}
                  >
                    {COLUMNS.map((c) => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                  <button onClick={() => onDelete(task)}>Delete</button>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
