import React from 'react';

interface ViewFieldProps {
  fieldKey: string;
  value: any;
}

const ViewField: React.FC<ViewFieldProps> = ({ fieldKey, value }) => {
  return (
    <div>
      {fieldKey === "external"
        ? value
          ? "Yes"
          : "No"
        : fieldKey === "fbLink"
        ? <a href={value as string} target="_blank" rel="noopener noreferrer">{value}</a>
        : String(value)
      }
    </div>
  );
};

export default ViewField;
