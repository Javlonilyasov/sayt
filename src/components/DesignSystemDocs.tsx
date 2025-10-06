import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  MessageSquare, 
  Lock, 
  User, 
  Settings, 
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";

export function DesignSystemDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-gray-900 dark:text-white mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}>
          Design System Documentation
        </h1>

        {/* Color Tokens */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
            Color Tokens
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 mb-4">Primary Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg shadow-md"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Primary Blue</p>
                    <p className="text-xs text-gray-500">#3b82f6</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg shadow-md"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Accent Purple</p>
                    <p className="text-xs text-gray-500">#8b5cf6</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-700 dark:text-gray-300 mb-4">Status Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg shadow-md"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Success</p>
                    <p className="text-xs text-gray-500">#10b981</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-lg shadow-md"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Danger</p>
                    <p className="text-xs text-gray-500">#ef4444</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg shadow-md"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Warning</p>
                    <p className="text-xs text-gray-500">#f97316</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
            Typography Scale
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}>H1 Heading</p>
              <p className="text-sm text-gray-500">Poppins Bold, 2.5rem (40px)</p>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>H2 Heading</p>
              <p className="text-sm text-gray-500">Poppins SemiBold, 1.5rem (24px)</p>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1rem' }}>Body Text</p>
              <p className="text-sm text-gray-500">Inter Regular, 1rem (16px)</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Caption Text</p>
              <p className="text-sm text-gray-500">Inter Regular, 0.875rem (14px)</p>
            </div>
          </div>
        </section>

        {/* Component Library */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
            Component Library
          </h2>

          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-blue-500 hover:bg-blue-600">Primary Button</Button>
              <Button variant="outline">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button size="sm" className="bg-blue-500">Small</Button>
              <Button size="lg" className="bg-blue-500">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          {/* Inputs */}
          <div className="mb-8">
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Inputs</h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Username" className="pl-10" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input type="password" placeholder="Password" className="pl-10" />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-8">
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-green-500">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <Badge className="bg-red-500">
                <AlertCircle className="w-3 h-3 mr-1" />
                Disconnected
              </Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge className="bg-blue-500">3</Badge>
            </div>
          </div>

          {/* Avatars */}
          <div className="mb-8">
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Avatars</h3>
            <div className="flex flex-wrap gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">U</AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">T</AvatarFallback>
              </Avatar>
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white">A</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Message Bubbles */}
          <div className="mb-8">
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Message Bubbles</h3>
            <div className="space-y-3 max-w-2xl">
              <div className="flex justify-start">
                <div className="max-w-md px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm">
                  <p>Incoming message bubble</p>
                  <span className="text-xs text-gray-500">14:23</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-md px-4 py-3 rounded-2xl rounded-br-sm bg-blue-500 text-white shadow-sm">
                  <p>Outgoing message bubble</p>
                  <span className="text-xs text-blue-100">14:25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-4">Status Indicators</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Connecting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Disconnected</span>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing System */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
            Spacing System (4/8 Grid)
          </h2>
          
          <div className="space-y-3">
            {[
              { name: "spacing-1", value: "4px", size: "0.25rem" },
              { name: "spacing-2", value: "8px", size: "0.5rem" },
              { name: "spacing-4", value: "16px", size: "1rem" },
              { name: "spacing-6", value: "24px", size: "1.5rem" },
              { name: "spacing-8", value: "32px", size: "2rem" },
              { name: "spacing-12", value: "48px", size: "3rem" }
            ].map((space) => (
              <div key={space.name} className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: 'monospace' }}>
                  --{space.name}
                </div>
                <div className="h-8 bg-blue-500 rounded" style={{ width: space.size }}></div>
                <span className="text-sm text-gray-500">{space.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WebSocket Events */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl">
          <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}>
            Sample WebSocket Events
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Event: socket:connected</p>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`{
  "event": "connected",
  "timestamp": "2025-01-06T10:30:00Z",
  "userId": "user_123",
  "sessionId": "sess_abc"
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Event: socket:unlocked</p>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`{
  "event": "unlocked",
  "timestamp": "2025-01-06T10:35:00Z",
  "userId": "user_123",
  "method": "sms",
  "otpCode": "123456"
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Event: socket:disconnected</p>
              <pre className="text-xs bg-gray-900 text-red-400 p-3 rounded overflow-x-auto">
{`{
  "event": "disconnected",
  "timestamp": "2025-01-06T11:00:00Z",
  "userId": "user_123",
  "reason": "session_expired"
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}