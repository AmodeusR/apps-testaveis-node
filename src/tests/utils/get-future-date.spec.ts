import { test, expect } from "vitest";
import { getFutureDate } from "./getFutureDate";

test("should return a date", () => {
  const currentYear = new Date().getFullYear();
  const date = getFutureDate(`${currentYear}-10-20`);

  expect(date.getFullYear()).toEqual(2023);
});