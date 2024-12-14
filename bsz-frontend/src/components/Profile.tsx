import React, { useState } from "react";

// Define the PlayerUpdateDTO interface
interface PlayerUpdateDTO {
  lastName: string;
  firstName: string;
  phoneNr: string;
  email: string;
  seriaNr: string;
  fbLink: string;
  external: boolean;
  kmdszID: string;
}

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

// React Component
const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
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
        <div key={key}>
          <h3>{key.replace(/([A-Z])/g, " $1")}:</h3>
          {isEditing ? (
            key === "external" ? (
              <input
                type="checkbox"
                name={key}
                checked={(tempData as any)[key]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
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
