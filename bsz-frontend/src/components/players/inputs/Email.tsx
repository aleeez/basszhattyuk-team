import React, { ChangeEvent } from "react";

interface EmailProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  label: string;
  error?: string;
  register: any;
}

const Email: React.FC<EmailProps> = ({ fieldValue, setFieldValue, label, register, error }) => {
   const {ref, ...rest} = register;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; 
    setFieldValue(value);
  };

  return (
    <div>
      <label htmlFor="email">
        {label}
        <input
          {...rest}
          ref={ref}
          type="email"
          id="email"
          name="email"
          value={fieldValue}
          placeholder="something@domain"
          onChange={handleChange}
          required
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Email;
