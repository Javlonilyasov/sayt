import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Key, Phone, MessageSquare, Lock, Send, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Step = "credentials" | "phone" | "code" | "twofa" | "complete";

export function ConnectTelegramPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("credentials");
  const [apiId, setApiId] = useState("");
  const [apiHash, setApiHash] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+998");
  const [verificationCode, setVerificationCode] = useState("");
  const [twoFaPassword, setTwoFaPassword] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);

  const getStepNumber = (): number => {
    switch (currentStep) {
      case "credentials": return 1;
      case "phone": return 2;
      case "code": return 3;
      case "twofa": return 3;
      case "complete": return 3;
      default: return 1;
    }
  };

  const getProgress = (): number => {
    return (getStepNumber() / 3) * 100;
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("phone");
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("code");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: Randomly require 2FA
    const need2FA = Math.random() > 0.5;
    if (need2FA) {
      setRequires2FA(true);
      setCurrentStep("twofa");
    } else {
      setCurrentStep("complete");
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("complete");
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden animated-gradient dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-lg w-full">
          <div className="glass-card p-10 rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-11 h-11 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              
              <h1 className="text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                Connect Your Telegram
              </h1>
              <p className="text-white/70">
                {currentStep === "credentials" && "Enter your API credentials to begin"}
                {currentStep === "phone" && "Provide your phone number"}
                {currentStep === "code" && "Enter the verification code"}
                {currentStep === "twofa" && "Two-factor authentication required"}
                {currentStep === "complete" && "Successfully connected!"}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepNumber() >= 1 ? 'bg-white text-purple-600' : 'bg-white/20 text-white/50'} transition-all duration-300`}>
                    {getStepNumber() > 1 ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>1</span>}
                  </div>
                  <span className="text-white/70 text-sm hidden sm:inline">Credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepNumber() >= 2 ? 'bg-white text-purple-600' : 'bg-white/20 text-white/50'} transition-all duration-300`}>
                    {getStepNumber() > 2 ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>2</span>}
                  </div>
                  <span className="text-white/70 text-sm hidden sm:inline">Phone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepNumber() >= 3 ? 'bg-white text-purple-600' : 'bg-white/20 text-white/50'} transition-all duration-300`}>
                    {currentStep === "complete" ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>3</span>}
                  </div>
                  <span className="text-white/70 text-sm hidden sm:inline">Verify</span>
                </div>
              </div>
              <Progress value={getProgress()} className="h-2" />
            </div>

            {/* Step 1: API Credentials */}
            {currentStep === "credentials" && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-id" className="text-white flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    API ID
                  </Label>
                  <Input
                    id="api-id"
                    type="text"
                    placeholder="Enter your API ID"
                    value={apiId}
                    onChange={(e) => setApiId(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl"
                    required
                  />
                  <p className="text-white/50 text-xs">Get it from my.telegram.org</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-hash" className="text-white flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    API Hash
                  </Label>
                  <Input
                    id="api-hash"
                    type="text"
                    placeholder="Enter your API Hash"
                    value={apiHash}
                    onChange={(e) => setApiHash(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl"
                    required
                  />
                  <p className="text-white/50 text-xs">Your unique API hash from Telegram</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-purple-600 hover:bg-white/90 rounded-xl py-6 transition-all duration-300 hover:scale-105"
                >
                  Continue
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            )}

            {/* Step 2: Phone Number */}
            {currentStep === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+998901234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl"
                    required
                  />
                  <p className="text-white/50 text-xs">Enter your Telegram phone number with country code</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-purple-600 hover:bg-white/90 rounded-xl py-6 transition-all duration-300 hover:scale-105"
                >
                  Send Code
                  <Send className="ml-2 w-5 h-5" />
                </Button>

                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep("credentials")}
                  className="w-full text-white hover:bg-white/10 rounded-xl"
                >
                  Back
                </Button>
              </form>
            )}

            {/* Step 3: Verification Code */}
            {currentStep === "code" && (
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Verification Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="12345"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl text-center tracking-widest"
                    maxLength={5}
                    required
                  />
                  <p className="text-white/50 text-xs">Enter the code sent to your Telegram app or SMS</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-purple-600 hover:bg-white/90 rounded-xl py-6 transition-all duration-300 hover:scale-105"
                >
                  Verify Code
                  <CheckCircle2 className="ml-2 w-5 h-5" />
                </Button>

                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep("phone")}
                  className="w-full text-white hover:bg-white/10 rounded-xl"
                >
                  Back
                </Button>
              </form>
            )}

            {/* Step 3.5: 2FA Password */}
            {currentStep === "twofa" && (
              <form onSubmit={handle2FASubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="twofa" className="text-white flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Two-Factor Password
                  </Label>
                  <Input
                    id="twofa"
                    type="password"
                    placeholder="Enter your 2FA password"
                    value={twoFaPassword}
                    onChange={(e) => setTwoFaPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl"
                    required
                  />
                  <p className="text-white/50 text-xs">Your account has two-factor authentication enabled</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-purple-600 hover:bg-white/90 rounded-xl py-6 transition-all duration-300 hover:scale-105"
                >
                  Verify Password
                  <CheckCircle2 className="ml-2 w-5 h-5" />
                </Button>

                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep("code")}
                  className="w-full text-white hover:bg-white/10 rounded-xl"
                >
                  Back
                </Button>
              </form>
            )}

            {/* Complete State */}
            {currentStep === "complete" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
                  Successfully Connected!
                </h3>
                <p className="text-white/70 mb-6">Redirecting to your dashboard...</p>
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}