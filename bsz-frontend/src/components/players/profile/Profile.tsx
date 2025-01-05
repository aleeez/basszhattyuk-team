import React, { useState, useEffect } from "react";
import { PlayerDisplayedProfileDTO } from "../../../dto/PlayerUpdateDTO";
import { formatPlayerData } from "../utils/FormatPlayerData";
import { usePlayer } from "../../../hooks/usePlayer";
import { buildPatchPayload, mapToDisplayedProfile } from "../utils/MapPlayerData";
import InputList from "./InputList";

const Profile: React.FC = () => {
  const { data: playerData, isLoading, isError } = usePlayer();
  const [formattedPlayerData, setFormattedPlayerData] = useState<PlayerDisplayedProfileDTO | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedFields, setEditedFields] = useState<Record<string, any>>({});

  useEffect(() => {
    if (playerData) {
      setFormattedPlayerData(formatPlayerData(mapToDisplayedProfile(playerData)));
    }
  }, [playerData]);


  const handleChanges = async () => {
    if (!formattedPlayerData || !editedFields || Object.keys(editedFields).length === 0) {
      return;
    }

    const patchPayload = buildPatchPayload(editedFields);
    console.log(patchPayload);
  };

  const toggleEditingMode = () => {
    if (isEditing) {
      setIsEditing(false);
      handleChanges();
    } else {
      setIsEditing(true);
    }
  };

  const getEditButtonText = () => {
    return isEditing ? "Cancel Edit" : "Edit Profile";
  };

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
        onClick={toggleEditingMode}
        style={{ marginBottom: "1rem" }}
      >
        {getEditButtonText()}
      </button>

      <InputList
        formattedPlayerData={formattedPlayerData}
        isEditing={isEditing}
        setFormattedPlayerData={setFormattedPlayerData}  
        setEditedFields={setEditedFields}  
      />
    </div>
  );
};

export default Profile;
