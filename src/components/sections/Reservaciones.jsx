import React from "react";
import { Table, Button, Space, Tag, Statistic, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Reservaciones() {
  const [data, setData] = React.useState([
    {
      id: 1,
      numero_reserva: "RES001",
      cliente: "Juan Pérez",
      habitacion: "101",
      fecha_entrada: "2025-09-05",
      fecha_salida: "2025-09-08",
      estado: "confirmada",
    },
    {
      id: 2,
      numero_reserva: "RES002",
      cliente: "María García",
      habitacion: "202",
      fecha_entrada: "2025-09-10",
      fecha_salida: "2025-09-15",
      estado: "pendiente",
    },
    {
      id: 3,
      numero_reserva: "RES003",
      cliente: "Carlos López",
      habitacion: "301",
      fecha_entrada: "2025-09-20",
      fecha_salida: "2025-09-25",
      estado: "confirmada",
    },
  ]);

  const estadoColor = {
    confirmada: "green",
    pendiente: "orange",
    cancelada: "red",
  };

  const columns = [
    {
      title: "Número de Reserva",
      dataIndex: "numero_reserva",
      key: "numero_reserva",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Habitación",
      dataIndex: "habitacion",
      key: "habitacion",
    },
    {
      title: "Fecha Entrada",
      dataIndex: "fecha_entrada",
      key: "fecha_entrada",
    },
    {
      title: "Fecha Salida",
      dataIndex: "fecha_salida",
      key: "fecha_salida",
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

  const reservasConfirmadas = data.filter(
    (r) => r.estado === "confirmada",
  ).length;
  const reservasPendientes = data.filter(
    (r) => r.estado === "pendiente",
  ).length;

  return (
    <div>
      <h1>Gestión de Reservaciones</h1>

      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={6}>
          <Statistic title="Total Reservas" value={data.length} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Confirmadas"
            value={reservasConfirmadas}
            valueStyle={{ color: "#52c41a" }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Pendientes"
            value={reservasPendientes}
            valueStyle={{ color: "#faad14" }}
          />
        </Col>
      </Row>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "20px" }}
      >
        Nueva Reservación
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
