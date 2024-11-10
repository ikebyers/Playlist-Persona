import { ApiMessage } from "../interfaces/ApiMessage";
import { MouseEventHandler } from "react";

interface UserCardProps {
  id: number | null;
  username: string | null;
  name: string | null;
  email: string | null;
  deleteIndvUser: (ticketId: number) => Promise<ApiMessage>;
}

const UserCard = ({
  id,
  username,
  name,
  email,
  deleteIndvUser,
}: UserCardProps) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const userId = Number(event.currentTarget.value);
    if (!isNaN(userId)) {
      try {
        const data = await deleteIndvUser(userId);
        return data;
      } catch (error) {
        console.error("Failed to delete ticket:", error);
      }
    }
  };
console.log("I am in the user card: "+ id)
  return (
    <div className="u-card container-fluid card mx-auto card-color d-flex flex-column align-items-center justify-content-center">
      <div className="mt-4">
        <h5>
          <span className="fst-italic">User ID: </span>
          <span className="body-text-alt">{id}</span>
        </h5>
        <h5>
          <span className="fst-italic">Username: </span>
          <span className="body-text-alt">{username}</span>
        </h5>
        <h5>
          <span className="fst-italic">Name: </span>
          <span className="body-text-alt">{name}</span>
        </h5>
        <h5>
          <span className="fst-italic">Email: </span>
          <span className="body-text-alt">{email}</span>
        </h5>
        <button
          className="btn-medium w-50 mx-auto center"
          value={String(id)}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
