
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Popconfirm, notification } from "antd";
import UpdateUserModal from "./update.user.modal";
import ViewUserDetail from "./view.user.detail";

import {deleteUserAPI} from "../../services/api.service.js"

const UserTable = (props) => {
  const { dataUsers, loadUser } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate]= useState(null);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);



  const handleDeleteUser = async (id) => {
    const res =  await deleteUserAPI(id);
    if(res.data) {
      notification.success({
        message: "Delete user",
        description: "Xóa user thành công"
      })
      await loadUser();
    } else{
      notification.error({
        message: "Error delete user",
        description: JSON.stringify(res.message)
      })
    }
  }

  const columns = [
    {
      title: "STT",
      render: (_, record,index) => {
        console.log(">>> Check index",index)
        return(
          <>
          {index +1}
          </>
        );
      }
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return <a href="#"
        onClick = {() => {
          setDataDetail(record)
          setIsDetailOpen(true)
        }}
        >
        {record._id}
        </a>;
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined 
          onClick={()=> {
            setDataUpdate(record);
            setIsModalUpdateOpen(true);
          }}
          style={{ cursor: "pointer", color: "orange" }} />

<Popconfirm
    title="Xóa người dùng"
    description="Bạn có chắc chắn xóa User này ?"
    onConfirm={() => handleDeleteUser(record._id)}
    okText="Yes"
    cancelText="No"
    placement = "left"
  >
          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
  </Popconfirm>
        </div>
      ),
    },
  ];


  return(
    <>
    <Table 
    columns={columns} 
    dataSource={dataUsers}
     rowKey={"_id"} 
     />
     <UpdateUserModal
      isModalUpdateOpen = {isModalUpdateOpen}
      setIsModalUpdateOpen ={setIsModalUpdateOpen}
      dataUpdate={dataUpdate}
      setDataUpdate ={setDataUpdate}
      loadUser={loadUser}
      />

      <ViewUserDetail 
        dataDetail = {dataDetail}
        setDataDetail = {setDataDetail}
        isDetailOpen = {isDetailOpen}
        setIsDetailOpen = {setIsDetailOpen}
        loadUser = {loadUser}
      />
     </>
  )
};
export default UserTable;
