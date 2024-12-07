import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerType } from '../dto/PlayerType';
import { useCreatePlayer, useUpdatePlayer } from '../hooks/usePlayer';
import { validateName, validatePhoneNumber, validateSeriaNr } from './validatation/InputValidation';

const Register: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const createPlayer = useCreatePlayer();
  const updatePlayer = useUpdatePlayer();

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

  const [tempData, setTempData] = useState({ 
    seria: '',
    nr: ''
  });

  const handleSeriaNr = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let updatedValue = value;

    updatedValue = validateSeriaNr(name, value);
   
    setTempData((prevTempData) => ({
      ...prevTempData,
      [name]: updatedValue
    }));

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    
    let updatedValue: string | boolean = value;


    // Apply name validation for first and last names
    if (name === 'firstName' || name === 'lastName') {
      updatedValue = validateName(value);
    }
    
    // Apply phone number validation for phoneNr
    if (name === 'phoneNr') {
      updatedValue = validatePhoneNumber(value);
    }

    // Apply phone number validation for phoneNr
    if (type === 'checkbox') {

      updatedValue = checked;
  
    }


    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue
    }));

  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setFormData((prevFormData) => ({
      ...prevFormData,
      seriaNr: `${tempData.seria}${tempData.nr}`.trim(),
      phoneNr: formData.phoneNr.replace(/\s+/g, '')
    }));

    console.log(formData);

    // if (id) {
    //   updatePlayer.mutate({ id, data: formData });
    // } else {
    //   createPlayer.mutate(formData);
    // }
  };

  return (
    <div>
      <p>Regisztrálj csapattagnak!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lastname">
          Családnév: 
          <input type="text" id="lastname" name="lastName" value={formData.lastName} onChange={handleChange} required/>
        </label>
        <br />
        <label htmlFor="firstname">
          Keresztnév:
          <input type="text" id="firstname" name="firstName" value={formData.firstName} onChange={handleChange} required/>
        </label>
        <br />
        <label htmlFor="phone">
          Telefonszám:
          <input type="tel" id="phone" name="phoneNr" value={formData.phoneNr} onChange={handleChange} minLength={10} placeholder="07xx xxx xxx" required/>
        </label>
        <br />
        <label htmlFor="email">
          Email-cím:
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="something@domain" required/>
        </label>
        <br />
        <label htmlFor="serianr">
          Személyi szám: Seria
          <input type="text" id="seria" name="seria" value={tempData.seria} onChange={handleSeriaNr} minLength={2} placeholder="XY" required/>
          Nr.
          <input type="text" id="nr" name="nr" value={tempData.nr} onChange={handleSeriaNr}  minLength={6} placeholder="123456" required/>
        </label>
        <br />
        <label htmlFor="fblink">
          Facebook link:
          <input type="text" id="fblink" name="fbLink" value={formData.fbLink} onChange={handleChange} required/>
        </label>
        <br />
        <label htmlFor="external">
          Külsős vagy?:
          <input type="checkbox" id="external" name="external" checked={formData.external} onChange={handleChange} required/>
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
