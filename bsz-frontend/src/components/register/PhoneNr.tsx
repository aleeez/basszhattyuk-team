import React, { ChangeEvent } from "react";
import { validatePhoneNumber } from "../validatation/InputValidation";

interface PhoneProps {
  phone: string;
  setPhone: (value: string) => void;
  label: string;
}

const PhoneNr: React.FC<PhoneProps> = ({ phone, setPhone, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedValue = validatePhoneNumber(value);
    setPhone(updatedValue);
  };

  return (
    <div>
      <label htmlFor="phone">
      {label}  
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          minLength={10}
          placeholder="07xx xxx xxx"
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
};

export default PhoneNr;
