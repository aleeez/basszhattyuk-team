import React from 'react';
import { validatePersonalNr, validatePhoneNumber } from '../validation/InputValidation';

interface KmdszIdInputProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  label: string;
  error?: string;
  register: any;
}

const KmdszID: React.FC<KmdszIdInputProps> = ({ fieldValue, setFieldValue, label, register, error }) => {
  const {ref, ...rest} = register;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const updatedValue = validatePersonalNr("kmdsz", value);
    setFieldValue(updatedValue);
  };

  return (
    <div>
      <label htmlFor="kmdszid">
        {label} <em> KMDSZ-</em>
        <input
          {...rest}
          ref={ref}
          type="text"
          id="kmdszid"
          name="kmdszID"
          value={fieldValue}
          onChange={handleChange}
          minLength={6}
          placeholder="123456"
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
    </div>
  );
};

export default KmdszID;
