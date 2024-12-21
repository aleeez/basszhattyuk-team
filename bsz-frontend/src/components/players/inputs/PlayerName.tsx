import React, { ChangeEvent } from "react";
import { validateName } from "../validation/InputValidation";

interface NameProps {
  fieldValue: string; 
  setFieldValue: (value: string) => void; 
  label: string;
}

const Name: React.FC<NameProps> = ({ fieldValue, setFieldValue, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedValue = validateName(value);
    setFieldValue(updatedValue); 
  };

  return (
    <div>
      <label htmlFor={label}>
        {label}
        <input
          type="text"
          id={label}
          name={label}
          value={fieldValue} 
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
};

export default Name;
