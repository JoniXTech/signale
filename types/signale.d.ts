/* Authors: Resi Respati <https://github.com/resir014>
 *          Kingdaro <https://github.com/kingdaro>
 *          Joydip Roy <https://github.com/rjoydip>
 *          Klaus Sinani <https://github.com/klaussinani>
 */

import { Writable as WritableStream } from 'stream';

declare namespace signale {
  export type DefaultMethods =
    | 'await'
    | 'complete'
    | 'debug'
    | 'error'
    | 'fatal'
    | 'fav'
    | 'info'
    | 'log'
    | 'note'
    | 'pause'
    | 'pending'
    | 'star'
    | 'start'
    | 'success'
    | 'wait'
    | 'warn'
    | 'watch';

  export type ChalkColor =
    | 'black'
    | 'blue'
    | 'blueBright'
    | 'cyan'
    | 'cyanBright'
    | 'gray'
    | 'green'
    | 'greenBright'
    | 'magenta'
    | 'magentaBright'
    | 'red'
    | 'redBright'
    | 'white'
    | 'whiteBright'
    | 'yellow'
    | 'yellowBright';

  export type LogLevel = 'info' | 'timer' | 'debug' | 'warn' | 'error';

  export type Secret = string | number;
  export type Secrets = Secret[];

  export type LoggerFunction = (...message: any[]) => void;

  export interface LoggerConfiguration {
    badge: string;
    color: ChalkColor;
    label: string;
    logLevel?: LogLevel;
    stream?: WritableStream | WritableStream[];
  }

  export interface InstanceConfiguration {
    displayBadge?: boolean;
    displayDate?: boolean;
    displayFilename?: boolean;
    displayLabel?: boolean;
    displayScope?: boolean;
    displayTimestamp?: boolean;
    underlineLabel?: boolean;
    underlineMessage?: boolean;
    underlinePrefix?: boolean;
    underlineSuffix?: boolean;
    uppercaseLabel?: boolean;
  }

  export interface ConstructorOptions<T extends string = DefaultMethods> {
    config?: InstanceConfiguration;
    disabled?: boolean;
    interactive?: boolean;
    logLevel?: LogLevel;
    /**
     * Runtime stores scopes as an array when created via `.scope(...)`.
     * Constructor accepts either a string (common) or the internal array form.
     */
    scope?: string | string[];
    secrets?: Secrets;
    stream?: WritableStream | WritableStream[];
    /**
     * Runtime stores timer start times as `Date.now()` numbers.
     */
    timers?: Map<string, number>;
    types?: Partial<Record<T, LoggerConfiguration>>;
  }

  export interface SignaleConstructor {
    new <T extends string = DefaultMethods>(options?: ConstructorOptions<T>): Signale<T>;
  }

  export interface SignaleBase<T extends string = DefaultMethods> {
    addSecrets(secrets: Secrets): void;
    clearSecrets(): void;

    config(configObj: InstanceConfiguration): Signale<T>;

    disable(): void;
    enable(): void;
    isEnabled(): boolean;

    scope(...name: string[]): Signale<T>;
    unscope(): void;

    time(label?: string): string;
    timeEnd(label?: string): { label: string; span: number } | undefined;
  }

  export type Signale<T extends string = DefaultMethods> =
    & SignaleBase<T>
    & Record<T, LoggerFunction>
    & Record<DefaultMethods, LoggerFunction>;
}

declare const signale: signale.Signale<signale.DefaultMethods> & {
  Signale: signale.SignaleConstructor;
};

export = signale;
