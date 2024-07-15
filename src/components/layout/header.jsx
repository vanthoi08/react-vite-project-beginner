import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  AuditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Children, useState } from "react";
const Header = () => {
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "products",
      icon: <AuditOutlined />,
    },
    {
      label: "Cài đặt",
      key: "setting",
     children: [
      {
        label: <Link to={"/login"}>Đăng nhập</Link>,
        key: 'login',
      },
      {
        label: 'Đăng xuất',
        key: 'logout',
      },

     ]
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
