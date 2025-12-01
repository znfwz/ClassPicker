export const SAMPLE_STUDENTS_EN = `Alice Johnson
Bob Smith
Charlie Davis
Diana Evans
Ethan Harris
Fiona Clark
George Lewis
Hannah Walker`;

export const SAMPLE_STUDENTS_ZH = `李明
王芳
张伟
刘洋
陈杰
杨娜
赵强
黄婷
周杰
吴小刚`;

export const ANIMATION_DURATION_MS = 1500; // Time the shuffle animation runs
export const SHUFFLE_INTERVAL_MS = 80; // Speed of name switching during shuffle

export const TRANSLATIONS = {
  'en-US': {
    appTitle: 'ClassPicker',
    subtitle: 'MVP Random Call Tool',
    classList: 'Class List',
    sample: 'Sample',
    clearList: 'Clear List',
    placeholder: 'Enter student names here...\nOne name per line\nAlice\nBob\nCharlie',
    duplicatesDetected: 'Duplicates Detected:',
    duplicatesMessage: 'Duplicate names are treated as the same person.',
    confirmLoadSample: 'Replace current list with sample data?',
    confirmClear: 'Clear all names?',
    readyToStart: 'Ready to Start',
    readyDescription: 'Enter names on the left and click the button below to randomly select a student.',
    selecting: 'Selecting...',
    selectedStudent: 'Selected Student',
    rolling: 'Rolling...',
    allCalledReset: 'All Called - Reset?',
    randomPick: 'Random Pick',
    calledHistory: 'Called History',
    reset: 'Reset',
    noHistory: 'No students called yet',
    confirmResetHistory: 'Reset the history of called students?',
    confirmAllCalled: 'All students have been called! Start over?',
    looking: 'Looking...',
    sampleData: SAMPLE_STUDENTS_EN
  },
  'zh-CN': {
    appTitle: '课堂随机点名',
    subtitle: '简单高效的点名工具',
    classList: '学生名单',
    sample: '加载示例',
    clearList: '清空名单',
    placeholder: '在此输入学生姓名...\n每行一个名字\n张三\n李四\n王五',
    duplicatesDetected: '检测到重复姓名：',
    duplicatesMessage: '重复的姓名将被视为同一个人。',
    confirmLoadSample: '确定要用示例数据替换当前列表吗？',
    confirmClear: '确定要清空所有名字吗？',
    readyToStart: '准备就绪',
    readyDescription: '在左侧输入姓名，点击下方按钮开始随机点名。',
    selecting: '正在抽取...',
    selectedStudent: '幸运学生',
    rolling: '抽取中...',
    allCalledReset: '全部点完 - 重置？',
    randomPick: '随机点名',
    calledHistory: '已点名单',
    reset: '重置',
    noHistory: '暂无点名记录',
    confirmResetHistory: '确定要重置点名记录吗？',
    confirmAllCalled: '所有学生都已被点过！要重新开始吗？',
    looking: '寻找中...',
    sampleData: SAMPLE_STUDENTS_ZH
  }
};
