import React, { ChangeEvent } from "react";

interface SeriaNrProps {
  // Props for Register component
  seria?: string;
  setSeria?: (value: string) => void;
  nr?: string;
  setNr?: (value: string) => void;

  // Props for Profile component
  seriaNr?: string;
  setSeriaNr?: (value: string) => void;

  label: string;
}

const SeriaNr: React.FC<SeriaNrProps> = ({
  seria,
  setSeria,
  nr,
  setNr,
  seriaNr,
  setSeriaNr,
  label,
}) => {
  // Derive local seria and nr for Profile mode
  const derivedSeria = seriaNr ? seriaNr.slice(0, 2) : seria || "";
  const derivedNr = seriaNr ? seriaNr.slice(2) : nr || "";

  const handleSeriaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value.toUpperCase(); // Force uppercase letters
    if (setSeria) setSeria(updatedValue);
    if (setSeriaNr) setSeriaNr(updatedValue + derivedNr);
  };

  const handleNrChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value.replace(/\D/g, ""); // Only allow numbers
    if (setNr) setNr(updatedValue);
    if (setSeriaNr) setSeriaNr(derivedSeria + updatedValue);
  };

  return (
    <div>
      <label>
        {label}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
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
