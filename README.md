# 📸 Stelllar

> A production-ready social media platform showcasing advanced React patterns with Feature-Sliced Design, optimistic updates, and normalized caching.

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)

**[💼 My Portfolio](https://bibekbk.vercel.app)**

</div>

---

## 🎯 Why This Project Stands Out

Built to demonstrate **enterprise-level frontend architecture** with patterns you'd find in production apps at scale:

- **🏗️ Feature-Sliced Design** - 7-layer architecture with strict import rules
- **⚡ Optimistic UI** - Zero perceived latency with automatic rollback
- **🔄 Smart Caching** - Query key factories and normalized cache management  
- **🎨 Type-Safe** - 100% TypeScript with strict mode enabled
- **📱 Production-Ready** - Error boundaries, route guards, toast system
- **🚀 Performance Optimized** - Code splitting, image lazy loading, debounced interactions
- **♿ Accessibility-First (a11y)** - Enhanced focus states, ARIA attributes, and screen reader support across buttons, modals, and feed components for an inclusive user experience

---

## ✨ Features

| Feature | Implementation Highlights |
|---------|--------------------------|
| **🔐 Authentication** | OAuth 2.0 with Supabase, protected routes with guards |
| **📝 Posts** | Image upload with preview, optimistic creation |
| **❤️ Likes** | Instant feedback with race condition prevention |
| **👥 Follow System** | Optimistic updates with automatic rollback |
| **👤 Profiles** | Editable bio, avatar, username with real-time counters |
| **📰 Feed** | Chronological posts with skeleton loading states |

**Technical Features:**
- ✅ Optimistic updates with `onMutate` + `onError` rollback pattern
- ✅ Query key factories with TypeScript const assertions
- ✅ Three-layer architecture (API → Service → Feature)
- ✅ Normalized cache invalidation strategy
- ✅ Debounced interactions (300ms)
- ✅ Code splitting with React.lazy()

---

## 🛠️ Tech Stack

```yaml
Frontend:
  React 18.3             # Concurrent features
  TypeScript 5.0          # Strict mode enabled
  TanStack Query v5       # Server state + optimistic updates
  Tailwind CSS 4.1        # Utility-first styling
  React Router v6         # Client-side routing

Backend:
  Supabase               
    - PostgreSQL          # Relational database
    - Authentication      # OAuth 2.0
    - Storage             # CDN-backed file storage
    - Row Level Security  # Database-level security

Build & Dev:
  Vite                    # Lightning-fast HMR
  ESLint + Prettier       # Code quality
```

---

## 🏗️ Architecture Deep Dive

### Feature-Sliced Design Implementation

```
app/        → Providers, routing, global state
pages/      → Route components (thin wrappers)
widgets/    → Composite UI blocks (Feed, ProfileWidget)
features/   → Business logic (auth, create-post, like, follow)
entities/   → Domain models (Post, User, Follow)
shared/     → Reusable components, hooks, utils
services/   → React Query composition layer
api/        → Pure Supabase API calls
```

**Key Rules Enforced:**
- ❌ Entities cannot import from Features
- ❌ Services cannot import from Features
- ✅ Strict unidirectional data flow
- ✅ Each layer has single responsibility

### Query Key Factory Pattern

Centralized cache management prevents invalidation bugs:

```typescript
// services/posts/keys.ts
export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  byUser: (userId: string) => [...postKeys.all, 'user', userId] as const,
  detail: (postId: string) => [...postKeys.all, 'detail', postId] as const,
};

// Precise cache invalidation
queryClient.invalidateQueries({ queryKey: postKeys.byUser(userId) });
```

### Optimistic Update Flow

Full implementation with race condition prevention:

```typescript
// Example: Like mutation
onMutate: async (postId) => {
  // 1. Cancel outgoing queries
  await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });
  
  // 2. Snapshot current state
  const previous = queryClient.getQueryData(postKeys.detail(postId));
  
  // 3. Optimistic update
  queryClient.setQueryData(postKeys.detail(postId), (old) => ({
    ...old,
    isLiked: true,
    likeCount: old.likeCount + 1
  }));
  
  return { previous };
},

onError: (err, postId, context) => {
  // 4. Rollback on failure
  queryClient.setQueryData(postKeys.detail(postId), context.previous);
}
```

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/bibek-bk/stelllar.git
cd stelllar
npm install

# Environment setup
cp .env.example .env
# Add your Supabase credentials to .env

# Run development server
npm run dev
```

### Required Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

<!-- ### Database Setup

Run the SQL schema in your Supabase SQL Editor: [View Schema →](./docs/schema.sql) -->

---

## ⚡ Performance Optimizations

**Implemented Optimizations:**
- **Code Splitting** - React.lazy() on routes to reduce initial bundle size
- **Smart Caching** - TanStack Query prevents redundant API calls
- **Optimistic UI** - Updates appear instant (no server round-trip wait)
- **Image Lazy Loading** - Images load on scroll for faster initial page load
- **Debounced Interactions** - 300ms debounce on rapid like/follow clicks

**Why These Matter:**
- Users see updates immediately (optimistic UI)
- Navigating between pages doesn't refetch cached data
- App loads fast even on slower connections

---

## 🎓 Key Learnings

Building this project taught me:

1. **Architecture Matters** - FSD made adding new features predictable and safe
2. **Optimistic UI is Hard** - Race conditions, rollbacks, and cache consistency require careful planning
3. **Query Keys are Critical** - A single typo can break cache invalidation across the app
4. **TypeScript Strictness Pays Off** - Caught null reference errors, type mismatches, and undefined property access at compile time
5. **Separation of Concerns** - API → Service → Feature layers made testing and refactoring easier
6. **User Experience is Key** - Loading states, error boundaries, and feedback loops improve perceived performance
---

## 🚧 Roadmap

**Currently Working On:**
- [ ] Comments system with nested replies
- [ ] Real-time notifications with Supabase Realtime
- [ ] Infinite scroll with cursor-based pagination

**Future Plans:**
- [ ] Direct messaging
- [ ] Stories feature
- [ ] Search & hashtags
- [ ] Dark mode

---

## 📝 Technical Challenges Solved

<details>
<summary><b>1. Race Conditions in Optimistic Updates</b></summary>

**Problem:** Rapid like/unlike caused cache corruption.

**Solution:** Implemented `cancelQueries` in `onMutate` to cancel in-flight requests before optimistic updates.
</details>

<details>
<summary><b>2. Cache Invalidation Strategy</b></summary>

**Problem:** Following a user didn't update their follower count in feed posts.

**Solution:** Created query key factory with `postKeys.all` to invalidate all post-related queries atomically.
</details>

<details>
<summary><b>3. Image Upload UX</b></summary>

**Problem:** Users didn't know when upload was complete.

**Solution:** Combined loading states, preview, and toast notifications for clear feedback.
</details>

---

## 👨‍💻 Author

**[Bibek B.K]**

Frontend Engineer passionate about scalable architecture and user experience.

- 💼 [Portfolio](https://bibekbk.vercel.app)
- 💌 [your.email@example.com](mailto:bibekbk0404gmail.com)
- 🔗 [LinkedIn](https://linkedin.com/in/bibekbk)

---

## 📄 License

MIT License - feel free to use this project for learning or your portfolio.

---

<div align="center">

**⭐ If you found this helpful, consider starring the repo!**

Built with ❤️ and lots of ☕

</div>