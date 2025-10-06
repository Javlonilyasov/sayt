import { Button } from "./ui/button";
import { MessageSquare, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden animated-gradient">
      {/* Geometric shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl"></div>
        
        {/* Geometric decorations */}
        <div className="absolute top-40 right-1/4 w-20 h-20 border-2 border-white/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-1/3 left-10 w-24 h-24 border-2 border-purple-300/20 rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
        <div className="absolute top-2/3 right-20 w-32 h-32 border-2 border-blue-300/20 rounded-2xl -rotate-12"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              TeleConnect
            </span>
          </div>
          <div className="flex gap-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-white text-purple-600 hover:bg-white/90 rounded-xl">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 glass-card px-5 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm">Real-time Telegram Integration</span>
          </div>
          
          {/* Main Headline */}
          <h1 
            className="text-white mb-6" 
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700, 
              fontSize: '4.5rem', 
              lineHeight: '1.1',
              textShadow: '0 10px 40px rgba(0,0,0,0.2)',
              letterSpacing: '-0.02em'
            }}
          >
            Stay Connected
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              with Telegram
            </span>
          </h1>
          
          {/* Description */}
          <p 
            className="text-white/80 mb-12 max-w-2xl mx-auto" 
            style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.7',
              fontWeight: 300
            }}
          >
            Access your Telegram messages seamlessly on the web. 
            Secure, fast, and beautifully designed for the modern user.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap mb-20">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl px-10 py-7 rounded-2xl"
                style={{ fontSize: '1.125rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Get Started Free
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 px-10 py-7 rounded-2xl backdrop-blur-lg"
                style={{ fontSize: '1.125rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { 
                icon: MessageSquare, 
                title: "Real-time Sync", 
                desc: "Messages appear instantly with zero delay",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Shield, 
                title: "Secure & Private", 
                desc: "End-to-end encryption keeps your data safe",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                icon: Globe, 
                title: "Access Anywhere", 
                desc: "Use from any device, anytime, anywhere",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}