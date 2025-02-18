import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

const config: NextAuthConfig = {
  providers: [GitHub, Google],
  trustHost: true,
};

export default config;
