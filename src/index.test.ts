import { rover, execute } from ".";
import type { Rover } from ".";
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
      expect(execute("R", rover(original))).toEqual(rover(expected));
    } else if (direction === "L") {
      expect(execute("L", rover(original))).toEqual(rover(expected));
    }
  }
);

test("When moving forward N, we should increment the Y coordinate", () => {
  expect(execute("F", rover("N", [0, 0]))).toEqual(rover("N", [0, 1]));
});
test("When moving forward E, we should increment the X coordinate", () => {
  expect(execute("F", rover("E", [0, 0]))).toEqual(rover("E", [1, 0]));
});
test("When moving forward S, we should decrement the Y coordinate", () => {
  expect(execute("F", rover("S", [0, 0]))).toEqual(rover("S", [0, -1]));
});
test("When moving forward W, we should decrement the X coordinate", () => {
  expect(execute("F", rover("W", [0, 0]))).toEqual(rover("W", [-1, 0]));
});

const run = (instructions: string, rover: Rover) => {
  let result = rover;

  for (const instruction of instructions) {
    result = execute(instruction, result);
  }
  return result;
};

test("When executing multiple commands", () => {
  expect(run("RFRFRFRF", rover("E", [1, 1]))).toEqual(rover("E", [1, 1]));
});

test("When executing multiple commands", () => {
  expect(run("LLFFFLFLFL", rover("W", [0, 3]))).toEqual(rover("S", [2, 4]));
});
