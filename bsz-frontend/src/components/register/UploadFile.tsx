import React from 'react';

interface UploadFileProps {
  id: string;
  name: string;
  file: File | null;
  setFile: (file: File | null) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ id, name, file, setFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div>
      <label htmlFor={id}>
        {name}:
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
