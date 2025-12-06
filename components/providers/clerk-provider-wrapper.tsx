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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Vercel 배포 시에도 작동하도록 여러 경로 확인
      const windowKey =
        typeof window !== "undefined"
          ? (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          : null;

      // 빌드 타임에 주입된 환경 변수 (Vercel에서도 작동)
      const processKey =
        typeof process !== "undefined"
          ? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          : null;

      const key = windowKey || processKey;

      // 개발 환경에서만 디버깅 로그 출력
      if (process.env.NODE_ENV === "development") {
        console.log("[ClerkProviderWrapper] Key Check:", {
          windowKey: windowKey ? "found" : "not found",
          processKey: processKey ? "found" : "not found",
          finalKey: key ? "found" : "not found",
          keyPrefix: key?.substring(0, 10) + "...",
        });
      }

      if (
        !key ||
        key === "pk_test_build_placeholder_key_for_ci_cd" ||
        !key.startsWith("pk_")
      ) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[ClerkProviderWrapper] Invalid or missing Clerk key");
        }
        setIsLoading(false);
        return;
      }

      setPublishableKey(key);

      // Clerk와 localization을 동시에 로드
      Promise.all([
        import("@clerk/nextjs").catch(() => null),
        import("@clerk/localizations").catch(() => null),
      ])
        .then(([clerk, locales]) => {
          if (clerk && clerk.ClerkProvider) {
            setClerkProvider(() => clerk.ClerkProvider);
            if (locales && locales.koKR) {
              setLocalization(locales.koKR);
            }
            if (process.env.NODE_ENV === "development") {
              console.log(
                "[ClerkProviderWrapper] Clerk Provider loaded successfully"
              );
            }
          } else {
            if (process.env.NODE_ENV === "development") {
              console.warn("[ClerkProviderWrapper] Clerk Provider not found");
            }
          }
        })
        .catch((error) => {
          console.error("[ClerkProviderWrapper] Clerk load failed:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("[ClerkProviderWrapper] Error:", error);
      setIsLoading(false);
    }
  }, []);

  // 로딩 중이거나 Clerk가 없으면 그냥 children 반환
  if (isLoading || !ClerkProvider || !publishableKey) {
    return <>{children}</>;
  }

  try {
    return (
      <ClerkProvider
        publishableKey={publishableKey}
        localization={localization || undefined}
      >
        {children}
      </ClerkProvider>
    );
  } catch (error) {
    console.warn("ClerkProvider render error:", error);
    return <>{children}</>;
  }
}

