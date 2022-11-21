import { AppointmentsRepository } from "./../../repositories/appointments-repository";
import { Appointment } from "../appointment";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlapingAppointment = await this.appointmentsRepository.findOverlapingAppointment(startsAt, endsAt);

    if (overlapingAppointment) {
      throw new Error("Date already reserved");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
