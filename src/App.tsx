import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { ConnectTelegramPage } from "./components/ConnectTelegramPage";
import { TelegramDashboard } from "./components/TelegramDashboard";
import { UnlockFlowPage } from "./components/UnlockFlowPage";
import { SettingsPage } from "./components/SettingsPage";
import { RateLimitPage, AccountLockedPage } from "./components/ErrorPages";
import { StatusWidget } from "./components/StatusWidget";
import { DesignSystemDocs } from "./components/DesignSystemDocs";
import { LatestMessagePage } from "./components/LatestMessagePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/latest" element={<LatestMessagePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/connect" element={<ConnectTelegramPage />} />
        <Route path="/dashboard" element={<TelegramDashboard />} />
        <Route path="/unlock" element={<UnlockFlowPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/rate-limit" element={<RateLimitPage />} />
        <Route path="/account-locked" element={<AccountLockedPage />} />
        <Route path="/widget" element={<StatusWidget />} />
        <Route path="/design-system" element={<DesignSystemDocs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}