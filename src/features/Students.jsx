import { useEffect } from "react";
import { fetchStudents } from "./studentsSlice";
import { useDispatch } from "react-redux";
import StudentList from "../components/StudentList";

const Students = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return <StudentList />;
};

export default Students;
