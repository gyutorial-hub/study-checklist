// 질문 데이터 및 카테고리 정의
const CATEGORIES = [
  { id: 'input', label: '인풋 학습', icon: 'fa-book-open', color: '#4F7EF7', qs: [1,2,3,4,5,6,7,8,9] },
  { id: 'objective', label: '객관식', icon: 'fa-check-square', color: '#9B59B6', qs: [10,11,12,13,14,15,16] },
  { id: 'lecture', label: '강의 수강', icon: 'fa-chalkboard-teacher', color: '#E67E22', qs: [17,18,19,20,21] },
  { id: 'output', label: '아웃풋·정리', icon: 'fa-pen-nib', color: '#27AE60', qs: [22,23,24,25,26,27,28,29,30] },
  { id: 'strategy', label: '공부 전략', icon: 'fa-chess', color: '#2980B9', qs: [31,32,33,34,35,36,37,38,39,40,41] },
  { id: 'exam', label: '시험·모의고사', icon: 'fa-file-alt', color: '#C0392B', qs: [42,43,44,45] },
  { id: 'material', label: '교재·자료', icon: 'fa-layer-group', color: '#16A085', qs: [46,47,48,49,50,51] },
  { id: 'review', label: '복습·단권화', icon: 'fa-sync-alt', color: '#8E44AD', qs: [52,53,54,55,56,57] },
  { id: 'plan', label: '계획 관리', icon: 'fa-calendar-alt', color: '#D35400', qs: [58,59,60,61,62,63,64,65,66] },
  { id: 'health', label: '컨디션·수면', icon: 'fa-bed', color: '#1ABC9C', qs: [67,68,69,70,71,72,73,74,75,76,77] },
  { id: 'mental', label: '멘탈 관리', icon: 'fa-brain', color: '#E74C3C', qs: [78,79,80,81,82] },
];

