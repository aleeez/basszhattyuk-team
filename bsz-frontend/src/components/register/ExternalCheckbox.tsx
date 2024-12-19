import React from 'react';

interface ExternalCheckboxProps {
  external: boolean;
  setExternal: (value: boolean) => void;
}

const ExternalCheckbox: React.FC<ExternalCheckboxProps> = ({ external, setExternal }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExternal(event.target.checked);
  };

  return (
    <label htmlFor="external">
      Külsős vagy?:
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
