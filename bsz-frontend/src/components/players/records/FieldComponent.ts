import { PlayerUpdateDTO } from "../../../dto/PlayerUpdateDTO";
import { PlayerLabels } from "../../../labels/inputLabels";
import Email from "../inputs/Email";
import ExternalCheckbox from "../inputs/ExternalCheckbox";
import FacebookLink from "../inputs/FacebookLink";
import KmdszID from "../inputs/KmdszID";
import PhoneNr from "../inputs/PhoneNr";
import Name from "../inputs/PlayerName";
import SeriaNr from "../inputs/SeriaNr";

export const fieldComponents: Record<
  keyof PlayerUpdateDTO,
  { label: string; Component: React.FC<any> }
> = {
  lastName: { label: PlayerLabels.lastName, Component: Name },
  firstName: { label: PlayerLabels.firstName, Component: Name },
  phoneNr: { label: PlayerLabels.phoneNr, Component: PhoneNr },
  email: { label: PlayerLabels.email, Component: Email },
  seriaNr: { label: PlayerLabels.seriaNr, Component: SeriaNr },
  fbLink: { label: PlayerLabels.fbLink, Component: FacebookLink },
  external: { label: PlayerLabels.external, Component: ExternalCheckbox },
  kmdszID: { label: PlayerLabels.kmdszID, Component: KmdszID },
};