export abstract class IInfoService {
    abstract success(description: string): void;
    abstract error(description: string): void;
}
