import { TwoFactorAuthenticationDTO } from "src/common/dto/two-factor-authentication.dto";
import { UserDashboardDTO } from "src/common/dto/user-dashboard.dto";
import { UserShortcutsDTO } from "src/common/dto/user-shortcuts.dto";
import { NestedDTOValidator, StringValidator } from "src/common/validators";

export class UserConfigurationsDTO {
  @StringValidator({ fieldName: "theme", label: "Tema" })
  theme: string | null;

  @NestedDTOValidator({ fieldName: "shortcuts", label: "Atalhos", dto: UserShortcutsDTO })
  shortcuts: UserShortcutsDTO;

  @NestedDTOValidator({ fieldName: "dashboard", label: "Dashboard", dto: UserDashboardDTO })
  dashboard: UserDashboardDTO;

  @NestedDTOValidator({
    fieldName: "twoFactorAuthentication",
    label: "Two Factor Authentication",
    dto: TwoFactorAuthenticationDTO,
  })
  twoFactorAuthentication: TwoFactorAuthenticationDTO;
}
