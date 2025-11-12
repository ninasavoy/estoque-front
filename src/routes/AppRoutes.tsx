// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/routing/PrivateRoute";
import PublicRoute from "../components/routing/PublicRoute";
import MainLayout from "../components/layout/MainLayout";

// --- AUTH PAGES ---
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// --- DASHBOARDS ---
import FarmaceuticaDashboard from "../pages/Dashboard/FarmaceuticaDashboard";
import DistribuidorDashboard from "../pages/Dashboard/DistribuidorDashboard";
import SUSDashboard from "../pages/Dashboard/SUSDashboard";
import UBSDashboard from "../pages/Dashboard/UBSDashboard";

// --- HOME & NOT FOUND ---
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// --- MEDICAMENTOS ---
import MedicamentosList from "../pages/Medicamentos/MedicamentosList";
import MedicamentoDetail from "../pages/Medicamentos/MedicamentoDetail";
import MedicamentoEdit from "../pages/Medicamentos/MedicamentoEdit";

// --- LOTES ---
import LotesList from "../pages/Lotes/LotesList";
import LoteDetail from "../pages/Lotes/LoteDetail";
import LoteEdit from "../pages/Lotes/LoteEdit";

// --- MOVIMENTAÇÕES ---
import DPSList from "../pages/Movimentacoes/DPSList";
import SPUList from "../pages/Movimentacoes/SPUList";
import UPPList from "../pages/Movimentacoes/UPPList";
import ConfirmacaoPage from "../pages/Movimentacoes/ConfirmacaoPage";

// --- CONTEÚDO ---
import ConteudoList from "../pages/Conteudo/ConteudoList";
import ConteudoEditor from "../pages/Conteudo/ConteudoEditor";

// --- FEEDBACK ---
import FeedbackList from "../pages/Feedback/FeedbackList";
import FeedbackCreate from "../pages/Feedback/FeedbackCreate";

// --- PACIENTE ---
import PacientePortal from "../pages/Paciente/PacientePortal";

// --- ADMIN ---
import UsersList from "../pages/Admin/UsersList";
import UserEdit from "../pages/Admin/UserEdit";

// --- SETTINGS ---
import AccountSettings from "../pages/Settings/AccountSettings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Rotas públicas */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* 🔒 Rotas privadas (usuário autenticado) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* DASHBOARDS */}
      <Route
        path="/dashboard/farmaceutica"
        element={
          <PrivateRoute>
            <MainLayout>
              <FarmaceuticaDashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/distribuidor"
        element={
          <PrivateRoute>
            <MainLayout>
              <DistribuidorDashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/sus"
        element={
          <PrivateRoute>
            <MainLayout>
              <SUSDashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/ubs"
        element={
          <PrivateRoute>
            <MainLayout>
              <UBSDashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* MEDICAMENTOS */}
      <Route
        path="/medicamentos"
        element={
          <PrivateRoute>
            <MainLayout>
              <MedicamentosList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/medicamentos/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <MedicamentoDetail />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/medicamentos/:id/edit"
        element={
          <PrivateRoute>
            <MainLayout>
              <MedicamentoEdit />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* LOTES */}
      <Route
        path="/lotes"
        element={
          <PrivateRoute>
            <MainLayout>
              <LotesList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/lotes/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <LoteDetail />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/lotes/:id/edit"
        element={
          <PrivateRoute>
            <MainLayout>
              <LoteEdit />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* MOVIMENTAÇÕES */}
      <Route
        path="/movimentacoes/dps"
        element={
          <PrivateRoute>
            <MainLayout>
              <DPSList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/movimentacoes/spu"
        element={
          <PrivateRoute>
            <MainLayout>
              <SPUList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/movimentacoes/upp"
        element={
          <PrivateRoute>
            <MainLayout>
              <UPPList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/movimentacoes/confirmar/:tipo/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <ConfirmacaoPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* CONTEÚDO */}
      <Route
        path="/conteudo"
        element={
          <PrivateRoute>
            <MainLayout>
              <ConteudoList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/conteudo/:id/edit"
        element={
          <PrivateRoute>
            <MainLayout>
              <ConteudoEditor />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* FEEDBACK */}
      <Route
        path="/feedbacks"
        element={
          <PrivateRoute>
            <MainLayout>
              <FeedbackList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/feedbacks/novo"
        element={
          <PrivateRoute>
            <MainLayout>
              <FeedbackCreate />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* PACIENTE */}
      <Route
        path="/paciente"
        element={
          <PrivateRoute>
            <MainLayout>
              <PacientePortal />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/users"
        element={
          <PrivateRoute>
            <MainLayout>
              <UsersList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users/:id/edit"
        element={
          <PrivateRoute>
            <MainLayout>
              <UserEdit />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* SETTINGS */}
      <Route
        path="/settings/account"
        element={
          <PrivateRoute>
            <MainLayout>
              <AccountSettings />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />
      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
