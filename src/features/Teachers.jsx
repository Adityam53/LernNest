import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TeacherList from "../components/TeacherList";
import { fetchTeacherAsync } from "./teacherSlice";

const Teachers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeacherAsync());
  }, [dispatch]);

  return <TeacherList />;
};

export default Teachers;
