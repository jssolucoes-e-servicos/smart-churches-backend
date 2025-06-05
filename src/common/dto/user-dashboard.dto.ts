export class UserDashboardDTO {
  tiles: UserDashboardTilesDTO;
  lists: UserDashboardListsDTO;
  graphics: UserDashboardGraphDTO;
}

export class UserDashboardTilesDTO {
  position: number;
  hash?: string;
  data: string;
}

export class UserDashboardListsDTO {
  position: number;
  hash?: string;
  data: string;
}

export class UserDashboardGraphDTO {
  position: number;
  hash?: string;
  data: string;
}
