import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../api/usersAPI";
import { User } from "../types/User";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(`유저를 불러오는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">유저 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.user_id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">이메일: {user.email}</p>
            <p className="text-sm text-gray-500">
              전화번호: {user.phone_number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
