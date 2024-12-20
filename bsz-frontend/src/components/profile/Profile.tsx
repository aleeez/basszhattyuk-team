import React, { useState } from "react";
import { PlayerUpdateDTO } from "../../dto/PlayerUpdateDTO";
import PhoneNr from "../register/PhoneNr";
import Email from "../register/Email";
import FacebookLink from "../register/FacebookLink";
import ExternalCheckbox from "../register/ExternalCheckbox";
import Name from "../register/PlayerName";
import { PlayerLabels } from "../records/inputLabels";

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

// Component registry with labels (now using Labels from the imported file)
const fieldComponents: Record<
  keyof PlayerUpdateDTO,
  {
    label: string;
    Component: React.FC<any>;
  }
> = {
  lastName: { label: PlayerLabels.lastName, Component: Name },
  firstName: { label: PlayerLabels.firstName, Component: Name },
  phoneNr: { label: PlayerLabels.phoneNr, Component: PhoneNr },
  email: { label: PlayerLabels.email, Component: Email },
  seriaNr: { label: PlayerLabels.seriaNr, Component: Name },
  fbLink: { label: PlayerLabels.fbLink, Component: FacebookLink },
  external: { label: PlayerLabels.external, Component: ExternalCheckbox },
  kmdszID: { label: PlayerLabels.kmdszID, Component: Name },
};

// React Component
const Profile: React.FC = () => {
  const [playerData, setPlayerData] = useState<PlayerUpdateDTO>(initialPlayerData);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Update field in playerData
  const updateField = (field: keyof PlayerUpdateDTO, value: any) => {
    setPlayerData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    
  };

  return (
    <div>
      <h2>Player Profile</h2>

      {/* Iterate through each field */}
      {Object.entries(playerData).map(([key, value]) => {
        const fieldKey = key as keyof PlayerUpdateDTO;
        const { label, Component } = fieldComponents[fieldKey];

        return (
          <div key={fieldKey} style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
            <button
              onClick={() =>
                editingField === key
                  ? setEditingField(null) // Save and switch back to "Edit"
                  : setEditingField(key) // Enter edit mode
              }
              style={{ marginRight: "1rem" }}
            >
              {editingField === key ? "Save" : "Edit"}
            </button>
            <label htmlFor={key} style={{ fontWeight: "bold", marginRight: "1rem" }}>
              {label}:
            </label>
            {editingField === key ? (
              <Component
                {...(fieldKey === "external"
                  ? {
                      external: value,
                      setExternal: (val: boolean) => updateField(fieldKey, val),
                    }
                  : {
                      name: value,
                      setName: (val: string) => updateField(fieldKey, val),
                    })}
              />
            ) : (
              <span>{fieldKey === "external" ? (value ? "Yes" : "No") : String(value)}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
