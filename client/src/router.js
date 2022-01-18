import { useRoutes } from "react-router-dom";
//page
import Landing from './pages/Landing';
import CreateProfile from './pages/CreateProfile';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/create', element: <CreateProfile /> }
  ]);
}
