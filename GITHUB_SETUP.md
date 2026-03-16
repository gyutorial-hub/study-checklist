# GitHub Pages 배포 & Google Sheets 연동 가이드

## 개요

GitHub Pages는 **정적 파일만 제공**하기 때문에, 응답 저장과 통계 기능을 위해
**Google Sheets + Apps Script**를 무료 백엔드로 사용합니다.

---

## ✅ 현재 설정된 Apps Script URL

```
https://script.google.com/macros/s/AKfycbzoKx1w6fPuLWBPRbsQwAz4WiFeZzD4g_mPyyki8Wp1AMo_kL_w4K9r_FyJAjxUTZfxXQ/exec
```

이 URL이 `js/config.js`에 이미 설정되어 있습니다.  
아래 **동작 확인** 섹션부터 읽으세요.

---

## 🔧 처음 설정하는 경우

### 1단계: Google Sheets 준비

1. [Google Sheets](https://sheets.google.com) 접속 → **새 스프레드시트 만들기**
2. 스프레드시트 이름: `수험생 자가진단 응답` (아무 이름이나 가능)
3. 시트는 비워두세요 (코드가 자동으로 헤더를 만듭니다)

---

### 2단계: Apps Script 설정

1. 스프레드시트 상단 메뉴 → **확장 프로그램 → Apps Script** 클릭

2. 기존 코드(function myFunction...) 전체 **삭제**

3. 이 프로젝트의 `google-apps-script.js` 파일 내용을 **전체 복사 → 붙여넣기**

4. 상단 **💾 저장** (Ctrl+S)

5. 상단 **배포 → 새 배포** 클릭

6. 설정:
   - 유형 선택: **웹 앱**
   - 설명: `자가진단 백엔드`
   - 실행 대상: **나(내 계정)**
   - 액세스 권한: **모든 사용자** ← 반드시 이렇게 설정

7. **배포** 클릭 → Google 계정 **권한 승인**

8. 배포 완료 후 나오는 **웹 앱 URL 복사** (아래처럼 생긴 URL)
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxx.../exec
   ```

---

### 3단계: config.js 수정

`js/config.js` 파일을 열고 URL을 붙여넣습니다:

```js
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/여기에붙여넣기/exec',
  APP_NAME: '수험생 학습 습관 자가진단',
};
```

저장 후 GitHub에 push하면 완료!

---

## ✅ 동작 확인

### API 직접 열어서 확인하기

브라우저 주소창에 아래 URL을 붙여넣어 확인하세요:

```
[현재 설정된 URL]?action=getAll
```

→ JSON이 보이면 정상 (`{"data":[],"total":0}` 또는 실제 데이터)

---

## 📊 샘플 데이터 삽입 방법

빈 DB에 테스트용 샘플 데이터 5건을 삽입하려면:

브라우저에서 아래 URL을 열기:
```
[현재 설정된 URL]?action=seed
```

→ `{"success":true,"message":"샘플 데이터 5건이 삽입되었습니다."}` 가 뜨면 성공  
→ stats.html을 새로고침하면 통계가 표시됩니다

**샘플 데이터 구성:**
| # | MBTI | 시험유형 | 시험종류 |
|---|------|---------|---------|
| 1 | INTJ | 객관식 | 공무원 |
| 2 | ENFP | 객관식 | 세무사 |
| 3 | ISTJ | 논술형·주관식 | CPA |
| 4 | INFP | 객관식 | 수능 |
| 5 | ENFJ | 객관식 | 공기업 |

---

## ❓ 자주 묻는 문제

### stats.html에서 "통계 데이터 연결 확인 필요" 배너가 뜸
→ **"샘플 데이터로 미리보기"** 버튼을 클릭하면 샘플 5건으로 통계를 미리볼 수 있습니다.  
→ 실제 데이터를 보려면 위의 `?action=seed` URL로 DB에 삽입 후 새로고침

### "데이터를 불러오지 못했습니다" 에러
- `config.js`의 URL이 정확한지 확인
- Apps Script 배포에서 **액세스: 모든 사용자**로 설정했는지 확인
- Apps Script를 **수정 후 재배포**할 때는 "새 배포"가 아닌 **"기존 배포 관리 → 편집"**으로 해야 URL이 바뀌지 않음

### 응답 저장이 안 됨
- 제출 시 URL에 `?action=save&data=...`가 포함된 GET 요청을 보냄
- Apps Script `doGet()` 함수에서 `action=save` 처리가 되어 있어야 함
- `google-apps-script.js` 최신 버전을 사용하고 있는지 확인

### CORS 에러
- Apps Script 배포 설정에서 **액세스 권한이 "모든 사용자"**인지 재확인
- 배포를 삭제하고 새로 만들어보기
- GitHub Pages에서는 정상 동작하나 로컬 파일 열기(file://)에서는 CORS 에러 발생 가능

---

## 📊 통계 기능 없이 사용하기

`config.js`에서 `APPS_SCRIPT_URL`을 비워두면:
- ✅ 진단 및 결과 보기 → 정상 동작
- ✅ 링크 공유, PDF 저장 → 정상 동작
- ❌ 응답 DB 저장 → 저장 안 됨 (결과는 URL에 담겨 공유 가능)
- ❌ 전체 통계 → 설정 필요 안내 표시

---

## 📁 GitHub Pages 배포 파일 목록

```
index.html              메인 진단 페이지
result.html             공유 결과 페이지 (링크 공유 시 열림)
stats.html              전체 통계 페이지
css/
  style.css             메인 스타일
  print.css             인쇄/PDF 스타일
js/
  config.js             ← Apps Script URL 설정 (이 파일만 수정!)
  questions.js          질문 데이터 & 카테고리
  solutions.js          카테고리별 솔루션 & MBTI 프로필
  main.js               메인 설문 로직
  stats.js              통계 로직
google-apps-script.js   ← Apps Script에 붙여넣을 코드
GITHUB_SETUP.md         ← 이 파일
```

---

## 🚀 GitHub Pages 배포 방법

1. 이 폴더의 모든 파일을 GitHub 저장소에 push
2. 저장소 **Settings → Pages → Source: main branch → / (root)**
3. `https://[사용자명].github.io/[저장소명]/` 으로 접속
