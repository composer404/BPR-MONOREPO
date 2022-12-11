export abstract class ILoggerService {
    abstract error(message: string): void;
    abstract log(message: string): void;
}
