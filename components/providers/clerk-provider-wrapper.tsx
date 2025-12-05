"use client";

import { useEffect, useState } from "react";

export default function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ClerkProvider, setClerkProvider] = useState<any>(null);
  const [publishableKey, setPublishableKey] = useState<string | null>(null);

  useEffect(() => {
    const key =
      typeof window !== "undefined"
        ? (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        : null;

    if (key && key !== "pk_test_build_placeholder_key_for_ci_cd" && key.startsWith("pk_")) {
      setPublishableKey(key);
      import("@clerk/nextjs")
        .then((clerk) => {
          setClerkProvider(() => clerk.ClerkProvider);
        })
        .catch(() => {
          // Clerk 로드 실패 시 무시
        });
    }
  }, []);

  if (!ClerkProvider || !publishableKey) {
    return <>{children}</>;
  }

  // koKR localization 동적 import
  const [localization, setLocalization] = useState<any>(null);

  useEffect(() => {
    if (ClerkProvider && publishableKey) {
      import("@clerk/localizations")
        .then((locales) => {
          setLocalization(locales.koKR);
        })
        .catch(() => {
          // localization 로드 실패 시 무시
        });
    }
  }, [ClerkProvider, publishableKey]);

  if (!localization) {
    return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} localization={localization}>
      {children}
    </ClerkProvider>
  );
}

