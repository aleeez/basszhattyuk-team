import React from 'react';

interface FacebookLinkProps {
  fieldValue: string;
  setFieldValue: (value: string) => void;
  label: string;
  error?: string;
  register: any;
}

const FacebookLink: React.FC<FacebookLinkProps> = ({ fieldValue, setFieldValue, label, register, error }) => {
  const {ref, ...rest} = register;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="fblink">
      {label}
      <input
        {...rest}
        ref={ref}
        type="url"
        id="fblink"
        name="fbLink"
        value={fieldValue}
        onChange={handleChange}
        required
        placeholder="https://www.facebook.com/yourprofile"
      />
    </label>
    {error && <p style={{ color: "red" }}>{error}</p>}
    </div>  
  );
};

export default FacebookLink;
