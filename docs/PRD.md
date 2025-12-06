# 🛒 쇼핑몰 1차 MVP – PRD (Product Requirements Document)

## 📌 프로젝트 개요

### 🎯 목적
- 최소 기능으로 빠르게 시장 검증하기 위한 쇼핑몰 MVP 개발
- 실제 구매에 가까운 사용자 행동 데이터를 수집하여 **제품/비즈니스 가설 검증**
- 로그인 → 상품 보기 → 장바구니 → 주문 → 결제 → 주문확인까지 **완전한 흐름 구축**

### 🎯 핵심 목표
- 간단한 구조지만 실제 전환이 일어날 수 있는 MVP
- Clerk 인증 + Supabase DB + Toss Payments 테스트 결제가 가능한 시스템 개발

---

## 👥 타깃 사용자

### Primary User
- 20~30대 온라인 쇼핑에 익숙한 사용자
- 복잡한 기능보다 **빠르고 직관적인 구매 경험**을 선호
- 테스트 결제 경험도 자연스럽게 가능해야 함

---

## 🧱 기술 스택

### Frontend
- Next.js App Router
- React 19
- TypeScript
- TailwindCSS(optional)

### Backend / Database
- Supabase (PostgreSQL)
  - 인증은 Clerk 사용
  - Supabase에는 사용자 추가 정보 및 상품/장바구니/주문 정보 저장
  - **RLS는 개발 단계에서 비활성화**

### 인증
- Clerk (로그인/회원가입)
- Supabase에는 Clerk 사용자 ID를 기준으로 연동

### 결제
- Toss Payments (MCP)
- **테스트 결제 모드** 사용

---

## 🚧 개발 우선순위 (Phase 기반 로드맵)

### 🟦 Phase 1 — 기본 인프라 (1주)
- [ ] Next.js 프로젝트 초기 셋업 (pnpm, App Router, React 19)
- [ ] Clerk 연동 (로그인/회원가입 UI 및 인증 보호 미들웨어)
- [ ] 레이아웃/네비게이션 기본 구성 (`layout.tsx`, Navbar)
- [ ] Supabase 프로젝트 생성 및 `.env.local` 연동
- [ ] DB 스키마 준비 (`products`, `cart_items`, `orders`, `order_items`)
- [ ] Supabase 마이그레이션 적용

---

### 🟩 Phase 2 — 상품 기능 (1주)
- [ ] **홈 페이지**
  - 상품 목록 일부 미리보기
  - 인기 상품 섹션
  - 카테고리 진입 동선

- [ ] **상품 목록 페이지**
  - 페이지네이션
  - 정렬 기능 (가격순, 최신순 등)
  - 카테고리 필터 기능

- [ ] **상품 상세 페이지**
  - 이미지(placeholder 가능)
  - 가격/재고/설명 표시
  - “장바구니 담기” 버튼

---

### 🟧 Phase 3 — 장바구니 & 주문 (1주)
- [ ] 장바구니 추가/삭제/수량 변경
- [ ] 장바구니 목록 페이지 UI
- [ ] 주문 생성 페이지
- [ ] Supabase `orders`, `order_items` 저장 처리
- [ ] 주문 총액 검증

---

### 🟨 Phase 4 — 결제 통합 (1주)
- [ ] TossPayments 결제 위젯 연동
- [ ] 결제 요청/성공/실패 콜백 처리
- [ ] 주문 상태 업데이트 (`pending` → `confirmed`)

---

### 🟪 Phase 5 — 마이페이지 (0.5주)
- [ ] 주문 내역 페이지
- [ ] 주문 상세 페이지 (상품 리스트 포함)

---

### 🟥 Phase 6 — 테스트 & 배포 (0.5주)
- [ ] 전체 사용자 흐름 점검 (E2E)
- [ ] 오류 처리 및 예외사항 보완
- [ ] Vercel 배포 및 환경변수 세팅

---

## 📈 성공 지표 (MVP 검증 기준)

### 정량적
- 회원가입 수: 50명 이상
- 테스트 결제 시도: 10건 이상
- 결제 성공률: 50% 이상
- 장바구니 추가율: 방문자 대비 20%

### 정성적
- 사용자 피드백 수집
- 결제/상품 탐색 과정에서 UX 문제 여부 체크
- 기술 스택 조합(Clerk + Supabase + Toss)이 안정적으로 동작하는지 검증

---

## 🚨 제약 사항 및 주의할 점
- Supabase **RLS는 비활성화 유지**  
- 어드민 기능(Product 등록)은 Supabase Dashboard에서 직접 입력
- 실제 배송 시스템 미구현 (주문 상태만 관리)
- 상품 리뷰/찜/쿠폰 등 2차 기능은 대상 아님
- 테스트 결제 외 실결제 미구현

---

## 📦 개발 시작 체크리스트
- [ ] PRD/TODO 문서가 `/docs`에 위치하는가?
- [ ] Supabase 환경변수 모두 정상 연결?
- [ ] Clerk 도메인/키 연결?
- [ ] 로컬에서 로그인 → 상품 조회까지 되는지 확인

---

## 📄 참고 구조
```plaintext
/docs
 ├─ PRD.md
 ├─ TODO.md
 └─ reference
      └─ user-flow.md (mermaid)
