
import * as na from 'nanoid';
// const na  = require('nanoid')

/** Sends a blur to the active element in the Document */
export function blurActiveElement(): void {
  const element = document.activeElement;
  if (element instanceof HTMLElement) {
    element.blur();
  }
}

export function numberize(x: any) {
  return Number(x);
}

export function titleCaseWord(word: string) {
  if (!word) {
    return word;
  };
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function generateId() {
  return na.nanoid();
}

export function sumPointsArray(array: any): any {
  const sum = array.reduce((a: any, b: any) => a + b, 0);
  return sum;
}
