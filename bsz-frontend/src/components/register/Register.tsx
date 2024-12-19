import React, { useState } from 'react';
import { PlayerType } from '../../dto/PlayerType';
import Name from './PlayerName'; 
import PhoneNr from './PhoneNr';
import Email from './Email';
import SeriaNr from './SeriaNr';
import FacebookLink from './FacebookLink';
import ExternalCheckbox from './ExternalCheckbox';
import KmdszID from './KmdszID';
import UploadFile from './UploadFile';  // Import the UploadFile component

const Register: React.FC = () => {
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
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const updateTempField = (field: string, value: string) => {
    setTempData((prevTempData) => ({
      ...prevTempData,
      [field]: value
    }));
  };

  return (
    <div>
      <p>Regisztrálj csapattagnak!</p>
      <form onSubmit={handleSubmit}>
        <Name 
          name={formData.lastName}
          setName={(value) => updateField("lastName", value)} 
          label="Családnév"
        />
        <Name 
          name={formData.firstName}
          setName={(value) => updateField("firstName", value)} 
          label="Keresztnév"
        />
        <PhoneNr 
          phone={formData.phoneNr}
          setPhone={(value) => updateField("phoneNr", value)} 
        />
        <Email 
          email={formData.email}
          setEmail={(value) => updateField("email", value)} 
        />
        <SeriaNr
          seria={tempData.seria}
          nr={tempData.nr}
          setSeria={(value) => updateTempField("seria", value)} 
          setNr={(value) => updateTempField("nr", value)} 
        />
        <FacebookLink
          fbLink={formData.fbLink}
          setFbLink={(value) => updateField('fbLink', value)}
        />
        <br />
        <ExternalCheckbox
          external={formData.external}
          setExternal={(value) => updateField('external', value)}
        />
        
        {!formData.external && (
          <KmdszID
            kmdszID={tempData.kmdszID}
            setKmdszID={(value) => updateTempField('kmdszID', value)}
          />
        )}
      
        <UploadFile
          id="pass"
          name="PASS kép"
          file={file.passPic}
          setFile={(newFile) => setFile({ ...file, passPic: newFile })}
        />
        <UploadFile
          id="studid"
          name="Ellenőrző kép"
          file={file.studIDPic}
          setFile={(newFile) => setFile({ ...file, studIDPic: newFile })}
        />

        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Register;
