"use client";
import { useEffect, useState } from "react";
import api from "../api/api";
import FarmaceuticaForm from "./forms/FarmaceuticaForm";
import DistribuidorForm from "./forms/DistribuidorForm";
import SUSForm from "./forms/SUSForm";
import UBSForm from "./forms/UBSForm";
import PacienteForm from "./forms/PacienteForm";
import AdminForm from "./forms/AdminForm";

export default function CadastroFinalPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/users/me").then(res => setUser(res.data)).catch(() => {});
  }, []);

  if (!user) return <p>Carregando...</p>;

  switch (user.tipo) {
    case "farmaceutica": return <FarmaceuticaForm />;
    case "distribuidor": return <DistribuidorForm />;
    case "sus": return <SUSForm />;
    case "ubs": return <UBSForm />;
    case "paciente": return <PacienteForm />;
    case "admin": return <AdminForm />;
    default: return <p>Tipo desconhecido.</p>;
  }
}
