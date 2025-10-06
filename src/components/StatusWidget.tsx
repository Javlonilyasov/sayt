import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Loader2, Clock } from "lucide-react";

type ConnectionStatus = "connected" | "disconnected" | "connecting" | "unlock-pending";

export function StatusWidget() {
  const [status, setStatus] = useState<ConnectionStatus>("connected");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate status updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          icon: CheckCircle2,
          color: "bg-green-500",
          textColor: "text-green-700 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
          label: "Connected",
          description: "Telegram is active"
        };
      case "connecting":
        return {
          icon: Loader2,
          color: "bg-yellow-500",
          textColor: "text-yellow-700 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          label: "Connecting",
          description: "Establishing connection..."
        };
      case "disconnected":
        return {
          icon: AlertCircle,
          color: "bg-red-500",
          textColor: "text-red-700 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800",
          label: "Disconnected",
          description: "Telegram not connected"
        };
      case "unlock-pending":
        return {
          icon: Clock,
          color: "bg-orange-500",
          textColor: "text-orange-700 dark:text-orange-400",
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
          borderColor: "border-orange-200 dark:border-orange-800",
          label: "Unlock Pending",
          description: "Waiting for SMS verification"
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="w-full max-w-sm p-4">
      <div className={`${config.bgColor} border ${config.borderColor} rounded-2xl p-4 shadow-sm`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className={`w-3 h-3 ${config.color} rounded-full`}></div>
            {status === "connected" && (
              <div className={`absolute inset-0 ${config.color} rounded-full animate-ping opacity-75`}></div>
            )}
          </div>
          <div className="flex-1">
            <div className={`${config.textColor} mb-1`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              {config.label}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{config.description}</p>
          </div>
          <Icon className={`w-5 h-5 ${config.textColor} ${status === "connecting" ? "animate-spin" : ""}`} />
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-3">
          <span>Last update:</span>
          <span>{lastUpdate.toLocaleTimeString()}</span>
        </div>

        {/* Simulate Status Controls (Demo Only) */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Simulate Events:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatus("connected")}
              className="text-xs px-2 py-1 rounded bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400"
            >
              Connected
            </button>
            <button
              onClick={() => setStatus("connecting")}
              className="text-xs px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400"
            >
              Connecting
            </button>
            <button
              onClick={() => setStatus("disconnected")}
              className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400"
            >
              Disconnected
            </button>
            <button
              onClick={() => setStatus("unlock-pending")}
              className="text-xs px-2 py-1 rounded bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-400"
            >
              Unlocking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}