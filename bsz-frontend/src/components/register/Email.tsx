import React, { ChangeEvent } from "react";

interface EmailProps {
  email: string;
  setEmail: (value: string) => void;
}

const Email: React.FC<EmailProps> = ({ email, setEmail }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; 
    setEmail(value);
  };

  return (
    <div>
      <label htmlFor="email">
      Email-cím: 
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
