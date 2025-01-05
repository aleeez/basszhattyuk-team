import React, { useState } from "react";
import { PlayerDisplayedProfileDTO } from "../../../dto/PlayerUpdateDTO";
import { fieldComponents } from "../records/FieldComponent";
import ViewField from "./ViewField";

interface InputListProps {
  formattedPlayerData: PlayerDisplayedProfileDTO;
  isEditing: boolean;
  setFormattedPlayerData: (data: PlayerDisplayedProfileDTO) => void;
  setEditedFields: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const InputList: React.FC<InputListProps> = ({
  formattedPlayerData,
  isEditing,
  setFormattedPlayerData,
  setEditedFields,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);

  // editing field on/off
  const toggleEditingField = (key: string) => {
    if (editingField === key) {
      setEditingField(null);
    } else {
      setEditingField(key);
    }
  };

  // memorize editied fields
  const handleFieldChange = (fieldKey: string, newValue: any) => {
    setEditedFields((prevState) => ({
      ...prevState,
      [fieldKey]: newValue,
    }));
  };

  // button text
  const getFieldButtonText = (key: string): "Save" | "Edit" => {
    return editingField === key ? "Save" : "Edit";
  };

  // render components
  const renderComponent = (fieldKey: string, value: any) => {
    const { Component } = fieldComponents[fieldKey as keyof PlayerDisplayedProfileDTO];

    const props = {
      fieldValue: value,
      setFieldValue: (val: any) => {
        const updatedData = {
          ...formattedPlayerData,
          [fieldKey]: val,
        };
        setFormattedPlayerData(updatedData); 
        handleFieldChange(fieldKey as keyof PlayerDisplayedProfileDTO, val); 
      },
    };

    return <Component {...props} />;
  };

  return (
    <>
      {Object.entries(formattedPlayerData).map(([key, value]) => {
        const fieldKey = key as keyof PlayerDisplayedProfileDTO;
        const { label } = fieldComponents[fieldKey];

        return (
          <div
            key={key}
            style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
          >
            {isEditing && (
              <button
                onClick={() => toggleEditingField(key)}
                style={{ marginRight: "1rem" }}
              >
                {getFieldButtonText(key)}
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
    </>
  );
};

export default InputList;
