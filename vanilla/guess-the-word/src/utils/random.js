export class Random {
  /** Returns a random integer in the range (min, max)
   * @param {number} min
   * @param {number} max
   */
  static intInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Returns a random element from an array
   * @template T
   * @param {T[] | readonly T[]} array
   * @returns {T}
   */
  static element(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
