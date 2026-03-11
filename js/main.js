// ============================================================
// 시험 종류 목록
// ============================================================
const EXAM_CATEGORIES = [
  '변리사','세무사','감평사','노무사','공무원','기술사','CPA','편입',
  '법무사','임용고시','행정사','수능','공기업','공인중개사','변호사시험',
  '손해사정사','관리사','기사','관세사','간부/간부후보','비상계획관',
  '승진시험','입사시험','5급','임상심리사','미국회계사','국가기술자',
  '사회복지사','기타'
];

// ============================================================
// 전역 상태
// ============================================================
let answers = {};
let sessionId = generateSessionId();
let selectedExamType = null;      // '객관식' | '논술형·주관식'
let selectedExamCategory = null;  // EXAM_CATEGORIES 중 하나

function generateSessionId() {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ============================================================
// 인트로 초기화 - 시험 종류 그리드 렌더링
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  renderExamCategoryGrid();
});

function renderExamCategoryGrid() {
  const grid = document.getElementById('examCategoryGrid');
  if (!grid) return;
  grid.innerHTML = EXAM_CATEGORIES.map(cat => `
    <button class="exam-cat-btn" data-value="${cat}" onclick="selectExamCategory('${cat}')">
      ${cat}
    </button>
  `).join('');
}

// ============================================================
// 시험 유형 선택
// ============================================================
function selectExamType(value) {
  selectedExamType = value;
  document.querySelectorAll('.exam-type-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === value);
  });
  updateStartButton();
  updateSelectionSummary();
}

// ============================================================
// 시험 종류 선택
// ============================================================
function selectExamCategory(value) {
  selectedExamCategory = value;
  document.querySelectorAll('.exam-cat-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === value);
  });
  updateStartButton();
  updateSelectionSummary();
}

// ============================================================
// 시작 버튼 활성화 제어
// ============================================================
function updateStartButton() {
  const btn = document.getElementById('btnStart');
  const note = document.getElementById('selectNote');
  if (selectedExamType && selectedExamCategory) {
    btn.disabled = false;
    btn.classList.add('ready-to-start');
    if (note) note.style.display = 'none';
  } else {
    btn.disabled = true;
    btn.classList.remove('ready-to-start');
    if (note) note.style.display = 'block';
  }
}

// ============================================================
// 선택 요약 배지
// ============================================================
function updateSelectionSummary() {
  const el = document.getElementById('selectionSummary');
  const textEl = document.getElementById('selectionText');
  if (!el || !textEl) return;
  if (selectedExamType && selectedExamCategory) {
    textEl.textContent = `${selectedExamCategory} · ${selectedExamType}`;
    el.style.display = 'flex';
  } else if (selectedExamType) {
    textEl.textContent = `${selectedExamType} 선택됨`;
    el.style.display = 'flex';
  } else if (selectedExamCategory) {
    textEl.textContent = `${selectedExamCategory} 선택됨`;
    el.style.display = 'flex';
  } else {
    el.style.display = 'none';
  }
}

// ============================================================
// 화면 전환 - CSS 클래스 방식 완전 제거, style.display 직접 제어
// ============================================================
const SCREENS = {
  'intro-screen':  { display: 'flex' },
  'survey-screen': { display: 'block' },
  'result-screen': { display: 'flex' },
};

function showScreen(id) {
  // 모든 화면 숨기기
  Object.keys(SCREENS).forEach(screenId => {
    document.getElementById(screenId).style.display = 'none';
  });
  // 대상 화면만 표시
  const display = SCREENS[id] ? SCREENS[id].display : 'block';
  document.getElementById(id).style.display = display;
  // 스크롤 맨 위로
  window.scrollTo(0, 0);
}
// ============================================================
// 설문 시작
// ============================================================
function startSurvey() {
  if (!selectedExamType || !selectedExamCategory) {
    alert('시험 유형과 시험 종류를 모두 선택해주세요.');
    return;
  }
  // 설문 헤더 배지 업데이트
  const badge = document.getElementById('surveyExamBadge');
  if (badge) {
    badge.textContent = `${selectedExamCategory} · ${selectedExamType}`;
  }
  renderCategoryTabs();
  renderQuestions();
  showScreen('survey-screen');
  // 스크롤 확실히 풀기
  document.body.style.overflow = '';
  document.body.style.height = '';
  document.documentElement.style.overflow = '';
  document.documentElement.style.height = '';
}

