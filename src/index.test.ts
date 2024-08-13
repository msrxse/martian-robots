const turnLeft = (orientation) => {
  if (orientation === "N") return "W";
  if (orientation === "W") return "S";
  if (orientation === "S") return "E";
  if (orientation === "E") return "N";
};

test("When facing N, turning L should cause us to face W", () => {
  expect(turnLeft("N")).toBe("W");
});
test("When facing W, turning L should cause us to face S", () => {
  expect(turnLeft("N")).toBe("W");
});
test("When facing S, turning L should cause us to face E", () => {
  expect(turnLeft("S")).toBe("E");
});
test("When facing E, turning L should cause us to face N", () => {
  expect(turnLeft("E")).toBe("N");
});
