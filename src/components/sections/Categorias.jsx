import React from "react";
import { Table, Button, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Categorias() {
  const [data, setData] = React.useState([
    { id: 1, nombre: "Suite", descripcion: "Habitación de lujo", precio: 150 },
    {
      id: 2,
      nombre: "Estándar",
      descripcion: "Habitación regular",
      precio: 80,
    },
    {
      id: 3,
      nombre: "Económica",
      descripcion: "Habitación básica",
      precio: 50,
    },
  ]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Precio/Noche",
      dataIndex: "precio",
      key: "precio",
      render: (precio) => `$${precio}`,
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
      <h1>Gestión de Categorías</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "20px" }}
      >
        Agregar Categoría
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
