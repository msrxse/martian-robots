type Coordinates = [x: number, y: number];
type Orientation = "N" | "E" | "S" | "W";
type Rover = {
  orientation: Orientation;
  position: Coordinates;
  origOrientation: Orientation;
  origPosition: Coordinates;
  lost: boolean;
};
type RoverResult = (Rover & { _: "Success" }) | (Rover & { _: "Failure" });
const Compass: Orientation[] = ["N", "E", "S", "W"];

const turnRight = (rover: Rover): RoverResult => {
  const newOrientation = Compass[(Compass.indexOf(rover.orientation) + 1) % 4];

  return {
    ...rover,
    orientation: newOrientation,
    _: "Success",
  };
};

const turnLeft = (rover: Rover): RoverResult => {
  const newOrientation = Compass[(Compass.indexOf(rover.orientation) + 3) % 4];

  return {
    ...rover,
    orientation: newOrientation,
    _: "Success",
  };
};
const getNextPosition = (position, orientation): Coordinates => {
  const [x, y] = position;
  if (orientation === "N") return [x, y + 1];
  if (orientation === "E") return [x + 1, y];
  if (orientation === "S") return [x, y - 1];
  if (orientation === "W") return [x - 1, y];
};

const outOfBounds = (nextPos: Coordinates, maxPos: Coordinates) =>
  nextPos[0] < 0 ||
  nextPos[1] < 0 ||
  nextPos[0] > maxPos[0] ||
  nextPos[1] > maxPos[1];

const forward = (
  state: RoverResult,
  maxPos: Coordinates,
  scents: string[]
): RoverResult => {
  const nextPos = getNextPosition(state.position, state.orientation);

  if (scents.indexOf(JSON.stringify(state.position)) >= 0) {
    return {
      ...state,
      orientation: state.origOrientation,
      position: state.origPosition,
      _: "Failure",
      lost: false,
    };
  }

  if (
    outOfBounds(nextPos, maxPos) &&
    scents.indexOf(JSON.stringify(state.position)) >= -1
  ) {
    scents.push(JSON.stringify(state.position));

    return { ...state, _: "Failure", lost: true };
  }

  return { ...state, position: nextPos };
};

const apply = (
  instruction: string,
  state: RoverResult,
  maxPos: Coordinates,
  scents: string[]
): RoverResult => {
  if (instruction === "R") return turnRight(state);
  if (instruction === "L") return turnLeft(state);
  if (instruction === "F") return forward(state, maxPos, scents);
};

export const execute = (
  instructions: string,
  state: RoverResult,
  maxPos: Coordinates,
  scents: string[]
) => {
  let result = state;

  for (const instruction of instructions) {
    result = apply(instruction, result, maxPos, scents);
    if (result._ === "Failure") break;
  }
  return result;
};

const print = (state: RoverResult) => {
  const location = `${state.position[0]} ${state.position[1]} ${state.orientation}`;
  return state.lost ? `${location} LOST` : `${location}`;
};

const initialState = (location): RoverResult => {
  const [x, y, orientation] = location.split(" ");

  return {
    orientation,
    origOrientation: orientation,
    origPosition: [parseInt(x), parseInt(y)],
    position: [parseInt(x), parseInt(y)],
    _: "Success",
    lost: false,
  };
};

export const run = (program: string[]) => {
  const result = [];
  const scents: string[] = [];
  const [x, y] = program.shift().split(" ");
  const maxPos: Coordinates = [parseInt(x), parseInt(y)];

  while (program.length > 0) {
    const location = program.shift();
    const instrucctions = program.shift();
    const state = execute(
      instrucctions,
      initialState(location),
      maxPos,
      scents
    );

    result.push(print(state));
  }
  return result;
};
