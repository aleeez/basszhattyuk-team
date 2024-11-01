import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerType } from '../dto/PlayerType';
import { useCreatePlayer, useUpdatePlayer } from '../hooks/usePlayer';

const Register: React.FC = () => {

  const { id } = useParams<{ id: string }>();


  const createGuide = useCreatePlayer();
  const updateGuide = useUpdatePlayer();

  const [formData, setFormData] = useState<PlayerType>({
    lastname: '',
    firstname: '',
    phone: '',
    email: '',
    seriaNr: '',
    fbLink: '',
    external: false,
    kmdszID: '',
    passPic: '',
    studPic: ''
  });

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
            <p>
                Regisztrálj csapattagnak!
            </p>
          <form onSubmit={handleSubmit}>
          <label htmlFor="lastname">
            Családnév:
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
          </label>
          <br />
          <label htmlFor="firstname">
            Keresztnév:
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
          </label>     
          <br />
          <label htmlFor="phone">
            Telefonszám:
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <br />
          <label htmlFor="email">
            Email-cim:
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label htmlFor="serianr">
            Személyi szám (seria_nr):
            <input type="text" id="serianr" name="serianr" value={formData.seriaNr} onChange={handleChange} />
          </label>     
          <br />
          <label htmlFor="fblink">
            Facebook link:
            <input type="text" id="fblink" name="fblink" value={formData.fbLink} onChange={handleChange} />
          </label>     
          <br />
          <label htmlFor="external">
            Külsős vagy?:
            <input type="radiobutton" id="external" name="external" value={formData.firstname} onChange={handleChange} />
          </label>     
          <br />
          <label htmlFor="kmdszid">
            KMDSZ ID:
            <input type="text" id="kmdszid" name="kmdszid" value={formData.kmdszID} onChange={handleChange} />
          </label>     
          <br />
          <label htmlFor="pass">
            PASS kép:
            <input type="text" id="pass" name="pass" value={formData.passPic} onChange={handleChange} />
          </label>     
          <br />
          <label htmlFor="studid">
            Ellenőrző kép:
            <input type="text" id="studid" name="studid" value={formData.studPic} onChange={handleChange} />
          </label>     
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    );
};

export default Register;
