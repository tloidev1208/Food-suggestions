'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface User {
  _id: string;
  name: string;
  avatar?: string;
    createdAt: string;
}

export default function RecentlyJoined() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4 mt-4 w-80">
      <h2 className="text-lg font-semibold mb-4">Mới tham gia</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
             <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            </div>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">
                <p className="text-sm text-gray-500">
            {new Date(user.createdAt).toLocaleString()}
          </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
