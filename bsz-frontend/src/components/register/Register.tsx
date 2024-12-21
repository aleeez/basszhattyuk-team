import React, { useState } from 'react';
import { PlayerType } from '../../dto/PlayerType';
import Name from './PlayerName'; 
import PhoneNr from './PhoneNr';
import Email from './Email';
import SeriaNr from './SeriaNr';
import FacebookLink from './FacebookLink';
import ExternalCheckbox from './ExternalCheckbox';
import KmdszID from './KmdszID';
import UploadFile from './UploadFile';  
import { PlayerLabels } from '../records/inputLabels';

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
          fieldValue={formData.lastName}
          setFieldValue={(value) => updateField("lastName", value)} 
          label={`${PlayerLabels.lastName}:`}
        />
        <Name 
          fieldValue={formData.firstName}
          setFieldValue={(value) => updateField("firstName", value)} 
          label={`${PlayerLabels.firstName}:`}
        />
        <PhoneNr 
          fieldValue={formData.phoneNr}
          setFieldValue={(value) => updateField("phoneNr", value)} 
          label={`${PlayerLabels.phoneNr}:`}
        />
        <Email 
          fieldValue={formData.email}
          setFieldValue={(value) => updateField("email", value)} 
          label={`${PlayerLabels.email}:`}
        />
        <SeriaNr
          seria={tempData.seria}
          nr={tempData.nr}
          setSeria={(value) => updateTempField("seria", value)} 
          setNr={(value) => updateTempField("nr", value)}
          label={`${PlayerLabels.seriaNr}:`}
        />
        <FacebookLink
          fieldValue={formData.fbLink}
          setFieldValue={(value) => updateField('fbLink', value)}
          label={`${PlayerLabels.fbLink}:`}
        />
        <br />
        <ExternalCheckbox
          fieldValue={formData.external}
          setFieldValue={(value) => updateField('external', value)}
          label={`${PlayerLabels.external}:`}
        />
        
        {!formData.external && (
          <KmdszID
            fieldValue={tempData.kmdszID}
            setFieldValue={(value) => updateTempField('kmdszID', value)}
            label={`${PlayerLabels.kmdszID}:`}
          />
        )}
      
        <UploadFile
          id="pass"
          label="PASS kép"
          setFile={(newFile) => setFile({ ...file, passPic: newFile })}
        />
        <UploadFile
          id="studid"
          label="Ellenőrző kép"
          setFile={(newFile) => setFile({ ...file, studIDPic: newFile })}
        />

        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Register;
