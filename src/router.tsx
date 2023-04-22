import * as React from "react";
import {
    Link,
    createBrowserRouter,
} from "react-router-dom";
import {LayoutView} from "@core/layout/Layout";
import {Cards} from "./pages/Cards/Cards";
import {Operations} from "./pages/Operations/Operations";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutView />,
        children: [
            {
                index: true,
                element: <Cards />,
            },
            {
                path: 'operations',
                element: <Operations />,
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