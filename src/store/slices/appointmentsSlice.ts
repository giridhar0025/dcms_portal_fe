import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

interface AppointmentsState {
  items: Appointment[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AppointmentsState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchAppointments = createAsyncThunk<Appointment[], void, { rejectValue: string }>(
  'appointments/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<Appointment[]>('/api/appointments');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createAppointment = createAsyncThunk<Appointment, Omit<Appointment, 'id'>, { rejectValue: string }>(
  'appointments/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post<Appointment>('/api/appointments', data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateAppointment = createAsyncThunk<Appointment, Appointment, { rejectValue: string }>(
  'appointments/update',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put<Appointment>(`/api/appointments/${data.id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteAppointment = createAsyncThunk<string, string, { rejectValue: string }>(
  'appointments/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load appointments';
      })
      .addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.items.push(action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        const idx = state.items.findIndex((a) => a.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  }
});

export default appointmentsSlice.reducer;
