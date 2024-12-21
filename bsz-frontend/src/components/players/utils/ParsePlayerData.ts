import { PlayerUpdateDTO } from "../../../dto/PlayerUpdateDTO";


export const parsePlayerData = (data: PlayerUpdateDTO): PlayerUpdateDTO => {
    return {
      ...data,
      phoneNr: parsePhoneNumber(data.phoneNr),
      seriaNr: parseSeriaNumber(data.seriaNr),
    };
  };


const parsePhoneNumber = (phone: string) => phone.replace(/\s+/g, "");

const parseSeriaNumber = (seriaNr: string) => seriaNr.replace(/\s+/g, "");


