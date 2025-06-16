import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarView from '../components/scheduling/CalendarView';
import { RootState, AppDispatch } from '../store';
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  Appointment,
} from '../store/slices/appointmentsSlice';
import { Modal, Button, Input } from '../components/ui';

const emptyForm: Appointment = {
  id: '',
  patientId: '',
  doctorId: '',
  startTime: '',
  endTime: '',
  notes: '',
};

export default function Appointments() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.appointments);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Appointment>(emptyForm);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleSelect = (arg: any) => {
    setForm({ ...emptyForm, startTime: arg.startStr, endTime: arg.endStr });
    setOpen(true);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.id) {
      dispatch(updateAppointment(form));
    } else {
      const { id, ...data } = form;
      dispatch(createAppointment(data));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (form.id) dispatch(deleteAppointment(form.id));
    setOpen(false);
  };

  return (
    <div className="p-4">
      <CalendarView
        events={items.map((a) => ({
          id: a.id,
          title: a.notes || 'Appointment',
          start: a.startTime,
          end: a.endTime,
        }))}
        onSelect={handleSelect}
        onDrop={() => {}}
      />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Header>{form.id ? 'Edit Appointment' : 'New Appointment'}</Modal.Header>
        <Modal.Body className="space-y-3">
          <Input label="Patient ID" name="patientId" value={form.patientId} onChange={handleChange} />
          <Input label="Doctor ID" name="doctorId" value={form.doctorId} onChange={handleChange} />
          <Input label="Start Time" type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} />
          <Input label="End Time" type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} />
          <Input label="Notes" name="notes" value={form.notes} onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer className="flex justify-end space-x-2">
          {form.id && (
            <Button color="error" variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
