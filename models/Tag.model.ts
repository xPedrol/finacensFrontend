import {Dayjs} from "dayjs";

export interface ITag {
  id?: string;
  name: string;

  createdAt?: Dayjs;
  description?: string;
  color: string;
}
