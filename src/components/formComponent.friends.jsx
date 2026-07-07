import React, { useState } from "react";
import '../App.css';
// Prop nomini kichik harf bilan boshlash standart hisoblanadi (setFriends)
function FormFriends({ setFriends }) { 
  const [name, setName] = useState(""); // 1-xatolik to'g'irlandi (massiv [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; // Bo'sh bo'lsa qo'shmasin

    const friend = { id: Date.now(), name: name };
    
    // 2-xatolik to'g'irlandi (setFriends)
    setFriends((prev) => [...prev, friend]);
    
    setName(""); // Qo'shgandan keyin inputni tozalash
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="inputfriend"
        value={name} // Input qiymatini state bilan bog'lash (Controlled input)
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btnfriend">Qo'shish</button>
    </form>
  );
}

export default FormFriends;