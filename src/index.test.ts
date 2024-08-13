import { run } from ".";
// export const rover = (orientation: Orientation, position?: Coordinates) => ({
//   orientation,
//   position: position || [0, 0],
// });

// test.each`
//   original | expected | direction
//   ${"N"}   | ${"E"}   | ${"R"}
//   ${"E"}   | ${"S"}   | ${"R"}
//   ${"S"}   | ${"W"}   | ${"R"}
//   ${"W"}   | ${"N"}   | ${"R"}
//   ${"N"}   | ${"W"}   | ${"L"}
//   ${"W"}   | ${"S"}   | ${"L"}
//   ${"S"}   | ${"E"}   | ${"L"}
//   ${"E"}   | ${"N"}   | ${"L"}
// `(
//   "When facing $original, turning $direction should cause us to face $expected",
//   ({ original, expected, direction }) => {
//     if (direction === "R") {
//       expect(execute("R", rover(original))).toEqual(rover(expected));
//     } else if (direction === "L") {
//       expect(execute("L", rover(original))).toEqual(rover(expected));
//     }
//   }
// );

// test("When moving forward N, we should increment the Y coordinate", () => {
//   expect(execute("F", rover("N", [0, 0]))).toEqual(rover("N", [0, 1]));
// });
// test("When moving forward E, we should increment the X coordinate", () => {
//   expect(execute("F", rover("E", [0, 0]))).toEqual(rover("E", [1, 0]));
// });
// test("When moving forward S, we should decrement the Y coordinate", () => {
//   expect(execute("F", rover("S", [0, 0]))).toEqual(rover("S", [0, -1]));
// });
// test("When moving forward W, we should decrement the X coordinate", () => {
//   expect(execute("F", rover("W", [0, 0]))).toEqual(rover("W", [-1, 0]));
// });

// test("When executing multiple commands", () => {
//   expect(run("RFRFRFRF", rover("E", [1, 1]))).toEqual(rover("E", [1, 1]));
// });

// test("When executing multiple commands", () => {
//   expect(run("LLFFFLFLFL", rover("W", [0, 3]))).toEqual(rover("S", [2, 4]));
// });

test("When executing a program", () => {
  const program = ["5 3", "1 1 E", "RFRFRFRF"];
  expect(run(program)).toEqual(["1 1 E"]);
});

test("When moving Program off the edge of the grid ", () => {
  const program = ["5 3", "1 1 E", "RFRFRFRF", "0 3 W", "LLFFFLFLFL"];
  expect(run(program)).toEqual(["1 1 E", "3 3 N LOST"]);
});

test("When moving a second program off the grid - it ignores it if another robot already exited from same point", () => {
  const program = ["5 3", "0 3 W", "LLFFFLFLFL", "0 3 W", "LLFFFLFLFL"];
  expect(run(program)).toEqual(["3 3 N LOST", "0 3 W"]);
});

test("When moving off the grid - when initial position is same as exit", () => {
  const program = ["1 1", "0 1 N", "F", "0 1 N", "F"];
  expect(run(program)).toEqual(["0 1 N LOST", "0 1 N"]);
});

// Note that 3rd output must be wrong in instructions - Since the second instructions leaves a
// scent in [3, 3] 3rd instruction attempts to leave again at same point - therefor actual correct output is '0 3 W' (is ignored)
test("When running full Program", () => {
  const program = [
    "5 3",
    "1 1 E",
    "RFRFRFRF",
    "3 2 N",
    "FRRFLLFFRRFLL",
    "0 3 W",
    "LLFFFLFLFL",
  ];
  expect(run(program)).toEqual(["1 1 E", "3 3 N LOST", "0 3 W"]);
});