// ============================================================
// 카테고리 탭 렌더링
// ============================================================
function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-tab" id="tab-${cat.id}" onclick="scrollToCategory('${cat.id}')" style="--cat-color:${cat.color}">
      <i class="fas ${cat.icon}"></i>
      <span>${cat.label}</span>
    </button>
  `).join('');
}

// ============================================================
// 질문 목록 렌더링
// ============================================================
function renderQuestions() {
  const container = document.getElementById('questionsContainer');
  let html = '';
  CATEGORIES.forEach(cat => {
    html += `
      <div class="cat-section" id="cat-${cat.id}" data-cat="${cat.id}">
        <div class="cat-section-header" style="--cat-color:${cat.color}">
          <i class="fas ${cat.icon}"></i>
          <span>${cat.label}</span>
          <span class="cat-count">${cat.qs.length}문항</span>
        </div>
        <div class="questions-list">
          ${QUESTIONS.filter(q => q.cat === cat.id).map(q => renderQuestion(q)).join('')}
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderQuestion(q) {
  const isObj = q.obj;
  const badge = isObj ? '<span class="obj-badge"><i class="fas fa-star"></i> 객관식</span>' : '';
  const options = isObj
    ? ['맞다', '잘 모르겠다', '아니다', '해당없음']
    : ['맞다', '잘 모르겠다', '아니다'];

  return `
    <div class="question-card" id="qcard-${q.id}">
      <div class="question-header">
        <span class="q-num">Q${q.id}</span>
        ${badge}
      </div>
      <p class="q-text">${q.text}</p>
      <div class="q-options">
        ${options.map(opt => `
          <button class="q-btn q-btn-${optClass(opt)}"
                  id="qbtn-${q.id}-${opt}"
                  onclick="selectAnswer(${q.id}, '${opt}')">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function optClass(opt) {
  if (opt === '맞다') return 'yes';
  if (opt === '잘 모르겠다') return 'maybe';
  if (opt === '아니다') return 'no';
  return 'na';
}

// ============================================================
// 답변 선택
// ============================================================
function selectAnswer(qId, value) {
  answers[qId] = value;

  const card = document.getElementById(`qcard-${qId}`);
  card.querySelectorAll('.q-btn').forEach(btn => btn.classList.remove('selected'));
  const q = QUESTIONS.find(q => q.id === qId);
  const opts = q.obj ? ['맞다', '잘 모르겠다', '아니다', '해당없음'] : ['맞다', '잘 모르겠다', '아니다'];
  opts.forEach(opt => {
    const btn = document.getElementById(`qbtn-${qId}-${opt}`);
    if (btn && opt === value) btn.classList.add('selected');
  });
  card.classList.add('answered');
  updateProgress();
}

// ============================================================
// 진행률 업데이트
// ============================================================
function updateProgress() {
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const pct = Math.round((answered / total) * 100);

  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${answered} / ${total}`;
  document.getElementById('answeredCount').textContent = answered;
  document.getElementById('remainingCount').textContent = total - answered;

  CATEGORIES.forEach(cat => {
    const catQs = QUESTIONS.filter(q => q.cat === cat.id);
    const catAnswered = catQs.filter(q => answers[q.id] !== undefined).length;
    const tab = document.getElementById(`tab-${cat.id}`);
    if (tab) {
      tab.classList.toggle('cat-done', catAnswered === catQs.length);
      const spans = tab.querySelectorAll('span');
      if (spans.length > 0) spans[spans.length - 1].textContent = `${catAnswered}/${catQs.length}`;
    }
  });

  const submitBtn = document.getElementById('submitBtn');
  if (answered === total) {
    submitBtn.classList.add('ready');
  } else {
    submitBtn.classList.remove('ready');
  }
}

// ============================================================
// ============================================================
// 카테고리 스크롤
// ============================================================
function getStickyHeight() {
  const stickyTop = document.querySelector('.survey-sticky-top');
  return stickyTop ? stickyTop.offsetHeight + 12 : 160;
}

function scrollToCategory(catId) {
  const el = document.getElementById(`cat-${catId}`);
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - getStickyHeight();
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
}

// 스크롤 감지 → 활성 카테고리 탭 강조
window.addEventListener('scroll', () => {
  if (!document.getElementById('survey-screen').classList.contains('active')) return;
  const stickyH = getStickyHeight();
  let current = null;
  CATEGORIES.forEach(cat => {
    const el = document.getElementById(`cat-${cat.id}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= stickyH + 20) current = cat.id;
    }
  });
  if (current) {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active-tab'));
    const activeTab = document.getElementById(`tab-${current}`);
    if (activeTab) {
      activeTab.classList.add('active-tab');
      activeTab.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    }
  }
});

