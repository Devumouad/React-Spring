import { Dialog, Transition } from '@headlessui/react';
import React, { useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

interface DeleteDialogBoxProps {
  userForDelete: User | String;
  setUserId: (userId: string | null) => void;
  deleteUserDefintily: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function DeleteDialogBox({ userForDelete, setUserId, deleteUserDefintily, open, setOpen }: DeleteDialogBoxProps): JSX.Element {
  useEffect(() => {
    if (userForDelete) setOpen(true);
  }, [userForDelete, setOpen]);

  function closeModal(): void {
    setOpen(false);
    setUserId(null);
  }

  return (
    <Transition appear show={open} as={"div"}>
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
              <Dialog.Title as="h3" className="text-center text-lg font-medium leading-6 text-gray-900 sm:text-2xl">
                Do you really wish to delete this user??
              </Dialog.Title>
              <div className="flex max-w-md max-auto justify-center py-6">
                <div className='flex  space-x-6 justify-between align-middle '>
                  <button
                    onClick={(e) => {
                      if (typeof userForDelete !== 'string') {
                        const user = userForDelete as User;
                        deleteUserDefintily(e, user.id);
                      } else {
                        console.log("User ID:", userForDelete);
                      }
                    }}
                    className='rounded text-white font-semibold bg-green-600 hover:bg-green-700 py-2 px-6'>
                    Continue
                  </button>
                  <button
                    onClick={closeModal}
                    className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DeleteDialogBox;
