import React from 'react';

interface KmdszIdInputProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  label: string;
}

const KmdszID: React.FC<KmdszIdInputProps> = ({ fieldValue, setFieldValue, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="kmdszid">
        {label} <em> KMDSZ-</em>
        <input
          type="text"
          id="kmdszid"
          name="kmdszID"
          value={fieldValue}
          onChange={handleChange}
          minLength={6}
          placeholder="123456"
        />
      </label>
      <br />
    </div>
  );
};

export default KmdszID;
