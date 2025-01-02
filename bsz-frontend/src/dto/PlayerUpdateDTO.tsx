export interface PlayerProfileDTO {
    
    id: number,
    lastName: string,
    firstName: string,
    phoneNr: string,
    email: string,
    seriaNr: string,
    fbLink: string,
    external: boolean,
    kmdszID: string,
 
}

export type PlayerDisplayedProfileDTO = Omit<PlayerProfileDTO, 'id'>;