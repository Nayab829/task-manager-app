import React, { useState } from 'react';
import { LuUsers } from 'react-icons/lu';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useEffect } from 'react';
import AvatarGroup from '../AvatarGroup';
import Modal from '../Modal';

const SelectUsers = ({ selectedUser = [], setSelectedUser = () => { } }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [tempSelectedUsers, setTempSelectedUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_ALL_USERS);
      if (response.data.length > 0) {
        setAllUsers(response.data);

      }

    } catch (error) {
      console.log(error.response?.message || error.message);

    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  const toggleUser = (userId) => {
    if (tempSelectedUsers.includes(userId)) {
      setTempSelectedUsers(tempSelectedUsers.filter(u => u !== userId));
    } else {
      setTempSelectedUsers([...tempSelectedUsers, userId]);
    }
  };
  const selectedUsersAvatars = allUsers
    .filter((user) => selectedUser.includes(user._id))
    .map((user) => user.avatar)

  const handleAssign = () => {
    setSelectedUser(tempSelectedUsers)
    setModalOpen(false)
  }


  return (
    <div className="mt-2" >
      {
        selectedUsersAvatars.length === 0 && <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-3 border border-gray-200 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-primary hover:bg-primary/10 rounded-md"
        >
          <LuUsers /> Add Members
        </button>

      }
      {selectedUsersAvatars.length > 0 &&
        <div onClick={() => setModalOpen(!modalOpen)}>
          <AvatarGroup avatars={selectedUsersAvatars} maxVisible={3} />
        </div>}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Select Users"
        >
          <div

            onClick={(e) => e.stopPropagation()}
          >


            <div className='min-h-fit max-h-[42vh] overflow-y-auto '>
              {allUsers.map(user => (
                <label key={user._id} className="flex justify-between items-center mb-2 cursor-pointer gap-4 mt-6 ">
                  <div className='w-10 h-10 rounded-full bg-gray-100'>
                    <img src={user.avatar} alt={user.name} className='w-10 h-10 rounded-full' />
                  </div>
                  <div className='flex-1 px-3'>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <input
                    type="checkbox"
                    className='cursor-pointer w-5 h-5'
                    checked={tempSelectedUsers.includes(user._id)}
                    onChange={() => toggleUser(user._id)}
                  />
                </label>
              ))}
              <div className='flex items-center gap-3 justify-end mt-10'>
                <button className='card-btn' onClick={() => setModalOpen(false)}>Cancel</button>
                <button className='card-btn-fill' onClick={handleAssign}>Done</button>
              </div>
            </div>


          </div>
        </Modal>
      )}
    </div>
  );
};

export default SelectUsers;
