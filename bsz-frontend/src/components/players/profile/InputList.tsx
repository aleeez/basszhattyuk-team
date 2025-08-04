import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { PlayerDisplayedProfileDTO } from "../../../dto/PlayerUpdateDTO";
import { fieldComponents } from "../records/FieldComponent";
import ViewField from "./ViewField";

interface InputListProps {
  formattedPlayerData: PlayerDisplayedProfileDTO;
  isEditing: boolean;
  setFormattedPlayerData: (data: PlayerDisplayedProfileDTO) => void;
  setEditedFields: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const InputList: React.FC<InputListProps> = ({
  formattedPlayerData,
  isEditing,
  setFormattedPlayerData,
  setEditedFields,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const {
    register,
    trigger,
    formState: { errors },
    getValues
  } = useFormContext();

  const toggleEditingField = async (key: string) => {
  if (editingField === key) {
    const isValid = await trigger(key as keyof PlayerDisplayedProfileDTO);
    if (isValid) {
      const value = getValues(key as keyof PlayerDisplayedProfileDTO); // get the value
      console.log("valid: ", value);
      setEditingField(null);
    } else {
      console.log("Validation failed");
    }
  } else {
    setEditingField(key);
  }
};

  const handleFieldChange = (fieldKey: string, newValue: any) => {
    setEditedFields((prevState) => ({
      ...prevState,
      [fieldKey]: newValue,
    }));
  };

  const getFieldButtonText = (key: string): "Save" | "Edit" => {
    return editingField === key ? "Save" : "Edit";
  };

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
        handleFieldChange(fieldKey, val);
      },
      register: register(fieldKey),
      error: errors[fieldKey]?.message,
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
            style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}
          >
            {isEditing && (
              <button type="button" onClick={() => toggleEditingField(key)}>
                {getFieldButtonText(key)}
              </button>
            )}

            <label htmlFor={key} style={{ fontWeight: "bold" }}>
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
