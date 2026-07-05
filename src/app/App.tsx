import { RouterProvider, Outlet } from 'react-router';
import { router } from './routes';
import { VoiceProvider } from './context/VoiceContext';

export default function App() {
  return <RouterProvider router={router} />;
}
