import { PlayerProfileDTO } from "../../../dto/PlayerUpdateDTO";


export const parsePlayerData = (data: PlayerProfileDTO): PlayerProfileDTO => {
    return {
      ...data,
      phoneNr: parsePhoneNumber(data.phoneNr),
      seriaNr: parseSeriaNumber(data.seriaNr),
    };
  };


const parsePhoneNumber = (phone: string) => phone.replace(/\s+/g, "");

const parseSeriaNumber = (seriaNr: string) => seriaNr.replace(/\s+/g, "");


