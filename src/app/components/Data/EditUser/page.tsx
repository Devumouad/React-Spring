import { Dialog, Transition } from '@headlessui/react';
import React, { useEffect, useState, ChangeEvent } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

interface EditUserProps {
  userId: string;
  setResponseUser: (user: User) => void;
  setUserId: (userId: string | '') => void;
}

function EditUser({ userId, setResponseUser, setUserId }: EditUserProps): JSX.Element {
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`http://localhost:8191/api/v1/users/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const userData = await response.json();
        setUser(userData);
        setIsOpen(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchData();
    }

  }, [userId]);

  if (open) {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  const closeModal = (): void => {
    setIsOpen(false);
    setUserId('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8191/api/v1/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const updatedUser = await response.json();
      setIsOpen(false);
      setResponseUser(updatedUser);
      setOpen(true);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <Transition appear show={isOpen} as={"div"}>
        <Dialog as="div" className="fixed inset-0 overflow-y-scroll rounded" onClose={closeModal}>
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={"div"}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle text-left transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 sm:text-2xl">
                  Edit User
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <div className="h-14 my-4">
                      <label className='block text-gray-600 text-sm font-normal'>
                        First Name
                      </label>
                      <input
                        type="text"
                        name='firstName'
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2 text-gray-600'
                      />
                    </div>
                    <div className="h-14 my-4">
                      <label className='block text-gray-600 text-sm font-normal'>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name='lastName'
                        value={user.lastName}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2 text-gray-600'
                      />
                    </div>
                    <div className="h-14 my-4">
                      <label className='block text-gray-600 text-sm font-normal'>
                        Email
                      </label>
                      <input
                        type="email"
                        name='emailId'
                        value={user.emailId}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2 text-gray-600'
                        placeholder='JohnDoe@gmail.com'
                      />
                    </div>
                    <div className="h-14 my-14 space-x-4 pt-4">
                      <button
                        onClick={saveUser}
                        className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>
                        Save
                      </button>
                      <button
                        onClick={() => closeModal()}
                        className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={open} as={"div"} onClick={(E) => setOpen(false)}>
        <Dialog as="div" className="fixed inset-0 overflow-y-auto rounded" onClose={closeModal}>
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={"div"}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle text-left transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 sm:text-2xl">
                  User Updated successfully!
                </Dialog.Title>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default EditUser;
