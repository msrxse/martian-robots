# Martian Robots

## About

Developer programming problem submission for **Red Badger**

## Install

```
[pnpm, npm or yarn] install
```

## Tests

```
[pnpm, npm or yarn] run test
```

## Approach

- I am using a bottom-up functional approach. In typescript I prefer to write functional code rather than procedural or object-oriented code and one of the techniques I find very useful when I'm writing functional code is bottom-up design. I start off by writing the simplest units of software and then slowly compose those to build a more complex system.

1.  The smallest pieces of software are the behaviors of the rovers. A rover can turn left, turn right or it can move forward. I usually start off with the tests for each rover action, and as I move on I ensure these don't break.
2.  I then usually enter into refactoring mode where I want to turn my attention to the design of the code, combining tests into 1 with test.each templates, or merging similar functions into one, and ensuring functions follow the single responsibility principle, and imnmutability.
3.  Next I change the way tests work so that instead of working against those low level functions I take one step up the abstraction. So in this bottom-up approach the challenge is that the tests now are written against these small functions and that can make it harder to refactor in the future. In the process is OK to discard old tests as the new tests will still have 100% coverage.
4.  Moving on the code will move from, executing a full single instruction, then to execute a list of instructions (different rovers). Next, I introduce a Success/Failure result - that allows us to slow the instructions if the rover leaves the grid. And finally, another flag to only mark the first rover as LOST, while successive rovers exiting through same cell will be ignored.

- The approach I have taken is that I have tested very small pieces that are very safe and easy to work with and slowly refactored those out so that I don't have any coupling to any of the implementation detail, if I decide to refactor code, the tests will not fail at this point.

- I use TDD and here I do this red green refactor cycle where the red phase is when I want to write a test and I want to see that test fail for some kind of semantically valid reason, a test that would work if our behavior existed.
- Then I write tests I want to keep them clean I want to keep them easy to read i think that introducing helper functions can really help to keep our code close and easy to understand.

## The Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.
A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the instructions:

- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current
  orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

There is also a possibility that additional command types may be required in the future and provision should be made for this.

Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move “off” the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.

### The Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0, 0.
The remaining input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters “L”, “R”, and “F” on one line.
Each robot is processed sequentially, i.e., finishes executing the robot instructions before the next robot begins execution.
The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.

### The Output

For each robot position/instruction in the input, the output should indicate the final grid position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST” should be printed after the position and orientation.

**Sample Input**

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

**Sample Output**

```
1 1 E
3 3 N LOST
2 3 S
```
