import { Button } from "./ui/button";
import { AlertCircle, Ban, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RateLimitPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-10">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Ban className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
            Too Many Attempts
          </h1>

          <p className="text-gray-600 dark:text-white/70 mb-6">
            You've exceeded the maximum number of unlock attempts. Please wait before trying again.
          </p>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
            <p className="text-red-800 dark:text-red-300 text-sm">
              <strong>Rate Limit:</strong> 5 attempts per 15 minutes
            </p>
            <p className="text-red-700 dark:text-red-400 text-sm mt-2">
              Time remaining: <strong>12:34</strong>
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/")}
              className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl py-6"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full rounded-xl"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountLockedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-10">
          <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-orange-600 dark:text-orange-400" />
          </div>

          <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
            Account Locked
          </h1>

          <p className="text-gray-600 dark:text-white/70 mb-6">
            Your account has been locked due to security concerns. Telegram has been disconnected.
          </p>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4 mb-6 text-left">
            <p className="text-orange-900 dark:text-orange-300 text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Reasons for locking:
            </p>
            <ul className="text-orange-800 dark:text-orange-400 text-sm space-y-1 list-disc list-inside">
              <li>Multiple failed unlock attempts</li>
              <li>Suspicious activity detected</li>
              <li>Security policy violation</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/connect")}
              className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl py-6"
            >
              Reconnect Telegram
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full rounded-xl"
            >
              Go to Home
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
            If you believe this is an error, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}