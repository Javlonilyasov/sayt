import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Lock, 
  Unlock, 
  Phone, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  Copy,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner@2.0.3";

type UnlockStep = "request" | "waiting" | "success" | "error" | "timeout";

export function UnlockFlowPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<UnlockStep>("request");
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [showCallOption, setShowCallOption] = useState(false);

  const twilioNumber = "+1 (234) 567-8900";

  useEffect(() => {
    if (currentStep === "waiting" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCurrentStep("timeout");
            return 0;
          }
          if (prev === 180) setShowCallOption(true); // Show call option after 2 min
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentStep, countdown]);

  const generateOTP = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(code);
    setCurrentStep("waiting");
    setCountdown(300);
  };

  const handleRequestUnlock = () => {
    generateOTP();
    toast.success("OTP Generated", {
      description: "Send the SMS to unlock your account"
    });
  };

  const handleSimulateUnlock = () => {
    setCurrentStep("success");
    toast.success("Account Unlocked!", {
      description: "You can now access Telegram UI"
    });
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const handleSimulateError = () => {
    setCurrentStep("error");
    toast.error("Unlock Failed", {
      description: "Invalid code or timeout"
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-8">
          {/* Request Step */}
          {currentStep === "request" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                Account Locked
              </h1>
              <p className="text-gray-600 dark:text-white/70 mb-8">
                Your Telegram session needs to be unlocked. Request an OTP code to proceed.
              </p>

              <Button
                onClick={handleRequestUnlock}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6 mb-4"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Request Unlock
              </Button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                You'll receive a unique code to send via SMS
              </p>
            </div>
          )}

          {/* Waiting Step */}
          {currentStep === "waiting" && (
            <div>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-orange-600 dark:text-orange-400 animate-pulse" />
                </div>
                
                <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                  Waiting for SMS
                </h1>
                <p className="text-gray-600 dark:text-white/70 mb-4">
                  Send the following SMS from your phone
                </p>
                
                <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400 mb-6">
                  <Clock className="w-5 h-5" />
                  <span className="text-xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {formatTime(countdown)}
                  </span>
                </div>
              </div>

              {/* Instructions Card */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-6">
                <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Send SMS to:</Label>
                <div className="flex items-center justify-between mb-4 bg-white dark:bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {twilioNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(twilioNumber)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Message text:</Label>
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                  <code className="text-gray-900 dark:text-white" style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                    UNLOCK {otpCode.slice(0, 2)}••••{otpCode.slice(-2)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(`UNLOCK ${otpCode}`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Security Note:</strong> SMS can be intercepted. Consider enabling TOTP for better security.
                </p>
              </div>

              {showCallOption && (
                <Button
                  variant="outline"
                  className="w-full mb-4 border-gray-300 dark:border-gray-700"
                  onClick={() => toast.info("Call feature", { description: "Calling your phone..." })}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Me Instead
                </Button>
              )}

              {/* Debug/Test Buttons */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
                  Simulate Events (Demo Only)
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSimulateUnlock}
                    className="flex-1"
                  >
                    Simulate Unlock
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSimulateError}
                    className="flex-1"
                  >
                    Simulate Error
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success Step */}
          {currentStep === "success" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              
              <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                Account Unlocked!
              </h1>
              <p className="text-gray-600 dark:text-white/70 mb-8">
                You may now access Telegram UI. Redirecting...
              </p>

              <div className="flex justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            </div>
          )}

          {/* Error Step */}
          {currentStep === "error" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              
              <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                Unlock Failed
              </h1>
              <p className="text-gray-600 dark:text-white/70 mb-8">
                The unlock code was invalid or expired. Please try again.
              </p>

              <Button
                onClick={() => {
                  setCurrentStep("request");
                  setShowCallOption(false);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Timeout Step */}
          {currentStep === "timeout" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-gray-600 dark:text-gray-400" />
              </div>
              
              <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                Code Expired
              </h1>
              <p className="text-gray-600 dark:text-white/70 mb-8">
                The unlock code has expired after 5 minutes. Request a new code to continue.
              </p>

              <Button
                onClick={() => {
                  setCurrentStep("request");
                  setShowCallOption(false);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6"
              >
                Request New Code
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}