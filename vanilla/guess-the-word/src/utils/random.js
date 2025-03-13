export class Random {
  /** Returns a random integer between min (inclusive) and max (inclusive).
   * @param {number} min
   * @param {number} max
   */
  static intBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
