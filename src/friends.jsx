import React, { useState, useEffect } from "react";
import CreateComponent from "./components/createcomponent.friends"; // Katta harf
import FormFriends from "./components/formComponent.friends";
import "./App.css";

function Friends() {
  // 1. useState ni massiv bilan boshlaymiz
  const [friends, setFriends] = useState(() => {
    const savedFriends = localStorage.getItem("friends");
    // Agar ma'lumot bo'lsa, uni parse qil, bo'lmasa bo'sh massiv qaytar
    return savedFriends ? JSON.parse(savedFriends) : [];
  });
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);
  // 2. LocalStorage dan o'qish (useEffect kerak)
  useEffect(() => {
    const savedFriends = JSON.parse(localStorage.getItem("friends"));
    if (savedFriends) setFriends(savedFriends);
  }, []);

  // 3. LocalStorage ga saqlash (friends o'zgarganda)
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  const handleDeleteFriend = (id) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  return (
    <div className="friendscontent">
      <h1>Mening Do'stlarim</h1>

      {/* 4. Prop nomini setFriends deb yuboramiz */}
      <FormFriends setFriends={setFriends} />

      <div className="cardsfri">
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            // 5. Katta harfli komponent nomi va return
            <CreateComponent
              name={friend.name}
              key={friend.id}
              onDelete={() => handleDeleteFriend(friend.id)}
            />
          ))
        ) : (
          <p>Hali hech qanday do'stlar yo'q</p>
        )}
      </div>
    </div>
  );
}

export default Friends;
