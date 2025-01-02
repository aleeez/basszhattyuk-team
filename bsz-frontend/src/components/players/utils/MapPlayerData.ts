import { PlayerDisplayedProfileDTO, PlayerProfileDTO } from "../../../dto/PlayerUpdateDTO";


export const mapToDisplayedProfile = (playerProfile: PlayerProfileDTO): PlayerDisplayedProfileDTO => {
    const { id, ...rest } = playerProfile; 
    return rest; 
  };

  export const buildPatchPayload = (editedFields: Record<string, any>): { op: string, path: string, value: any }[] => {
    return Object.entries(editedFields).map(([fieldKey, newValue]) => {
      return {
        op: "replace", 
        path: `/${fieldKey}`, 
        value: newValue, 
      };
    });
  };
  