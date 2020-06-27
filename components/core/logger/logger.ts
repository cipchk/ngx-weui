import { isDevMode } from '@angular/core';
import { NwSafeAny } from '../types';

const record: Record<string, boolean> = {};

export const PREFIX = '[NGX-WEUI]:';

function notRecorded(...args: NwSafeAny[]): boolean {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), '');

  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}

function consoleCommonBehavior(consoleFunc: (...args: NwSafeAny) => void, ...args: NwSafeAny[]): void {
  if (isDevMode() && notRecorded(...args)) {
    consoleFunc(...args);
  }
}

// Warning should only be printed in dev mode and only once.
export const warn = (...args: NwSafeAny[]) => consoleCommonBehavior((...arg: NwSafeAny[]) => console.warn(PREFIX, ...arg), ...args);

export const deprecation10 = (comp: string, from: string, to?: string) => {
  warnDeprecation(`${comp} => '${from}' is going to be removed in 10.0.0${to ? `, Please use '${to}' instead` : ``}.`);
};

export const warnDeprecation = (...args: NwSafeAny[]) => {
  if (isDevMode()) {
    const stack = new Error().stack;
    return consoleCommonBehavior((...arg: NwSafeAny[]) => console.warn(PREFIX, 'deprecated:', ...arg, stack), ...args);
  } else {
    return () => {};
  }
};

// Log should only be printed in dev mode.
export const log = (...args: NwSafeAny[]) => {
  if (isDevMode()) {
    console.log(PREFIX, ...args);
  }
};
