# Custom Loading App - AI Agent Guide

## Architecture Overview

This is a Next.js 15 (App Router) application featuring interactive loading screens, a visual template builder, and Keycloak authentication. The app demonstrates creative loading components with embedded games and a drag-and-drop HTML builder.

### Key Components
- **Interactive Loading System**: Centralized loading management via `CurrentLoadingComponent.tsx`
- **Template Builder**: GrapesJS-based visual editor with Mustache template rendering
- **Authentication**: NextAuth.js with Keycloak SSO integration
- **Multi-page Dashboard**: Feature showcase with loading, reports, builder, and auth sections

## Development Workflow

```bash
npm run dev    # Development server on localhost:3000
npm run build  # Production build
npm run lint   # ESLint checking
```

## Critical Patterns

### Loading Component Architecture
- **Central Control**: `src/components/loading/CurrentLoadingComponent.tsx` acts as the single source of truth
- **Swappable Implementations**: Comment/uncomment different loading components to change the global loading experience
- **Game-based Loaders**: Interactive games (Brick Breaker, Flappy Bird, Snake) serve as loading screens

**Pattern Example:**
```tsx
// In CurrentLoadingComponent.tsx - switch by changing the return statement
export default function CurrentLoadingComponent() {
    return <DotLottieCanvasPlayer />  // Current active loader
    // return <BrickBreakerLoading />  // Game-based alternative
}
```

### Template Builder Integration
- **GrapesJS Integration**: Visual HTML/CSS editor with custom blocks and components
- **Mustache Templates**: Variables and helpers for dynamic content rendering
- **Custom Pipes**: Transform data with `|idr` (Indonesian Rupiah) and `|percentage` formatters

**Template Variable Pattern:**
```mustache
{{pendapatan.total.0|idr}} <!-- Renders: 5,630,000 -->
{{shu_growth|percentage}}  <!-- Renders: 25% -->
```

### Authentication Flow
- **Keycloak Provider**: JWT-based authentication with access token preservation
- **Session Enhancement**: Custom callbacks store `access_token` and `sub` in session object
- **Environment Variables**: `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET`, `KEYCLOAK_ISSUER`

### File Organization Conventions
- **Feature-based Routing**: Each feature (`/loading`, `/builder`, `/reports`, `/auth`) has its own page directory
- **Component Grouping**: Loading components grouped by functionality in `src/components/loading/`
- **Utility Separation**: Template logic isolated in `src/utils/templateUtils.ts`

## Integration Points

### External Dependencies
- **@lottiefiles/dotlottie-web**: Canvas-based Lottie animations
- **grapesjs + grapesjs-preset-webpage**: Visual HTML builder framework
- **next-auth**: Authentication framework with Keycloak provider
- **mustache**: Template rendering with custom helpers
- **jose**: JWT token handling

### Cross-Component Communication
- **Loading State**: Global Suspense wrapper in `layout.tsx` uses `CurrentLoadingComponent`
- **Template Data Flow**: Builder → Template Utils → Mustache Rendering → Preview
- **Auth Context**: NextAuth session provides tokens for downstream API calls

## Project-Specific Conventions

1. **Loading Component Switching**: Change global loading by editing the return statement in `CurrentLoadingComponent.tsx`
2. **Template Helpers**: Use pipe syntax (`{{value|helper}}`) for data transformation
3. **Game State Management**: Loading games use useEffect cleanup for proper canvas lifecycle
4. **Type Safety**: Custom module declarations in `src/types/grapesjs.d.ts` for third-party libraries

## Key Files for AI Understanding

- `src/components/loading/CurrentLoadingComponent.tsx` - Loading system control center
- `src/app/builder/page.tsx` - Template builder implementation
- `src/utils/templateUtils.ts` - Mustache helpers and template processing
- `src/app/api/auth/authConfig.ts` - Keycloak authentication setup
- `src/app/layout.tsx` - Global Suspense and loading integration