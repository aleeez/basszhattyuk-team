import React, { ChangeEvent } from "react";

interface SeriaNrProps {

  // Props for Register component
  seria: string;
  setSeria: (value: string) => void;
  nr: string;
  setNr: (value: string) => void;

  // Props for Profile component
  fieldValue?: string;
  setFieldValue?: (value: string) => void;

  label: string;
}

const SeriaNr: React.FC<SeriaNrProps> = ({
  seria,
  setSeria,
  nr,
  setNr,
  fieldValue,
  setFieldValue,
  label,
}) => {
  
  const derivedSeria = fieldValue ? fieldValue.slice(0, 2) : seria || "";
  const derivedNr = fieldValue ? fieldValue.slice(2) : nr || "";

  const handleSeriaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value.toUpperCase(); 
    if (setSeria) setSeria(updatedValue);
    if (setFieldValue) setFieldValue(updatedValue + derivedNr);
  };

  const handleNrChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value.replace(/\D/g, ""); 
    if (setNr) setNr(updatedValue);
    if (setFieldValue) setFieldValue(derivedSeria + updatedValue);
  };

  return (
    <div>
      <label>
        {label}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          Seria:
          <input
            type="text"
            name="seria"
            value={derivedSeria}
            onChange={handleSeriaChange}
            maxLength={2}
            placeholder="XY"
            style={{ width: "3rem" }}
            required
          />
          Nr.:
          <input
            type="text"
            name="nr"
            value={derivedNr}
            onChange={handleNrChange}
            maxLength={6}
            placeholder="123456"
            style={{ width: "5rem" }}
            required
          />
        </div>
      </label>
    </div>
  );
};

export default SeriaNr;
