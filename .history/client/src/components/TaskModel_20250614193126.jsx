import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';

const TaskModal = ({ taskId, onClose }) => {
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const socket = useSocket();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/detail/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setTask(res.data));
    socket.on('comment:added', (newComment) => {
    if (newComment.task === taskId) {
    setTask(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));
  }
});

  }, [taskId]);

  const submitComment = async () => {
    await axios.post('http://localhost:5000/api/tasks/comment', {
      taskId,
      content: comment
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setComment('');
    socket.emit('comment:added', comment);
    onClose(); // For simplicity, close after comment
  };

  if (!task) return null;

  return (
    <Modal isOpen onRequestClose={onClose} className="bg-white p-4 rounded shadow max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p>{task.description}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Comments</h3>
        <ul className="mb-2">
          {task.comments.map((c, i) => (
            <li key={i} className="text-sm">{c.content}</li>
          ))}
        </ul>
        <textarea
          className="w-full border p-2"
          placeholder="Add comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={submitComment} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Submit</button>
      </div>
    </Modal>
  );
};

export default TaskModal;
