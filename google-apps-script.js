// ================================================================
// Google Apps Script - 수험생 학습 습관 자가진단 백엔드
// ================================================================
// 사용법: GITHUB_SETUP.md 참고
// ================================================================

// ── 스프레드시트 시트 이름 ────────────────────────────────────
const SHEET_NAME = 'responses';

// ── CORS 허용 헤더 ───────────────────────────────────────────
function setCorsHeaders(output) {
  return output
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── OPTIONS 프리플라이트 대응 ─────────────────────────────────
function doOptions(e) {
  return setCorsHeaders(
    ContentService.createTextOutput('')
      .setMimeType(ContentService.MimeType.TEXT)
  );
}

// ── GET: 통계 데이터 읽기 ─────────────────────────────────────
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return setCorsHeaders(
        ContentService.createTextOutput(JSON.stringify({ data: [], total: 0 }))
          .setMimeType(ContentService.MimeType.JSON)
      );
    }

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return setCorsHeaders(
        ContentService.createTextOutput(JSON.stringify({ data: [], total: 0 }))
          .setMimeType(ContentService.MimeType.JSON)
      );
    }

    // 헤더 행 읽기
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // 데이터 행 읽기
    const rows = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();

    const data = rows.map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });

    const result = { data: data, total: data.length };

    return setCorsHeaders(
      ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON)
    );

  } catch (err) {
    return setCorsHeaders(
      ContentService.createTextOutput(JSON.stringify({ error: err.message }))
        .setMimeType(ContentService.MimeType.JSON)
    );
  }
}

// ── POST: 응답 데이터 저장 ────────────────────────────────────
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // 시트 없으면 생성
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // 데이터 파싱
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (_) {
      data = {};
    }

    const lastRow = sheet.getLastRow();

    // 헤더 행이 없으면 생성
    if (lastRow === 0) {
      const headers = buildHeaders(data);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // 헤더 스타일
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4F7EF7');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // 헤더 목록 가져오기
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // 헤더에 없는 키가 있으면 열 추가
    Object.keys(data).forEach(key => {
      if (!headers.includes(key)) {
        headers.push(key);
        sheet.getRange(1, headers.length).setValue(key);
      }
    });

    // 데이터 행 생성
    const rowData = headers.map(h => data[h] !== undefined ? data[h] : '');
    sheet.appendRow(rowData);

    return setCorsHeaders(
      ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON)
    );

  } catch (err) {
    return setCorsHeaders(
      ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
        .setMimeType(ContentService.MimeType.JSON)
    );
  }
}

// ── 헤더 순서 정의 ────────────────────────────────────────────
function buildHeaders(data) {
  // 고정 헤더 먼저, 나머지 q1~q82 순서대로
  const fixed = ['session_id', 'mbti', 'exam_type', 'exam_category', 'submitted_at'];
  const qKeys = [];
  for (let i = 1; i <= 82; i++) {
    if (data[`q${i}`] !== undefined) qKeys.push(`q${i}`);
  }
  return [...fixed, ...qKeys];
}
