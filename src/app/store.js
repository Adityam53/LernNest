import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "../features/studentsSlice";
import { schoolSlice } from "../features/schoolSlice";
import { teacherSlice } from "../features/teacherSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
    school: schoolSlice.reducer,
    teachers: teacherSlice.reducer,
  },
});
