const Compass = ["N", "E", "S", "W"];

const turnRight = (orientation) => {
  return Compass[(Compass.indexOf(orientation) + 1) % 4];
};

const turnLeft = (orientation) => {
  return Compass[(Compass.indexOf(orientation) + 3) % 4];
};

test.each`
  original | expected | direction
  ${"N"}   | ${"E"}   | ${"R"}
  ${"E"}   | ${"S"}   | ${"R"}
  ${"S"}   | ${"W"}   | ${"R"}
  ${"W"}   | ${"N"}   | ${"R"}
  ${"N"}   | ${"W"}   | ${"L"}
  ${"W"}   | ${"S"}   | ${"L"}
  ${"S"}   | ${"E"}   | ${"L"}
  ${"E"}   | ${"N"}   | ${"L"}
`(
  "When facing $original, turning $direction should cause us to face $expected",
  ({ original, expected, direction }) => {
    if (direction === "R") {
      expect(turnRight(original)).toBe(expected);
    } else if (direction === "L") {
      expect(turnLeft(original)).toBe(expected);
    }
  }
);
