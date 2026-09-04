import React from "react";
import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Habitaciones() {
  const [data, setData] = React.useState([
    { id: 1, numero: "101", piso: 1, categoria: "Suite", estado: "disponible" },
    { id: 2, numero: "102", piso: 1, categoria: "Estándar", estado: "ocupada" },
    { id: 3, numero: "201", piso: 2, categoria: "Económica", estado: "disponible" },
    { id: 4, numero: "202", piso: 2, categoria: "Suite", estado: "mantenimiento" },
  ]);

  const estadoColor = {
    disponible: "green",
    ocupada: "red",
    mantenimiento: "orange",
  };

  const columns = [
    {
      title: "Número",
      dataIndex: "numero",
      key: "numero",
    },
    {
      title: "Piso",
      dataIndex: "piso",
      key: "piso",
    },
    {
      title: "Categoría",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => (
        <Tag color={estadoColor[estado]}>{estado.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} size="small">
            Editar
          </Button>
          <Button danger icon={<DeleteOutlined />} size="small">
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Gestión de Habitaciones</h1>
      <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: "20px" }}>
        Agregar Habitación
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
