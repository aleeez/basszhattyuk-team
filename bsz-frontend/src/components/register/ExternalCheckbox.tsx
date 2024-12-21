import React from 'react';

interface ExternalCheckboxProps {
  fieldValue: boolean;
  setFieldValue: (value: boolean) => void;
  label: string;
}

const ExternalCheckbox: React.FC<ExternalCheckboxProps> = ({ fieldValue, setFieldValue, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.checked);
  };

  return (
    <label htmlFor="external">
      {label}
      <input
        type="checkbox"
        id="external"
        name="external"
        checked={fieldValue}
        onChange={handleChange}
      />
    </label>
  );
};

export default ExternalCheckbox;
