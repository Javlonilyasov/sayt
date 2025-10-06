import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { RefreshCw, MessageSquare, Loader2 } from "lucide-react";

export function LatestMessagePage() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate API call - in Next.js, this would be: fetch('/api/latest-message')
  const fetchLatestMessage = async () => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock API response - Replace this with actual API call in production
    const mockMessages = [
      "📩 Your Telegram code: 12345",
      "🔐 Security code: 67890",
      "✅ Welcome to Telegram!",
      "📱 Your verification code is: 54321",
      "🎉 Account activated successfully",
    ];
    
    const latestMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    setMessage(latestMessage);
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
            Latest Telegram Message
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your most recent notification
          </p>
        </div>

        {/* Message Card */}
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-8 mb-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Loading message...</p>
            </div>
          ) : (
            <div className="message-bubble-left">
              {/* Message Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    Telegram
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-900 dark:text-white text-lg" style={{ lineHeight: '1.7' }}>
                  {message}
                </p>
              </div>

              {/* Message Footer */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Received just now</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <Button
          onClick={fetchLatestMessage}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}
        >
          <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Refresh Message'}
        </Button>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click refresh to fetch a new message
          </p>
        </div>
      </div>
    </div>
  );
}