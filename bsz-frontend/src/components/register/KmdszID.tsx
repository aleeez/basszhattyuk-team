import React from 'react';

interface KmdszIdInputProps {
  kmdszID: string;
  setKmdszID: (value: string) => void;
  label: string;
}

const KmdszID: React.FC<KmdszIdInputProps> = ({ kmdszID, setKmdszID, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKmdszID(event.target.value);
  };

  return (
    <div>     
        <label htmlFor="kmdszid">
        {label} <em> KMDSZ-</em>
        <input
            type="text"
            id="kmdszid"
            name="kmdszID"
            value={kmdszID}
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
