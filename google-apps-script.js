// ================================================================
// Google Apps Script - 수험생 학습 습관 자가진단 백엔드
// ================================================================
// ▶ 사용법:
//   1. https://script.google.com 에서 새 프로젝트 생성
//   2. 이 코드를 전체 복사·붙여넣기
//   3. 배포 → 새 배포 → 웹앱 → "모든 사용자" 실행 허용 → 배포
//   4. 생성된 URL을 js/config.js 의 APPS_SCRIPT_URL 에 설정
// ================================================================

const SHEET_NAME = 'responses';

// ── CORS 헤더 설정 ────────────────────────────────────────────
function setCorsHeaders(output) {
  return output
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── OPTIONS (프리플라이트) ─────────────────────────────────────
function doOptions(e) {
  return setCorsHeaders(
    ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT)
  );
}

// ================================================================
// doGet: 통계 읽기 + action=save 로 응답 저장
// ================================================================
function doGet(e) {
  try {
    const action = e.parameter && e.parameter.action ? e.parameter.action : 'getAll';

    // ── action=save: URL 파라미터로 응답 저장 ──────────────────
    if (action === 'save') {
      const dataStr = e.parameter.data || '';
      if (!dataStr) {
        return jsonResponse({ success: false, error: 'no data' });
      }
      let data;
      try {
        data = JSON.parse(decodeURIComponent(dataStr));
      } catch (_) {
        return jsonResponse({ success: false, error: 'parse error' });
      }
      saveRow(data);
      return jsonResponse({ success: true });
    }

    // ── action=seed: 샘플 5건 삽입 ────────────────────────────
    if (action === 'seed') {
      seedSampleData();
      return jsonResponse({ success: true, message: '샘플 데이터 5건이 삽입되었습니다.' });
    }

    // ── action=getAll (기본): 전체 데이터 반환 ─────────────────
    const callback = e.parameter && e.parameter.callback ? e.parameter.callback : '';

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() < 2) {
      return callback
        ? jsonpResponse(callback, { data: [], total: 0 })
        : jsonResponse({ data: [], total: 0 });
    }

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rows    = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();

    const data = rows.map(row => {
      const obj = {};
      headers.forEach((h, i) => { if (h) obj[h] = row[i]; });
      return obj;
    });

    return callback
      ? jsonpResponse(callback, { data: data, total: data.length })
      : jsonResponse({ data: data, total: data.length });

  } catch (err) {
    return jsonResponse({ error: err.message, data: [], total: 0 });
  }
}

