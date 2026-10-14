
import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'student-planner-tasks'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY)
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
      console.error('Could not load saved tasks:', error)
      return []
    }
  })

  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Could not save tasks:', error)
    }
  }, [tasks])

  function addTask(event) {
    event.preventDefault()

    const title = taskName.trim()
    if (!title) return

    const newTask = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
    setTaskName('')
    setPriority('Medium')
    setDueDate('')
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  function clearCompletedTasks() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    )
  }

  function getDueDateStatus(task) {
    if (!task.dueDate) return 'No due date'

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const deadline = new Date(`${task.dueDate}T00:00:00`)

    if (task.completed) return `Due ${deadline.toLocaleDateString()}`
    if (deadline < today) return `Overdue · ${deadline.toLocaleDateString()}`
    if (deadline.getTime() === today.getTime()) return 'Due today'

    return `Due ${deadline.toLocaleDateString()}`
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const pendingCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <main className="app">
      <header className="header">
        <span className="eyebrow">YOUR PERSONAL WORKSPACE</span>
        <h1>Student Task Planner<span>.</span></h1>
        <p>Plan your work. Track your progress. Get things done.</p>
      </header>

      <section className="task-panel">
        <h2>Create a task</h2>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            aria-label="Task name"
            maxLength={150}
            required
          />

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            aria-label="Task priority"
            className="form-select"
          >
            <option value="Low">Low priority</option>
            <option value="Medium">Medium priority</option>
            <option value="High">High priority</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            aria-label="Task due date"
            className="date-input"
          />

          <button className="add-button" type="submit">
            + Add task
          </button>
        </form>

        <div className="summary">
          <div><strong>{tasks.length}</strong><span>Total tasks</span></div>
          <div><strong>{pendingCount}</strong><span>Pending</span></div>
          <div><strong>{completedCount}</strong><span>Completed</span></div>
        </div>
      </section>

      <section className="tasks-section">
        <div className="section-heading">
          <div>
            <h2>Your tasks</h2>
            <p>Keep moving forward, one task at a time.</p>
          </div>

          <div className="filters" aria-label="Filter tasks">
            {['All', 'Pending', 'Completed'].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? 'filter active' : 'filter'}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h3>{tasks.length === 0 ? 'A fresh start!' : 'Nothing here yet'}</h3>
            <p>
              {tasks.length === 0
                ? 'Add your first task above and make today count.'
                : 'There are no tasks in this category.'}
            </p>
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
              <article className="task-item" key={task.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark ${task.title} as ${
                      task.completed ? 'pending' : 'completed'
                    }`}
                  />

                  <span
                    className={
                      task.completed
                        ? 'task-title completed'
                        : 'task-title'
                    }
                  >
                    {task.title}
                  </span>
                </label>

                <div className="task-details">
                  <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>

                  <span
                    className={`due-date ${
                      !task.completed &&
                      task.dueDate &&
                      new Date(`${task.dueDate}T00:00:00`) <
                        new Date(new Date().setHours(0, 0, 0, 0))
                        ? 'overdue'
                        : ''
                    }`}
                  >
                    {getDueDateStatus(task)}
                  </span>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}

        {completedCount > 0 && (
          <div className="clear-completed">
            <button
              type="button"
              className="delete-button"
              onClick={clearCompletedTasks}
            >
              Clear completed tasks ({completedCount})
            </button>
          </div>
        )}
      </section>

      <footer>Made for your next small win.</footer>
    </main>
  )
}

export default App
