import React from 'react';

interface FacebookLinkProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  label: string;
}

const FacebookLink: React.FC<FacebookLinkProps> = ({ fieldValue, setFieldValue, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  return (
    <label htmlFor="fblink">
      {label}
      <input
        type="url"
        id="fblink"
        name="fbLink"
        value={fieldValue}
        onChange={handleChange}
        required
        placeholder="https://www.facebook.com/yourprofile"
      />
    </label>
  );
};

export default FacebookLink;
