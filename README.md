# 수험생 학습 습관 자가진단 체크리스트

## 🎯 프로젝트 개요

수험생의 학습 습관을 82개 문항으로 자가진단하고, MBTI 맞춤 조언과 카테고리별 솔루션을 제공하는 웹 앱입니다.

**GitHub Pages 배포용 순수 정적 웹사이트 (HTML + CSS + JS)**  
**데이터 저장**: Google Sheets + Apps Script (GitHub Pages 호환)

---

## ✅ 완료된 기능

### 진단 기능
- MBTI 16종 선택 (4×4 그리드, 닉네임 표시, 선택 강조)
- 시험 유형 선택 (객관식 / 논술형·주관식)
- 시험 종류 선택 (29종: 변리사, 세무사, 공무원, 수능 등)
- 82문항 체크리스트 (11개 카테고리)
- 카테고리 탭 네비게이션 + 진행률 바

### 결과 화면
- 위험/주의/양호 스코어 카드 3개
- MBTI 맞춤 조언 (그룹별 배색, 강점/약점, 행동 조언 3가지)
- 카테고리별 솔루션 (11개, 위험도 퍼센트 바, 개선 항목 목록, 팁 카드)
- **링크 공유**: 결과를 Base64 URL로 인코딩하여 복사
- **PDF 저장**: 브라우저 인쇄 기능으로 PDF 저장

### 공유 결과 페이지 (`result.html`)
- `?d=` 파라미터로 전달된 데이터 디코딩 후 결과 표시
- 나도 진단하기 버튼

### 통계 페이지 (`stats.html`)
- Google Apps Script 연동으로 전체 응답 통계 표시
- 필터: 시험 유형별, 시험 종류별
- 차트: 전체 응답 분포(도넛), 카테고리별 위험도(레이더), 시험 유형별(도넛)
- 순위: 위험 항목 TOP 15
- 상세 통계: 문항별 응답 비율 바
- **API 연결 실패 시**: "샘플 데이터로 미리보기" 버튼으로 테스트 가능

### 데이터 저장
- Google Apps Script URL로 GET 요청(`?action=save&data=...`)
- 응답 데이터를 Google Sheets에 자동 저장
- 샘플 데이터 5건 삽입: `?action=seed`

---

## 🌐 기능별 URI

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 진단 | `/index.html` | MBTI/시험 선택 + 82문항 설문 + 결과 |
| 공유 결과 | `/result.html?d=BASE64` | 링크로 공유된 결과 페이지 |
| 전체 통계 | `/stats.html` | 응답자 전체 통계 대시보드 |

---

## 📊 데이터 모델

### 응답 데이터 (`Google Sheets: responses 시트`)

| 필드 | 타입 | 설명 |
|------|------|------|
| `session_id` | string | 세션 식별자 |
| `mbti` | string | MBTI 유형 (INTJ, ENFP 등) |
| `exam_type` | string | 객관식 / 논술형·주관식 |
| `exam_category` | string | 시험 종류 (공무원, CPA 등) |
| `submitted_at` | string | ISO 8601 날짜 |
| `q1` ~ `q82` | string | 맞다 / 잘 모르겠다 / 아니다 / 해당없음 |

### 공유 URL 데이터 구조 (`result.html?d=`)

```json
{
  "mbti": "INTJ",
  "examType": "객관식",
  "examCategory": "공무원",
  "answers": { "1": "맞다", "2": "아니다", ... },
  "savedAt": "2026-03-16T00:00:00.000Z"
}
```

---

## 🗂️ 파일 구조

```
index.html              메인 진단 페이지
result.html             공유 결과 페이지
stats.html              전체 통계 대시보드
google-apps-script.js   Apps Script 코드 (붙여넣기용)
GITHUB_SETUP.md         배포 및 설정 가이드
css/
  style.css             전체 스타일
  print.css             인쇄/PDF 전용 스타일
js/
  config.js             Apps Script URL 설정
  questions.js          82문항 데이터 + 11개 카테고리
  solutions.js          카테고리별 솔루션 + MBTI 16종 프로필
  main.js               설문 UI 로직 + 결과/공유
  stats.js              통계 로직 + 차트 + 샘플 데이터
```

---

## 🔑 외부 서비스

- **Google Apps Script**: 응답 저장 및 통계 API
  - 현재 URL: `js/config.js`의 `APPS_SCRIPT_URL` 참고
- **Chart.js** (CDN): 통계 차트
- **Font Awesome** (CDN): 아이콘
- **Google Fonts** (CDN): Noto Sans KR

---

## ⚠️ 미완료 / 향후 개선 사항

- [ ] 성능 최적화: 폰트 preload, JS 지연 로딩 (현재 12~18초)
- [ ] 카카오톡 공유 버튼 (Open Graph 메타 태그 추가 필요)
- [ ] 시험별 특화 솔루션 (현재는 카테고리별 공통 솔루션만)
- [ ] 통계 MBTI별 필터 추가
- [ ] GitHub Actions로 자동 배포

---

## 🚀 배포 방법

자세한 내용은 **GITHUB_SETUP.md** 참고

1. 모든 파일을 GitHub 저장소에 push
2. Settings → Pages → Source: main branch → `/`
3. `https://[사용자명].github.io/[저장소명]/` 접속
