import React, { ChangeEvent } from "react";
import { validatePhoneNumber } from "../validatation/InputValidation";

interface PhoneProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  label: string;
}

const PhoneNr: React.FC<PhoneProps> = ({ fieldValue, setFieldValue, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedValue = validatePhoneNumber(value);
    setFieldValue(updatedValue);
  };

  return (
    <div>
      <label htmlFor="phone">
        {label}
        <input
          type="tel"
          id="phone"
          name="phone"
          value={fieldValue}
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
