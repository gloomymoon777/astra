
import {useState, useEffect} from 'react'
import './Tasks.css'

import plus from './assets/cursors/cursor.png'

function Tasks() {
    const [tasks, setTasks ] = useState(() => {
        const saved = localStorage.getItem('astra-tasks')
        return saved ? JSON.parse(saved) : []
    })

    const [newTask, setNewTask] = useState('')
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        localStorage.setItem('astra-tasks', JSON.stringify(tasks))
    }, [tasks])

    function addTask(e) {
        e.preventDefault()
        if (!newTask.trim()) return
        const task = {
            id: Date.now(),
            title: newTask.trim(),
            completed: false
        }

        setTasks(prev => [...prev, task])
        setNewTask('')
    }

    function toggleTask(id) {
        setTasks(prev => prev.map(task =>
            task.id === id ? {...task, completed: !task.completed } : task
        ))
    }

    function deleteTask(id) {
        setTasks(prev => prev.filter(task => task.id !== id))
    }
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed
        if (filter === 'completed') return task.completed
        return true
    })

    const completedCount = tasks.filter(task => task.completed).length
    const progress = tasks.length === 0 ? 0 : (completedCount/tasks.length) * 100

    return (
        <div className="tasks">
            <div className="tasks-header">
                <div className="taskprogress">
                    <div className = "tasks-count"> 
                    {String(completedCount).padStart(2,'0')} / {String(tasks.length).padStart(2,'0')}
                    </div>

                    <div className="tasks-progress-track">
                        <div className="tasks-progress-fill" style={{width: `${progress}%`}}/>
                    </div>
                </div>
                
                <div className="tasks-filters">
                {['all', 'active', 'completed'].map(option => (
                    <button key={option} className={filter === option ? 'selected' : ''} onClick={() => setFilter(option)}>
                        {option.toUpperCase()}
                    </button>
                ))}
                </div>
            </div>
            
            

            <div className="tasklist">
                {filteredTasks.length === 0 ? (
                    <div className="tasks-empty">...</div>
                ) : (
                    filteredTasks.map(task => (
                        <div className="task-item" key = {task.id}>
                            <button className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                                onClick={() => toggleTask(task.id)}>{task.completed ? <span className="check"/> :''}</button>
                            <span className={task.completed ? 'task-completed' : ''}>{task.title}</span>
                        
                        <button className='task-delete' onClick={() => deleteTask(task.id)}>–</button>
                        </div>
                    ))
                )}
            </div>


            <form className="tasks-input" onSubmit={addTask}>
                <img src={plus} />
                <input value={newTask} onChange={e => setNewTask(e.target.value)}
                    placeholder="NEW MISSION" />
                <button type="submit">▷</button>
            </form>
        </div>
    )
}

export default Tasks