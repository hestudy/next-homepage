import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default layout;
