import { db } from "@/app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
})

export { handler as GET, handler as POST }

function GoogleProvider(arg0: { clientId: string | undefined; clientSecret: string | undefined }): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.")
}
