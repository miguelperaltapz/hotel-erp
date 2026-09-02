import React from "react";
import { Button, Result } from "antd";

export default function App() {
  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <Result
        status="success"
        title="¡React + Ant Design configurado correctamente!"
        subTitle="Tu entorno de desarrollo en Electron está listo para codificar."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => alert("¡Funcionandoooo!")}
          >
            Probar Componente Antd
          </Button>,
        ]}
      />
    </div>
  );
}
