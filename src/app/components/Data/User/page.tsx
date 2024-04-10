import React from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

interface UserProps {
  user: User;
  deleteUser: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  editUser: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const UserI: React.FC<UserProps> = ({ user, deleteUser, editUser }) => {
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (user.id !== null) {
      editUser(e, user.id);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (user.id !== null) {
      deleteUser(e, user.id);
    }
  };

  return (
    <tr className='bg-white'>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className="text-sm text-gray-500">
          {user.firstName}
        </div>
      </td>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className="text-sm text-gray-500">
          {user.lastName}
        </div>
      </td>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className="text-sm text-gray-500">
          {user.emailId}
        </div>
      </td>
      <td className='text-right px-6 py-4 whitespace-nowrap space-x-5 '>
        <button className='bg-slate-600 hover:bg-slate-400 hover:cursor-pointer rounded-md px-3 py-2 text-gray-200 font-semibold' onClick={handleEdit}>Edit</button>
        <button className='bg-red-600 hover:text-red-400 hover:cursor-pointer rounded-md px-3 py-2 text-white font-semibold' onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default UserI;
