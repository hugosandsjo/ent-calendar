import { DeployButton } from "@/src/app/components/deploy-button";
import { EnvVarWarning } from "@/src/app/components/env-var-warning";
import { AuthButton } from "@/src/app/components/auth-button";
import { ThemeSwitcher } from "@/src/app/components/theme-switcher";
import { hasEnvVars } from "@/src/lib/utils";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">{children}</div>
  );
}
