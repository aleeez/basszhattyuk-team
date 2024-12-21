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
  seriaNr: "AB123456",
  fbLink: "https://facebook.com/john.doe",
  external: false,
  kmdszID: "123456",
};

const fieldComponents: Record<
  keyof PlayerUpdateDTO,
  { label: string; Component: React.FC<any> }
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


const Profile: React.FC = () => {
  const [playerData, setPlayerData] = useState<PlayerUpdateDTO>(initialPlayerData);
  const [editingField, setEditingField] = useState<string | null>(null);


  const updateField = (field: keyof PlayerUpdateDTO, value: any) => {
    setPlayerData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
              <div>{fieldKey === "external" ? (value ? "Yes" : "No") : String(value)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
