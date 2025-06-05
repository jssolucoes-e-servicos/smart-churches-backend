import { CellOrMeetMethodEnum } from 'src/common/enums';

export interface ICellOrMeetMethod {
  [key: string]: (typeof CellOrMeetMethodEnum)[keyof typeof CellOrMeetMethodEnum];
}
