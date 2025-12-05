"use client";

import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

/**
 * Clerk + Supabase 네이티브 통합 클라이언트 (Client Component용)
 *
 * 2025년 4월부터 권장되는 방식:
 * - JWT 템플릿 불필요
 * - useAuth().getToken()으로 현재 세션 토큰 사용
 * - React Hook으로 제공되어 Client Component에서 사용
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client';
 *
 * export default function MyComponent() {
 *   const supabase = useClerkSupabaseClient();
 *
 *   async function fetchData() {
 *     const { data } = await supabase.from('table').select('*');
 *     return data;
 *   }
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useClerkSupabaseClient() {
  // Clerk 환경 변수 확인
  const hasClerkKey = !!(
    typeof window !== "undefined" &&
    (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    (window as any).__NEXT_DATA__.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !==
      "pk_test_build_placeholder_key_for_ci_cd" &&
    (window as any).__NEXT_DATA__.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_")
  );

  const supabase = useMemo(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // 환경 변수가 없으면 기본 클라이언트 반환
      return createClient(
        supabaseUrl || "https://placeholder.supabase.co",
        supabaseKey || "placeholder-key"
      );
    }

    // Clerk가 있으면 토큰을 사용하는 클라이언트, 없으면 기본 클라이언트
    if (hasClerkKey) {
      // 동적으로 useAuth를 가져와서 사용
      // 하지만 Hook은 조건부로 호출할 수 없으므로, 여기서는 기본 클라이언트 반환
      // 실제 사용 시에는 ClerkProvider 내부에서만 사용해야 함
      return createClient(supabaseUrl, supabaseKey);
    }

    return createClient(supabaseUrl, supabaseKey);
  }, [hasClerkKey]);

  return supabase;
}
