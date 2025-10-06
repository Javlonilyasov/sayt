import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  MessageSquare, 
  Search, 
  MoreVertical,
  Phone,
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Settings,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusIndicator } from "./StatusIndicator";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  isSystem?: boolean;
}

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
}

export function TelegramDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState<number>(777000);

  const chats: Chat[] = [
    {
      id: 777000,
      name: "Telegram",
      avatar: "T",
      lastMessage: "Welcome to Telegram! This is the official Telegram account...",
      timestamp: "32m",
      unread: 0,
      online: true,
      isSystem: true
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      text: "Welcome to Telegram! This is the official Telegram account. Here you'll receive important updates and notifications about your account.",
      timestamp: "14:23",
      isOwn: false
    }
  ];

  const currentChat = chats.find(c => c.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 dark:text-white hidden sm:inline" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Telegram Web
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusIndicator />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/settings")}
            className="rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? 'w-full md:w-80' : 'hidden'
          } flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300`}
        >
          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search"
                className="pl-9 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-900 dark:text-white truncate" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {chat.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="bg-blue-500 text-white ml-2">{chat.unread}</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className={`${isSidebarOpen ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:to-gray-900`}>
          {currentChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {currentChat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      {currentChat.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currentChat.isSystem ? `Chat ID: ${currentChat.id}` : 'last seen recently'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    <Search className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* System Message Banner */}
                {currentChat.isSystem && (
                  <div className="text-center mb-6">
                    <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm">
                      Official Telegram System Messages
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                        message.isOwn
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
                      }`}
                    >
                      <p className="break-words">{message.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        <span>{message.timestamp}</span>
                        {message.isOwn && message.status === 'read' && (
                          <CheckCheck className="w-4 h-4" />
                        )}
                        {message.isOwn && message.status === 'delivered' && (
                          <CheckCheck className="w-4 h-4 opacity-50" />
                        )}
                        {message.isOwn && message.status === 'sent' && (
                          <Check className="w-4 h-4 opacity-50" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                  <Button type="button" variant="ghost" size="sm" className="rounded-lg">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="pr-10 rounded-xl bg-gray-100 dark:bg-gray-800 border-0"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg"
                    >
                      <Smile className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="rounded-lg bg-blue-500 hover:bg-blue-600"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}