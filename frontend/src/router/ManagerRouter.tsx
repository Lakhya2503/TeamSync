import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuthStore from '../app/authStore';


interface MangaerRouterProps {
  basePath?: string;
}

const MangaerRouter: React.FC<MangaerRouterProps> = ({ basePath }) => {
  const role = useAuthStore((state) => state.role);
  // Use provided basePath or construct from role
  const pathPrefix = basePath || `/${role || ''}`;

  // Don't render if no valid path
  if (!pathPrefix || pathPrefix === '/') {
    return null;
  }

  return (
    <Routes>
      <Route path={`${pathPrefix}/dashboard`}  element={<div>Page for creating dashboard</div>} />
      <Route path={`${pathPrefix}/users`}  element={<div>Page for creating users</div>} />
      <Route path={`${pathPrefix}/needs`} element={<div>Page for creating needs</div>} />
      <Route path={`${pathPrefix}/sessions`} element={<div>Page for creating sessions</div>} />
      <Route path={`${pathPrefix}/plan`} element={<div>Page for creating plan</div>} />
      <Route path={`${pathPrefix}/evaluations`} element={<div>Page for creating evaluations</div>} />
      <Route path={`${pathPrefix}/catalogs`} element={<div>Page for creating catalogs</div>} />
      <Route path={`${pathPrefix}/reports`} element={<div>Page for creating reports</div>} />
      <Route path={`${pathPrefix}/settings`} element={<div>Page for creating settings</div>} />
      <Route path={`${pathPrefix}/support`} element={<div>Page for creating support</div>} />
      <Route path={`${pathPrefix}/notifications`} element={<div>Page for notifications</div>} />
      <Route path={`${pathPrefix}/profile`} element={<div>Page for profile</div>} />
    </Routes>
  );
};

export default MangaerRouter;