import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Intentional build issues for testing:

// Issue 1: Unused import
import { Dialog } from '@/components/ui/dialog';

// Issue 2: TypeScript error - missing interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Issue 3: Component with TypeScript errors
const UserCard = ({ user }: { user: User }) => {
  // Issue 4: Accessing property that doesn't exist
  const displayName = user.fullName || user.name;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{displayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user.email}</p>
        {/* Issue 5: Using undefined variable */}
        <p>Status: {userStatus}</p>
      </CardContent>
    </Card>
  );
};

// Issue 6: Async component without proper handling
const DataFetcher = async () => {
  const data = await fetch('/api/users');
  return <div>{data}</div>;
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Issue 7: useEffect with missing dependency
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      // Issue 8: TypeScript error with error handling
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Issue 9: Function with wrong return type annotation
  const handleSubmit = (e: React.FormEvent): string => {
    e.preventDefault();
    
    // Issue 10: Accessing undefined method
    const userId = Math.random().toInteger();
    
    const user: User = {
      id: userId,
      name: newUser.name,
      email: newUser.email,
    };
    
    setUsers([...users, user]);
    setNewUser({ name: '', email: '' });
  };

  // Issue 11: Conditional rendering with potential null reference
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      {error && (
        <Alert className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Add User</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Issue 12: Component that doesn't exist */}
      <DataFetcher />
      
      {/* Issue 13: Missing closing tag */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <p>Total Users: {users.length}</p>
      
    </div>
  );
}