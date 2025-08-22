import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface User {
  id: number;
  name: string;
  email: string;
}

const BrokenComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    setCount(count + 1);
    updateUserStatus(undefined);
  };

  const updateUserStatus = (userId: number) => {
    const user = users.find(u => u.id === userId);
    user.status = 'active';
    setUsers([...users]);
  };

  const processData = (data: any) => {
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: new Date().toISOString()
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1>User Management</h1>
      <Button onClick={handleClick}>
        Click me ({count})
      </Button>
      
      <div className="mt-4">
        {users.map(user => (
          <div key={user.id} className="border p-2 mb-2">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>Status: {user.status || 'inactive'}</p>
            <Button 
              onClick={() => updateUserStatus(user.id)}
              variant="outline"
            >
              Activate User
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input 
          type="text" 
          onChange={(e) => setUsers(e.target.value)}
          placeholder="Search users..."
          className="border p-2"
        />
      </div>
    </div>
  );
};

export default BrokenComponent;