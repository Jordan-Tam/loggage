"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {

    const {
        data: session, isPending
    } = authClient.useSession();

    if (isPending) {
        return <div>Loading...</div>
    }

    if (!session) {
        return <div>Not logged in</div>
    }

    return (
        <>
            <p>Home: {session.user.email}</p>
        </>
    )
}