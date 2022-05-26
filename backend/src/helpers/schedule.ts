import schedule from 'node-schedule'
import dayjs from 'dayjs'
import { Appointment } from 'types/schemas'
import { AppointmentModel } from 'models/appointment'

// To re-schedule every time server restart.
export const rescheduleOnStart = async () => {
  try {
    const activeAppointments = await AppointmentModel.find({
      $or: [{ status: 'pending' }, { status: 'ongoing' }],
    })
    for (const appointment of activeAppointments) {
      await scheduleAppointmentUpdate(appointment)
    }
  } catch (error) {
    console.log('Error occured on re-scheduling')
  }
}

// Re-calculate datetime if it's less than current time then convert it to T+1
const recalculateTime = (datetime: Date) => {
  if (dayjs(datetime) > dayjs()) return dayjs(datetime).format()
  return dayjs().add(1, 'minute').format()
}

// Schedule the status update for an appointment
export const scheduleAppointmentUpdate = async (appointment: Appointment) => {
  console.log(`[Schedule] Register a schedule for updating appointment id: ${appointment._id}`)

  const startAt = recalculateTime(appointment.startAt)
  const endAt = recalculateTime(appointment.endAt)

  // If the appointment has no reaction before start time then change status to 'abandoned'
  schedule.scheduleJob(startAt, async () => {
    console.log(`[Schedule] Do checking an 'abandon' appointment`)
    try {
      if (appointment.status === 'pending') {
        // Set appointment status to 'abandoned'
        appointment.status = 'abandoned'
        appointment.save()
      }
    } catch (error) {}
  })

  // If the appointment is end then change status to 'done'
  schedule.scheduleJob(endAt, async () => {
    console.log(`[Schedule] Do checking an 'done' appointment`)
    try {
      if (appointment.status === 'ongoing') {
        // Set appointment status to 'done'
        appointment.status = 'done'
        appointment.save()
      }
    } catch (error) {}
  })
}
