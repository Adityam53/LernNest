import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://learn-nest-backend.vercel.app/teachers";

export const fetchTeacherAsync = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const res = await axios.get(API);
    return res.data;
  },
);

export const addTeacherAsync = createAsyncThunk(
  "teachers/addTeachers",
  async (newTeacher) => {
    const res = await axios.post(API, newTeacher);
    return res.data;
  },
);

export const updateTeacherAsync = createAsyncThunk(
  "teachers/updateTeachers",
  async ({ id, updatedData }) => {
    const res = await axios.put(`${API}/${id}`, updatedData);
    return res.data;
  },
);

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeachers",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  },
);
export const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeacherAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeacherAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    builder.addCase(addTeacherAsync.fulfilled, (state, action) => {
      state.teachers.push(action.payload);
    });

    builder.addCase(updateTeacherAsync.fulfilled, (state, action) => {
      state.teachers = state.teachers.map((teacher) =>
        teacher._id === action.payload._id ? action.payload : teacher,
      );
    });

    builder.addCase(deleteTeacherAsync.fulfilled, (state, action) => {
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload._id,
      );
    });
  },
});

export default teacherSlice.reducer;
