import React, { useState } from 'react';
import { Table, Button, Space, Tag, message } from 'antd';
import { STUDENT_DATA } from '../../../../../mock/mockData';

const TransportCreate = () => {
  const [transport] = useState(() => STUDENT_DATA.fees?.transport || null);
  const [departedAt, setDepartedAt] = useState(null);

  const [students, setStudents] = useState(() => {
    const t = STUDENT_DATA.fees?.transport || null;
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      roll: `2023${100 + i}`,
      stop: t?.stops?.[i % (t?.stops?.length || 1)]?.name || 'Main Chowk',
      boarded: i % 3 === 0 ? true : false,
    }));
  });

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Roll', dataIndex: 'roll', key: 'roll' },
    { title: 'Pickup Stop', dataIndex: 'stop', key: 'stop' },
    {
      title: 'Status', key: 'boarded', render: (_, record) => (
        record.boarded ? <Tag color="green">Boarded</Tag> : <Tag color="red">Not Boarded</Tag>
      )
    },
    {
      title: 'Action', key: 'action', render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => toggleBoarded(record.id)}>
            {record.boarded ? 'Mark Not Boarded' : 'Mark Boarded'}
          </Button>
        </Space>
      )
    }
  ];

  const toggleBoarded = (id) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, boarded: !s.boarded } : s));
  };

  const markAllBoarded = () => {
    setStudents((prev) => prev.map(s => ({ ...s, boarded: true })));
    message.success('All students marked as boarded');
  };

  const markDeparted = () => {
    const now = new Date();
    setDepartedAt(now.toLocaleString());
    message.success('Bus departure recorded');
  };

  const submitAttendance = () => {
    const attendance = students.map(s => ({ id: s.id, boarded: s.boarded }));
    console.log('Submitting attendance payload:', { transport: transport?.route, departedAt, attendance });
    message.success('Attendance submitted (check console)');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Bus Coordinator — Attendance</h2>
          {transport ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600"><strong>Route:</strong> {transport.route}</p>
                <p className="text-sm text-gray-600"><strong>Bus ID:</strong> {transport.busId || 'Bus 1'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600"><strong>Scheduled Pickup:</strong> {transport.timing}</p>
                <p className="text-sm text-gray-600"><strong>Stops:</strong> {transport.stops?.length ?? 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600"><strong>Departed At:</strong> {departedAt || 'Not departed'}</p>
                <div className="mt-2 space-x-2">
                  <Button type="primary" onClick={markAllBoarded}>Mark All Boarded</Button>
                  <Button onClick={markDeparted}>Record Departure</Button>
                </div>
              </div>
            </div>
          ) : (
            <p>No transport assigned.</p>
          )}
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Students on this route</h3>
            <div>
              <Button type="primary" onClick={submitAttendance}>Submit Attendance</Button>
            </div>
          </div>

          <Table dataSource={students} columns={columns} rowKey={(r) => r.id} />
        </div>
      </div>
    </div>
  );
};

export default TransportCreate;