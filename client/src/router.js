import { useRoutes } from "react-router-dom";
//page
import Landing from './pages/Landing';
import CreateProfile from './pages/CreateProfile';
import Login from './pages/Login';
import RequestAccess from './pages/RequestAccess';
import AcceptRequests from './pages/AcceptRequests';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/create', element: <CreateProfile /> },
    { path: '/login', element: <Login /> },
    { path: '/addresses', element: <RequestAccess /> },
    { path: '/accept-request', element: <AcceptRequests /> },
  ]);
}
