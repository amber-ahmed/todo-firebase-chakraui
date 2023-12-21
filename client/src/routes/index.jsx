import React from 'react'
import { Route, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../jsx/layouts/RootLayout';

const Routes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<RootLayout />}>
            {}
          </Route>
        )
      );
  return (
    <div>Routes</div>
  )
}

export default Routes