type Coordinates = [x: number, y: number];
type Orientation = "N" | "E" | "S" | "W";
export type Rover = {
  orientation: Orientation;
  position: Coordinates;
};
const Compass: Orientation[] = ["N", "E", "S", "W"];
export const rover = (orientation: Orientation, position?: Coordinates) => ({
  orientation,
  position: position || [0, 0],
});

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
const forward = (state: Rover) => {
  const [x, y] = state.position;
  if (state.orientation === "N") return rover("N", [x, y + 1]);
  if (state.orientation === "E") return rover("E", [x + 1, y]);
  if (state.orientation === "S") return rover("S", [x, y - 1]);
  if (state.orientation === "W") return rover("W", [x - 1, y]);
};

export const execute = (instruction: string, rover: Rover): Rover => {
  if (instruction === "R") return turnRight(rover);
  if (instruction === "L") return turnLeft(rover);
  if (instruction === "F") return forward(rover);
};
