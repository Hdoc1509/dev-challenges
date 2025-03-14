export class Random {
  /** Returns a random integer in the range (min, max)
   * @param {number} min
   * @param {number} max
   */
  static intInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
