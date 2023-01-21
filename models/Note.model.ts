import { Dayjs } from "dayjs";

export interface INote {
  id?: string;
  title: string;
  description: string;
  createdAt: Dayjs;
  date?: Dayjs;
  color?: string;
  favorite?: boolean;
}