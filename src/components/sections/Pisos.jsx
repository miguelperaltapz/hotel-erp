import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Drawer,
  Form,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabase } from "../../config/supabaseClient";

export default function Pisos() {
  // Estado inicial de los pisos
  const [data, setData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingFloorId, setDeletingFloorId] = useState(null);

  useEffect(() => {
    // Función para obtener los pisos desde la base de datos
    const fetchFloors = async () => {
      const { data: pisos, error } = await supabase.from("pisos").select("*");

      if (error) {
        console.error("Error al cargar pisos:", error.message);
        return;
      }

      setData(pisos);
    };

    fetchFloors();
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar la visibilidad del Drawer
  const [selectedFloor, setSelectedFloor] = useState(null); // Estado para almacenar el piso seleccionado para editar
  const [form] = Form.useForm(); // Estado para manejar el formulario del Drawer

  // Función para abrir el Drawer y cargar los datos del piso seleccionado
  const openEditDrawer = (floor) => {
    setSelectedFloor(floor);
    form.setFieldsValue(floor);
    setIsDrawerOpen(true);
  };

  const openAddDrawer = () => {
    setSelectedFloor(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  // Función para cerrar el Drawer y resetear el formulario
  const closeEditDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedFloor(null);
    form.resetFields();
  };

  // Función para guardar los cambios realizados en el piso
  const saveFloor = async (values) => {
    setIsSaving(true);
    try {
      const query = selectedFloor
        ? supabase
            .from("pisos")
            .update(values)
            .eq("id", selectedFloor.id)
        : supabase.from("pisos").insert(values);
      const { data: savedFloor, error } = await query.select().single();

      if (error) throw error;

      setData((currentData) => {
        const updatedData = selectedFloor
          ? currentData.map((floor) =>
              floor.id === savedFloor.id ? savedFloor : floor,
            )
          : [...currentData, savedFloor];
        return updatedData.sort((a, b) => a.numero - b.numero);
      });
      message.success(selectedFloor ? "Piso actualizado" : "Piso agregado");
      closeEditDrawer();
    } catch (error) {
      console.error("Error al guardar el piso:", error.message);
      message.error(error.message || "No se pudo guardar el piso");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteFloor = async (floor) => {
    setDeletingFloorId(floor.id);
    try {
      const { error } = await supabase
        .from("pisos")
        .delete()
        .eq("id", floor.id);

      if (error) throw error;

      setData((currentData) =>
        currentData.filter((item) => item.id !== floor.id),
      );
      message.success(`Piso ${floor.numero} eliminado`);
    } catch (error) {
      console.error("Error al eliminar el piso:", error.message);
      message.error(error.message || "No se pudo eliminar el piso");
    } finally {
      setDeletingFloorId(null);
    }
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
          <Popconfirm
            title={`¿Eliminar el piso ${record.numero}?`}
            description="Esta acción no se puede deshacer."
            onConfirm={() => deleteFloor(record)}
            okText="Eliminar"
            cancelText="Cancelar"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={deletingFloorId === record.id}
            >
              Eliminar
            </Button>
          </Popconfirm>
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
        onClick={openAddDrawer}
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
        title={
          selectedFloor
            ? `Editar piso ${selectedFloor.numero}`
            : "Agregar piso"
        }
        open={isDrawerOpen}
        onClose={closeEditDrawer}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={saveFloor}>
          <Form.Item
            label="Número de piso"
            name="numero"
            rules={[
              { required: true, message: "Ingresa el número de piso" }, // Validación para asegurar que el campo no esté vacío
              {
                // Validación personalizada para asegurar que el número de piso sea mayor a 0, no tenga decimales y no se repita
                validator: (_, value) => {
                  if (
                    value <= 0 &&
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                  ) {
                    return Promise.reject(
                      new Error("El número de piso debe ser mayor a 0"),
                    );
                  }
                  if (!Number.isInteger(Number(value))) {
                    return Promise.reject(
                      new Error("El número de piso no puede tener decimales"),
                    );
                  }
                  const isRepeated = data.some(
                    (floor) =>
                      floor.id !== selectedFloor?.id &&
                      floor.numero === Number(value),
                  );
                  if (isRepeated) {
                    return Promise.reject(
                      new Error("El número de piso ya existe"),
                    );
                  }
                  // Si todas las validaciones pasan, se resuelve la promesa
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
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
                // Validación personalizada para asegurar que la cantidad de habitaciones sea mayor a 0 y no tenga decimales
                validator: (_, value) => {
                  if (
                    value <= 0 &&
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                  ) {
                    return Promise.reject(
                      new Error("La cantidad debe ser mayor a 0"),
                    );
                  }
                  if (!Number.isInteger(Number(value))) {
                    return Promise.reject(
                      new Error("La cantidad no puede tener decimales"),
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
          <Space>
            <Button onClick={closeEditDrawer}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={isSaving}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
}
