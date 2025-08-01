import React, { ChangeEvent } from "react";
import { validatePhoneNumber } from "../validation/InputValidation";

interface PhoneProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  error?: string;
  register: any;
  //label: string;
}

const PhoneNr: React.FC<PhoneProps> = ({ fieldValue, setFieldValue, /*label*/error, register }) => {
  const {ref, ...rest} = register;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedValue = validatePhoneNumber(value);
    setFieldValue(updatedValue);
  };

  return (
    <div>
      <label htmlFor="phoneNr">
        {/* {label} */}
        <input
          {...rest}
          type="tel"
          id="phoneNr"
          name="phoneNr"
          ref={ref}
          value={fieldValue}
          minLength={10}
          placeholder="07xx xxx xxx"
          onChange={handleChange}
          required
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PhoneNr;
