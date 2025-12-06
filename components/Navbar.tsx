"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, User } from "lucide-react";

const Navbar = () => {
  const [hasClerkKey, setHasClerkKey] = useState(false);
  const [ClerkComponents, setClerkComponents] = useState<any>(null);

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

      const clerkKey = windowKey || processKey;

      // 개발 환경에서만 디버깅 로그 출력
      if (process.env.NODE_ENV === "development") {
        console.log("[Navbar] Clerk Key Check:", {
          windowKey: windowKey ? "found" : "not found",
          processKey: processKey ? "found" : "not found",
          finalKey: clerkKey ? "found" : "not found",
          keyPrefix: clerkKey?.substring(0, 10) + "...",
        });
      }

      const isValidKey =
        !!clerkKey &&
        clerkKey !== "pk_test_build_placeholder_key_for_ci_cd" &&
        clerkKey.startsWith("pk_");

      if (!isValidKey) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[Navbar] Invalid or missing Clerk key");
        }
        setHasClerkKey(false);
        return;
      }

      setHasClerkKey(true);

      // Clerk가 있을 때만 컴포넌트 로드
      import("@clerk/nextjs")
        .then((clerk) => {
          if (clerk && clerk.SignedOut && clerk.SignInButton) {
            setClerkComponents({
              SignedOut: clerk.SignedOut,
              SignInButton: clerk.SignInButton,
              SignedIn: clerk.SignedIn,
              UserButton: clerk.UserButton,
            });
            if (process.env.NODE_ENV === "development") {
              console.log("[Navbar] Clerk components loaded successfully");
            }
          } else {
            if (process.env.NODE_ENV === "development") {
              console.warn("[Navbar] Clerk components not found");
            }
            setHasClerkKey(false);
          }
        })
        .catch((error) => {
          console.error("[Navbar] Failed to load Clerk components:", error);
          setHasClerkKey(false);
        });
    } catch (error) {
      console.error("[Navbar] Clerk setup error:", error);
      setHasClerkKey(false);
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* 상단 네비게이션 */}
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* 좌측 메뉴 */}
          <button className="lg:hidden p-2">
            <Menu className="w-6 h-6 text-black" />
          </button>

          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-serif tracking-tight text-black">
              WINE
            </span>
          </Link>

                {/* 중앙 메뉴 (데스크톱) */}
                <nav className="hidden lg:flex items-center gap-8">
                  {["Red", "White", "Sparkling", "Rosé", "Collection"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-sm font-light tracking-[0.2em] text-black hover:text-gray-600 transition-colors uppercase"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>

                {/* 우측 메뉴 */}
                <div className="flex items-center gap-6">
                  <button className="p-2 hover:opacity-70 transition-opacity">
                    <Search className="w-5 h-5 text-black" />
                  </button>
                  {hasClerkKey && ClerkComponents ? (
                    <>
                      <ClerkComponents.SignedOut>
                        <ClerkComponents.SignInButton mode="modal">
                          <button className="p-2 hover:opacity-70 transition-opacity">
                            <User className="w-5 h-5 text-black" />
                          </button>
                        </ClerkComponents.SignInButton>
                      </ClerkComponents.SignedOut>
                      <ClerkComponents.SignedIn>
                        <div className="flex items-center gap-4">
                          <button className="p-2 hover:opacity-70 transition-opacity">
                            <ShoppingBag className="w-5 h-5 text-black" />
                          </button>
                          <ClerkComponents.UserButton />
                        </div>
                      </ClerkComponents.SignedIn>
                    </>
                  ) : (
                    <button className="p-2">
                      <User className="w-5 h-5 text-black" />
                    </button>
                  )}
                </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
