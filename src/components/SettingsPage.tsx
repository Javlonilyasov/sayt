import { useState } from "react";
import { Button } from "./ui/button";
import { 
  Settings, 
  Link2, 
  Unlink, 
  Shield, 
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

interface AuditLog {
  id: number;
  action: string;
  timestamp: Date;
  status: "success" | "failed";
  details: string;
}

export function SettingsPage() {
  const navigate = useNavigate();
  const [isLinked, setIsLinked] = useState(true);
  const [sessions] = useState([
    {
      id: 1,
      device: "Desktop - Chrome",
      location: "Tashkent, Uzbekistan",
      lastActive: "Active now",
      current: true
    }
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 1,
      action: "Telegram Connected",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "success",
      details: "Successfully linked Telegram account"
    },
    {
      id: 2,
      action: "Account Unlocked",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "success",
      details: "SMS verification completed"
    },
    {
      id: 3,
      action: "Login Attempt",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: "success",
      details: "Logged in from 95.214.xxx.xxx"
    }
  ]);

  const handleUnlink = () => {
    setIsLinked(false);
    toast.success("Telegram Disconnected", {
      description: "Your account has been unlinked"
    });
    setTimeout(() => navigate("/connect"), 2000);
  };

  const handleRelink = () => {
    navigate("/connect");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <h1 className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
                Settings
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Connection Status */}
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
                Telegram Connection
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your Telegram account connection
              </p>
            </div>
            <Badge className={isLinked ? "bg-green-500" : "bg-gray-400"}>
              {isLinked ? (
                <><CheckCircle2 className="w-3 h-3 mr-1" /> Connected</>
              ) : (
                <><AlertCircle className="w-3 h-3 mr-1" /> Disconnected</>
              )}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {isLinked ? (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl">
                      <Unlink className="w-4 h-4 mr-2" />
                      Unlink Telegram
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white dark:bg-gray-900">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-gray-900 dark:text-white">
                        Unlink Telegram Account?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                        This will disconnect your Telegram account. You'll need to reconnect to access messages.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleUnlink}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Unlink
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  onClick={() => navigate("/unlock")}
                  className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Request Unlock
                </Button>
              </>
            ) : (
              <Button
                onClick={handleRelink}
                className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl md:col-span-2"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Re-link Telegram
              </Button>
            )}
          </div>
        </div>

        {/* Session Management */}
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 p-8 mb-6">
          <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
            Active Sessions
          </h2>

          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {session.device}
                    </p>
                    {session.current && (
                      <Badge variant="outline" className="text-xs">Current</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{session.lastActive}</p>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm" className="text-red-600">
                    Terminate
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h2 className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
              Audit Log
            </h2>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  log.status === "success" 
                    ? "bg-green-100 dark:bg-green-900/30" 
                    : "bg-red-100 dark:bg-red-900/30"
                }`}>
                  {log.status === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {log.action}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{log.details}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {log.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 dark:text-blue-300 text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Security Information
              </p>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                TDLib runs on a secure VPS. Session files are encrypted. Twilio webhooks are verified. 
                OTP codes are hashed. Rate limits are enforced. CORS and CSP protect embedded widgets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}