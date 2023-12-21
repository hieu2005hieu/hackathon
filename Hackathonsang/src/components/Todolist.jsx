import React from "react";
import { TiDelete } from "react-icons/ti";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import "../components/Todolist.scss";
export default function Todolist() {
  const [job, setJob] = useState([]);
  const [name, setName] = useState({
    name: "",
  });
  const [edit, setEdit] = useState(false);
  const hanldinput = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const handlgetServer = async () => {
    const response = await axios.get("http://localhost:8080/todoList/job");
    setJob(response.data);
  };
  useEffect(() => {
    handlgetServer();
  }, []);
    const hanldsave = async () => {
    if (name.name == "") {
      alert("Không Được Để Trống");
    } else {
      const response = await axios.post(
        "http://localhost:8080/todoList/job/add",
        {
          ...name,
        }
      );
      setJob(response.data);
      setName({ name: "" });
    }
  };

  const hanldDELETE = async (id) => {
    const confirms = confirm("Bạn Có Muốn Xóa Công Việc ? ");
    if (confirms) {
      const response = await axios.delete(
        `http://localhost:8080/todoList/job/delete/${id}`
      );
      setJob(response.data);
    } 
  };
  const hanldEdit = (item) => {
    console.log(item);
    setName({ ...item, name: item.nameJob });
    setEdit(true);
  };

  const hanldEdits = async () => {
    const response = await axios.put(
      `http://localhost:8080/todoList/job/edit/${name.id}`,
      name
    );
    setJob(response.data);
    setEdit(false);
    setName({ name: "" });
  };
  return (
    <>
      <div className="container">
        <h2>TODOS</h2>
        <input
          type="text"
          name="name"
          onChange={hanldinput}
                  value={name.name}
                  placeholder="NameJob"
        />

        {edit ? (
          <button onClick={hanldEdits} style={{ backgroundColor: "#D2691E" }}>
            <AiFillEdit />
            Edit
          </button>
        ) : (
          <button onClick={hanldsave}>
            <CgPlayListAdd />
            Add
          </button>
        )}
        <table border={1} cellPadding={5} cellSpacing={5}>
          <thead>
            <tr>
              <th>id</th>
              <th>Tên</th>
              <th>Tình Trạng</th>
              <th>Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {job.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.nameJob}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => hanldEdit(item)}>
                      <AiOutlineEdit />
                      SỬA
                    </button>
                    <button onClick={() => hanldDELETE(item.id)}>
                      <TiDelete />
                      XÓA
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Số Lượng Công Việc Trong Bảng Là: {job.length} Công Việc</h3>
      </div>
    </>
  );
}