const QUESTIONS = [
  // 인풋 학습 (1~9)
  { id: 1, text: '목적 없이(맹목적으로) 인풋(기본서 회독)을 한다', cat: 'input', obj: false },
  { id: 2, text: '아웃풋(문제풀이) 없이 인풋만 돌린다', cat: 'input', obj: false },
  { id: 3, text: '인풋을 시간제한 없이 읽는다', cat: 'input', obj: false },
  { id: 4, text: '회독 \'수\'에 집착한다', cat: 'input', obj: false },
  { id: 5, text: '머리속에 너무 많은 내용이 들어와 내 지식들이 뒤엉킨 적이 있다', cat: 'input', obj: false },
  { id: 6, text: '회독할 때 내가 아는 내용과 모르는 내용을 구분하지 않는다', cat: 'input', obj: false },
  { id: 7, text: '회독할 때 처음부터 끝까지 전체를 회독한다', cat: 'input', obj: false },
  { id: 8, text: '기출부터 마스터하지 않는다', cat: 'input', obj: false },
  { id: 9, text: '이해가 안된 부분을 붙잡고 하루종일 씨름한 적이 있다', cat: 'input', obj: false },

  // 객관식 (10~16)
  { id: 10, text: '문제 내의 선지(지문)를 OX 판단을 하지 않고 문제 그 자체를 푼다', cat: 'objective', obj: true },
  { id: 11, text: '문제를 풀때마다 내가 선지(지문)를 정확하게 판단했는지 체크하지 않는다', cat: 'objective', obj: true },
  { id: 12, text: '문제집에 답을 표시한다', cat: 'objective', obj: true },
  { id: 13, text: '문제집에서 틀린 지문을 맞는 지문으로 고친다', cat: 'objective', obj: true },
  { id: 14, text: '문제집에서 중복되거나 내가 안다고 생각한 지문(문제)는 지우거나 소거한다', cat: 'objective', obj: true },
  { id: 15, text: '기출을 7회독 이상 하지 않았다', cat: 'objective', obj: true },
  { id: 16, text: 'OX 판단 후에 해설은 제대로 읽지 않는다', cat: 'objective', obj: true },

  // 강의 수강 (17~21)
  { id: 17, text: '강의를 수강할 때 시간 투자 대비 진도가 잘 나가지 않는다는 생각이 든 적이 있다', cat: 'lecture', obj: false },
  { id: 18, text: '한 과목에 대해 기본강의를 수험생활 통틀어서 2번 이상 수강한 적이 있다', cat: 'lecture', obj: false },
  { id: 19, text: '강의를 듣고 어떤 부분이 이해가 되지 않아 계속 그 부분에 머무른 적이 많다', cat: 'lecture', obj: false },
  { id: 20, text: '강의를 수강할 때 이해가 되지 않아 다시 처음부터 강의를 들은 적이 있다', cat: 'lecture', obj: false },
  { id: 21, text: '두문자를 외웠지만 그 두문자의 의미를 모른다', cat: 'lecture', obj: false },

  // 아웃풋·정리 (22~30)
  { id: 22, text: '문제를 풀거나 모의고사 푸는 것을 미루거나 회피한다', cat: 'output', obj: false },
  { id: 23, text: '서브노트를 만든다', cat: 'output', obj: false },
  { id: 24, text: '서브노트를 만드는 데 시간이 많이 걸린다', cat: 'output', obj: false },
  { id: 25, text: '서브노트를 예쁘게 만들려고 한다', cat: 'output', obj: false },
  { id: 26, text: '이해가 안되면 넘어가지 못하고 오랜 시간 머무른다', cat: 'output', obj: false },
  { id: 27, text: '내용의 이해를 위해 구글링이나 논문까지 본 적이 있다', cat: 'output', obj: false },
  { id: 28, text: '유사한 개념을 비교정리한 적이 없다', cat: 'output', obj: false },
  { id: 29, text: '정리 후 정리한 자료나 노트를 다시 본 적이 없다', cat: 'output', obj: false },
  { id: 30, text: '암기가 필요한 부분이 있어도 언젠가는 외워지겠지 하며 별도로 시간을 들여 암기하지 않는다', cat: 'output', obj: false },

  // 공부 전략 (31~41)
  { id: 31, text: '과목마다 내가 취약한 부분은 어디인지 구체적으로 알지 못한다', cat: 'strategy', obj: false },
  { id: 32, text: '어려운 과목이나 부분을 먼저 공부하지 않는다', cat: 'strategy', obj: false },
  { id: 33, text: '모든 행위에 있어 목적 없이 한다', cat: 'strategy', obj: false },
  { id: 34, text: '남들이 다 들으니까 듣는다는 생각으로 인강이나 현강을 선택한다', cat: 'strategy', obj: false },
  { id: 35, text: '중요도나 내가 모르는 부분에 대한 차등을 두지 않고 전체 내용을 공부한다', cat: 'strategy', obj: false },
  { id: 36, text: '모르거나 취약한 부분에 대한 공부를 계속 미룬다', cat: 'strategy', obj: false },
  { id: 37, text: '서브노트를 목적 없이 만든다', cat: 'strategy', obj: false },
  { id: 38, text: '서브노트를 만드는 목적을 정확하게 알지 못하는 것 같다', cat: 'strategy', obj: false },
  { id: 39, text: '모의고사나 시험을 치르고 채점해보면 내가 생각했던 점수보다 터무니없이 낮은 점수가 나온다', cat: 'strategy', obj: false },
  { id: 40, text: '공부의 양이 줄어들지 않는다', cat: 'strategy', obj: false },
  { id: 41, text: '나는 완벽주의 성향인 것 같다', cat: 'strategy', obj: false },

  // 시험·모의고사 (42~45)
  { id: 42, text: '내가 100% 확실하게 아는 선지(지문)이 아님에도 맞다고 체크한다', cat: 'exam', obj: true },
  { id: 43, text: '모의고사를 준비가 다 되기 전까지는 응시하지 않는다', cat: 'exam', obj: false },
  { id: 44, text: '합격수기를 모아놓지 않는다', cat: 'exam', obj: false },
  { id: 45, text: '여러 권의 기본서를 가지고 있다', cat: 'exam', obj: false },

  // 교재·자료 (46~51)
  { id: 46, text: '계획, 정리, 필기 등을 이쁘게 꾸미려는 데 집중하는 경향이 있다', cat: 'material', obj: false },
  { id: 47, text: '쓰면서 외우려고 한다', cat: 'material', obj: false },
  { id: 48, text: '한 권을 최소 5~7회독 하지 않는다', cat: 'material', obj: false },
  { id: 49, text: '눈으로만 보면서 암기를 한다', cat: 'material', obj: false },
  { id: 50, text: '암기를 쉽게 하고 싶어한다', cat: 'material', obj: false },
  { id: 51, text: '하루에 한두 과목만 공부한다', cat: 'material', obj: false },

  // 복습·단권화 (52~57)
  { id: 52, text: '백지복습(\'그 날 공부한 것\'을 백지에 쓰면서 복습하는 행위)을 하고 있다', cat: 'review', obj: false },
  { id: 53, text: '누적복습을 하고 있다', cat: 'review', obj: false },
  { id: 54, text: '시험 전날 1회독의 의미를 정확하게 알지 못한다', cat: 'review', obj: false },
  { id: 55, text: '단권화를 목적 없이 한다', cat: 'review', obj: false },
  { id: 56, text: '단권화를 예쁘게 하려고 한다', cat: 'review', obj: false },
  { id: 57, text: '단권화의 목적을 정확하게 알지 못하는 것 같다', cat: 'review', obj: false },

  // 계획 관리 (58~66)
  { id: 58, text: '주차계획이 없다', cat: 'plan', obj: false },
  { id: 59, text: '그 날의 공부 기록을 하고 있지 않다', cat: 'plan', obj: false },
  { id: 60, text: '자투리 시간을 이용하지 않는다', cat: 'plan', obj: false },
  { id: 61, text: '분량이 아닌 시간 단위로 계획을 세운다', cat: 'plan', obj: false },
  { id: 62, text: '무리하게 계획을 세워 실천하지 못한 경우가 많다', cat: 'plan', obj: false },
  { id: 63, text: '내가 하루 할 수 있는 순공부시간의 한계를 정확하게 알지 못한다', cat: 'plan', obj: false },
  { id: 64, text: '일일 공부시간이 6시간이 되지 않는다', cat: 'plan', obj: false },
  { id: 65, text: '나도 모르게 집중하지 못하는 시간이 1세트 당 20% 넘어간다', cat: 'plan', obj: false },
  { id: 66, text: '하루 공부시간이 오락가락, 편차가 너무 심하다', cat: 'plan', obj: false },

  // 컨디션·수면 (67~77)
  { id: 67, text: '보통 하루에 한 번 이상 졸면서 공부한다', cat: 'health', obj: false },
  { id: 68, text: '새벽형/아침형 인간이 되고 싶어서 시도한 적이 있다', cat: 'health', obj: false },
  { id: 69, text: '시험이 임박하지 않은 상태에서 잠을 줄여가며 공부한 적이 있다', cat: 'health', obj: false },
  { id: 70, text: '시험이 임박하지 않은 상태에서 오는 잠을 막기 위해 밤에 커피나 에너지 음료를 마셔가며 공부한 적이 있다', cat: 'health', obj: false },
  { id: 71, text: '나만의 확실한 휴식 방법이 없다', cat: 'health', obj: false },
  { id: 72, text: '슬럼프를 겪은 경험이 있다', cat: 'health', obj: false },
  { id: 73, text: '의도적으로 수면 시간을 줄이면서 공부하고 있다', cat: 'health', obj: false },
  { id: 74, text: '2-3일 이상 공부를 손에 놓은 적이 있다', cat: 'health', obj: false },
  { id: 75, text: '잠이 부족한 것 같다', cat: 'health', obj: false },
  { id: 76, text: '무기력증, 체력 저하를 경험한 적이 있다', cat: 'health', obj: false },
  { id: 77, text: '다음 날에 지장이 있을 정도로 음주를 한 경험이 있다', cat: 'health', obj: false },

  // 멘탈 관리 (78~82)
  { id: 78, text: '외부 자극에 의해 공부를 오랫동안 지속하지 못한 경험이 있다', cat: 'mental', obj: false },
  { id: 79, text: '체력 관리를 전혀 하지 않는다', cat: 'mental', obj: false },
  { id: 80, text: '불안감이 큰 편이다', cat: 'mental', obj: false },
  { id: 81, text: '나만의 확실한 멘탈관리 방법이 없다', cat: 'mental', obj: false },
  { id: 82, text: '슬럼프가 오는 이유를 정확하게 모른다', cat: 'mental', obj: false },
];
