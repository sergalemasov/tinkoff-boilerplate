import * as React from "react";
import {useLoaderData, useParams, useSearchParams} from "react-router-dom";
import {Button} from "../ui/Button/Button";

console.log('executed1');
export async function loader() {
    console.log('executed2');
    // await new Promise((r) => setTimeout(r, 500));
    return "I came from the About.tsx loader function!";
}

export function Component() {
    let data = useLoaderData() as string;
    const params = useParams()
    let [searchParams] = useSearchParams();

    return (
        <div>
            <h2>About</h2>
            <p>{data}</p>
            <p>{JSON.stringify(params)}</p>
            <p>{searchParams.get('xz')}</p>
            <Button />
        </div>
    );
}

Component.displayName = "AboutPage";