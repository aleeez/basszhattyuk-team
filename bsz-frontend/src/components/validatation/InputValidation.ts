
export const validateName = (name: string): string => {
    
    const regex = /^[a-zA-Z]+([- a-zA-Z]+)?$/;
    if (regex.test(name) || name === '') {
      return name;
    }

    // Removing the illegal character
    return name.slice(0, -1); 
  };


  export const validatePhoneNumber = (phoneNumber: string): string => {
    // Remove non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');


    // Format the phone number by adding spaces at the correct positions
    if (digitsOnly.length <= 4) {
      return digitsOnly; 
    } else if (digitsOnly.length <= 7) {
      return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4)}`; 
    } else {
      return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4, 7)} ${digitsOnly.slice(7, 10)}`; 
    }
  };


  export const validatePersonalNr = (name: string, value: string): string => {
    
    let regex = /^[A-Z]+$/
    if (name === 'seria') {
        regex = /^[A-Z]{0,2}$/;
    }
    else {
        regex = /^[0-9]{0,6}$/;
    }

    if (regex.test(value) || value === '') {
      return value;
    }

    // Removing the illegal character
    return value.slice(0, -1); 
  };

  
  
  
  
  
  