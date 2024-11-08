import { Link } from "react-router-dom";
import {ApiMessage } from '../interfaces/ApiMessage'
import { MouseEventHandler } from "react";

interface UserCardProps {
  id: number | null,
  name: string | null,
  deleteIndvUser: (ticketId: number) => Promise<ApiMessage>
}

const UserCard = ({id, name, deleteIndvUser}:UserCardProps) => {

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
      <h3>User ID: {id} </h3>
      <h4>User Name: {name}</h4>
      <button>
        <Link to="/edit-user" state={{id: id}}>Edit</Link>
      </button>
      <button value={String(id)} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserCard;
