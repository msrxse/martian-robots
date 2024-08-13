type Coordinates = [x: number, y: number];
type Orientation = "N" | "E" | "S" | "W";
type Rover = {
  orientation: Orientation;
  position: Coordinates;
};
const Compass: Orientation[] = ["N", "E", "S", "W"];
const rover = (orientation: Orientation, position?: Coordinates) => ({
  orientation,
  position: position || [0, 0],
});

const turnRight = (state: Rover) => {
  const newOrientation = Compass[(Compass.indexOf(state.orientation) + 1) % 4];

  return rover(newOrientation);
};

const turnLeft = (state: Rover) => {
  const newOrientation = Compass[(Compass.indexOf(state.orientation) + 3) % 4];

  return rover(newOrientation);
};
const forward = (state: Rover) => {
  const [x, y] = state.position;
  if (state.orientation === "N") return rover("N", [x, y + 1]);
  if (state.orientation === "E") return rover("E", [x + 1, y]);
  if (state.orientation === "S") return rover("S", [x, y - 1]);
  if (state.orientation === "W") return rover("W", [x - 1, y]);
};

const execute = (instruction: string, rover: Rover) => {
  if (instruction === "R") return turnRight(rover);
  if (instruction === "L") return turnLeft(rover);
  if (instruction === "F") return forward(rover);
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
