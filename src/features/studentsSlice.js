import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://learn-nest-backend.vercel.app/students";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const res = await axios.get(API);
    return res.data;
  },
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const res = await axios.post(API, newStudent);
    return res.data;
  },
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedStudent }) => {
    const res = await axios.put(`${API}/${id}`, updatedStudent);
    return res.data;
  },
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  },
);
export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    filter: "All",
    sortBy: "name",
    status: "idle",
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });

    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      const index = state.students.findIndex(
        (s) => s._id === action.payload._id,
      );

      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });

    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload,
      );
    });
  },
});

export const { setFilter, setSortBy } = studentsSlice.actions;
export default studentsSlice.reducer;
