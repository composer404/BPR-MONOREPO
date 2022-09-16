import * as minimist from 'minimist';

export interface CliOptions {
    serve: boolean;
}

export interface ElectronOptions {
    cli: CliOptions & minimist.ParsedArgs;
    angularJson: any;
    angularJsonProject: any;
    packageJson: any;
    projectPath: string;
}
