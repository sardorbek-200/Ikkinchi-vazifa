import React from "react";

function CreateUser({user}) {
  return (
    <div className="api-card" key={user.id}>
      <h3>{user.name}</h3>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>City:</strong> {user.address.city}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
    </div>
  );
}

export default CreateUser;
