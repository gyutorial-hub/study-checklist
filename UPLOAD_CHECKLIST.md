# GitHub 업로드 체크리스트

## 🚨 반드시 교체해야 할 파일 (변경됨)

| 파일 | 변경 내용 |
|------|-----------|
| `js/main.js` | 응답 저장 방식 변경 (GET→POST), 더 안정적 |
| `js/stats.js` | JSONP 로딩 + 샘플 5건 내장 + 미리보기 버튼 |
| `google-apps-script.js` | **Apps Script에 재배포 필요** (JSONP + POST 지원 추가) |
| `index.html` | 폰트 preload 최적화, defer 적용 |
| `stats.html` | 폰트 preload 최적화, defer 적용 |
| `result.html` | 폰트 preload 최적화 |
| `GITHUB_SETUP.md` | 최신 안내 업데이트 |
| `README.md` | 전체 재작성 |

---

## ⚠️ Apps Script 재배포 필수!

`google-apps-script.js` 코드가 변경되었습니다.  
**Apps Script에서 기존 코드를 새 코드로 교체 후 재배포해야 합니다.**

### 재배포 방법 (기존 URL 유지):
1. [script.google.com](https://script.google.com) → 기존 프로젝트 열기
2. 코드 전체 삭제 → `google-apps-script.js` 내용 붙여넣기
3. 저장 (Ctrl+S)
4. **배포 → 배포 관리** → 연필(편집) 아이콘 클릭  
   (⚠️ "새 배포" 누르면 URL이 바뀝니다!)
5. 버전 선택 → **새 버전** → 배포

---

## 📋 GitHub 업로드 순서

```bash
# 1. 변경된 파일 모두 스테이징
git add .

# 2. 커밋
git commit -m "fix: GitHub Pages 통계/저장 기능 안정화, 성능 최적화"

# 3. 푸시
git push origin main
```

---

## ✅ 업로드 후 확인 사항

### 1. 기본 동작 (Apps Script 없이도 됨)
- [ ] `index.html` 열림
- [ ] MBTI / 시험유형 / 시험종류 선택 → 시작 버튼 활성화
- [ ] 82문항 응답 완료 → 제출 → 결과 화면 표시
- [ ] 결과 화면에 **링크 공유** / **PDF 저장** 버튼 표시
- [ ] 링크 공유 클릭 → URL 복사 + 토스트 메시지

### 2. 링크 공유 동작
- [ ] 복사된 URL을 새 탭에서 열기
- [ ] `result.html?d=...` 으로 이동
- [ ] 동일한 결과 (MBTI + 카테고리 솔루션) 표시
- [ ] "나도 진단하기" 버튼 → `index.html` 이동

### 3. 통계 기능 (Apps Script 재배포 후)
- [ ] `stats.html` 열기 → 로딩 후 배너 표시
- [ ] **"샘플 데이터로 미리보기"** 버튼 클릭 → 차트/통계 표시
- [ ] **"샘플 5건 삽입"** 버튼 클릭 → 새 탭에서 성공 메시지
- [ ] `stats.html` 새로고침 → 실제 통계 표시

### 4. 응답 DB 저장 확인
- [ ] 설문 완료 후 제출 (Apps Script URL 설정 시)
- [ ] Google Sheets `responses` 시트에 새 행 추가 확인
- [ ] `stats.html` 새로고침 → 방금 제출한 데이터 반영

---

## 🔗 샘플 5건 삽입 URL

```
https://script.google.com/macros/s/AKfycbzoKx1w6fPuLWBPRbsQwAz4WiFeZzD4g_mPyyki8Wp1AMo_kL_w4K9r_FyJAjxUTZfxXQ/exec?action=seed
```

→ 실행하면 Google Sheets에 샘플 5건 자동 삽입  
→ `stats.html` 새로고침 시 통계 표시

---

## ❓ 그래도 통계가 안 보인다면?

1. **`?action=getAll` URL 직접 열기** → JSON이 보이면 Apps Script는 정상
2. JSON에서 `"total": 5`이면 데이터 있음 → `stats.html`의 JSONP 로딩 문제
3. JSON이 안 보이면 → Apps Script 재배포 필요 (액세스: **모든 사용자** 확인)
