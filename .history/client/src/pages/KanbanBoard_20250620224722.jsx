import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './KanbanBoard.css';

const columns = [
  { id: 'To Do', label: 'To Do' },
  { id: 'In Progress', label: 'In Progress' },
  { id: 'Completed', label: 'Completed' }
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(res.data);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Progress bar calculation
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  // Handle drag and drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${draggableId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
    } catch {
      // Optionally show error
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">Task Manager</span>
          <div className="nav-links">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/analytics" className="nav-link">Analytics</Link>
            <Link to="/kanban" className="nav-link active">Kanban</Link>
            <Link to="/calendar" className="nav-link">Calendar</Link>
            <div className="nav-profile">
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center' }}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ background: "#f1f5f9", borderRadius: "50%", padding: 8, boxShadow: "0 2px 8px #e0e7ff" }}
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 16-4 16 0" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="kanban-bg">
        <div className="kanban-container">
          <h2 className="kanban-title">Kanban Board</h2>
          <div className="kanban-progress-bar">
            <div className="kanban-progress-bar-inner" style={{ width: `${progress}%` }} />
          </div>
          {loading ? (
            <div className="kanban-status">Loading...</div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="kanban-columns">
                {columns.map(col => (
                  <Droppable droppableId={col.id} key={col.id}>
                    {(provided, snapshot) => (
                      <div
                        className={`kanban-column${snapshot.isDraggingOver ? ' dragging-over' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="kanban-column-header">
                          <div className="kanban-column-title">{col.label}</div>
                          <span className="kanban-column-count">
                            {tasks.filter(task => (task.status || 'To Do') === col.id).length}
                          </span>
                        </div>
                        {tasks
                          .filter(task => (task.status || 'To Do') === col.id)
                          .map((task, idx) => (
                            <Draggable draggableId={task._id} index={idx} key={task._id}>
                              {(provided, snapshot) => (
                                <div
                                  className={`kanban-task${snapshot.isDragging ? ' dragging' : ''}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="kanban-task-title">{task.title}</div>
                                  <div className="kanban-task-status-tag">{task.status || 'To Do'}</div>
                                  {task.description && (
                                    <div className="kanban-task-desc">
                                      {task.description.length > 60
                                        ? task.description.slice(0, 60) + '…'
                                        : task.description}
                                    </div>
                                  )}
                                  {task.dueDate && (
                                    <div className="kanban-task-due">
                                      Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </div>
                                  )}
                                  {task.assignee && (
                                    <div className="kanban-task-assignee">
                                      <span className="kanban-task-avatar">
                                        {task.assignee.name
                                          ? task.assignee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                                          : 'U'}
                                      </span>
                                      {task.assignee.name}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          )}
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;