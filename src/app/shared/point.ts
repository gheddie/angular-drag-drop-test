export class Point {

  public x: number;

  public y: number;

  constructor(aX: number, aY: number) {
    this.x = aX;
    this.y = aY;
  }

  calculateFollowingPoint(angle: number, lenght: number) {

    const rad = this.rad(angle);

    console.log('calculating following point of [x=' + this.x + '|y=' + this.y + ']...[angle:' + angle + '|length:' + lenght + ']');

    const b = rad * lenght;
    console.log('b: ' + b);
    const a = b / Math.tan(rad);
    console.log('a: ' + a);

    const result = new Point(this.x + a, this.y + b);

    console.log('returning: [x=' + result.x + '|y=' + result.y + '].');

    return result;
  }

  rad(angle: number) {
    return angle * Math.PI / 180;
  }
}
