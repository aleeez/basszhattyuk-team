import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerType } from '../dto/PlayerType';
import { useCreatePlayer, useUpdatePlayer } from '../hooks/usePlayer';
import { validateName, validatePhoneNumber, validatePersonalNr } from './validatation/InputValidation';

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
    passPic: null,
    studIDPic: null

  });

  const [tempData, setTempData] = useState({ 
    seria: '',
    nr: '',
    kmdszID: ''
  });

  const [file, setFile] = useState<{ passPic: File | null; studIDPic: File | null }>({
    passPic: null,
    studIDPic: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles.length > 0) {
      setFile((prevFiles) => ({
        ...prevFiles,
        [name]: selectedFiles[0]
      }));
    }
  };

  const handlePersonalNr = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let updatedValue = value;

    updatedValue = validatePersonalNr(name, value);
   
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
      phoneNr: formData.phoneNr.replace(/\s+/g, ''),
      kmdszID: `KMDSZ-${tempData.kmdszID}`.trim(),
      passPic: file.passPic,
      studIDPic: file.studIDPic
  
    }));

    console.log(formData);

    if (id) {
      updatePlayer.mutate({ id, data: formData });
    } else {
      createPlayer.mutate(formData);
    }
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
          <input type="text" id="seria" name="seria" value={tempData.seria} onChange={handlePersonalNr} minLength={2} placeholder="XY" required/>
          Nr.
          <input type="text" id="nr" name="nr" value={tempData.nr} onChange={handlePersonalNr}  minLength={6} placeholder="123456" required/>
        </label>
        <br />
        <label htmlFor="fblink">
          Facebook link:
          <input type="url" id="fblink" name="fbLink" value={formData.fbLink} onChange={handleChange} required/>
        </label>
        <br />
        <label htmlFor="external">
          Külsős vagy?:
          <input type="checkbox" id="external" name="external" checked={formData.external} onChange={handleChange} />
        </label>
        <br />
        {!formData.external && (
        <label htmlFor="kmdszid">
          KMDSZ ID: KMDSZ-
          <input type="text" id="kmdszid" name="kmdszID" value={tempData.kmdszID} onChange={handlePersonalNr} minLength={6} placeholder="123456" />
        </label>
        )}
        <br />
        <label htmlFor="pass">
          PASS kép:
          <input type="file" id="pass" name="passPic" onChange={handleFileChange} required/>
        </label>
        <br />
        <label htmlFor="studid">
          Ellenőrző kép:
          <input type="file" id="studid" name="studIDPic" onChange={handleFileChange} required/>
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Register;
