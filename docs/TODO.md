# ✅ 쇼핑몰 MVP TODO 리스트

본 문서는 PRD.md 기반으로 개발해야 할 기능을 단계별로 정리한 TODO 체크리스트입니다.  
각 단계가 완료되면 체크박스를 표시하여 진행 상황을 추적합니다.

---

# 🟦 Phase 1 — 기본 인프라 구축 (1주)

- [ ] Next.js 프로젝트 초기 셋업 (pnpm, App Router, React 19)
- [ ] Clerk 인증 연동 (로그인/회원가입)
- [ ] 인증 보호 미들웨어 구성 (`middleware.ts`)
- [ ] 글로벌 레이아웃 구성 (`app/layout.tsx`)
- [ ] Navbar UI & 라우팅 연결
- [ ] Supabase 프로젝트 생성
- [ ] Supabase 환경변수 `.env.local` 설정
- [ ] DB Schema 준비 (`products`, `cart_items`, `orders`, `order_items`)
- [ ] Supabase 마이그레이션 적용 (`supabase/migrations`)

---

# 🟩 Phase 2 — 상품 기능 개발 (1주)

### 홈페이지
- [ ] 인기 상품 섹션 구성
- [ ] 카테고리 진입 링크 구성
- [ ] 상품 미리보기 목록 출력

### 상품 목록 페이지
- [ ] 전체 상품 목록 불러오기
- [ ] 페이지네이션
- [ ] 가격/최신순 정렬
- [ ] 카테고리 필터

### 상품 상세 페이지
- [ ] 상세 정보 렌더링 (가격/설명/재고)
- [ ] 이미지 (placeholder 가능)
- [ ] “장바구니 담기” 버튼 구성

---

# 🟧 Phase 3 — 장바구니 & 주문 기능 (1주)

### 장바구니
- [ ] 장바구니 담기 API 연동
- [ ] 장바구니 목록 페이지 구성
- [ ] 수량 변경 기능
- [ ] 삭제 기능

### 주문
- [ ] 주문서 페이지 구성
- [ ] 총액 계산 로직
- [ ] 주문 저장 (Supabase: orders, order_items)
- [ ] 주문 상태 기본값 설정 (`pending`)

---

# 🟨 Phase 4 — 결제 연동 (1주)

- [ ] Toss Payments 결제 위젯 연동
- [ ] 결제 요청 API 생성
- [ ] 성공/실패 콜백 처리
- [ ] 결제 성공 시 `orders.status = confirmed` 업데이트

---

# 🟪 Phase 5 — 마이페이지 구성 (0.5주)

- [ ] 주문 내역 페이지
- [ ] 주문 상세 페이지
- [ ] 주문별 item 목록 출력 (`order_items`)

---

# 🟥 Phase 6 — 테스트 & 배포 (0.5주)

- [ ] 전체 기능 E2E 테스트
- [ ] 예외 처리 / 오류 수정
- [ ] Vercel 배포 설정
- [ ] Clerk/Supabase 환경변수 배포용 설정
- [ ] 배포 성공 여부 확인

---

# 📌 문서 관리

- [ ] PRD.md 최신 내용 유지
- [ ] 본 TODO.md 진행 상황 업데이트
- [ ] User Flow (mermaid) 최신화
