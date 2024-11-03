import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerType } from '../dto/PlayerType';
import { useCreatePlayer, useUpdatePlayer } from '../hooks/usePlayer';

const Register: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const createGuide = useCreatePlayer();
  const updateGuide = useUpdatePlayer();

  const [formData, setFormData] = useState<PlayerType>({
    lastName: '',
    firstName: '',
    phoneNr: '',
    email: '',
    seriaNr: '',
    fbLink: '',
    external: false,
    kmdszID: '',
    passPic: '',
    studIDPic: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (id) {
      updateGuide.mutate({ id, data: formData });
    } else {
      createGuide.mutate(formData);
    }
  };

  return (
    <div>
      <p>Regisztrálj csapattagnak!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lastname">
          Családnév:
          <input type="text" id="lastname" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="firstname">
          Keresztnév:
          <input type="text" id="firstname" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="phone">
          Telefonszám:
          <input type="text" id="phone" name="phoneNr" value={formData.phoneNr} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="email">
          Email-cím:
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="serianr">
          Személyi szám (seria_nr):
          <input type="text" id="serianr" name="seriaNr" value={formData.seriaNr} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="fblink">
          Facebook link:
          <input type="text" id="fblink" name="fbLink" value={formData.fbLink} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="external">
          Külsős vagy?:
          <input type="checkbox" id="external" name="external" checked={formData.external} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="kmdszid">
          KMDSZ ID:
          <input type="text" id="kmdszid" name="kmdszID" value={formData.kmdszID} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="pass">
          PASS kép:
          <input type="text" id="pass" name="passPic" value={formData.passPic} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="studid">
          Ellenőrző kép:
          <input type="text" id="studid" name="studIDPic" value={formData.studIDPic} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Register;
