import React, { useEffect, useState } from 'react';
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
    <div className="kanban-bg">
      <div className="kanban-container">
        <h2 className="kanban-title">Kanban Board</h2>
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
                      <div className="kanban-column-title">{col.label}</div>
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
                                {task.dueDate && (
                                  <div className="kanban-task-due">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                  </div>
                                )}
                                <div className="kanban-task-priority" style={{
                                  color:
                                    task.priority === 'High'
                                      ? '#ef4444'
                                      : task.priority === 'Medium'
                                      ? '#f59e42'
                                      : '#10b981'
                                }}>
                                  {task.priority || 'Medium'}
                                </div>
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
  );
};

export default KanbanBoard;