// ============================================================
// 제출
// ============================================================
async function submitSurvey() {
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;

  if (answered < total) {
    const remaining = total - answered;
    alert(`아직 ${remaining}개의 항목에 답하지 않았습니다.\n모든 항목에 응답 후 제출해주세요.`);
    for (const q of QUESTIONS) {
      if (answers[q.id] === undefined) {
        const card = document.getElementById(`qcard-${q.id}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('shake');
          setTimeout(() => card.classList.remove('shake'), 600);
        }
        break;
      }
    }
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 저장 중...';

  try {
    const payload = {
      session_id: sessionId,
      exam_type: selectedExamType,
      exam_category: selectedExamCategory,
      submitted_at: new Date().toISOString(),
    };
    QUESTIONS.forEach(q => {
      payload[`q${q.id}`] = answers[q.id];
    });

    const resp = await fetch('tables/checklist_responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error('서버 오류');
    showResult();
  } catch (e) {
    alert('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 진단 결과 제출하기';
  }
}

// ============================================================
// 결과 화면
// ============================================================
function showResult() {
  let yesCount = 0, maybeCount = 0, noCount = 0, naCount = 0;
  const dangerItems = [];

  QUESTIONS.forEach(q => {
    const ans = answers[q.id];
    if (ans === '맞다') { yesCount++; dangerItems.push(q); }
    else if (ans === '잘 모르겠다') maybeCount++;
    else if (ans === '아니다') noCount++;
    else naCount++;
  });

  document.getElementById('dangerCount').textContent = yesCount;
  document.getElementById('yesCount').textContent = yesCount;
  document.getElementById('maybeCount').textContent = maybeCount;
  document.getElementById('noCount').textContent = noCount;

  // 시험 정보 배지
  const examInfoEl = document.getElementById('resultExamInfo');
  if (examInfoEl) {
    examInfoEl.textContent = `${selectedExamCategory} · ${selectedExamType}`;
  }

  // 카테고리별 결과
  const catResult = document.getElementById('categoryResult');
  catResult.innerHTML = '<h3 class="cat-result-title">카테고리별 결과</h3>' +
    CATEGORIES.map(cat => {
      const catQs = QUESTIONS.filter(q => q.cat === cat.id);
      const catYes = catQs.filter(q => answers[q.id] === '맞다').length;
      const catTotal = catQs.filter(q => answers[q.id] !== '해당없음').length;
      const pct = catTotal > 0 ? Math.round((catYes / catTotal) * 100) : 0;
      let level = pct >= 60 ? 'danger' : pct >= 30 ? 'warn' : 'good';
      return `
        <div class="cat-result-item ${level}">
          <div class="cat-result-left">
            <i class="fas ${cat.icon}" style="color:${cat.color}"></i>
            <span>${cat.label}</span>
          </div>
          <div class="cat-result-bar-wrap">
            <div class="cat-result-bar" style="width:${pct}%;background:${cat.color}"></div>
          </div>
          <div class="cat-result-pct">${catYes}/${catTotal}</div>
        </div>
      `;
    }).join('');

  // 위험 항목 리스트
  const dangerList = document.getElementById('dangerList');
  if (dangerItems.length === 0) {
    document.getElementById('dangerListWrap').style.display = 'none';
  } else {
    document.getElementById('dangerListWrap').style.display = 'block';
    dangerList.innerHTML = dangerItems.map(q => {
      const cat = CATEGORIES.find(c => c.id === q.cat);
      return `
        <li class="danger-item">
          <span class="danger-cat" style="color:${cat.color}">
            <i class="fas ${cat.icon}"></i> ${cat.label}
          </span>
          <span class="danger-text">Q${q.id}. ${q.text}</span>
        </li>
      `;
    }).join('');
  }

  showScreen('result-screen');
}

// ============================================================
// 다시 진단하기
// ============================================================
function retakeSurvey() {
  answers = {};
  sessionId = generateSessionId();
  selectedExamType = null;
  selectedExamCategory = null;

  document.querySelectorAll('.question-card').forEach(c => {
    c.classList.remove('answered');
    c.querySelectorAll('.q-btn').forEach(b => b.classList.remove('selected'));
  });

  // 인트로 초기화
  document.querySelectorAll('.exam-type-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.exam-cat-btn').forEach(b => b.classList.remove('selected'));
  const selSummary = document.getElementById('selectionSummary');
  if (selSummary) selSummary.style.display = 'none';
  updateStartButton();

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = false;
  submitBtn.classList.remove('ready');
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 진단 결과 제출하기';
  updateProgress();
  showScreen('intro-screen');
}
