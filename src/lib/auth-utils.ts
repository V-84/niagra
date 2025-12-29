import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
  const sessions = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessions) {
    redirect("/login");
  }

  return sessions;
};

export const requireUnAuth = async () => {
  const sessions = await auth.api.getSession({
    headers: await headers(),
  });

  if (sessions) {
    redirect("/workflows");
  }

  return sessions;
};
