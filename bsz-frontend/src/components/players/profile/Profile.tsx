import React, { useState } from "react";
import { PlayerUpdateDTO } from "../../../dto/PlayerUpdateDTO";
import { fieldComponents } from "../records/FieldComponent";
import { formatPlayerData } from "../utils/FormatPlayerData"; 
import ViewField from "./ViewField"; 

const initialPlayerData: PlayerUpdateDTO = {
  lastName: "Doe",
  firstName: "John",
  phoneNr: "0123456789",
  email: "john.doe@example.com",
  seriaNr: "AB123456",
  fbLink: "https://facebook.com/john.doe",
  external: false,
  kmdszID: "123456",
};

const Profile: React.FC = () => {
  
  const [playerData, setPlayerData] = useState<PlayerUpdateDTO>(formatPlayerData(initialPlayerData));
  const [editingField, setEditingField] = useState<string | null>(null);

  const updateField = (field: keyof PlayerUpdateDTO, value: any) => {
    const updatedData = formatPlayerData({
      ...playerData,
      [field]: value,
    });
    setPlayerData(updatedData);
  };

  const renderComponent = (fieldKey: keyof PlayerUpdateDTO, value: any) => {
    const { Component } = fieldComponents[fieldKey];

    const props = {
      fieldValue: value,
      setFieldValue: (val: any) => updateField(fieldKey, val),
    };

    return <Component {...props} />;
  };

  return (
    <div>
      <h2>Player Profile</h2>

      {Object.entries(playerData).map(([key, value]) => {
        const fieldKey = key as keyof PlayerUpdateDTO;
        const { label } = fieldComponents[fieldKey];

        return (
          <div
            key={fieldKey}
            style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
          >
            <button
              onClick={() =>
                editingField === key
                  ? setEditingField(null) 
                  : setEditingField(key) 
              }
              style={{ marginRight: "1rem" }}
            >
              {editingField === key ? "Save" : "Edit"}
            </button>
            <label htmlFor={key} style={{ fontWeight: "bold", marginRight: "1rem" }}>
              {label}:
            </label>
            {editingField === key ? (
              renderComponent(fieldKey, value) 
            ) : (
              <ViewField fieldKey={fieldKey} value={value} /> 
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