// ================================================================
// doPost: POST 방식으로 응답 저장
// ================================================================
function doPost(e) {
  try {
    let data = {};
    try {
      // Content-Type: text/plain 으로 전송된 JSON 파싱
      data = JSON.parse(e.postData.contents);
    } catch (_) {
      // form data 파싱 시도
      try {
        const raw = e.postData.contents || '';
        if (raw.startsWith('{')) data = JSON.parse(raw);
      } catch (__) {}
    }
    saveRow(data);
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ── 행 저장 공통 함수 ──────────────────────────────────────────
function saveRow(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  const lastRow = sheet.getLastRow();

  if (lastRow === 0) {
    // 헤더 생성
    const headers = buildHeaders(data);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4F7EF7');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // 새 키 발견 시 열 추가
  Object.keys(data).forEach(key => {
    if (key && !headers.includes(key)) {
      headers.push(key);
      sheet.getRange(1, headers.length).setValue(key);
    }
  });

  const rowData = headers.map(h => (data[h] !== undefined && data[h] !== null) ? data[h] : '');
  sheet.appendRow(rowData);
}

// ── JSON 응답 헬퍼 ────────────────────────────────────────────
function jsonResponse(obj) {
  return setCorsHeaders(
    ContentService.createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON)
  );
}

// ── JSONP 응답 헬퍼 (CORS 우회용) ────────────────────────────
function jsonpResponse(callback, obj) {
  return setCorsHeaders(
    ContentService.createTextOutput(`${callback}(${JSON.stringify(obj)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
  );
}

// ── 헤더 순서 정의 ────────────────────────────────────────────
function buildHeaders(data) {
  const fixed = ['session_id', 'mbti', 'exam_type', 'exam_category', 'submitted_at'];
  const qKeys = [];
  for (let i = 1; i <= 82; i++) {
    qKeys.push(`q${i}`);
  }
  return [...fixed, ...qKeys];
}

// ================================================================
// 샘플 데이터 5건 삽입
// ================================================================
function seedSampleData() {
  const samples = [
    {
      session_id: 'sample_001', mbti: 'INTJ', exam_type: '객관식',
      exam_category: '공무원', submitted_at: '2026-03-10T09:00:00.000Z',
      q1:'맞다',q2:'아니다',q3:'맞다',q4:'잘 모르겠다',q5:'아니다',
      q6:'맞다',q7:'아니다',q8:'잘 모르겠다',q9:'아니다',q10:'맞다',
      q11:'잘 모르겠다',q12:'아니다',q13:'맞다',q14:'아니다',q15:'맞다',
      q16:'잘 모르겠다',q17:'맞다',q18:'아니다',q19:'맞다',q20:'아니다',
      q21:'잘 모르겠다',q22:'맞다',q23:'아니다',q24:'맞다',q25:'잘 모르겠다',
      q26:'아니다',q27:'맞다',q28:'아니다',q29:'맞다',q30:'잘 모르겠다',
      q31:'맞다',q32:'아니다',q33:'잘 모르겠다',q34:'맞다',q35:'아니다',
      q36:'맞다',q37:'잘 모르겠다',q38:'아니다',q39:'맞다',q40:'아니다',
      q41:'맞다',q42:'잘 모르겠다',q43:'아니다',q44:'맞다',q45:'아니다',
      q46:'맞다',q47:'잘 모르겠다',q48:'아니다',q49:'맞다',q50:'아니다',
      q51:'잘 모르겠다',q52:'아니다',q53:'맞다',q54:'아니다',q55:'잘 모르겠다',
      q56:'맞다',q57:'아니다',q58:'맞다',q59:'잘 모르겠다',q60:'아니다',
      q61:'맞다',q62:'아니다',q63:'잘 모르겠다',q64:'맞다',q65:'아니다',
      q66:'맞다',q67:'맞다',q68:'아니다',q69:'잘 모르겠다',q70:'맞다',
      q71:'아니다',q72:'맞다',q73:'잘 모르겠다',q74:'아니다',q75:'맞다',
      q76:'아니다',q77:'잘 모르겠다',q78:'맞다',q79:'아니다',q80:'맞다',
      q81:'잘 모르겠다',q82:'아니다'
    },
    {
      session_id: 'sample_002', mbti: 'ENFP', exam_type: '객관식',
      exam_category: '세무사', submitted_at: '2026-03-11T10:30:00.000Z',
      q1:'아니다',q2:'아니다',q3:'잘 모르겠다',q4:'아니다',q5:'아니다',
      q6:'아니다',q7:'잘 모르겠다',q8:'아니다',q9:'아니다',q10:'아니다',
      q11:'아니다',q12:'잘 모르겠다',q13:'아니다',q14:'아니다',q15:'잘 모르겠다',
      q16:'아니다',q17:'아니다',q18:'아니다',q19:'잘 모르겠다',q20:'아니다',
      q21:'아니다',q22:'아니다',q23:'아니다',q24:'잘 모르겠다',q25:'아니다',
      q26:'아니다',q27:'아니다',q28:'잘 모르겠다',q29:'아니다',q30:'아니다',
      q31:'아니다',q32:'잘 모르겠다',q33:'아니다',q34:'아니다',q35:'아니다',
      q36:'아니다',q37:'잘 모르겠다',q38:'아니다',q39:'아니다',q40:'아니다',
      q41:'아니다',q42:'아니다',q43:'잘 모르겠다',q44:'아니다',q45:'아니다',
      q46:'아니다',q47:'아니다',q48:'잘 모르겠다',q49:'아니다',q50:'아니다',
      q51:'아니다',q52:'아니다',q53:'잘 모르겠다',q54:'아니다',q55:'아니다',
      q56:'아니다',q57:'아니다',q58:'아니다',q59:'잘 모르겠다',q60:'아니다',
      q61:'아니다',q62:'아니다',q63:'아니다',q64:'잘 모르겠다',q65:'아니다',
      q66:'아니다',q67:'아니다',q68:'잘 모르겠다',q69:'아니다',q70:'아니다',
      q71:'아니다',q72:'아니다',q73:'잘 모르겠다',q74:'아니다',q75:'아니다',
      q76:'아니다',q77:'아니다',q78:'아니다',q79:'잘 모르겠다',q80:'아니다',
      q81:'아니다',q82:'아니다'
    },
    {
      session_id: 'sample_003', mbti: 'ISTJ', exam_type: '논술형·주관식',
      exam_category: 'CPA', submitted_at: '2026-03-12T08:00:00.000Z',
      q1:'맞다',q2:'맞다',q3:'맞다',q4:'맞다',q5:'잘 모르겠다',
      q6:'맞다',q7:'맞다',q8:'맞다',q9:'잘 모르겠다',q10:'맞다',
      q11:'맞다',q12:'잘 모르겠다',q13:'맞다',q14:'맞다',q15:'맞다',
      q16:'맞다',q17:'맞다',q18:'잘 모르겠다',q19:'맞다',q20:'맞다',
      q21:'맞다',q22:'맞다',q23:'잘 모르겠다',q24:'맞다',q25:'맞다',
      q26:'맞다',q27:'맞다',q28:'잘 모르겠다',q29:'맞다',q30:'맞다',
      q31:'맞다',q32:'맞다',q33:'맞다',q34:'잘 모르겠다',q35:'맞다',
      q36:'맞다',q37:'맞다',q38:'맞다',q39:'잘 모르겠다',q40:'맞다',
      q41:'맞다',q42:'맞다',q43:'맞다',q44:'잘 모르겠다',q45:'맞다',
      q46:'맞다',q47:'맞다',q48:'잘 모르겠다',q49:'맞다',q50:'맞다',
      q51:'맞다',q52:'아니다',q53:'아니다',q54:'아니다',q55:'아니다',
      q56:'아니다',q57:'아니다',q58:'맞다',q59:'맞다',q60:'잘 모르겠다',
      q61:'맞다',q62:'맞다',q63:'맞다',q64:'잘 모르겠다',q65:'맞다',
      q66:'맞다',q67:'맞다',q68:'맞다',q69:'잘 모르겠다',q70:'맞다',
      q71:'맞다',q72:'맞다',q73:'잘 모르겠다',q74:'맞다',q75:'맞다',
      q76:'잘 모르겠다',q77:'맞다',q78:'맞다',q79:'맞다',q80:'잘 모르겠다',
      q81:'맞다',q82:'맞다'
    },
    {
      session_id: 'sample_004', mbti: 'INFP', exam_type: '객관식',
      exam_category: '수능', submitted_at: '2026-03-13T14:00:00.000Z',
      q1:'잘 모르겠다',q2:'아니다',q3:'잘 모르겠다',q4:'아니다',q5:'아니다',
      q6:'잘 모르겠다',q7:'아니다',q8:'아니다',q9:'잘 모르겠다',q10:'아니다',
      q11:'잘 모르겠다',q12:'아니다',q13:'아니다',q14:'잘 모르겠다',q15:'아니다',
      q16:'아니다',q17:'잘 모르겠다',q18:'아니다',q19:'아니다',q20:'잘 모르겠다',
      q21:'아니다',q22:'맞다',q23:'맞다',q24:'아니다',q25:'맞다',
      q26:'아니다',q27:'맞다',q28:'잘 모르겠다',q29:'아니다',q30:'맞다',
      q31:'잘 모르겠다',q32:'아니다',q33:'맞다',q34:'아니다',q35:'잘 모르겠다',
      q36:'아니다',q37:'맞다',q38:'아니다',q39:'잘 모르겠다',q40:'아니다',
      q41:'맞다',q42:'아니다',q43:'잘 모르겠다',q44:'아니다',q45:'아니다',
      q46:'아니다',q47:'잘 모르겠다',q48:'아니다',q49:'아니다',q50:'잘 모르겠다',
      q51:'아니다',q52:'맞다',q53:'아니다',q54:'잘 모르겠다',q55:'아니다',
      q56:'아니다',q57:'잘 모르겠다',q58:'맞다',q59:'아니다',q60:'잘 모르겠다',
      q61:'아니다',q62:'맞다',q63:'아니다',q64:'잘 모르겠다',q65:'아니다',
      q66:'아니다',q67:'맞다',q68:'아니다',q69:'잘 모르겠다',q70:'맞다',
      q71:'아니다',q72:'잘 모르겠다',q73:'아니다',q74:'맞다',q75:'아니다',
      q76:'잘 모르겠다',q77:'아니다',q78:'맞다',q79:'잘 모르겠다',q80:'아니다',
      q81:'맞다',q82:'아니다'
    },
    {
      session_id: 'sample_005', mbti: 'ENFJ', exam_type: '객관식',
      exam_category: '공기업', submitted_at: '2026-03-14T11:00:00.000Z',
      q1:'아니다',q2:'맞다',q3:'아니다',q4:'맞다',q5:'잘 모르겠다',
      q6:'아니다',q7:'맞다',q8:'잘 모르겠다',q9:'아니다',q10:'아니다',
      q11:'맞다',q12:'아니다',q13:'잘 모르겠다',q14:'아니다',q15:'맞다',
      q16:'아니다',q17:'맞다',q18:'아니다',q19:'잘 모르겠다',q20:'맞다',
      q21:'아니다',q22:'아니다',q23:'맞다',q24:'아니다',q25:'잘 모르겠다',
      q26:'맞다',q27:'아니다',q28:'맞다',q29:'잘 모르겠다',q30:'아니다',
      q31:'아니다',q32:'맞다',q33:'아니다',q34:'잘 모르겠다',q35:'맞다',
      q36:'아니다',q37:'아니다',q38:'맞다',q39:'아니다',q40:'잘 모르겠다',
      q41:'아니다',q42:'맞다',q43:'아니다',q44:'아니다',q45:'잘 모르겠다',
      q46:'아니다',q47:'맞다',q48:'아니다',q49:'잘 모르겠다',q50:'아니다',
      q51:'맞다',q52:'아니다',q53:'아니다',q54:'맞다',q55:'아니다',
      q56:'잘 모르겠다',q57:'맞다',q58:'아니다',q59:'맞다',q60:'아니다',
      q61:'잘 모르겠다',q62:'아니다',q63:'맞다',q64:'아니다',q65:'맞다',
      q66:'아니다',q67:'아니다',q68:'맞다',q69:'아니다',q70:'잘 모르겠다',
      q71:'맞다',q72:'아니다',q73:'맞다',q74:'아니다',q75:'잘 모르겠다',
      q76:'맞다',q77:'아니다',q78:'아니다',q79:'맞다',q80:'아니다',
      q81:'잘 모르겠다',q82:'맞다'
    }
  ];

  samples.forEach(s => saveRow(s));
}
