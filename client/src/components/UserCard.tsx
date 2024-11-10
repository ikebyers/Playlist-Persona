import {ApiMessage } from '../interfaces/ApiMessage'
import { MouseEventHandler } from "react";

interface UserCardProps {
  id: number | null,
  username: string | null,
  name: string | null,
  email: string | null,
  deleteIndvUser: (ticketId: number) => Promise<ApiMessage>
}

const UserCard = ({id, username, name, email, deleteIndvUser}:UserCardProps) => {

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const userId = Number(event.currentTarget.value);
    if (!isNaN(userId)) {
      try {
        const data = await deleteIndvUser(userId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='u-card'>
      <h4>User ID: {id} </h4>
      <h4>Username: {username}</h4>
      <h4>Name: {name}</h4>
      <h4>email: {email}</h4>
      <button value={String(id)} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserCard;
