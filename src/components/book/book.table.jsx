import { Button, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchAllBookAPI } from "../../services/api.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewBookDetail from "./view.book.detail";
import CreateBookControl from "./create.book.control";
import CreateBookUncontrol from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";

const BookTable = (props) =>{
    const [dataBook, setDaTaBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate]= useState(null);
    
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);





    useEffect(()=>{
        loadBook();
    },[current,pageSize])


const loadBook = async() =>{
    const res = await fetchAllBookAPI(current,pageSize);
    if(res.data){
        setDaTaBook(res.data.result);
        setCurrent(res.data.meta.current);
        setPageSize(res.data.meta.pageSize);
        setTotal(res.data.meta.total);
    }
}

const handleDeleteBook =async (id)=>{
}
const onChange = (pagination, filters, sorter, extra) => {
  // setCurrent, setPageSize
  // nếu thay đổi trang: current
  if(pagination && pagination.current) {
    if(+pagination.current != +current){
      setCurrent(+pagination.current); // + conver String to number vd: "5" => 5
    }
  }

    // nếu thay đổi tổng số phần tử: pageSize
    if(pagination && pagination.pageSize) {
      if(+pagination.pageSize != +pageSize){
        setPageSize(+pagination.pageSize); // + conver String to number vd: "5" => 5
      }
    }
 };
      const columns = [
        {
          title: 'STT',
          render:(_, record,index) =>{
            return(
                <>
                {(index +1)+(current-1)*pageSize}
                </>
            );
          }
        
        },
        {
          title: 'Id',
          dataIndex: '_id',
          render:(_,record) =>{
            return(
              <a href="#"
              onClick={()=>{
                setDataDetail(record)
                setIsDetailOpen(true)
              }}
              >
                {record._id}
              </a>
            );
          }
          
        },
        {
          title: 'Tiêu đề',
          dataIndex: 'mainText'
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render:(text, record, index, action) =>{
              if(text)
                return new Intl.NumberFormat('vi-VN',
              {style:'currency', currency:'VND'}).format(text)
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render:(_,record) =>(
              <div style={{display:"flex", gap:"20px"}}>
              <EditOutlined 
              onClick={()=>{
                setDataUpdate(record)
                setIsModalUpdateOpen(true)
              }}
              style={{
                color:"orange",
                cursor:"pointer"
              }} />
                <Popconfirm
                title="Xóa book"
                description="Bạn chắc chắn xóa book này ?"
                onConfirm={() => handleDeleteBook(record._id)}
                okText="Yes"
                cancelText="No"
                placement="left"
                >
              <DeleteOutlined 
              style={{
                color:"red",
                cursor:"pointer"
              }} 
              />
              </Popconfirm>
              </div>
            )

          },
      ];
      
      return(
          <>
          <div style={{
            display:"flex",
            justifyContent: "space-between",
            marginTop: "10px",
            marginBottom:"10px"
            }}>
            <h3>Table Book</h3>
            <Button 
            type="primary"
            onClick={()=>{
              setIsCreateOpen(true)
            }}
            >Create Book</Button>
          </div>
          <Table 
            columns={columns} 
            dataSource={dataBook}
            rowKey={"_id"} 
            pagination={
              {
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
              showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
              } 
            }
            onChange={onChange}
            />
            <ViewBookDetail
            dataDetail = {dataDetail}
            setDataDetail = {setDataDetail}
            isDetailOpen = {isDetailOpen}
            setIsDetailOpen = {setIsDetailOpen}
             />
             {/* <CreateBookControl 
             isCreateOpen = {isCreateOpen}
             setIsCreateOpen ={setIsCreateOpen}
             loadBook = {loadBook}

             /> */}

            <CreateBookUncontrol 
             isCreateOpen = {isCreateOpen}
             setIsCreateOpen ={setIsCreateOpen}
             loadBook = {loadBook}
             />

             <UpdateBookControl 
             dataUpdate = {dataUpdate}
             setDataUpdate = {setDataUpdate}
             isModalUpdateOpen = {isModalUpdateOpen}
             setIsModalUpdateOpen = {setIsModalUpdateOpen}
             loadBook = {loadBook}
             />

        </>
    );
}
export default BookTable;