import React from 'react';

interface UploadFileProps {
  id: string;
  setFile: (file: File | null) => void;
  label: string;
}

const UploadFile: React.FC<UploadFileProps> = ({ id, setFile, label }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div>
      <label htmlFor={id}>
        {label}:
        <input 
          type="file" 
          id={id} 
          name={id} 
          onChange={handleFileChange} 
          required 
        />
      </label>
    </div>
  );
};

export default UploadFile;
