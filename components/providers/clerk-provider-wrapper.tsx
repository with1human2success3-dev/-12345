"use client";

import { useEffect, useState } from "react";

export default function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ClerkProvider, setClerkProvider] = useState<any>(null);
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [localization, setLocalization] = useState<any>(null);

  useEffect(() => {
    const key =
      typeof window !== "undefined"
        ? (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        : null;

    if (key && key !== "pk_test_build_placeholder_key_for_ci_cd" && key.startsWith("pk_")) {
      setPublishableKey(key);
      
      // Clerk와 localization을 동시에 로드
      Promise.all([
        import("@clerk/nextjs"),
        import("@clerk/localizations").catch(() => null),
      ])
        .then(([clerk, locales]) => {
          setClerkProvider(() => clerk.ClerkProvider);
          if (locales) {
            setLocalization(locales.koKR);
          }
        })
        .catch(() => {
          // Clerk 로드 실패 시 무시
        });
    }
  }, []);

  if (!ClerkProvider || !publishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      localization={localization || undefined}
    >
      {children}
    </ClerkProvider>
  );
}

