export class Random {
  /** Returns a random integer in the interval `[min, max]`
   * @param {number} min
   * @param {number} max
   */
  static int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Returns a random element from an array
   * @template T
   * @param {T[] | readonly T[]} array
   * @returns {T}
   */
  // TODO: Rename it to `.pick()` or `.take()`
  static element(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
