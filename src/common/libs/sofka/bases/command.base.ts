import { ICommand } from '../interface';

export abstract class CommandBase {
  abstract getCommand(): ICommand;
}
