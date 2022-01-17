import { useRoutes } from "react-router-dom";
//page
import Landing from './pages/Landing';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: '/', element: <Landing /> }
  ]);
}
