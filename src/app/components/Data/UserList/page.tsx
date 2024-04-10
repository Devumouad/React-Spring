import React, { useEffect, useState } from 'react';
import DeleteDialogBox from '../DeleteDialogBox/page';
import EditUser from '../EditUser/page';
import UserI from '../User/page';

interface UserListProps {
  user: any; // Define the type of the 'user' prop
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

export default function UserList({ user }: UserListProps): JSX.Element {
  const thClass = "text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6 ";
  const thClassActions = "text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6 ";
  const USER_API_BASE_URL = "http://localhost:8191/api/v1/users";
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [userForDelete, setUserForDelete] = useState<string | null>(null); // Change type to string
  
  const [userId, setUserId] = useState<string>('');

  const [responseUser, setResponseUser] = useState<User | null>(null);

  const deleteUserDefintily = (e: React.MouseEvent<HTMLButtonElement>, id: string): void => {
    e.preventDefault();
    fetch(`http://localhost:8191/api/v1/users/${id}`, { method: 'DELETE' })
      .then((res) => {
        setOpen(false);
        setUsers(prevUsers => prevUsers?.filter(u => u.id !== id) || []);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(USER_API_BASE_URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, responseUser]);

  const editUser = (e: React.MouseEvent<HTMLButtonElement>, id: string): void => {
    e.preventDefault();
    setUserId(id);
  };

  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>, id: string): void => { // Update parameter type to string
    e.preventDefault();
    setUserForDelete(id); // Set the user ID directly
  };

  return (
    <div className='container mx-auto my-8'>
      <div className="flex shadow border">
        <table className="min-w-full leading-normal text-black">
          <thead className='bg-gray-50'>
            <tr>
              <th className={thClass}>First Name</th>
              <th className={thClass}>Last Name</th>
              <th className={thClass}>Email</th>
              <th className={thClassActions}>Actions</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {users?.map((user) => (
                <UserI user={user} key={user.id} deleteUser={deleteUser} editUser={editUser} />
              ))}
            </tbody>
          )}
        </table>
      </div>
      <EditUser userId={userId} setUserId={setUserId} setResponseUser={setResponseUser} />
      {userForDelete && (
        <DeleteDialogBox
          userForDelete={userForDelete}
          open={open}
          setOpen={setOpen}
          deleteUserDefintily={deleteUserDefintily}
          setUserId={setUserForDelete}
        />
      )}
    </div>
  );
}
