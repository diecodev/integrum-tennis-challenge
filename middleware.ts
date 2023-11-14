import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { getXataClient } from "./xata";
import { ADMIN_EMAIL } from "./const";

interface SessionProps {
  primaryEmail: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export default authMiddleware({
  async afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // save user in db if not exists in there
    if (auth.userId) {
      const { firstName, imageUrl, lastName, primaryEmail } =
        auth.sessionClaims as unknown as SessionProps;

      const dbClient = getXataClient();
      const res = await dbClient.db.users.filter({ primaryEmail }).getFirst();

      if (!res) {
        await dbClient.db.users.create(auth.userId, {
          firstName,
          imageUrl,
          lastName,
          primaryEmail,
          role: primaryEmail === ADMIN_EMAIL ? "ADMIN" : "USER",
        });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
