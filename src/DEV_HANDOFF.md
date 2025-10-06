# Secure Telegram-Web Clone - Developer Handoff Documentation

## Project Overview

A professional Telegram Web client clone with secure authentication, real-time status indicators, SMS-UNLOCK flow via Twilio, and comprehensive admin panel. Built with React, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Application Flow

```
Landing Page → Auth (Login/Register) → Link Telegram → Dashboard
                                     ↓
                            (if locked) → SMS-UNLOCK → Dashboard
```

## Pages & Routes

### Core Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Marketing landing with features |
| `/auth` | AuthPage | Login/Register with username, password, phone |
| `/connect` | ConnectTelegramPage | Multi-step Telegram linking (API credentials → Phone → Code → 2FA) |
| `/dashboard` | TelegramDashboard | Telegram Web-like interface with chat list & messages |
| `/unlock` | UnlockFlowPage | SMS-UNLOCK flow with OTP generation and countdown |
| `/settings` | SettingsPage | Account management, sessions, audit log |
| `/rate-limit` | RateLimitPage | Error state for too many attempts |
| `/account-locked` | AccountLockedPage | Error state when account is locked |
| `/widget` | StatusWidget | Embeddable real-time status widget |
| `/design-system` | DesignSystemDocs | Complete design system documentation |

## Key Features

### 1. Authentication Flow
- **Username + Password + Phone** (no email)
- Minimal form with rounded inputs
- Uzbek text: "Kirish" (Login), "Ro'yxatdan o'tish" (Register)

### 2. Telegram Linking
- **Step 1:** API ID & API Hash input
- **Step 2:** Phone number input (+998 format)
- **Step 3:** SMS/Telegram verification code
- **Optional:** 2FA password if required
- Visual progress indicator with checkmarks

### 3. SMS-UNLOCK Flow
```
Request Unlock → Generate OTP → Display Instructions → Wait for SMS → Success/Error
```

**Features:**
- OTP code generation (6-digit, masked display)
- Countdown timer (5 minutes)
- Copy to clipboard functionality
- Instructions: "Send SMS: UNLOCK <CODE> to +1 (234) 567-8900"
- "Call me instead" fallback option (appears after 2 min)
- Timeout & retry handling
- Success animation & auto-redirect

### 4. Dashboard (Telegram Web-like)
- **Left Sidebar:** Chat list with search, avatars, online indicators
- **Right Panel:** Chat view with message bubbles, input area
- **Chat ID 777000:** Telegram system messages only
- Message bubbles: slide-in animations
- Real-time status indicator in header
- Responsive: mobile collapses to single view

### 5. Real-time Status Indicator
**States:**
- 🟢 Connected (green, pulsing)
- 🟡 Connecting... (yellow, pulsing)
- 🔴 Disconnected (red, static)
- 🟠 Unlock Pending (orange, pulsing)

**Component:** `<StatusIndicator />`
- Shows colored dot with tooltip
- Optional label display
- Size variants: sm, md, lg

### 6. Settings Page
- Telegram connection status badge
- Unlink/Re-link buttons
- Active sessions management
- Audit log with success/failure indicators
- Security information banner

## Design System

### Color Tokens

```css
/* Primary Colors */
--color-primary-blue: #3b82f6;
--color-accent-purple: #8b5cf6;
--color-accent-green: #10b981;
--color-accent-red: #ef4444;
--color-accent-orange: #f97316;
--color-accent-yellow: #f59e0b;

/* Surface Colors */
--color-surface-light: #ffffff;
--color-surface-dark: #1f2937;

/* Status Colors */
Connected: Green (#10b981)
Connecting: Yellow (#f59e0b)
Disconnected: Red (#ef4444)
Unlock Pending: Orange (#f97316)
```

### Typography Scale

```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
```

**Fonts:**
- **Headings:** Poppins (600/700 weight)
- **Body:** Inter (400/500 weight)

