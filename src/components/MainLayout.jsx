import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Pisos from "./sections/Pisos";
import Categorias from "./sections/Categorias";
import Habitaciones from "./sections/Habitaciones";
import Reservaciones from "./sections/Reservaciones";

const { Header, Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedKey, setSelectedKey] = React.useState("pisos");

  const renderContent = () => {
    switch (selectedKey) {
      case "pisos":
        return <Pisos />;
      case "categorias":
        return <Categorias />;
      case "habitaciones":
        return <Habitaciones />;
      case "reservaciones":
        return <Reservaciones />;
      default:
        return <Pisos />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        selectedKey={selectedKey}
        onMenuClick={setSelectedKey}
      />

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Hotel ERP - Sistema de Reservaciones</h1>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: "24px",
            background: "#fff",
            borderRadius: "4px",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
