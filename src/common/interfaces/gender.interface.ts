import { GendersEnum } from "../enums";

export interface IGender {
  [key: string]: (typeof GendersEnum)[keyof typeof GendersEnum];
}
