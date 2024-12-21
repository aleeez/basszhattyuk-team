import React, { ChangeEvent } from "react";

interface EmailProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  label: string;
}

const Email: React.FC<EmailProps> = ({ fieldValue, setFieldValue, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; 
    setFieldValue(value);
  };

  return (
    <div>
      <label htmlFor="email">
        {label}
        <input
          type="email"
          id="email"
          name="email"
          value={fieldValue}
          placeholder="something@domain"
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
};

export default Email;
