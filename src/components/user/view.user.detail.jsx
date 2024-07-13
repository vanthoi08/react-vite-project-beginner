import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';

const ViewUserDetail = (props) =>{
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser
    } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleOnChangeFile = (event) => {
      if (!event.target.files || event.target.files.length === 0) {
        setSelectedFile(null);
        setPreview(null);
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if(file){
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file))
    } 
    }

    const handleUpdateUserAvatar = async() =>{
      // Step 1: upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    console.log("Check resUpload", resUpload)
    if(resUpload.data){
      // success
      const newAvatar = resUpload.data.fileUploaded;
      // Step 2: update user
      const resUpdateAvatar = await updateUserAvatarAPI(newAvatar,dataDetail._id,dataDetail.fullName,dataDetail.phone);
      if(resUpdateAvatar.data){
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();

        notification.success({
          message: "Update user avatar",
          description: "Cập nhật avatar thành công"
        })
      }else{
        notification.error({
          message: "Error upload avatar",
          description: JSON.stringify(resUpload.message)
        })
      }
      console.log(">>> Check newAvatar", newAvatar);

    }else{
      // failed
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message)
      })

    }


    }

    return (
        <>
          <Drawer
          width={"40vw"}
           title="Chi tiết User" 
          onClose={()=>{
            setDataDetail(null)
            setIsDetailOpen(false)
          }} 
          open={isDetailOpen}>
            {dataDetail ? 
            <>
                <p>Id: {dataDetail._id}</p>
                <br />
                <p>Full name: {dataDetail.fullName}</p>
                <br />
                <p>Email: {dataDetail.email}</p>
                <br />
                <p>Phone: {dataDetail.phone}</p>
                <br />
                <p>Avatar :</p>
                <br />
                <div
                style={{
                  marginTop:"10px",
                  height: "100px",
                  width:"150px",
                  border: "1px solid #ccc"
                }}
                >
                  <img 
                  style={{height:"100%", width:"100%",objectFit: "contain"}}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                </div>
                <div>
                  <label htmlFor='btnUpload'
                  style={{
                    display:"block",
                    width:"fit-content",
                    marginTop:"15px",
                    padding: "5px 10px",
                    background: "orange",
                    borderRadius:"5px",
                    cursor:"pointer"
                  }}
                  >
                    Upload Avatar
                    </label>
                  <input 
                  type='file' hidden 
                  id='btnUpload'
                  // onChange={handleOnChangeFile}
                  onChange={(event) => {handleOnChangeFile(event)}}
                  />
                </div>

                {/* Hiển thị image pre */}
                {preview && 
                <>
                <div
                style={{
                  marginTop:"10px",
                  marginBottom:"15px",
                  height: "100px",
                  width:"150px",
                }}
                >
                  <img 
                  style={{height:"100%", width:"100%",objectFit: "contain"}}
                src={preview} />
                </div>
                <Button
                 type='primary'
                 onClick={()=> handleUpdateUserAvatar()}
                 >Save</Button>
                </>
            }
            </>
            :
            <>
            <p>Không có dữ liệu</p>
            </>
            }
          </Drawer>
        </>
      );
}

export default ViewUserDetail;