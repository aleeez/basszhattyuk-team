// Name.tsx
import React, { ChangeEvent } from "react";
import { validateName } from "../validatation/InputValidation";

interface NameProps {
  name: string;
  setName: (value: string) => void;
  label: string;
}

const Name: React.FC<NameProps> = ({ name, setName, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedValue = validateName(value);
    setName(updatedValue);
  };

  return (
    <div>
      <label htmlFor={label}>
        {label}: 
        <input
          type="text"
          id={label}
          name={label}
          value={name}
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
};

export default Name;