### Spacing System (4/8 Grid)

```css
--spacing-1: 4px
--spacing-2: 8px
--spacing-4: 16px
--spacing-6: 24px
--spacing-8: 32px
--spacing-12: 48px
--spacing-16: 64px
```

### Border Radius

```css
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-2xl: 24px
--radius-full: 9999px
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Component Library

### Buttons
- **Primary:** `bg-blue-500 hover:bg-blue-600`
- **Secondary:** `variant="outline"`
- **Ghost:** `variant="ghost"`
- **Sizes:** sm, default, lg

### Inputs
- Background: `bg-white/10` (on gradient) or `bg-gray-100` (on light)
- Icon prefix support
- Rounded: `rounded-xl`
- Focus states with ring

### Badges
- Status badges with icons
- Color variants: green, red, orange, yellow, gray
- Rounded pill shape

### Avatars
- Gradient backgrounds
- Fallback with initials
- Online indicator dot (green, bottom-right)

### Message Bubbles
- **Incoming:** `bg-white dark:bg-gray-800` rounded-bl-sm
- **Outgoing:** `bg-blue-500` rounded-br-sm
- Timestamp + read status icons
- Slide-in animations

### Status Indicators
- Real-time connection status
- Pulsing animation for active states
- Tooltip on hover

## Animations

### Message Bubbles
```css
.message-bubble-right { animation: slideInRight 0.3s ease-out; }
.message-bubble-left { animation: slideInLeft 0.3s ease-out; }
```

### Modals
```css
.modal-content { animation: modalSlideUp 0.3s ease-out; }
```

### Status Pulse
```css
.status-pulse { animation: statusPulse 2s infinite; }
```

## Backend Integration Requirements

### API Endpoints

```typescript
POST /api/auth/register
Body: { username: string, password: string, phone: string }
Response: { userId: string, token: string }

POST /api/auth/login
Body: { username: string, password: string, phone: string }
Response: { userId: string, token: string, telegramLinked: boolean }

POST /api/telegram/link
Body: { apiId: string, apiHash: string, phone: string }
Response: { sessionId: string, codeRequested: boolean }

POST /api/telegram/verify-code
Body: { sessionId: string, code: string }
Response: { success: boolean, requires2FA: boolean }

POST /api/telegram/verify-2fa
Body: { sessionId: string, password: string }
Response: { success: boolean, linked: boolean }

POST /api/unlock/request
Response: { otpCode: string, twilioNumber: string, expiresAt: string }

POST /api/sms-webhook
Body: { From: string, Body: string }
Response: { success: boolean }

POST /api/telegram/unlink
Response: { success: boolean }

GET /api/telegram/messages/777000
Response: { messages: Message[] }
```

### WebSocket Events

```typescript
// Client subscribes to:
ws://your-domain.com/ws

// Server emits:
{
  "event": "connected",
  "timestamp": "2025-01-06T10:30:00Z",
  "userId": "user_123"
}

{
  "event": "disconnected",
  "timestamp": "2025-01-06T11:00:00Z",
  "reason": "session_expired"
}

{
  "event": "unlocked",
  "timestamp": "2025-01-06T10:35:00Z",
  "method": "sms",
  "otpCode": "123456"
}

