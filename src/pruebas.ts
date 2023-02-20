/* eslint-disable @typescript-eslint/ban-types */
/**
 * Interface general para casos de uso
 */
interface IUseCase<P, A> {
  execute(payload?: P): A;
}

/**
 * Interface general para eventos de dominio
 */
interface IDomainEvent<P> {
  execute(info: IDomainEventData, payload?: P): void;
}

/**
 * Interface general para información del evento de dominio
 */
interface IDomainEventData {
  domain: string;
  subdomain?: string;
  context: string;
  aggregate: string;
  entity?: string;
}

/**
 * Interface general para el comando que registrará
 */
interface ICommand {
  name: string;
  command: Function;
  commandDependencies?: Array<any>;
  domainEvent: Function;
  domainEventData: IDomainEventData;
}

/**
 * Objeto de valor
 */
class DataUserValueObject {
  name: string;
  lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}

/**
 * Objeto de valor
 */
class SignInValueObject {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

/**
 * Caso de uso para registrar un usuario
 */
class RegisterUseCase implements IUseCase<DataUserValueObject, string> {
  constructor(private readonly ejemplo: Ejemplo) {}

  execute(payload?: DataUserValueObject): string {
    console.log('RegisterUseCase: payload: ', payload);
    console.log("Hola Mundo desde 'RegisterUseCase'");
    this.ejemplo.mensaje();
    return "Hola Mundo desde 'RegisterUseCase'";
  }
}

/**
 * Evento de dominio para ejecutar cuando se haya registrado un usuario
 */
class RegisteredDomainEvent implements IDomainEvent<DataUserValueObject> {
  execute(info: IDomainEventData, payload?: DataUserValueObject): void {
    console.log('// ------- INICIO EVENTO ------- //');
    console.log('RegisteredDomainEvent: info: ', info);
    console.log('RegisteredDomainEvent: payload: ', payload);
    console.log('// ------- FINAl EVENTO ------- //');
  }
}

// /**
//  * Caso de uso para identificar un usuario en el sistema
//  */
// class SignInUseCase implements IUseCase<SignInValueObject, string> {
//   execute(payload?: SignInValueObject): string {
//     console.log("SignInUseCase: payload: ", payload);
//     console.log("Hola Mundo desde 'SignInUseCase'");
//     return "Hola Mundo desde 'SignInUseCase'";
//   }
// }

// /**
//  * Evento de dominio sobre un usuario que ha sido identificado en el sistema
//  */
// class SignedInDomainEvent implements IDomainEvent<SignInValueObject> {
//   execute(info: IDomainEventData, payload?: SignInValueObject): void {
//     console.log("SignedInDomainEvent: info: ", info);
//     console.log("SignedInDomainEvent: payload: ", payload);
//   }
// }

/**
 * Clase abstracta para el manejo de los agregados roots
 */
abstract class AggregateRoot {
  protected _commands: Map<string, any>;

  constructor() {
    this._commands = new Map<string, any>();
  }

  protected registerCommand(command: ICommand): void {
    this._commands.set(command.name, command);
  }

  executeCommand<P, A>(command: string, payload?: P): A | undefined {
    if (this.hasCommand(command)) {
      const cmd = this.getCommand<P, A>(command);
      const answer = cmd.execute(payload);
      // this.executeDomainEvent(command, payload);
      return answer;
    }
    throw new Error(`The command "${command}" is not supported`);
  }

  // private executeDomainEvent<P, A>(command: string, payload?: P): void {
  //   const cmd = this._commands.get(command).domainEvent as IDomainEvent<P>;
  //   const domainEventData = this.getDomainEventData(command);
  //   new (cmd.execute as any)(domainEventData, payload);
  // }

  private hasCommand(command: string): boolean {
    return this._commands.has(command);
  }

  private getCommand<P, A>(command: string): IUseCase<P, A> {
    const cmd = this._commands.get(command) as ICommand;
    let response: Function;
    if (cmd.commandDependencies && cmd.commandDependencies.length > 0) {
      response = new (cmd.command as any)(new cmd.commandDependencies[0]());
    } else {
      response = new (cmd.command as any)();
    }
    return response as unknown as IUseCase<P, A>;
    // return this._commands.get(command).command as IUseCase<P, A>;
  }

  private getDomainEventData(command: string): IDomainEventData {
    return this._commands.get(command).domainEventData as IDomainEventData;
  }
}

class Ejemplo {
  mensaje() {
    console.log('esto es un mensaje');
  }
}

/**
 * Creación de un agregado root con el registro de comandos y sus eventos de dominio
 */
class UserAggregateRoot extends AggregateRoot {
  constructor() {
    super();
    this.registerCommand({
      name: 'UserRegister',
      command: RegisterUseCase,
      commandDependencies: [Ejemplo],
      domainEvent: RegisteredDomainEvent,
      domainEventData: {
        domain: 'Banco',
        subdomain: 'Cuentas bancarias',
        context: 'Cuentas',
        aggregate: 'Clientes',
        entity: 'ContactInformation',
      },
    });
    // this.registerCommand<SignInValueObject, string>({
    //   name: "UserSignIn",
    //   command: new SignInUseCase(),
    //   domainEvent: new SignedInDomainEvent(),
    //   domainEventData: {
    //     domain: "Banco",
    //     subdomain: "Cuentas bancarias",
    //     context: "Transacciones",
    //     aggregate: "Cuentas",
    //     entity: "Transferencia"
    //   }
    // });
  }
}

const app = new UserAggregateRoot();

const payload1 = new DataUserValueObject('Julian', 'Lasso');
const answer1 = app.executeCommand<DataUserValueObject, string>(
  'UserRegister',
  payload1,
);
console.log('answer1', answer1);

// console.log('---------------------------------------------------------------------------------------------------------');
// const payload2 = new SignInValueObject("jalfcolombia", "Mj123+");
// const answer2 = app.executeCommand<SignInValueObject, string>(
//   "UserSignIn",
//   payload2
// );
// console.log('answer2', answer2);

const data = new Map<string, Function>([
  ['instance0', UserAggregateRoot],
  ['object0', UserAggregateRoot],
]);

for (const fn of data.keys()) {
  console.log(fn);
}
