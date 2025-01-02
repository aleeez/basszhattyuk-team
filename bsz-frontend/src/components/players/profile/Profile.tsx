import React, { useState, useEffect } from "react";
import { PlayerDisplayedProfileDTO } from "../../../dto/PlayerUpdateDTO";
import { fieldComponents } from "../records/FieldComponent";
import { formatPlayerData } from "../utils/FormatPlayerData";
import ViewField from "./ViewField";
import { usePlayer } from "../../../hooks/usePlayer"; 
import { mapToDisplayedProfile } from "../utils/MapPlayerData";

const Profile: React.FC = () => {
  // Fetch player data using the custom hook
  const { data: playerData, isLoading, isError } = usePlayer();
  const [formattedPlayerData, setFormattedPlayerData] = useState<PlayerDisplayedProfileDTO | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Format player data once it's fetched
  useEffect(() => {
    if (playerData) {
      setFormattedPlayerData(formatPlayerData(mapToDisplayedProfile(playerData)));
    }
  }, [playerData]);

  const updateField = (field: keyof PlayerDisplayedProfileDTO, value: any) => {
    if (formattedPlayerData) {
      const updatedData = formatPlayerData({
        ...formattedPlayerData,
        [field]: value,
      });
      setFormattedPlayerData(updatedData);
    }
  };

  const renderComponent = (fieldKey: keyof PlayerDisplayedProfileDTO, value: any) => {
    const { Component } = fieldComponents[fieldKey];

    const props = {
      fieldValue: value,
      setFieldValue: (val: any) => updateField(fieldKey, val),
    };

    return <Component {...props} />;
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading player data.</div>;
  }

  if (!formattedPlayerData) {
    return <div>No player data available.</div>;
  }

  return (
    <div>
      <h2>Player Profile</h2>

      <button
        onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
        style={{ marginBottom: "1rem" }}
      >
        {isEditing ? "Cancel Edit" : "Edit Profile"}
      </button>

      {
        Object.entries(formattedPlayerData).map(([key, value]) => {
        const fieldKey = key as keyof PlayerDisplayedProfileDTO;
        const { label } = fieldComponents[fieldKey];

        return (
          <div
            key={fieldKey}
            style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
          >
            {isEditing && (
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
            )}

            <label htmlFor={key} style={{ fontWeight: "bold", marginRight: "1rem" }}>
              {label}:
            </label>

            {isEditing && editingField === key ? (
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
