import React, { useState, useEffect } from "react";
import { PlayerDisplayedProfileDTO } from "../../../dto/PlayerUpdateDTO";
import { formatPlayerData } from "../utils/FormatPlayerData";
import { usePatchPlayer, usePlayer } from "../../../hooks/usePlayer";
import { buildPatchPayload, mapToDisplayedProfile } from "../utils/MapPlayerData";
import InputList from "./InputList";

const Profile: React.FC = () => {
  const { data: playerData, isLoading, isError } = usePlayer();
  const [formattedPlayerData, setFormattedPlayerData] = useState<PlayerDisplayedProfileDTO | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedFields, setEditedFields] = useState<Record<string, any>>({});
  const patchPlayer = usePatchPlayer();

  useEffect(() => {
    if (playerData) {
      setFormattedPlayerData(formatPlayerData(mapToDisplayedProfile(playerData)));
    }
  }, [playerData]);


  const handleChanges = async () => {
    if (!formattedPlayerData || !editedFields || Object.keys(editedFields).length === 0) {
      return;
    }

    const patchPayload: any = buildPatchPayload(editedFields);
    console.log(patchPayload);
    patchPlayer.mutate(patchPayload);

  };

  const toggleEditingMode = () => {
    const validateInputs = (): boolean => {
      let isValid = true;
      
      // Iterate over the edited fields and check their validity
      Object.entries(editedFields).forEach(([key, value]) => {
        // Find the input element associated with the field
        const inputElement: HTMLInputElement | null = document.querySelector("#phoneNr");
        console.log(inputElement);
  
        if (inputElement && !inputElement.checkValidity()) {
          console.log("invalid");
          isValid = false;
          // Optionally, you can add a visual indication of the error on the input field
          inputElement.setCustomValidity("This field is required");  // Customize this validation message
        } else if (inputElement) {
          // Reset the custom validity message if the input is valid
          inputElement.setCustomValidity('haha');
          console.log("valid");
        }
        else {
          console.log("tfffff");
        }
      });
  
      console.log(isValid);
      return isValid;
    };
  
    if (isEditing) {
      // Only turn off editing mode if the inputs are valid
      if (validateInputs()) {
        setIsEditing(false);
        handleChanges();
      }
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
