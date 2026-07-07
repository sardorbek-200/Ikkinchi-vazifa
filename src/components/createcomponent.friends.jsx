import React from "react";
import { FaUserFriends } from "react-icons/fa";
import "../App.css";
import { MdDelete } from "react-icons/md";
function createcomponent({ name, onDelete }) {
  return (
    <div className="card-friend">
      <div className="fri">
        <FaUserFriends />
      </div>
      <p>{name}</p>
      <button className="delete-btn" type="button" onClick={onDelete}>
        <MdDelete className="delete-icon" />
      </button>
    </div>
  );
}

export default createcomponent;
