import { expect, test } from "vitest";
import { getFutureDate } from "../tests/utils/getFutureDate";
import { Appointment } from "./appointment";

test("creating an appointment", () => {
  const startsAt = getFutureDate("2022-8-10");
  const endsAt = getFutureDate("2022-8-12");


  const appointment = new Appointment({
    customer: "Maria Antonieta",
    startsAt,
    endsAt
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toBe("Maria Antonieta");
});

test("cannot create appointment with end date earlier than start date", () => {
  const startsAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-09");


  expect(() => {
    return new Appointment({
      customer: "André",
      startsAt,
      endsAt
    });
  }).toThrow();
});

test("cannot create appointment with start date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(startsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: "André",
      startsAt,
      endsAt
    });
  }).toThrow();
});