import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Surah from "../pages/Surah";
import Template from "../Template";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        //    Mengisi <Outlet/>
        children: [
            { path: "/", element: <App /> },
            { path: "surah/:surahId", element: <Surah /> },
        ]
    }
]);