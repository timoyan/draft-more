/**
* Utility function to execute callback for eack key->value pair.
*/
export function forEach(obj: Object, callback: Function) {
    if (obj) {
      for (const key in obj) { // eslint-disable-line no-restricted-syntax
        if ({}.hasOwnProperty.call(obj, key)) {
          callback(key, obj[key]);
        }
      }
    }
  }