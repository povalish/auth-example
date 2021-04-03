export enum Field {
  // eslint-disable-next-line no-unused-vars
  Tokens = 'Tokens',
}

export class LocalStorage {
  /**
   * Setting data to Local Storage.
   *
   * @param field Local Storage field.
   * @param value Saving value.
   */
  public static save<T>(field: Field, value: T): void {
    try {
      if (!localStorage) {
        return;
      }

      const stringValue = JSON.stringify(value);
      localStorage.setItem(field, stringValue);
    // eslint-disable-next-line no-empty
    } catch (err) { }
  }

  /**
   * Getting data from Local Storage.
   * @param field Local Storage field.
   * @returns Data or null.
   */
  public static get<T>(field: string): T | null {
    try {
      if (!localStorage) {
        return null;
      }

      const stringValue = localStorage.getItem(field);
      if (stringValue) {
        return JSON.parse(stringValue) as T;
      }
    } catch (err) { return null; }

    return null;
  }

  /**
   * Removing item from Local Storage.
   * @param field Local Storage field.
   */
  public static remove(field: string): void {
    try {
      if (!localStorage) {
        return;
      }

      localStorage.removeItem(field);
    // eslint-disable-next-line no-empty
    } catch (err) { }
  }
}
