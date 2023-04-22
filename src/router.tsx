import * as React from "react";
import {
    Link,
    createBrowserRouter,
} from "react-router-dom";
import {LayoutView} from "@core/layout/Layout";
import {Cards} from "./pages/Cards/Cards";
import {Operations} from "./pages/Operations/Operations";
import {Dashboard} from "./pages/Dashboard/Dashboard";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutView />,
        children: [
            {
                path: 'cards',
                element: <Cards />,
            },
            {
                path: 'operations',
                element: <Operations />,
            },
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "*",
                element: <NoMatch/>,
            },
        ],
    },
]);


function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}