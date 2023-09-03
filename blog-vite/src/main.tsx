import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import {CvPage} from "./pages/CvInteractivePage/CvPage.tsx";
import {LayOut} from "./components/layout.tsx";

const router = createBrowserRouter([{
  element: <LayOut/>,
  children: [{
    path: "/",
    element: <App/>,
  },
  {
    path: "/cv",
    element: <CvPage/>,
  },]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
