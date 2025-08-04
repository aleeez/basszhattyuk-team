import React, { ChangeEvent } from "react";
import { validateName } from "../validation/InputValidation";

interface NameProps {
  fieldValue: string; 
  setFieldValue: (value: string) => void; 
  label: string;
  error?: string;
  register: any;
}

const Name: React.FC<NameProps> = ({ fieldValue, setFieldValue, label, error, register }) => {
  const {ref, ...rest} = register;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedValue = validateName(value);
    setFieldValue(updatedValue); 
  };

  return (
    <div>
      <label htmlFor="lastName">
        {label}
        {label}
        <input
          {...rest}
          ref={ref}
          type="text"
          id="lastName"
          name="lastName"
          value={fieldValue} 
          onChange={handleChange}
          required
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Name;
