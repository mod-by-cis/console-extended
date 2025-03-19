import { setColorEnabled } from "jsr:@std/fmt/colors";

export type ConsoleExtendedMethod = 
| "log"
| "error"
| "debug"
| "info"
| "warn"
| "dir"
| "dirxml"
| "table";
export class ConsoleExtended {
  // Liczniki dla wszystkich metod logujących
  #count: Record<string, number> = {
    log: 0,
    error: 0,
    debug: 0,
    info: 0,
    warn: 0,
    dir: 0,
    dirxml: 0,
    table: 0,
  };
  static #baseConsole = console; // Wbudowana instancja Console
  static #consoleHidden: Record<string, [false, boolean] | true> = {
    log: [false, true],
    error: [false, true],
    debug: [false, true],
    info: [false, true],
    warn: [false, true],
    dir: [false, true],
    dirxml: [false, true],
    table: [false, true],
  };

  // Funkcja pomocnicza do aktualizowania logu i błędów
  #updateHiddenSetting(key: string, value: unknown): void {
    if (value === true) {
      ConsoleExtended.#consoleHidden[key] = true;
    } else if (
      value === false || (Array.isArray(value) && value[1] === false)
    ) {
      ConsoleExtended.#consoleHidden[key] = [false, false];
    } else {
      ConsoleExtended.#consoleHidden[key] = [false, true];
    }
  }

  // Setter dla consoleHidden
  set consoleHidden(mode: Record<string, [false, boolean] | true>) {
    for (const key in mode) {
      if (mode[key] !== undefined) {
        this.#updateHiddenSetting(key, mode[key]);
      }
    }
  }

  get consoleHidden() {
    return ConsoleExtended.#consoleHidden;
  }

  // Ogólna funkcja logująca
  #logMethod(
    method: ConsoleExtendedMethod,
    prefix: string,
    ...args: unknown[]
  ): void {
    // Zwiększenie licznika
    this.#count[method]++;

    // Ustawienie włączania/wyłączania kolorów
    setColorEnabled(
      ConsoleExtended.#consoleHidden[method] !== true &&
        ConsoleExtended.#consoleHidden[method][1],
    );

    // Sprawdzenie, czy logowanie jest dozwolone
    if (ConsoleExtended.#consoleHidden[method] !== true) {
      ConsoleExtended.#baseConsole[method](
        `[${prefix} ${this.#count[method]}]:`,
        ...args,
      );
    }
  }

  // Nadpisanie metod
  log(...args: unknown[]): void {
    this.#logMethod("log", "LOG", ...args);
  }

  logWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("log", prefix, ...args);
  }

  error(...args: unknown[]): void {
    this.#logMethod("error", "ERROR", ...args);
  }

  errorWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("error", prefix, ...args);
  }

  debug(...args: unknown[]): void {
    this.#logMethod("debug", "DEBUG", ...args);
  }

  debugWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("debug", prefix, ...args);
  }

  info(...args: unknown[]): void {
    this.#logMethod("info", "INFO", ...args);
  }

  infoWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("info", prefix, ...args);
  }

  warn(...args: unknown[]): void {
    this.#logMethod("warn", "WARN", ...args);
  }

  warnWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("warn", prefix, ...args);
  }

  dir(...args: unknown[]): void {
    this.#logMethod("dir", "DIR", ...args);
  }

  dirWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("dir", prefix, ...args);
  }

  dirxml(...args: unknown[]): void {
    this.#logMethod("dirxml", "DIRXML", ...args);
  }

  dirxmlWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("dirxml", prefix, ...args);
  }

  table(...args: unknown[]): void {
    this.#logMethod("table", "TABLE", ...args);
  }

  tableWithPrefix(prefix: string, ...args: unknown[]): void {
    this.#logMethod("table", prefix, ...args);
  }

  // Metody do pobierania i resetowania liczników
  getCount(
    method:ConsoleExtendedMethod,
  ): number {
    return this.#count[method];
  }

  resetCount(
    method:ConsoleExtendedMethod,
  ): void {
    this.#count[method] = 0;
  }
}
