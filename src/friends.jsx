import React, { useState, useEffect } from "react";
import CreateComponent from "./components/createcomponent.friends";
import FormFriends from "./components/formComponent.friends";
import "./App.css";
import CreateUser from "./components/createcomponent.user";

function Friends() {
  // 1. useState ni massiv bilan boshlaymiz
  const [friends, setFriends] = useState(() => {
    const savedFriends = localStorage.getItem("friends");
    // Agar ma'lumot bo'lsa, uni parse qil, bo'lmasa bo'sh massiv qaytar
    return savedFriends ? JSON.parse(savedFriends) : [];
  });
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [friendSearch, setFriendSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);
  // 2. LocalStorage dan o'qish (useEffect kerak)
  useEffect(() => {
    const savedFriends = JSON.parse(localStorage.getItem("friends"));
    if (savedFriends) setFriends(savedFriends);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("Ma'lumotlarni olib bo'lmadi");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setUsersError(error.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // 3. LocalStorage ga saqlash (friends o'zgarganda)
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  const handleDeleteFriend = (id) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  const normalizedFriendSearch = friendSearch.trim().toLowerCase();
  const normalizedUserSearch = userSearch.trim().toLowerCase();
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(normalizedFriendSearch),
  );
  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.address?.city, user.phone]
      .join(" ")
      .toLowerCase()
      .includes(normalizedUserSearch),
  );

  return (
    <div className="friendscontent">
      <div className="api-section">
        <h1>Mening Do'stlarim</h1>

        {/* 4. Prop nomini setFriends deb yuboramiz */}
        <FormFriends setFriends={setFriends} />

        <div className="search-wrapper">
          <input
            type="text"
            className="inputfriend search-input"
            placeholder="Do'stlarni izlang"
            value={friendSearch}
            onChange={(e) => setFriendSearch(e.target.value)}
          />
        </div>

        <div className="cardsfri">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <CreateComponent
                name={friend.name}
                key={friend.id}
                onDelete={() => handleDeleteFriend(friend.id)}
              />
            ))
          ) : (
            <p className="empty-state">Hech qanday do'st topilmadi</p>
          )}
        </div>
      </div>
      <div className="api-section">
        <h2>JSONPlaceholderdan olingan foydalanuvchilar</h2>

        <div className="search-wrapper">
          <input
            type="text"
            className="inputfriend search-input"
            placeholder="Foydalanuvchilarni izlang"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </div>

        {loadingUsers ? (
          <p>Yuklanmoqda...</p>
        ) : usersError ? (
          <p className="api-error">{usersError}</p>
        ) : filteredUsers.length > 0 ? (
          <div className="api-cards">
            {filteredUsers.map((user) => (
              <CreateUser key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <p className="empty-state">Hech qanday foydalanuvchi topilmadi</p>
        )}
      </div>
    </div>
  );
}

export default Friends;
