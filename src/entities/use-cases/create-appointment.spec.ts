import { InMemoryAppointmentRepository } from "./../../repositories/in-memory/in-memory-appointment-repositories";
import { getFutureDate } from "./../../tests/utils/getFutureDate";
import { describe, test, expect } from "vitest";
import { Appointment } from "../appointment";
import { CreateAppointment } from "./create-appointment";

describe("Create appointment", () => {
  test("should be able to create appointment", () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    expect(
      createAppointment.execute({
        customer: "Maria Antonieta",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  test("shouldn't be able to create appointment with overlaping dates", async () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    await createAppointment.execute({
      customer: "Efraim",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "Maria Antonieta",
        startsAt: getFutureDate("2022-08-13"),
        endsAt: getFutureDate("2022-08-16"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Maria Antonieta",
        startsAt: getFutureDate("2022-08-09"),
        endsAt: getFutureDate("2022-08-14"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Maria Antonieta",
        startsAt: getFutureDate("2022-08-11"),
        endsAt: getFutureDate("2022-08-13"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
