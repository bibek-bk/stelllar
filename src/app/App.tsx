import { AppProviders } from './providers';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Analytics } from '@vercel/analytics/react';
import { Home } from './home';
// import Home from './Home.tsx'

export function App() {
  return (
    <Home/>
    // <AppProviders>
    //   <RouterProvider router={router} />
    //   <Analytics />
    // </AppProviders>
  );
}