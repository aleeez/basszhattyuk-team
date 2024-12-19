import React from 'react';

interface FacebookLinkProps {
  fbLink: string;
  setFbLink: (value: string) => void;
}

const FacebookLink: React.FC<FacebookLinkProps> = ({ fbLink, setFbLink }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFbLink(event.target.value);
  };

  return (
    <label htmlFor="fblink">
      Facebook link:
      <input
        type="url"
        id="fblink"
        name="fbLink"
        value={fbLink}
        onChange={handleChange}
        required
        placeholder="https://www.facebook.com/yourprofile"
      />
    </label>
  );
};

export default FacebookLink;
