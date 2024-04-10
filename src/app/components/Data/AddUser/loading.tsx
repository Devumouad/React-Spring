"use client"
import React, { useState } from 'react';
import { Transition } from "@headlessui/react";
import { Dialog } from '@headlessui/react';
import UserList from '../UserList/page';

function AddUser() {
  const USER_API_BASE_URL = "http://localhost:8191/api/v1/user";
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  });
  const [open, setOpen] = useState(false);
  const [respondedUser, setRespondedUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  if (open) {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    new  Promise((resolve) => setTimeout(()=>resolve(setIsOpen(true)), 2000))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(USER_API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _user = await response.json();
    setIsOpen(false);
    setOpen(true);
    setRespondedUser(_user);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button className='rounded bg-slate-600 text-white px-6 py-2 font-semibold' onClick={openModal}>Add user</button>
      </div>
      <Transition appear show={isOpen} as={"div"}>
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
                  Add new User
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <div className="h-14 my-4">
                      <label className='block text-gray-600 text-sm font-normal'>
                        First Name
                      </label>
                      <input
                        type="text" name='firstName'
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2 text-gray-600'></input>
                    </div>
                    <div className="h-14 my-4">
                      <label
                        className='block text-gray-600 text-sm font-normal'>
                        Last Name
                      </label>
                      <input
                        value={user.lastName}
                        type="text" name='lastName'
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2 text-gray-600' />
                    </div>
                    <div className="h-14 my-4">
                      <label className='block text-gray-600 text-sm font-normal'>
                        Email
                      </label>
                      <input
                        value={user.emailId}
                        type="email" name='emailId'
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2 text-gray-600' placeholder='JohnDoe@gmail.com'></input>
                    </div>
                    <div className="h-14 my-14 space-x-4 pt-4">
                      <button
                        onClick={saveUser}
                        className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>
                        Save
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle text-left transition-all transform bg-white shadow-xl rounded-md ">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 sm:text-2xl">
                  New User added  successfully!
                </Dialog.Title>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <UserList user={respondedUser}></UserList>
    </div>
  );
}

export default AddUser;
