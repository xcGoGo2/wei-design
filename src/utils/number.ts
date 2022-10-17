/**
 * 生成从minNum到maxNum的随机数
 * @param minNum 最小数
 * @param maxNum 最大数
 * @returns 随机生成的数
 */
 export function randomNum(minNum: number | string, maxNum: number | string): number {
  minNum = isNaN(Number(minNum)) ? 0 : Number(minNum);
  maxNum = isNaN(Number(maxNum)) ? 0 : Number(maxNum);
  switch (arguments.length) {
    case 1:
      return parseInt((Math.random() * minNum + 1).toString(), 10);
    case 2:
      return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10);
    default:
      return 0;
  }
}