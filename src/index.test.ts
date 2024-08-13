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

test.only("When moving Program off the edge of the grid ", () => {
  const program = ["5 3", "1 1 E", "RFRFRFRF", "0 3 W", "LLFFFLFLFL"];
  expect(run(program)).toEqual(["1 1 E", "3 3 N LOST"]);
});
