// app/secure/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/app/api/auth/authConfig";

export default async function SecurePage() {
    const session = await getServerSession(authConfig);
    if (!session) redirect("/api/auth/signin?callbackUrl=/secure");
    return <div>Halo {session.user?.name}</div>;
}
