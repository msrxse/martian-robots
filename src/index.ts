type Coordinates = [x: number, y: number];
type Orientation = "N" | "E" | "S" | "W";
export type Rover = {
  orientation: Orientation;
  position: Coordinates;
};
const Compass: Orientation[] = ["N", "E", "S", "W"];

const turnRight = (rover: Rover): Rover => {
  const newOrientation = Compass[(Compass.indexOf(rover.orientation) + 1) % 4];

  return {
    ...rover,
    orientation: newOrientation,
  };
};

const turnLeft = (rover: Rover): Rover => {
  const newOrientation = Compass[(Compass.indexOf(rover.orientation) + 3) % 4];

  return {
    ...rover,
    orientation: newOrientation,
  };
};
const getNextPosition = (position, orientation): Coordinates => {
  const [x, y] = position;
  if (orientation === "N") return [x, y + 1];
  if (orientation === "E") return [x + 1, y];
  if (orientation === "S") return [x, y - 1];
  if (orientation === "W") return [x - 1, y];
};

const forward = (state: Rover) => {
  const nextPos = getNextPosition(state.position, state.orientation);
  return { ...state, position: nextPos };
};

const apply = (instruction: string, state: Rover): Rover => {
  if (instruction === "R") return turnRight(state);
  if (instruction === "L") return turnLeft(state);
  if (instruction === "F") return forward(state);
};

export const execute = (instructions: string, state: Rover) => {
  let result = state;

  for (const instruction of instructions) {
    result = apply(instruction, result);
  }
  return result;
};
