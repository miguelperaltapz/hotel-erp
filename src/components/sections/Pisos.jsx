import React, { useState } from "react";
import { Table, Button, Space, Drawer, Form, InputNumber } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Pisos() {
  // Estado inicial de los pisos
  const [data, setData] = useState([
    { id: 1, numero: 1, cantidad_habitaciones: 20 },
    { id: 2, numero: 2, cantidad_habitaciones: 20 },
    { id: 3, numero: 3, cantidad_habitaciones: 18 },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar la visibilidad del Drawer
  const [selectedFloor, setSelectedFloor] = useState(null); // Estado para almacenar el piso seleccionado para editar
  const [form] = Form.useForm(); // Estado para manejar el formulario del Drawer

  // Función para abrir el Drawer y cargar los datos del piso seleccionado
  const openEditDrawer = (floor) => {
    setSelectedFloor(floor);
    form.setFieldsValue(floor);
    setIsDrawerOpen(true);
  };

  // Función para cerrar el Drawer y resetear el formulario
  const closeEditDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedFloor(null);
    form.resetFields();
  };

  // Función para guardar los cambios realizados en el piso
  const saveFloor = (values) => {
    // Actualiza el estado de los pisos con los nuevos valores del piso editado
    setData((currentData) =>
      currentData.map((floor) =>
        floor.id === selectedFloor.id ? { ...floor, ...values } : floor,
      ),
    );
    closeEditDrawer();
  };

  // Definición de las columnas de la tabla
  const columns = [
    {
      title: "Número de Piso",
      dataIndex: "numero",
      key: "numero",
    },
    {
      title: "Cantidad de Habitaciones",
      dataIndex: "cantidad_habitaciones",
      key: "cantidad_habitaciones",
    },
    {
      title: "Acciones",
      key: "acciones",
      // Renderizado de los botones de acción para cada fila
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => openEditDrawer(record)}
          >
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
      <h1>Gestión de Pisos</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "20px" }}
      >
        Agregar Piso
      </Button>
      {/* Renderizado de la tabla con los datos y columnas definidas */}
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Drawer
        title={`Editar piso ${selectedFloor?.numero ?? ""}`}
        open={isDrawerOpen}
        onClose={closeEditDrawer}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={saveFloor}>
          <Form.Item
            label="Número de piso"
            name="numero"
            rules={[
              { required: true, message: "Ingresa el número de piso" },
              {
                type: "number",
                min: 1,
                message: "El número debe ser un entero positivo",
              },
              {
                validator: (_, value) => {
                  const isRepeated = data.some(
                    (floor) =>
                      floor.id !== selectedFloor?.id && floor.numero === value,
                  );

                  return isRepeated
                    ? Promise.reject(new Error("Ese número de piso ya existe"))
                    : Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber min={1} precision={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Cantidad de habitaciones"
            name="cantidad_habitaciones"
            rules={[
              {
                required: true,
                message: "Ingresa la cantidad de habitaciones",
              },
              {
                type: "number",
                min: 1,
                message: "La cantidad debe ser un entero positivo",
              },
            ]}
          >
            <InputNumber min={1} precision={0} style={{ width: "100%" }} />
          </Form.Item>
          <Space>
            <Button onClick={closeEditDrawer}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
}
