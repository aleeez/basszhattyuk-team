import React from 'react';

interface ExternalCheckboxProps {
  external: boolean; // This will hold the boolean value
  setExternal: (value: boolean) => void;
  label: string;
}

const ExternalCheckbox: React.FC<ExternalCheckboxProps> = ({ external, setExternal, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExternal(event.target.checked);
  };

  return (
    <label htmlFor="external">
      {label}
      <input
        type="checkbox"
        id="external"
        name="external"
        checked={external}
        onChange={handleChange}
      />
    </label>
  );
};

export default ExternalCheckbox;
