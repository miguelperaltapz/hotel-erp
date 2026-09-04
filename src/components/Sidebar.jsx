import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  BankOutlined,
  DashboardOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar({
  collapsed,
  onCollapse,
  selectedKey,
  onMenuClick,
}) {
  const menuItems = [
    {
      key: "hotel",
      icon: <BankOutlined />,
      label: "Hotel",
      children: [
        {
          key: "pisos",
          label: "Pisos",
          icon: <DashboardOutlined />,
        },
        {
          key: "categorias",
          label: "Categorías",
          icon: <AppstoreOutlined />,
        },
        {
          key: "habitaciones",
          label: "Habitaciones",
          icon: <DashboardOutlined />,
        },
        {
          key: "reservaciones",
          label: "Reservaciones",
          icon: <CalendarOutlined />,
        },
      ],
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="dark"
      width={250}
    >
      <div
        style={{
          padding: "16px",
          textAlign: "center",
          color: "white",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <HomeOutlined style={{ fontSize: "24px" }} />
        {!collapsed && (
          <h2 style={{ margin: "8px 0 0 0", fontSize: "16px" }}>HotelERP</h2>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={menuItems}
        selectedKeys={[selectedKey]}
        onClick={(e) => onMenuClick(e.key)}
        style={{ marginTop: "16px" }}
      />
    </Sider>
  );
}
