import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authConfig: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER!, // https://keycloak.ksu.web.id/realms/ksu
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, account }) {
            // simpan access_token/exp dari Keycloak kalau perlu call API downstream
            if (account) {
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at; // epoch seconds
            }
            return token;
        },
        async session({ session, token }) {
            // masukkan info penting ke session
            (session as any).access_token = token.access_token;
            (session as any).sub = token.sub; // user_id dari Keycloak
            return session;
        },
    },
};