{
  "event": "message",
  "chatId": 777000,
  "text": "New system message",
  "timestamp": "2025-01-06T10:40:00Z"
}
```

### Security Requirements

1. **TDLib on VPS:** Run TDLib session on secure backend server
2. **Session File Encryption:** Encrypt `.session` files at rest
3. **Twilio Webhook Verification:** Validate webhook signatures
4. **OTP Hashing:** Hash OTP codes before storage
5. **Rate Limiting:** 
   - 5 unlock attempts per 15 minutes
   - 3 login attempts per 5 minutes
6. **CORS:** Configure for embed widget domain
7. **CSP:** Content Security Policy headers for iframe embedding

## Responsive Breakpoints

```css
/* Mobile First */
Default: 375px (mobile)
sm: 640px (tablet)
md: 768px (tablet landscape)
lg: 1024px (desktop)
xl: 1280px (large desktop)
2xl: 1440px (wide desktop)
```

## Accessibility Features

- ARIA labels on all interactive elements
- Focus states with visible rings
- Keyboard navigation support
- Screen reader friendly status announcements
- High contrast mode support (dark theme)

## Microcopy & Security Notes

### Security Warnings
- "Do not share your password with anyone"
- "OTP code valid for 5 minutes only"
- "SMS can be intercepted — consider enabling TOTP"
- "TDLib running on VPS, session files encrypted"

### Instructions
- "Code may arrive in Telegram app or SMS. If no SMS, try 'Call me'"
- "Send SMS from your phone to +1 (234) 567-8900 with text: UNLOCK 123456"
- "Your account has been locked due to security concerns"

## State Management

### localStorage Keys
```typescript
'auth_token': string
'user_id': string
'telegram_linked': boolean
'last_session': string
```

### Session States
- `idle` - No session
- `authenticated` - User logged in
- `telegram_linked` - Telegram connected
- `locked` - Account locked, needs unlock
- `unlocking` - OTP sent, waiting for SMS

## Testing Scenarios

### Happy Path
1. Register → Link Telegram → Dashboard → View Messages

### Unlock Flow
1. Dashboard → Session Expired Modal → Unlock Page → SMS Sent → Success

### Error Handling
1. Rate Limit: Too many attempts → Show rate limit page
2. Timeout: OTP expired → Show retry option
3. Invalid Code: Wrong SMS → Show error toast
4. Account Locked: Multiple failures → Redirect to locked page

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Twilio credentials set
- [ ] Backend API endpoints deployed
- [ ] WebSocket server running
- [ ] Database migrations complete
- [ ] SSL certificates installed
- [ ] CORS configured for widget embedding
- [ ] Rate limiting enabled
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] Analytics tracking configured

## Developer Notes

### Socket Event Simulation
Use the buttons in the UI to simulate socket events for testing:
- Navigate to `/dashboard`
- Use StatusIndicator component
- Click "Simulate Events" buttons to test UI reactions

### Embedded Widget
Access at `/widget` route for iframe embedding:
```html
<iframe src="https://your-domain.com/widget" width="400" height="200"></iframe>
```

### Design System
Full documentation available at `/design-system` route with:
- Color tokens
- Typography scale
- Component examples
- Spacing system
- Sample WebSocket payloads

## Contact & Support

For questions about implementation:
- Review the Design System Docs at `/design-system`
- Check component examples in `/components` directory
- Review state management in individual components
- Reference this handoff document

## File Structure

```
/components
  /ui                    # shadcn/ui components
  LandingPage.tsx        # Marketing page
  AuthPage.tsx           # Login/Register
  ConnectTelegramPage.tsx # Telegram linking flow
  TelegramDashboard.tsx  # Main Telegram UI
  UnlockFlowPage.tsx     # SMS-UNLOCK flow
  SettingsPage.tsx       # Account settings
  ErrorPages.tsx         # Rate limit & locked pages
  StatusIndicator.tsx    # Real-time status component
  StatusWidget.tsx       # Embeddable widget
  DesignSystemDocs.tsx   # Complete design docs

/styles
  globals.css            # Design tokens + animations

App.tsx                  # Router configuration
```

## Next Steps

1. Set up backend API with endpoints listed above
2. Configure Twilio for SMS webhook
3. Implement WebSocket server for real-time events
4. Set up TDLib on VPS
5. Configure session encryption
6. Deploy frontend to Vercel/Netlify
7. Test all flows end-to-end
8. Enable monitoring & analytics

---

**Last Updated:** January 6, 2025
**Version:** 1.0.0
**Status:** Ready for Development Handoff