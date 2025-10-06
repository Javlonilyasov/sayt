import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ConnectionStatus = "connected" | "connecting" | "disconnected" | "unlock-pending";

interface StatusIndicatorProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function StatusIndicator({ size = "md", showLabel = false }: StatusIndicatorProps) {
  const [status, setStatus] = useState<ConnectionStatus>("connected");

  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          color: "bg-green-500",
          label: "Connected",
          pulse: true
        };
      case "connecting":
        return {
          color: "bg-yellow-500",
          label: "Connecting...",
          pulse: true
        };
      case "disconnected":
        return {
          color: "bg-red-500",
          label: "Disconnected",
          pulse: false
        };
      case "unlock-pending":
        return {
          color: "bg-orange-500",
          label: "Unlock Pending",
          pulse: true
        };
      default:
        return {
          color: "bg-gray-400",
          label: "Unknown",
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <div className="relative">
              <div className={`${sizeClasses[size]} ${config.color} rounded-full`}></div>
              {config.pulse && (
                <div className={`absolute inset-0 ${config.color} rounded-full animate-ping opacity-75`}></div>
              )}
            </div>
            {showLabel && (
              <span className="text-sm text-gray-700 dark:text-gray-300">{config.label}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}