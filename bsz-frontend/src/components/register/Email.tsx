import React, { ChangeEvent } from "react";

interface EmailProps {
  email: string;
  setEmail: (value: string) => void;
  label: string;
}

const Email: React.FC<EmailProps> = ({ email, setEmail, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; 
    setEmail(value);
  };

  return (
    <div>
      <label htmlFor="email">
      {label} 
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="something@domain"
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
};

export default Email;
