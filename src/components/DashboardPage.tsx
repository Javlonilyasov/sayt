import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  MessageSquare, 
  RefreshCw, 
  LogOut, 
  Clock,
  AlertCircle,
  Link as LinkIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  
  // System message from chat ID 777000 (Telegram)
  const [systemMessage] = useState({
    chatId: 777000,
    chatName: "Telegram",
    text: "Welcome to Telegram! This is the official Telegram account. Here you'll receive important updates and notifications about your account.",
    timestamp: new Date(Date.now() - 1000 * 60 * 32), // 32 minutes ago
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Mock: Randomly show session expired modal
    const isExpired = Math.random() > 0.7;
    setTimeout(() => {
      setIsRefreshing(false);
      if (isExpired) {
        setShowSessionExpiredModal(true);
      }
    }, 1500);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleReconnect = () => {
    setShowSessionExpiredModal(false);
    navigate("/connect");
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 transition-colors duration-300">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 backdrop-blur-xl bg-white/80 dark:bg-white/5 border-b border-gray-200/50 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
                TeleConnect
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 bg-white dark:bg-white/10 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-white/10">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">U</AvatarFallback>
                </Avatar>
                <span className="text-gray-900 dark:text-white hidden md:block">User</span>
              </div>
              
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full w-10 h-10 p-0"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}>
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-white/70">Monitor your Telegram system messages</p>
        </div>

        {/* System Messages Card */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-white/10 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border-b border-gray-200/50 dark:border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 dark:text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
                  Telegram System Messages
                </h2>
                <p className="text-gray-600 dark:text-white/60 text-sm">Official notifications from Telegram</p>
              </div>
              
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border-gray-200 dark:border-white/20 text-gray-700 dark:text-white rounded-xl"
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Last Message Section */}
          <div className="p-8">
            {/* Chat Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
              <Avatar className="w-14 h-14 shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <MessageSquare className="w-7 h-7" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>
                  {systemMessage.chatName}
                </h3>
                <p className="text-gray-500 dark:text-white/60 text-sm">Chat ID: {systemMessage.chatId}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                Active
              </div>
            </div>

            {/* Last Message Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                Last Message
              </span>
            </div>
            
            {/* Message Bubble */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-white/10 dark:to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-blue-200/50 dark:border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 flex-shrink-0 shadow-md">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    T
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      {systemMessage.chatName}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-white/60 text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTimestamp(systemMessage.timestamp)}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-white/90" style={{ lineHeight: '1.7' }}>
                    {systemMessage.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Details */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-white/50 text-sm mb-1">Chat ID</p>
                    <p className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {systemMessage.chatId}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-white/50 text-sm mb-1">Received At</p>
                    <p className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {systemMessage.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 p-4 rounded-2xl text-center">
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Displaying official Telegram system notifications from chat ID 777000
          </p>
        </div>
      </div>

      {/* Session Expired Modal */}
      <Dialog open={showSessionExpiredModal} onOpenChange={setShowSessionExpiredModal}>
        <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-white/10 rounded-3xl max-w-md">
          <DialogHeader>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
              Session Expired
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 dark:text-white/70 pt-2">
              Your Telegram session has expired. Please reconnect your account to continue viewing messages.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-3">
            <Button
              onClick={handleReconnect}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 rounded-xl py-6"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              <LinkIcon className="mr-2 w-5 h-5" />
              Reconnect Telegram
            </Button>
            <Button
              onClick={() => setShowSessionExpiredModal(false)}
              variant="outline"
              className="w-full border-gray-200 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}