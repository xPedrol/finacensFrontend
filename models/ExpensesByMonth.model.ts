import { IGoal } from "./Goal.model";

export interface IExpensesByMonth extends IGoal {
  gains: number;
  losses: number;
}
