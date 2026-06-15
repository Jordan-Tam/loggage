"use client";

import { authClient } from "@/lib/auth-client";

export default function Friends() {

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
            <p>Friends: {session.user.email}</p>
        </>
    )
}