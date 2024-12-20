import React, { ChangeEvent } from 'react';
import { validatePersonalNr } from '../validatation/InputValidation';

interface SeriaNrProps {
  seria: string;
  nr: string;
  setSeria: (value: string) => void;
  setNr: (value: string) => void;
  label: string;
}

const SeriaNr: React.FC<SeriaNrProps> = ({ seria, nr, setSeria, setNr, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let updatedValue = validatePersonalNr(name, value);

    if (name === 'seria') {
      setSeria(updatedValue);
    } else if (name === 'nr') {
      setNr(updatedValue);
    }
  };

  return (
    <div>
      <label htmlFor="serianr">
        {label}
        Seria:
        <input
          type="text"
          id="seria"
          name="seria"
          value={seria}
          onChange={handleChange}
          minLength={2}
          placeholder="XY"
          required
        />
        Nr.:
        <input
          type="text"
          id="nr"
          name="nr"
          value={nr}
          onChange={handleChange}
          minLength={6}
          placeholder="123456"
          required
        />
      </label>
    </div>
  );
};

export default SeriaNr;
