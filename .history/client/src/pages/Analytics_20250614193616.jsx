import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [data, setData] = useState({ completed: 0, total: 0, byPriority: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setData(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Analytics</h1>

      <div className="flex gap-10">
        <div>
          <h3 className="font-semibold">Completion Rate</h3>
          <PieChart width={200} height={200}>
            <Pie data={[{ name: 'Done', value: data.completed }, { name: 'Remaining', value: data.total - data.completed }]}
                 dataKey="value" outerRadius={80} label>
              <Cell fill="#00C49F" />
              <Cell fill="#FF8042" />
            </Pie>
          </PieChart>
        </div>

        <div>
          <h3 className="font-semibold">Priority Distribution</h3>
          <BarChart width={300} height={200} data={data.byPriority}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
