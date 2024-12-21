import { PlayerUpdateDTO } from "../../../dto/PlayerUpdateDTO";

export const formatPlayerData = (data: PlayerUpdateDTO): PlayerUpdateDTO => {
    return {
      ...data,
      phoneNr: formatPhoneNumber(data.phoneNr),
      seriaNr: formatSeriaNumber(data.seriaNr),
    };
  };

  
const formatPhoneNumber = (phone: string) =>
phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");

const formatSeriaNumber = (seriaNr: string) =>
seriaNr.replace(/([A-Z]{2})(\d+)/, "$1 $2");
  
  
  