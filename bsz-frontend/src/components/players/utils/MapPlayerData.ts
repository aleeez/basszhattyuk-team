import { PlayerDisplayedProfileDTO, PlayerProfileDTO } from "../../../dto/PlayerUpdateDTO";


export const mapToDisplayedProfile = (playerProfile: PlayerProfileDTO): PlayerDisplayedProfileDTO => {
    const { id, ...rest } = playerProfile; 
    return rest; 
  };
  