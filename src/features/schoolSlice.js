import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null,

    totalTeachers: 0,
    subjectDistribution: {},

    averageTeacherAge: 0,
    averageSubjectsPerTeacher: 0,
  },

  reducers: {
    updateSchoolStats: (state, action) => {
      const {
        totalStudents,
        averageAttendance,
        averageMarks,

        totalTeachers,
        subjectDistribution,
        averageTeacherAge,
        averageSubjectsPerTeacher,
      } = action.payload;

      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;

      state.totalTeachers = totalTeachers;
      state.subjectDistribution = subjectDistribution;
      state.averageTeacherAge = averageTeacherAge;
      state.averageSubjectsPerTeacher = averageSubjectsPerTeacher;
    },

    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
});

export const { updateSchoolStats, setTopStudent } = schoolSlice.actions;

export default schoolSlice.reducer;
