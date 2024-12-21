import React, { useState } from "react";
import { PlayerUpdateDTO } from "../../dto/PlayerUpdateDTO";
import PhoneNr from "../register/PhoneNr";
import Email from "../register/Email";
import FacebookLink from "../register/FacebookLink";
import ExternalCheckbox from "../register/ExternalCheckbox";
import Name from "../register/PlayerName";
import KmdszID from "../register/KmdszID";
import SeriaNr from "../register/SeriaNr";
import { PlayerLabels } from "../records/inputLabels";

// Initial mock data
const initialPlayerData: PlayerUpdateDTO = {
  lastName: "Doe",
  firstName: "John",
  phoneNr: "0123456789",
  email: "john.doe@example.com",
  seriaNr: "AB 123456",
  fbLink: "https://facebook.com/john.doe",
  external: false,
  kmdszID: "123456",
};

// Component registry with labels
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
  seriaNr: { label: PlayerLabels.seriaNr, Component: SeriaNr },
  fbLink: { label: PlayerLabels.fbLink, Component: FacebookLink },
  external: { label: PlayerLabels.external, Component: ExternalCheckbox },
  kmdszID: { label: PlayerLabels.kmdszID, Component: KmdszID },
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
                {...(fieldKey === "phoneNr"
                  ? {
                      phone: value, // Pass the current value of the phone number
                      setPhone: (val: string) => updateField(fieldKey, val),
                    }
                  : fieldKey === "email"
                  ? {
                      email: value, // Pass the current email value
                      setEmail: (val: string) => updateField(fieldKey, val),
                    }
                  : fieldKey === "fbLink"
                  ? {
                      fbLink: value, // Pass the current fbLink value
                      setFbLink: (val: string) => updateField(fieldKey, val),
                    }
                  : fieldKey === "kmdszID"
                  ? {
                      kmdszID: value, // Pass the current kmdszID value
                      setKmdszID: (val: string) => updateField(fieldKey, val),
                    }
                  : fieldKey === "seriaNr"
                  ? {
                      seriaNr: value, // Pass the current seriaNr value
                      setSeriaNr: (val: string) => updateField(fieldKey, val),
                    }
                  : fieldKey === "external"
                  ? {
                      external: value, // Pass the current external value
                      setExternal: (val: boolean) => updateField(fieldKey, val),
                    }
                  : {
                      name: value,
                      setName: (val: string) => updateField(fieldKey, val),
                    })}
              />
            ) : (
              // Display Yes or No for external in view mode
              <div>{fieldKey === "external" ? (value ? "Yes" : "No") : String(value)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
