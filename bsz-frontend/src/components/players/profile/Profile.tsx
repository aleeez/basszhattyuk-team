import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { PlayerDisplayedProfileDTO } from "../../../dto/PlayerUpdateDTO";
import { formatPlayerData } from "../utils/FormatPlayerData";
import { usePatchPlayer, usePlayer } from "../../../hooks/usePlayer";
import { buildPatchPayload, mapToDisplayedProfile } from "../utils/MapPlayerData";
import InputList from "./InputList";
import { PatchPayloadDTO } from "../../../dto/PatchPayloadDTO";

const Profile: React.FC = () => {
  const { data: playerData, isLoading, isError } = usePlayer();
  const [formattedPlayerData, setFormattedPlayerData] = useState<PlayerDisplayedProfileDTO | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedFields, setEditedFields] = useState<Record<string, any>>({});
  const patchPlayer = usePatchPlayer();

  const methods = useForm({ mode: "onChange" });

  useEffect(() => {
    if (playerData) {
      const formatted = formatPlayerData(mapToDisplayedProfile(playerData));
      setFormattedPlayerData(formatted);
      methods.reset(formatted); // populate default values in form
    }
  }, [playerData]);

  const toggleEditingMode = async () => {
    if (isEditing) {
      const isValid = await methods.trigger(); // validate all fields

      if (!isValid) {
        console.log("Validation failed. Cannot exit editing mode.");
  
        return;
      }

      if (!formattedPlayerData || Object.keys(editedFields).length === 0) {
        console.log("No changes detected.");
        setIsEditing(false);
        return;
      }

      const patchPayload: PatchPayloadDTO[] = buildPatchPayload(editedFields);
      console.log("Patch Payload:", patchPayload);

      // You could send it here: patchPlayer.mutate(patchPayload);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const getEditButtonText = () => {
    return isEditing ? "Save & Exit" : "Edit Profile";
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading player data.</div>;
  if (!formattedPlayerData) return <div>No player data available.</div>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Player Profile</h2>

        <button onClick={toggleEditingMode} style={{ marginBottom: "1rem" }}>
          {getEditButtonText()}
        </button>

        <InputList
          formattedPlayerData={formattedPlayerData}
          isEditing={isEditing}
          setFormattedPlayerData={setFormattedPlayerData}
          setEditedFields={setEditedFields}
        />
      </form>
    </FormProvider>
  );
};

export default Profile;
