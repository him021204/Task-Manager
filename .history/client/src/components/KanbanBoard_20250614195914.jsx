import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';
import { useSocket } from '../context/SocketContext';
import { toast } from 'react-toastify';

const statuses = ['To Do', 'In Progress', 'Done'];
const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/tasks/${projectId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setTasks(res.data));
     socket.on('task:updated', (data) => {
    toast.info(`Task "${data.title}" was updated`);
    setTasks(prev =>
      prev.map(t => t._id === data._id ? data : t)
    );
  });

  return () => {
    socket.off('task:updated');
  };
  }, [projectId]);
  

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const movedTask = tasks.find(task => task._id === draggableId);
    movedTask.status = destination.droppableId;

    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tasks/${draggableId}`, movedTask, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    setTasks(tasks.map(t => t._id === draggableId ? movedTask : t));
    socket.emit('task:updated', movedTask);
  };
const exportTasks = () => {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(res => {
    const blob = new Blob([JSON.stringify(res.data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks_export.json';
    a.click();
  });
};

  return (
    <>
      <button
      onClick={exportTasks}
      className="mb-4 bg-green-500 text-white px-3 py-1 rounded"
    >
      Export Tasks
    </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {statuses.map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 w-full rounded"
                >
                  <h2 className="text-lg font-semibold mb-2">{status}</h2>
                  {tasks
                    .filter(task => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            className="bg-white p-3 mb-2 shadow rounded cursor-pointer"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => setSelected(task._id)}
                          >
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-600">{task.priority}</div>
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
      {selected && <TaskModal taskId={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default KanbanBoard;
