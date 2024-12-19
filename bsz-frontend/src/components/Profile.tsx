import React, { useState } from "react";
import { PlayerUpdateDTO } from "../dto/PlayerUpdateDTO";

// Initial mock data
const initialPlayerData: PlayerUpdateDTO = {
  lastName: "Doe",
  firstName: "John",
  phoneNr: "0123456789",
  email: "john.doe@example.com",
  seriaNr: "AB123456",
  fbLink: "https://facebook.com/john.doe",
  external: false,
  kmdszID: "KMDSZ123456",
};

// Utility for formatting field labels
const formatLabel = (label: string) =>
  label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

// React Component
const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerUpdateDTO>(initialPlayerData);
  const [tempData, setTempData] = useState<PlayerUpdateDTO>(initialPlayerData);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setTempData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle edit mode
  const handleEdit = () => {
    if (isEditing) {
      setPlayerData(tempData); // Save changes
    }
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <h2>Player Profile</h2>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>

      {/* Dynamic Field Display */}
      {Object.entries(playerData).map(([key, value]) => (
        <div key={key} style={{ marginBottom: "1rem" }}>
          <label htmlFor={key} style={{ fontWeight: "bold" }}>
            {formatLabel(key)}:
          </label>
          {isEditing ? (
            key === "external" ? (
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={(tempData as any)[key]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={(tempData as any)[key]}
                onChange={handleChange}
              />
            )
          ) : (
            <p>{String(value)}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;
