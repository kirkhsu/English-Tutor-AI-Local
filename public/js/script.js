'use strict';

// Global variables and configuration
const CONFIG = {
  defaultLanguage: 'en-US',
  defaultUILanguage: 'zh-TW',
  defaultModel: '', // empty = use server default Ollama model (OLLAMA_MODEL)
  defaultPersonality: 'helpful',
  maxHistoryItems: 50,
  speechTimeout: 5000,
  // Max wait for the first streamed text (server-side Ollama timeout is 180s; local CPU inference is slow)
  responseTimeout: 190000,
  retryAttempts: 3
};

// UI Internationalization Dictionary (繁體中文 & English)
const I18N = {
  'zh-TW': {
    pageTitle: 'English Tutor AI - AI 英語口說練習平台',
    appTitle: 'English Tutor AI',
    appSubtitle: '您的個人 AI 英語口說教練',
    statusReady: '準備好開始練習',
    statusConnected: '已連線',
    statusDisconnected: '已中斷連線',
    dashboardTitle: '您的學習進度',
    cardGrammar: '文法分數',
    cardPronunciation: '發音表現',
    cardVocabulary: '字彙能力',
    cardFluency: '口說流利度',
    statStreak: '連續練習 7 天',
    statTodayTime: '今日 45 分鐘',
    statLevel: '程度：中級',
    chooseModeTitle: '選擇您的練習模式',
    modeConversationTitle: '自由對話',
    modeConversationDesc: '與 AI 導師進行自然流暢的英語對話練習',
    modeGrammarTitle: '文法強化',
    modeGrammarDesc: '針對性文法糾正與句型練習',
    modePronunciationTitle: '發音訓練',
    modePronunciationDesc: '口音調整與發音細節回饋',
    modeVocabularyTitle: '字彙擴充',
    modeVocabularyDesc: '在對話情境中學習新單字與片語',
    modeFluencyTitle: '流利度訓練',
    modeFluencyDesc: '建立開口自信與自然的語流節奏',
    modeScenarioTitle: '情境模擬',
    modeScenarioDesc: '練習真實生活與職場情境對話',
    settingsTitle: '學習設定',
    labelUILanguage: '介面語言 (Interface Language)：',
    labelTutorMode: 'AI 導師模式：',
    tutorConversationPartner: '對話夥伴 (Conversation Partner)',
    tutorGrammarTutor: '文法導師 (Grammar Tutor)',
    tutorPronunciationCoach: '發音教練 (Pronunciation Coach)',
    tutorVocabularyBuilder: '字彙專家 (Vocabulary Builder)',
    tutorFluencyCoach: '流利度教練 (Fluency Coach)',
    labelDifficulty: '難度等級：',
    diffBeginner: '初級 (Beginner)',
    diffIntermediate: '中級 (Intermediate)',
    diffAdvanced: '高級 (Advanced)',
    diffNative: '母語程度 (Native Level)',
    labelFeedbackStyle: '回饋風格：',
    fbGentle: '溫和鼓勵 (Gentle & Encouraging)',
    fbDetailed: '詳細解析 (Detailed Analysis)',
    fbImmediate: '即時糾正 (Immediate Correction)',
    fbSummary: '課後總結 (End-of-Session Summary)',
    labelRecogLanguage: '語音辨識語言：',
    langEnUS: '英文 - 美國 (en-US)',
    langEnGB: '英文 - 英國 (en-GB)',
    langEnAU: '英文 - 澳洲 (en-AU)',
    langEnCA: '英文 - 加拿大 (en-CA)',
    labelTutorVoice: '導師語音：',
    voiceDefault: '預設語音',
    labelSessionLength: '練習時長：',
    session5m: '5 分鐘',
    session10m: '10 分鐘',
    session15m: '15 分鐘',
    session30m: '30 分鐘',
    sessionUnlimited: '不限時間',
    btnViewProgress: '檢視詳細進度',
    btnClearHistory: '清除對話紀錄',
    feedbackPanelTitle: 'AI 學習回饋',
    fbHeaderGrammar: '文法',
    fbPlaceholderGrammar: '開始口說即可獲得文法回饋...',
    fbHeaderPronunciation: '發音',
    fbPlaceholderPronunciation: '開始口說即可獲得發音回饋...',
    fbHeaderVocabulary: '字彙',
    fbPlaceholderVocabulary: '新單字與片語將會顯示於此...',
    fbHeaderFluency: '流利度',
    fbHeaderOverall: '整體表現',
    fbHeaderSuggestions: '改進建議',
    fbSectionTitle: '📚 學習回饋',
    welcomeMessageMain: '您好！我是您的 AI 英語導師，將透過自然對話協助您提升英語口說能力。請點擊下方麥克風開始說英文，我會提供實用的回饋，幫助您更自信地開口說英語！',
    welcomeMessageNote: '💡 提示：若要使用完整 AI 功能，請確認本機 Ollama 伺服器已啟動並已下載模型。',
    labelYouSaid: '您說：',
    placeholderYouSaid: '點擊麥克風開始練習...',
    labelAITutor: 'AI 導師：',
    placeholderAITutor: '隨時準備協助您提升英語能力！',
    loadingAnalyzing: 'AI 正在分析您的語音...',
    scenarioModalTitle: '選擇練習情境',
    scenarioJobTitle: '工作面試',
    scenarioJobDesc: '練習專業職場求職面試技巧',
    scenarioRestaurantTitle: '餐廳點餐',
    scenarioRestaurantDesc: '練習點餐與用餐情境對話',
    scenarioTravelTitle: '旅遊出行',
    scenarioTravelDesc: '機場、飯店與觀光詢問互動',
    scenarioShoppingTitle: '購物消費',
    scenarioShoppingDesc: '商店詢問商品、價格與結帳',
    scenarioMedicalTitle: '醫療就診',
    scenarioMedicalDesc: '看診描述症狀與健康諮詢',
    scenarioSocialTitle: '社交閒聊',
    scenarioSocialDesc: '日常輕鬆交談與破冰話題',
    ariaToggleTheme: '切換主題',
    ariaToggleDashboard: '展開/收合儀表板',
    ariaExpandDashboard: '展開儀表板',
    ariaCollapseDashboard: '收合儀表板',
    ariaCloseSettings: '關閉設定',
    ariaToggleFeedback: '切換回饋面板',
    ariaStartSpeaking: '開始口說練習',
    ariaOpenSettings: '開啟設定',
    ariaToggleMute: '切換靜音',
    ariaStopSpeech: '停止播放語音',
    ariaCloseModal: '關閉視窗',
    ariaCloseToast: '關閉通知',
    toastWelcome: '歡迎使用 English Tutor AI！🎓 請選擇一個練習模式開始。',
    toastMicReady: '🎤 麥克風已就緒！點擊麥克風即可開始練習。',
    toastListening: '🎤 正在聆聽... 請開始說話！',
    toastSwitchedMode: '已切換至「{mode}」模式',
    toastSelectedScenario: '已選擇「{scenario}」情境',
    toastSwitchedTheme: '已切換至{theme}主題',
    themeLight: '淺色',
    themeDark: '深色',
    toastHistoryCleared: '對話紀錄已清除',
    confirmClearHistory: '確定要清除所有對話紀錄嗎？',
    toastRecogLangChanged: '語音辨識語言已變更為 {lang}',
    toastUILangChanged: '介面語言已切換為繁體中文',
    toastTutorModeChanged: '導師模式已變更為 {mode}',
    toastVoiceUpdated: '語音選擇已更新',
    toastMuted: '已開啟靜音',
    toastUnmuted: '已取消靜音',
    toastDifficultyChanged: '難度等級已變更為 {level}',
    toastFeedbackStyleChanged: '回饋風格已變更為 {style}',
    toastSessionLengthChanged: '練習時長已變更為 {length}',
    toastSessionReport: '本次練習：{messages} 則訊息、{words} 個單字、{unique} 個不重複詞彙',
    errSpeechRecogNotSupported: '此瀏覽器不支援語音辨識，請使用 Chrome、Edge 或 Safari。',
    errSpeechRecogInitFailed: '語音辨識初始化失敗，請重新整理頁面再試一次。',
    errSpeechRecogNotAvail: '語音辨識無法使用，請重新整理頁面。',
    errNoSpeech: '語音辨識錯誤：未偵測到語音，請再試一次。',
    errAudioCapture: '語音辨識錯誤：無法存取麥克風，請檢查權限設定。',
    errNotAllowed: '語音辨識錯誤：麥克風存取被拒絕，請允許麥克風權限。',
    errNetwork: '語音辨識錯誤：網路發生錯誤，請檢查您的連線。',
    errGenericSpeech: '語音辨識錯誤：{error}',
    errNoMatch: '無法辨識語音內容，請再試一次。',
    errTutorGeneric: '發生錯誤，請再試一次。',
    errBotEmpty: '很抱歉，無法產生回應，請再試一次。',
    errSocketConnection: '連線發生錯誤',
    errTimeout: '請求逾時，請再試一次。',
    errUnexpected: '發生非預期的錯誤',
    errMicPrefix: '🎤 麥克風錯誤：',
    errMicDenied: '麥克風存取被拒絕。',
    errMicDeniedSug1: '點擊瀏覽器網址列旁的麥克風圖示',
    errMicDeniedSug2: '選擇「允許」麥克風存取權限',
    errMicDeniedSug3: '重新整理頁面後再試一次',
    errMicNotFound: '找不到麥克風裝置。',
    errMicNotFoundSug1: '請將麥克風連接至您的裝置',
    errMicNotFoundSug2: '確認麥克風已正確連接',
    errMicNotFoundSug3: '嘗試使用其他麥克風',
    errMicNotReadable: '麥克風正被其他應用程式使用中。',
    errMicNotReadableSug1: '關閉其他正在使用麥克風的應用程式',
    errMicNotReadableSug2: '重新啟動瀏覽器',
    errMicNotReadableSug3: '檢查系統偏好設定中的麥克風設定',
    errMicUnknown: '未知的麥克風錯誤。',
    errMicUnknownSug1: '檢查瀏覽器設定中的麥克風權限',
    errMicUnknownSug2: '嘗試重新整理頁面',
    errMicUnknownSug3: '建議使用 Chrome 瀏覽器',
    compatIssueHeader: '偵測到瀏覽器相容性問題：',
    compatIssueFooter: '為獲得最佳體驗，請使用 Chrome、Edge 或 Safari。',
    compatSpeechRecog: '不支援語音辨識 (Speech Recognition)',
    compatSpeechSynth: '不支援語音合成 (Speech Synthesis)',
    compatMediaDevices: '不支援媒體裝置 API (Media Devices API)',
    compatWebSocket: '不支援 WebSocket',
    diagBtnTitle: '執行麥克風診斷',
    diagBtnText: '執行麥克風診斷',
    diagTitle: '🔧 麥克風診斷結果',
    diagBrowserSupport: '瀏覽器支援',
    diagMediaDevices: '媒體裝置 API',
    diagSpeechRecog: '語音辨識',
    diagMicAccess: '麥克風存取',
    diagAudioContext: '音訊環境 (Audio Context)',
    diagPermissions: '權限狀態',
    diagOk: '正常',
    diagFailed: '失敗',
    diagAllPassed: '✅ 所有檢查皆已通過！',
    diagIssuesTitle: '❌ 發現問題：',
    diagFixesTitle: '💡 建議修復方式：',
    diagErrorsTitle: '⚠️ 錯誤詳情：',
    diagAutoFixBtn: '🔧 自動修復問題',
    diagTestMicBtn: '🎤 測試麥克風',
    diagCloseBtn: '✖ 關閉',
    diagFixedBotMsg: '麥克風問題已修復，請點擊麥克風開始說話！',
    diagAutoFixDone: '🔧 麥克風自動修復完成，現在可以試著說話！',
    diagAutoFixFailed: '❌ 自動修復失敗，請嘗試上方建議的手動修復步驟。',
    diagTestPassed: '✅ 麥克風測試通過！最高音量：{level}/255',
    diagTestLow: '⚠️ 麥克風測試警告：偵測到的音量極低 ({level}/255)，請檢查麥克風音量設定。',
    diagTesting3s: '🎤 正在測試麥克風（持續 3 秒）... 請說話！',
    diagTestFailed: '❌ 麥克風測試失敗：{error}'
  },
  'en': {
    pageTitle: 'English Tutor AI - Speaking Practice Platform',
    appTitle: 'English Tutor AI',
    appSubtitle: 'Your Personal English Speaking Coach',
    statusReady: 'Ready to Practice',
    statusConnected: 'Connected',
    statusDisconnected: 'Disconnected',
    dashboardTitle: 'Your Learning Progress',
    cardGrammar: 'Grammar Score',
    cardPronunciation: 'Pronunciation',
    cardVocabulary: 'Vocabulary',
    cardFluency: 'Fluency',
    statStreak: '7 Day Streak',
    statTodayTime: '45 min Today',
    statLevel: 'Level: Intermediate',
    chooseModeTitle: 'Choose Your Practice Mode',
    modeConversationTitle: 'Free Conversation',
    modeConversationDesc: 'Natural dialogue practice with AI tutor',
    modeGrammarTitle: 'Grammar Focus',
    modeGrammarDesc: 'Targeted grammar correction and practice',
    modePronunciationTitle: 'Pronunciation',
    modePronunciationDesc: 'Accent training and pronunciation feedback',
    modeVocabularyTitle: 'Vocabulary Builder',
    modeVocabularyDesc: 'Learn new words through conversation',
    modeFluencyTitle: 'Fluency Training',
    modeFluencyDesc: 'Build confidence and speaking flow',
    modeScenarioTitle: 'Scenarios',
    modeScenarioDesc: 'Practice real-life situations',
    settingsTitle: 'Learning Settings',
    labelUILanguage: 'Interface Language:',
    labelTutorMode: 'AI Tutor Mode:',
    tutorConversationPartner: 'Conversation Partner',
    tutorGrammarTutor: 'Grammar Tutor',
    tutorPronunciationCoach: 'Pronunciation Coach',
    tutorVocabularyBuilder: 'Vocabulary Builder',
    tutorFluencyCoach: 'Fluency Coach',
    labelDifficulty: 'Difficulty Level:',
    diffBeginner: 'Beginner',
    diffIntermediate: 'Intermediate',
    diffAdvanced: 'Advanced',
    diffNative: 'Native Level',
    labelFeedbackStyle: 'Feedback Style:',
    fbGentle: 'Gentle & Encouraging',
    fbDetailed: 'Detailed Analysis',
    fbImmediate: 'Immediate Correction',
    fbSummary: 'End-of-Session Summary',
    labelRecogLanguage: 'Recognition Language:',
    langEnUS: 'English (US)',
    langEnGB: 'English (UK)',
    langEnAU: 'English (Australia)',
    langEnCA: 'English (Canada)',
    labelTutorVoice: 'Tutor Voice:',
    voiceDefault: 'Default',
    labelSessionLength: 'Session Length:',
    session5m: '5 minutes',
    session10m: '10 minutes',
    session15m: '15 minutes',
    session30m: '30 minutes',
    sessionUnlimited: 'Unlimited',
    btnViewProgress: 'View Detailed Progress',
    btnClearHistory: 'Clear Session History',
    feedbackPanelTitle: 'AI Feedback',
    fbHeaderGrammar: 'Grammar',
    fbPlaceholderGrammar: 'Speak to get grammar feedback...',
    fbHeaderPronunciation: 'Pronunciation',
    fbPlaceholderPronunciation: 'Speak to get pronunciation feedback...',
    fbHeaderVocabulary: 'Vocabulary',
    fbPlaceholderVocabulary: 'New words will appear here...',
    fbHeaderFluency: 'Fluency',
    fbHeaderOverall: 'Overall',
    fbHeaderSuggestions: 'Suggestions',
    fbSectionTitle: '📚 Learning Feedback',
    welcomeMessageMain: "Hello! I'm your AI English tutor. I'm here to help you improve your speaking skills through natural conversation. Click the microphone and start speaking - I'll provide helpful feedback to make you a more confident English speaker!",
    welcomeMessageNote: '💡 Tip: For full AI capabilities, make sure the local Ollama server is running and the model has been pulled.',
    labelYouSaid: 'You said:',
    placeholderYouSaid: 'Click the microphone to start practicing...',
    labelAITutor: 'AI Tutor:',
    placeholderAITutor: 'Ready to help you improve your English!',
    loadingAnalyzing: 'AI is analyzing your speech...',
    scenarioModalTitle: 'Choose Practice Scenario',
    scenarioJobTitle: 'Job Interview',
    scenarioJobDesc: 'Practice professional interview skills',
    scenarioRestaurantTitle: 'Restaurant',
    scenarioRestaurantDesc: 'Ordering food and dining conversations',
    scenarioTravelTitle: 'Travel',
    scenarioTravelDesc: 'Airport, hotel, and tourist interactions',
    scenarioShoppingTitle: 'Shopping',
    scenarioShoppingDesc: 'Store interactions and purchases',
    scenarioMedicalTitle: 'Medical',
    scenarioMedicalDesc: 'Doctor visits and health discussions',
    scenarioSocialTitle: 'Social',
    scenarioSocialDesc: 'Casual conversations and small talk',
    ariaToggleTheme: 'Toggle theme',
    ariaToggleDashboard: 'Toggle dashboard',
    ariaExpandDashboard: 'Expand dashboard',
    ariaCollapseDashboard: 'Collapse dashboard',
    ariaCloseSettings: 'Close settings',
    ariaToggleFeedback: 'Toggle feedback panel',
    ariaStartSpeaking: 'Start speaking practice',
    ariaOpenSettings: 'Open settings',
    ariaToggleMute: 'Toggle mute',
    ariaStopSpeech: 'Stop current speech',
    ariaCloseModal: 'Close modal',
    ariaCloseToast: 'Close notification',
    toastWelcome: 'Welcome to English Tutor AI! 🎓 Choose a practice mode to begin.',
    toastMicReady: '🎤 Microphone ready! Click the microphone to start practicing.',
    toastListening: '🎤 Listening... Speak now!',
    toastSwitchedMode: 'Switched to {mode} mode',
    toastSelectedScenario: 'Selected {scenario} scenario',
    toastSwitchedTheme: 'Switched to {theme} theme',
    themeLight: 'light',
    themeDark: 'dark',
    toastHistoryCleared: 'Conversation history cleared',
    confirmClearHistory: 'Are you sure you want to clear the conversation history?',
    toastRecogLangChanged: 'Language changed to {lang}',
    toastUILangChanged: 'Interface language switched to English',
    toastTutorModeChanged: 'Tutor mode changed to {mode}',
    toastVoiceUpdated: 'Voice selection updated',
    toastMuted: 'Audio muted',
    toastUnmuted: 'Audio unmuted',
    toastDifficultyChanged: 'Difficulty level changed to {level}',
    toastFeedbackStyleChanged: 'Feedback style changed to {style}',
    toastSessionLengthChanged: 'Session length changed to {length}',
    toastSessionReport: 'Session: {messages} messages, {words} words, {unique} unique words',
    errSpeechRecogNotSupported: 'Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.',
    errSpeechRecogInitFailed: 'Failed to initialize speech recognition. Please refresh the page and try again.',
    errSpeechRecogNotAvail: 'Speech recognition not available. Please refresh the page.',
    errNoSpeech: 'Speech recognition error: No speech detected. Please try again.',
    errAudioCapture: 'Speech recognition error: Microphone not accessible. Please check permissions.',
    errNotAllowed: 'Speech recognition error: Microphone access denied. Please allow microphone access.',
    errNetwork: 'Speech recognition error: Network error. Please check your connection.',
    errGenericSpeech: 'Speech recognition error: {error}',
    errNoMatch: 'Could not understand speech. Please try again.',
    errTutorGeneric: 'An error occurred. Please try again.',
    errBotEmpty: "I apologize, but I couldn't generate a response. Please try again.",
    errSocketConnection: 'Connection error occurred',
    errTimeout: 'Request timed out. Please try again.',
    errUnexpected: 'An unexpected error occurred',
    errMicPrefix: '🎤 Microphone Error: ',
    errMicDenied: 'Microphone access denied.',
    errMicDeniedSug1: "Click the microphone icon in your browser's address bar",
    errMicDeniedSug2: 'Select "Allow" for microphone access',
    errMicDeniedSug3: 'Refresh the page and try again',
    errMicNotFound: 'No microphone found.',
    errMicNotFoundSug1: 'Connect a microphone to your device',
    errMicNotFoundSug2: 'Check your microphone is properly connected',
    errMicNotFoundSug3: 'Try using a different microphone',
    errMicNotReadable: 'Microphone is being used by another application.',
    errMicNotReadableSug1: 'Close other applications using the microphone',
    errMicNotReadableSug2: 'Restart your browser',
    errMicNotReadableSug3: 'Check microphone settings in system preferences',
    errMicUnknown: 'Unknown microphone error.',
    errMicUnknownSug1: 'Check microphone permissions in browser settings',
    errMicUnknownSug2: 'Try refreshing the page',
    errMicUnknownSug3: 'Use a different browser (Chrome recommended)',
    compatIssueHeader: 'Browser compatibility issues detected:',
    compatIssueFooter: 'For best experience, please use Chrome, Edge, or Safari.',
    compatSpeechRecog: 'Speech Recognition not supported',
    compatSpeechSynth: 'Speech Synthesis not supported',
    compatMediaDevices: 'Media Devices API not supported',
    compatWebSocket: 'WebSocket not supported',
    diagBtnTitle: 'Run Microphone Diagnostic',
    diagBtnText: 'Run Microphone Diagnostic',
    diagTitle: '🔧 Microphone Diagnostic Results',
    diagBrowserSupport: 'Browser Support',
    diagMediaDevices: 'Media Devices API',
    diagSpeechRecog: 'Speech Recognition',
    diagMicAccess: 'Microphone Access',
    diagAudioContext: 'Audio Context',
    diagPermissions: 'Permissions',
    diagOk: 'OK',
    diagFailed: 'Failed',
    diagAllPassed: '✅ All checks passed!',
    diagIssuesTitle: '❌ Issues Found:',
    diagFixesTitle: '💡 Recommended Fixes:',
    diagErrorsTitle: '⚠️ Error Details:',
    diagAutoFixBtn: '🔧 Auto-Fix Issues',
    diagTestMicBtn: '🎤 Test Microphone',
    diagCloseBtn: '✖ Close',
    diagFixedBotMsg: 'Microphone issues fixed. Click the microphone to start speaking!',
    diagAutoFixDone: '🔧 Microphone auto-fix completed. Try speaking now!',
    diagAutoFixFailed: '❌ Auto-fix failed. Please try the manual fixes suggested above.',
    diagTestPassed: '✅ Microphone test passed! Peak level: {level}/255',
    diagTestLow: '⚠️ Microphone test warning: Very low audio levels detected ({level}/255). Check your microphone volume.',
    diagTesting3s: '🎤 Testing microphone for 3 seconds... Please speak!',
    diagTestFailed: '❌ Microphone test failed: {error}'
  }
};

// Translation helper function
function t(key, params = {}) {
  const lang = (AppState && AppState.uiLanguage) || CONFIG.defaultUILanguage;
  const dict = I18N[lang] || I18N['zh-TW'];
  let str = dict[key] !== undefined ? dict[key] : (I18N['en'][key] || key);
  Object.keys(params).forEach(k => {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
  });
  return str;
}
window.t = t;

// Enhanced Application state for comprehensive scoring
const AppState = {
  isRecording: false,
  isMuted: false,
  currentTheme: localStorage.getItem('theme') || 'light',
  uiLanguage: localStorage.getItem('uiLanguage') || CONFIG.defaultUILanguage,
  conversationHistory: JSON.parse(localStorage.getItem('conversationHistory')) || [],
  
  // Learning-specific state
  learningMode: localStorage.getItem('learningMode') || 'conversation',
  tutorMode: localStorage.getItem('tutorMode') || 'conversation_partner',
  difficultyLevel: localStorage.getItem('difficultyLevel') || 'intermediate',
  feedbackStyle: localStorage.getItem('feedbackStyle') || 'gentle',
  sessionLength: localStorage.getItem('sessionLength') || 'unlimited',
  selectedScenario: localStorage.getItem('selectedScenario') || '',
  scenarioContext: '',
  
  // Enhanced Progress tracking with detailed metrics
  sessionStartTime: null,
  sessionDuration: 0,
  wordsSpoken: 0,
  messagesCount: 0,
  
  // Comprehensive scoring system (0-100)
  scores: {
    grammar: parseInt(localStorage.getItem('grammarScore')) || 75,
    pronunciation: parseInt(localStorage.getItem('pronunciationScore')) || 78,
    vocabulary: parseInt(localStorage.getItem('vocabularyScore')) || 82,
    fluency: parseInt(localStorage.getItem('fluencyScore')) || 80,
    overall: parseInt(localStorage.getItem('overallScore')) || 79
  },
  
  // Detailed analytics
  analytics: {
    totalSessions: parseInt(localStorage.getItem('totalSessions')) || 0,
    totalMinutes: parseInt(localStorage.getItem('totalMinutes')) || 0,
    streakDays: parseInt(localStorage.getItem('streakDays')) || 7,
    lastSessionDate: localStorage.getItem('lastSessionDate') || new Date().toDateString(),
    weakAreas: JSON.parse(localStorage.getItem('weakAreas')) || [],
    strongAreas: JSON.parse(localStorage.getItem('strongAreas')) || [],
    improvementSuggestions: JSON.parse(localStorage.getItem('improvementSuggestions')) || []
  },
  
  // Session-specific tracking
  currentSession: {
    startTime: null,
    messagesCount: 0,
    wordsSpoken: 0,
    grammarErrors: 0,
    pronunciationIssues: 0,
    vocabularyUsed: new Set(),
    fluencyScore: 0,
    interactions: []
  },
  
  settings: {
    aiModel: localStorage.getItem('aiModel') || CONFIG.defaultModel,
    language: localStorage.getItem('language') || CONFIG.defaultLanguage,
    selectedVoice: localStorage.getItem('selectedVoice') || ''
  }
};

// Initialize Socket.IO
const socket = io();

// DOM Elements
const elements = {
  // Output elements
  outputYou: document.querySelector('.output-you'),
  outputBot: document.querySelector('.output-bot'),
  chatHistory: document.getElementById('chat-history'),
  
  // Control buttons
  micBtn: document.getElementById('mic-btn'),
  themeBtn: document.getElementById('theme-btn'),
  langBtn: document.getElementById('lang-btn'),
  langBtnLabel: document.getElementById('lang-btn-label'),
  settingsBtn: document.getElementById('settings-btn'),
  muteBtn: document.getElementById('mute-btn'),
  stopBtn: document.getElementById('stop-btn'),
  closeSettingsBtn: document.getElementById('close-settings'),
  clearHistoryBtn: document.getElementById('clear-history'),
  
  // Settings panel
  settingsPanel: document.getElementById('settings-panel'),
  uiLanguageSelect: document.getElementById('ui-language-select'),
  tutorModeSelect: document.getElementById('tutor-mode'),
  difficultyLevelSelect: document.getElementById('difficulty-level'),
  feedbackStyleSelect: document.getElementById('feedback-style'),
  languageSelect: document.getElementById('language-select'),
  voiceSelect: document.getElementById('voice-select'),
  sessionLengthSelect: document.getElementById('session-length'),
  
  // Status and loading
  connectionStatus: document.getElementById('connection-status'),
  statusText: document.getElementById('status-text'),
  loadingIndicator: document.getElementById('loading-indicator'),
  voiceVisualizer: document.getElementById('voice-visualizer'),
  visualizerCanvas: document.getElementById('visualizer-canvas'),
  
  // Toast
  errorToast: document.getElementById('error-toast'),
  toastMessage: document.getElementById('toast-message')
};

// Apply UI Language to all [data-i18n] and [data-i18n-aria] elements
function applyUILanguage(lang) {
  const validLang = I18N[lang] ? lang : CONFIG.defaultUILanguage;
  AppState.uiLanguage = validLang;
  localStorage.setItem('uiLanguage', validLang);
  document.documentElement.setAttribute('lang', validLang);

  // Update text content for elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // Update aria-label for elements with data-i18n-aria
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      el.setAttribute('aria-label', t(key));
    }
  });

  // Update language toggle button label (shows the target language to switch to, or current indicator)
  if (elements.langBtnLabel) {
    elements.langBtnLabel.textContent = validLang === 'zh-TW' ? 'EN' : '繁中';
  }

  // Sync select dropdown in settings
  if (elements.uiLanguageSelect) {
    elements.uiLanguageSelect.value = validLang;
  }

  // Re-populate voice select default label
  if (typeof populateVoiceSelect === 'function' && elements.voiceSelect) {
    populateVoiceSelect();
  }
}

function toggleUILanguage() {
  const nextLang = AppState.uiLanguage === 'zh-TW' ? 'en' : 'zh-TW';
  applyUILanguage(nextLang);
  showToast(t('toastUILangChanged'), 'info');
}

function updateUILanguage() {
  if (elements.uiLanguageSelect) {
    applyUILanguage(elements.uiLanguageSelect.value);
    showToast(t('toastUILangChanged'), 'success');
  }
}

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let speechSynthesis = window.speechSynthesis;
let availableVoices = [];

// Audio Context for Voice Visualization
let audioContext = null;
let analyser = null;
let microphone = null;
let animationId = null;

// Personality prompts
const PERSONALITY_PROMPTS = {
  helpful: "You are a helpful and friendly AI assistant. Provide clear, accurate, and useful responses.",
  creative: "You are a creative and imaginative AI assistant. Think outside the box and provide innovative, artistic responses.",
  technical: "You are a technical expert AI assistant. Provide detailed, accurate technical information with examples and best practices.",
  casual: "You are a casual, friendly AI assistant. Respond in a relaxed, conversational tone like talking to a good friend.",
  professional: "You are a professional AI assistant. Provide formal, well-structured responses suitable for business contexts."
};

// Browser Compatibility Check
function checkBrowserCompatibility() {
  const issues = [];
  
  // Check Speech Recognition
  if (!SpeechRecognition) {
    issues.push(t('compatSpeechRecog'));
  }
  
  // Check Speech Synthesis
  if (!window.speechSynthesis) {
    issues.push(t('compatSpeechSynth'));
  }
  
  // Check Media Devices
  if (!navigator.mediaDevices) {
    issues.push(t('compatMediaDevices'));
  }
  
  // Check WebSocket support
  if (!window.WebSocket) {
    issues.push(t('compatWebSocket'));
  }
  
  if (issues.length > 0) {
    const message = `${t('compatIssueHeader')}\n• ${issues.join('\n• ')}\n\n${t('compatIssueFooter')}`;
    console.warn('⚠️ Browser compatibility issues:', issues);
    showError(message);
    return false;
  }
  
  console.log('✅ Browser compatibility check passed');
  return true;
}

// Initialize Application
function initializeApp() {
  console.log('🚀 Initializing English Tutor AI...');
  
  // Apply saved UI language first
  applyUILanguage(AppState.uiLanguage);

  // Check browser compatibility
  const isCompatible = checkBrowserCompatibility();
  
  // Apply saved theme
  applyTheme(AppState.currentTheme);
  
  // Initialize speech recognition
  initializeSpeechRecognition();
  
  // Load available voices
  loadAvailableVoices();
  
  // Setup event listeners
  setupEventListeners();
  
  // Load conversation history
  loadConversationHistory();
  
  // Apply saved settings
  applySettings();
  
  // Initialize progress display
  updateProgressDisplay();
  
  // Initialize active mode
  initializeActiveMode();
  
  // Start session timer
  setInterval(updateSessionTimer, 1000);
  
  if (isCompatible) {
    console.log('✅ English Tutor AI initialized successfully');
    showToast(t('toastWelcome'), 'success');
  } else {
    console.log('⚠️ English Tutor AI initialized with compatibility warnings');
  }
}

// Enhanced Speech Recognition with better microphone handling
function initializeSpeechRecognition() {
  if (!SpeechRecognition) {
    showError(t('errSpeechRecogNotSupported'));
    elements.micBtn.disabled = true;
    elements.micBtn.style.opacity = '0.5';
    return;
  }
  
  try {
    recognition = new SpeechRecognition();
    recognition.lang = AppState.settings.language;
    recognition.interimResults = true; // Enable interim results for better UX
    recognition.maxAlternatives = 3; // Get multiple alternatives
    recognition.continuous = false;
    
    // Enhanced browser-specific settings
    if (typeof recognition.serviceURI !== 'undefined') {
      recognition.serviceURI = 'wss://api.speechmatics.com/v2';
    }
    
    // Speech Recognition Event Listeners with enhanced error handling
    recognition.addEventListener('speechstart', handleSpeechStart);
    recognition.addEventListener('speechend', handleSpeechEnd);
    recognition.addEventListener('result', handleSpeechResult);
    recognition.addEventListener('error', handleSpeechError);
    recognition.addEventListener('nomatch', handleNoMatch);
    recognition.addEventListener('start', handleRecognitionStart);
    recognition.addEventListener('end', handleRecognitionEnd);
    
    console.log('✅ Enhanced speech recognition initialized successfully');
    
    // Test microphone permissions on initialization
    testMicrophoneAccess();
    
  } catch (error) {
    console.error('❌ Failed to initialize speech recognition:', error);
    showError(t('errSpeechRecogInitFailed'));
    elements.micBtn.disabled = true;
    elements.micBtn.style.opacity = '0.5';
  }
}

// Test microphone access and permissions
async function testMicrophoneAccess() {
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      console.log('✅ Microphone access granted');
      
      // Test audio levels
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      // Stop the test stream
      stream.getTracks().forEach(track => track.stop());
      audioContext.close();
      
      showToast(t('toastMicReady'), 'success');
      
    } else {
      throw new Error('Media devices not supported');
    }
  } catch (error) {
    console.error('❌ Microphone access error:', error);
    handleMicrophoneError(error);
  }
}

// Handle microphone-specific errors
function handleMicrophoneError(error) {
  let errorMessage = t('errMicPrefix');
  let suggestions = [];
  
  switch (error.name) {
    case 'NotAllowedError':
      errorMessage += t('errMicDenied');
      suggestions = [
        t('errMicDeniedSug1'),
        t('errMicDeniedSug2'),
        t('errMicDeniedSug3')
      ];
      break;
    case 'NotFoundError':
      errorMessage += t('errMicNotFound');
      suggestions = [
        t('errMicNotFoundSug1'),
        t('errMicNotFoundSug2'),
        t('errMicNotFoundSug3')
      ];
      break;
    case 'NotReadableError':
      errorMessage += t('errMicNotReadable');
      suggestions = [
        t('errMicNotReadableSug1'),
        t('errMicNotReadableSug2'),
        t('errMicNotReadableSug3')
      ];
      break;
    default:
      errorMessage += t('errMicUnknown');
      suggestions = [
        t('errMicUnknownSug1'),
        t('errMicUnknownSug2'),
        t('errMicUnknownSug3')
      ];
  }
  
  showDetailedError(errorMessage, suggestions);
}

// Show detailed error with suggestions
function showDetailedError(message, suggestions = []) {
  const errorHtml = `
    <div class="error-details">
      <h4>${message}</h4>
      ${suggestions.length > 0 ? `
        <ul class="error-suggestions">
          ${suggestions.map(suggestion => `<li>💡 ${suggestion}</li>`).join('')}
        </ul>
      ` : ''}
    </div>
  `;
  
  showToast(errorHtml, 'error');
}

// Enhanced speech recognition handlers
function handleRecognitionStart() {
  console.log('🎤 Recognition started');
  AppState.isRecording = true;
}

function handleRecognitionEnd() {
  console.log('🎤 Recognition ended');
  AppState.isRecording = false;
  elements.micBtn.classList.remove('recording');
  stopVoiceVisualization();
}

function handleSpeechResult(event) {
  console.log('📝 Speech result received');
  
  let finalTranscript = '';
  let interimTranscript = '';
  
  // Process all results
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    const confidence = event.results[i][0].confidence;
    
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
      console.log(`Final: "${transcript}" (confidence: ${confidence})`);
    } else {
      interimTranscript += transcript;
      console.log(`Interim: "${transcript}"`);
    }
  }
  
  // Update UI with interim results
  if (interimTranscript) {
    elements.outputYou.removeAttribute('data-i18n');
    elements.outputYou.textContent = finalTranscript + interimTranscript;
    elements.outputYou.style.opacity = '0.7';
  }
  
  // Process final result
  if (finalTranscript) {
    elements.outputYou.removeAttribute('data-i18n');
    elements.outputYou.textContent = finalTranscript;
    elements.outputYou.style.opacity = '1';
    
    // Analyze speech and update session stats
    analyzeUserSpeech(finalTranscript);
    
    // Add to conversation history
    addToConversationHistory('user', finalTranscript);
    
    // Show loading indicator
    console.log('🔄 Showing loading indicator');
    showLoadingIndicator();
    
    // Prepare enhanced message data
    const messageData = {
      text: finalTranscript,
      model: AppState.settings.aiModel,
      personality: AppState.tutorMode,
      learningMode: AppState.learningMode,
      difficultyLevel: AppState.difficultyLevel,
      feedbackStyle: AppState.feedbackStyle,
      sessionContext: {
        messagesCount: AppState.currentSession.messagesCount,
        wordsSpoken: AppState.currentSession.wordsSpoken,
        currentScores: AppState.scores,
        scenario: AppState.selectedScenario,
        scenarioContext: AppState.scenarioContext
      }
    };
    
    console.log('📤 Sending enhanced message to server:', messageData);
    
    // Send to server with comprehensive context
    socket.emit('chat message', messageData);
    
    // Update session statistics
    AppState.currentSession.messagesCount++;
    AppState.currentSession.wordsSpoken += finalTranscript.split(' ').length;
  }
}

// Analyze user speech for comprehensive scoring
function analyzeUserSpeech(text) {
  const words = text.split(' ');
  const wordCount = words.length;
  
  // Update session stats
  AppState.currentSession.interactions.push({
    timestamp: new Date().toISOString(),
    text: text,
    wordCount: wordCount,
    analysis: {
      complexity: calculateComplexity(text),
      vocabularyLevel: assessVocabulary(text),
      grammarScore: estimateGrammar(text),
      fluencyIndicators: assessFluency(text)
    }
  });
  
  // Add words to vocabulary set
  words.forEach(word => {
    if (word.length > 3) {
      AppState.currentSession.vocabularyUsed.add(word.toLowerCase());
    }
  });
  
  console.log('📊 Speech analyzed:', {
    wordCount,
    totalWords: AppState.currentSession.wordsSpoken,
    vocabularyUsed: AppState.currentSession.vocabularyUsed.size
  });
}

// Calculate text complexity
function calculateComplexity(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(' ');
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
  const longWords = words.filter(word => word.length > 6).length;
  
  return {
    avgWordsPerSentence,
    longWordRatio: longWords / words.length,
    sentenceCount: sentences.length,
    complexity: Math.min(100, (avgWordsPerSentence * 2) + (longWords * 5))
  };
}

// Assess vocabulary level
function assessVocabulary(text) {
  const words = text.toLowerCase().split(' ');
  const uniqueWords = new Set(words);
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const advancedWords = words.filter(word => word.length > 6 && !commonWords.includes(word));
  
  return {
    uniqueWordRatio: uniqueWords.size / words.length,
    advancedWordCount: advancedWords.length,
    vocabularyRichness: Math.min(100, (uniqueWords.size * 10) + (advancedWords.length * 15))
  };
}

// Estimate grammar quality
function estimateGrammar(text) {
  // Basic grammar indicators
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const hasProperCapitalization = /^[A-Z]/.test(text.trim());
  const hasProperPunctuation = /[.!?]$/.test(text.trim());
  const hasVariedSentenceStructure = sentences.some(s => s.includes(','));
  
  let score = 50; // Base score
  if (hasProperCapitalization) score += 15;
  if (hasProperPunctuation) score += 15;
  if (hasVariedSentenceStructure) score += 20;
  
  return Math.min(100, score);
}

// Assess fluency indicators
function assessFluency(text) {
  const fillerWords = ['um', 'uh', 'like', 'you know', 'actually', 'basically'];
  const words = text.toLowerCase().split(' ');
  const fillerCount = words.filter(word => fillerWords.includes(word)).length;
  const fluencyScore = Math.max(0, 100 - (fillerCount * 10));
  
  return {
    fillerWordCount: fillerCount,
    fluencyScore,
    wordFlow: words.length > 10 ? 'good' : 'short'
  };
}

// Enhanced recording control with better error handling
function toggleRecording() {
  if (!recognition) {
    showError(t('errSpeechRecogNotAvail'));
    return;
  }
  
  if (AppState.isRecording) {
    try {
      recognition.stop();
      console.log('🛑 Stopping speech recognition...');
    } catch (error) {
      console.error('Error stopping recognition:', error);
      AppState.isRecording = false;
      elements.micBtn.classList.remove('recording');
    }
  } else {
    startRecording();
  }
}

// Enhanced recording start with comprehensive checks
async function startRecording() {
  try {
    console.log('🎤 Attempting to start recording...');
    
    // Check if recognition is available
    if (!recognition) {
      throw new Error('Speech recognition not initialized');
    }
    
    // Check microphone permissions first
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('🔍 Testing microphone access...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      console.log('✅ Microphone access granted');
      
      // Stop the permission test stream
      stream.getTracks().forEach(track => track.stop());
      
      // Update UI to show recording state
      elements.micBtn.classList.add('recording');
      AppState.isRecording = true;
      
      // Start voice visualization
      startVoiceVisualization();
      
      // Start speech recognition
      recognition.start();
      console.log('🎤 Speech recognition started successfully');
      
      // Initialize session if needed
      if (!AppState.currentSession.startTime) {
        AppState.currentSession.startTime = new Date();
        AppState.sessionStartTime = Date.now();
        console.log('📊 Session started');
      }
      
      // Show status feedback
      showToast(t('toastListening'), 'info');
      
    } else {
      throw new Error('Media devices not supported in this browser');
    }
  } catch (error) {
    console.error('❌ Failed to start recording:', error);
    AppState.isRecording = false;
    elements.micBtn.classList.remove('recording');
    handleMicrophoneError(error);
  }
}

// Voice Loading
function loadAvailableVoices() {
  const updateVoices = () => {
    availableVoices = speechSynthesis.getVoices();
    populateVoiceSelect();
  };
  
  updateVoices();
  speechSynthesis.addEventListener('voiceschanged', updateVoices);
}

function populateVoiceSelect() {
  elements.voiceSelect.innerHTML = `<option value="" data-i18n="voiceDefault">${t('voiceDefault')}</option>`;
  
  availableVoices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.name === AppState.settings.selectedVoice) {
      option.selected = true;
    }
    elements.voiceSelect.appendChild(option);
  });
}

// Enhanced Event Listeners Setup
function setupEventListeners() {
  // Microphone button
  if (elements.micBtn) elements.micBtn.addEventListener('click', toggleRecording);
  
  // Control buttons
  if (elements.themeBtn) elements.themeBtn.addEventListener('click', toggleTheme);
  if (elements.langBtn) elements.langBtn.addEventListener('click', toggleUILanguage);
  if (elements.settingsBtn) elements.settingsBtn.addEventListener('click', toggleSettings);
  if (elements.muteBtn) elements.muteBtn.addEventListener('click', toggleMute);
  if (elements.stopBtn) elements.stopBtn.addEventListener('click', stopCurrentSpeech);
  if (elements.closeSettingsBtn) elements.closeSettingsBtn.addEventListener('click', closeSettings);
  if (elements.clearHistoryBtn) elements.clearHistoryBtn.addEventListener('click', clearConversationHistory);
  
  // Settings
  if (elements.uiLanguageSelect) elements.uiLanguageSelect.addEventListener('change', updateUILanguage);
  if (elements.tutorModeSelect) elements.tutorModeSelect.addEventListener('change', updatePersonality);
  if (elements.difficultyLevelSelect) elements.difficultyLevelSelect.addEventListener('change', updateDifficultyLevel);
  if (elements.feedbackStyleSelect) elements.feedbackStyleSelect.addEventListener('change', updateFeedbackStyle);
  if (elements.languageSelect) elements.languageSelect.addEventListener('change', updateLanguage);
  if (elements.voiceSelect) elements.voiceSelect.addEventListener('change', updateSelectedVoice);
  if (elements.sessionLengthSelect) elements.sessionLengthSelect.addEventListener('change', updateSessionLength);
  
  // Learning Mode Cards
  setupModeCardListeners();
  
  // Dashboard Toggle
  setupDashboardToggle();
  
  // Feedback Panel Toggle
  setupFeedbackToggle();
  
  // Socket events
  socket.on('connect', handleSocketConnect);
  socket.on('disconnect', handleSocketDisconnect);
  socket.on('tutor response chunk', handleTutorResponseChunk);
  socket.on('tutor response', handleTutorResponse);
  socket.on('bot reply', handleBotReply); // Keep for backward compatibility
  socket.on('error', handleSocketError);
  
  // Add debugging for all socket events
  socket.onAny((event, ...args) => {
    console.log('🔌 Socket event received:', event, args);
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Click outside settings to close
  document.addEventListener('click', handleOutsideClick);
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Initialize animations
  initializeAnimations();
}

// Setup Mode Card Interactions
function setupModeCardListeners() {
  const modeCards = document.querySelectorAll('.mode-card');
  
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all cards
      modeCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      card.classList.add('active');
      
      // Update learning mode
      const mode = card.getAttribute('data-mode');
      if (mode) {
        AppState.learningMode = mode;
        localStorage.setItem('learningMode', mode);
        
        // Update tutor mode based on learning mode
        updateTutorModeFromLearningMode(mode);
        
        // Show toast notification
        const modeName = card.querySelector('h4').textContent;
        showToast(t('toastSwitchedMode', { mode: modeName }), 'success');
        
        // Add bounce animation
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'bounce 0.6s ease';
        }, 10);
      }
      
      // Handle scenario mode specially
      if (mode === 'scenario') {
        openScenarioModal();
      }
    });
    
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('active')) {
        card.style.transform = '';
      }
    });
  });
}

// Update tutor mode based on learning mode
function updateTutorModeFromLearningMode(learningMode) {
  const modeMapping = {
    'conversation': 'conversation_partner',
    'grammar': 'grammar_tutor',
    'pronunciation': 'pronunciation_coach',
    'vocabulary': 'vocabulary_builder',
    'fluency': 'fluency_coach',
    'scenario': 'conversation_partner'
  };
  
  const tutorMode = modeMapping[learningMode] || 'conversation_partner';
  AppState.tutorMode = tutorMode;
  localStorage.setItem('tutorMode', tutorMode);
  
  // Update the select element if it exists
  if (elements.tutorModeSelect) {
    elements.tutorModeSelect.value = tutorMode;
  }
}

// Setup Dashboard Toggle
function setupDashboardToggle() {
  const toggleBtn = document.getElementById('toggle-dashboard');
  const dashboardContent = document.querySelector('.dashboard-content');
  
  if (toggleBtn && dashboardContent) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = dashboardContent.style.display !== 'none';
      
      if (isOpen) {
        dashboardContent.style.display = 'none';
        toggleBtn.querySelector('i').className = 'fas fa-chevron-down';
        toggleBtn.setAttribute('aria-label', t('ariaExpandDashboard'));
      } else {
        dashboardContent.style.display = 'block';
        toggleBtn.querySelector('i').className = 'fas fa-chevron-up';
        toggleBtn.setAttribute('aria-label', t('ariaCollapseDashboard'));
        
        // Animate progress bars
        animateProgressBars();
      }
      
      // Add rotation animation to button
      toggleBtn.style.transform = 'scale(1.1) rotate(180deg)';
      setTimeout(() => {
        toggleBtn.style.transform = '';
      }, 300);
    });
  }
}

// Setup Feedback Panel Toggle
function setupFeedbackToggle() {
  const toggleBtn = document.getElementById('toggle-feedback');
  const feedbackContent = document.querySelector('.feedback-content');
  
  if (toggleBtn && feedbackContent) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = feedbackContent.style.display !== 'none';
      
      if (isOpen) {
        feedbackContent.style.display = 'none';
        toggleBtn.querySelector('i').className = 'fas fa-chevron-down';
      } else {
        feedbackContent.style.display = 'block';
        toggleBtn.querySelector('i').className = 'fas fa-chevron-up';
      }
      
      // Add rotation animation
      toggleBtn.style.transform = 'scale(1.1) rotate(180deg)';
      setTimeout(() => {
        toggleBtn.style.transform = '';
      }, 300);
    });
  }
}

// Animate Progress Bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  progressBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.transition = 'width 1s ease-out';
      bar.style.width = targetWidth;
    }, index * 200);
  });
}

// Initialize Animations
function initializeAnimations() {
  // Add slide-in animation to cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('slide-in-up');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.mode-card, .progress-card, .stat-item');
  animatedElements.forEach(el => observer.observe(el));
  
  // Initialize progress bar animations
  setTimeout(animateProgressBars, 500);
}

// Scenario Modal Functions
function openScenarioModal() {
  const modal = document.getElementById('scenario-modal');
  if (modal) {
    modal.style.display = 'flex';
    modal.style.animation = 'fadeIn 0.3s ease';
    
    // Setup scenario card listeners
    const scenarioCards = modal.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
      card.addEventListener('click', () => {
        const scenario = card.getAttribute('data-scenario');
        selectScenario(scenario);
        closeScenarioModal();
      });
    });
  }
}

function closeScenarioModal() {
  const modal = document.getElementById('scenario-modal');
  if (modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}

function selectScenario(scenario) {
  AppState.selectedScenario = scenario;
  localStorage.setItem('selectedScenario', scenario);
  
  const scenarioNameKeys = {
    'job-interview': 'scenarioJobTitle',
    'restaurant': 'scenarioRestaurantTitle',
    'travel': 'scenarioTravelTitle',
    'shopping': 'scenarioShoppingTitle',
    'medical': 'scenarioMedicalTitle',
    'social': 'scenarioSocialTitle'
  };
  
  const scenarioName = scenarioNameKeys[scenario] ? t(scenarioNameKeys[scenario]) : scenario;
  showToast(t('toastSelectedScenario', { scenario: scenarioName }), 'success');
  
  // Update the conversation prompt for the scenario
  AppState.scenarioContext = getScenarioContext(scenario);
}

function getScenarioContext(scenario) {
  const contexts = {
    'job-interview': 'You are practicing for a job interview. Ask relevant questions about experience, skills, and career goals.',
    'restaurant': 'You are at a restaurant. Practice ordering food, asking about menu items, and dining conversations.',
    'travel': 'You are traveling. Practice airport, hotel, and tourist interactions.',
    'shopping': 'You are shopping. Practice asking about products, prices, and making purchases.',
    'medical': 'You are at a doctor\'s office. Practice describing symptoms and health concerns.',
    'social': 'You are in a social setting. Practice casual conversations and small talk.'
  };
  
  return contexts[scenario] || 'Practice general conversation.';
}

// Enhanced Progress Display
function updateProgressDisplay() {
  // Update progress scores
  const grammarScore = document.getElementById('grammar-score');
  const pronunciationScore = document.getElementById('pronunciation-score');
  const vocabularyScore = document.getElementById('vocabulary-score');
  const fluencyScore = document.getElementById('fluency-score');
  
  if (grammarScore) grammarScore.textContent = `${AppState.scores.grammar}%`;
  if (pronunciationScore) pronunciationScore.textContent = `${AppState.scores.pronunciation}%`;
  if (vocabularyScore) vocabularyScore.textContent = `${AppState.scores.vocabulary}%`;
  if (fluencyScore) fluencyScore.textContent = `${AppState.scores.fluency}%`;
  
  // Update progress bars
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach((bar, index) => {
    const scores = [AppState.scores.grammar, AppState.scores.pronunciation, AppState.scores.vocabulary, AppState.scores.fluency];
    if (scores[index]) {
      bar.style.width = `${scores[index]}%`;
    }
  });
  
  // Update session timer
  updateSessionTimer();
}

// Session Timer
function updateSessionTimer() {
  if (!AppState.sessionStartTime) {
    AppState.sessionStartTime = Date.now();
  }
  
  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) {
    const elapsed = Date.now() - AppState.sessionStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Enhanced Theme Toggle with Animation
function toggleTheme() {
  const currentTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
  AppState.currentTheme = currentTheme;
  localStorage.setItem('theme', currentTheme);
  
  // Add transition class
  document.body.classList.add('theme-transitioning');
  
  applyTheme(currentTheme);
  
  // Remove transition class after animation
  setTimeout(() => {
    document.body.classList.remove('theme-transitioning');
  }, 300);
  
  // Update theme button icon with animation
  const themeBtn = document.getElementById('theme-btn');
  const icon = themeBtn.querySelector('i');
  
  themeBtn.style.transform = 'scale(0.8) rotate(180deg)';
  
  setTimeout(() => {
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    themeBtn.style.transform = 'scale(1) rotate(0deg)';
  }, 150);
  
  const themeLabel = currentTheme === 'light' ? t('themeLight') : t('themeDark');
  showToast(t('toastSwitchedTheme', { theme: themeLabel }), 'info');
}

// Enhanced Settings Panel with Animations
function toggleSettings() {
  const panel = elements.settingsPanel;
  const isOpen = panel.classList.contains('open');
  
  if (isOpen) {
    closeSettings();
  } else {
    panel.classList.add('open');
    
    // Animate settings groups
    const settingGroups = panel.querySelectorAll('.setting-group');
    settingGroups.forEach((group, index) => {
      group.style.opacity = '0';
      group.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        group.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        group.style.opacity = '1';
        group.style.transform = 'translateX(0)';
      }, index * 100);
    });
  }
}

function closeSettings() {
  elements.settingsPanel.classList.remove('open');
  
  // Reset setting group animations
  const settingGroups = elements.settingsPanel.querySelectorAll('.setting-group');
  settingGroups.forEach(group => {
    group.style.transition = '';
    group.style.opacity = '';
    group.style.transform = '';
  });
}

// Add CSS for smooth theme transitions
const themeTransitionCSS = `
.theme-transitioning * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
}

@keyframes bounce {
  0%, 20%, 60%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  80% { transform: translateY(-5px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = themeTransitionCSS;
document.head.appendChild(styleSheet);

// Initialize active mode on page load
function initializeActiveMode() {
  const savedMode = AppState.learningMode;
  const modeCards = document.querySelectorAll('.mode-card');
  
  modeCards.forEach(card => {
    const cardMode = card.getAttribute('data-mode');
    if (cardMode === savedMode) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// Speech Recognition Handlers
function handleSpeechStart() {
  console.log('🎤 Speech detection started');
  elements.micBtn.classList.add('recording');
  startVoiceVisualization();
}

function handleSpeechEnd() {
  console.log('🔇 Speech detection ended');
  elements.micBtn.classList.remove('recording');
  stopVoiceVisualization();
  AppState.isRecording = false;
}

function handleSpeechError(event) {
  console.error('❌ Speech recognition error:', event.error);
  elements.micBtn.classList.remove('recording');
  stopVoiceVisualization();
  AppState.isRecording = false;
  
  let errorMessage;
  switch (event.error) {
    case 'no-speech':
      errorMessage = t('errNoSpeech');
      break;
    case 'audio-capture':
      errorMessage = t('errAudioCapture');
      break;
    case 'not-allowed':
      errorMessage = t('errNotAllowed');
      break;
    case 'network':
      errorMessage = t('errNetwork');
      break;
    default:
      errorMessage = t('errGenericSpeech', { error: event.error });
  }
  
  showError(errorMessage);
  elements.outputBot.removeAttribute('data-i18n');
  elements.outputBot.textContent = errorMessage;
}

function handleNoMatch() {
  console.log('❓ No speech match found');
  showError(t('errNoMatch'));
}

// Voice Visualization
function startVoiceVisualization() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return;
  }
  
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      elements.voiceVisualizer.classList.add('show');
      drawVisualization();
    })
    .catch(error => {
      console.error('Error accessing microphone for visualization:', error);
    });
}

function stopVoiceVisualization() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  
  elements.voiceVisualizer.classList.remove('show');
}

function drawVisualization() {
  if (!analyser) return;
  
  const canvas = elements.visualizerCanvas;
  const ctx = canvas.getContext('2d');
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  function draw() {
    animationId = requestAnimationFrame(draw);
    
    analyser.getByteFrequencyData(dataArray);
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#39C2C9');
    gradient.addColorStop(1, '#3FC8C9');
    
    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * canvas.height;
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      
      x += barWidth + 1;
    }
  }
  
  draw();
}

// Streaming state for the reply currently being generated
let streamingReply = '';
let isStreaming = false;

// Append each streamed fragment so the reply appears while it is generated
function handleTutorResponseChunk(data) {
  if (!data || typeof data.delta !== 'string') return;

  if (!isStreaming) {
    isStreaming = true;
    streamingReply = '';
    hideLoadingIndicator();
    elements.outputBot.removeAttribute('data-i18n');
    elements.outputBot.classList.add('streaming');
    startStreamingSpeech();
  }

  streamingReply += data.delta;
  elements.outputBot.textContent = streamingReply;
  feedStreamingSpeech(data.delta);
}

function finishStreaming() {
  isStreaming = false;
  streamingReply = '';
  elements.outputBot.classList.remove('streaming');
}

// Enhanced Tutor Response Handling (final message, sent after streaming completes)
function handleTutorResponse(data) {
  console.log('🎓 Enhanced tutor response received:', data);
  
  hideLoadingIndicator();
  const wasStreamed = isStreaming;
  finishStreaming();
  
  if (data.error) {
    // Speak whatever complete text was already shown, then stop
    if (wasStreamed) flushStreamingSpeech();
    showError(data.reply || t('errTutorGeneric'));
    return;
  }
  
  const reply = data.reply;
  const speechAnalysis = data.speechAnalysis;
  const learningFeedback = data.learningFeedback;
  const metadata = data.metadata;
  
  // Update UI with response
  console.log('📝 Setting output bot text to:', reply);
  elements.outputBot.removeAttribute('data-i18n');
  elements.outputBot.textContent = reply;
  
  // Process comprehensive learning analytics
  if (speechAnalysis) {
    console.log('📊 Processing speech analysis:', speechAnalysis);
    updateComprehensiveScores(speechAnalysis);
  }
  
  // Display enhanced learning feedback
  if (learningFeedback) {
    console.log('💡 Displaying enhanced feedback:', learningFeedback);
    displayEnhancedFeedback(learningFeedback);
  }
  
  // Update session metadata
  if (metadata) {
    updateSessionMetadata(metadata);
  }
  
  // Add to conversation history with metadata
  addToConversationHistory('tutor', reply, {
    speechAnalysis,
    learningFeedback,
    timestamp: new Date().toISOString()
  });
  
  // Speak the response: streamed replies are already being spoken sentence by sentence
  if (wasStreamed) {
    flushStreamingSpeech();
  } else if (!AppState.isMuted) {
    console.log('🔊 Speaking enhanced response:', reply.substring(0, 50) + '...');
    speakText(reply);
  }
  
  // Generate session report if this is a significant interaction
  if (AppState.currentSession.messagesCount > 0 && AppState.currentSession.messagesCount % 5 === 0) {
    generateSessionReport();
  }
}

// Bot Response Handling (Backward Compatibility)
function handleBotReply(replyText) {
  console.log('🤖 Bot reply received:', replyText);
  
  // Hide loading indicator
  hideLoadingIndicator();
  
  if (!replyText || replyText.trim() === '') {
    replyText = t('errBotEmpty');
  }
  
  elements.outputBot.removeAttribute('data-i18n');
  elements.outputBot.textContent = replyText;
  
  // Add to conversation history
  addToConversationHistory('bot', replyText);
  
  // Speak the response if not muted
  if (!AppState.isMuted) {
    speakText(replyText);
  }
}

// Text-to-Speech
// Remove tutor format tags and markdown symbols so they are not read aloud
function cleanTextForSpeech(text) {
  return text
    .replace(/\[[A-Z_ ]+\]/g, ' ')   // [FEEDBACK], [EXPLANATION], [EXAMPLE], ...
    .replace(/[*_#`>]+/g, ' ')        // markdown emphasis / headings / code / quotes
    .replace(/\s+/g, ' ')
    .trim();
}

// Utterances being spoken or queued; kept referenced so Chrome does not garbage-collect them
// before onend fires (a known Web Speech API issue)
let pendingUtterances = [];

function createUtterance(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Apply selected voice
  if (AppState.settings.selectedVoice) {
    const selectedVoice = availableVoices.find(voice => 
      voice.name === AppState.settings.selectedVoice
    );
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  }
  
  // Set language based on current setting
  utterance.lang = AppState.settings.language;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  
  const release = () => {
    pendingUtterances = pendingUtterances.filter(u => u !== utterance);
    if (pendingUtterances.length === 0) {
      elements.stopBtn.classList.remove('active');
    }
  };
  
  utterance.onstart = () => {
    elements.stopBtn.classList.add('active');
  };
  
  utterance.onend = release;
  
  utterance.onerror = (error) => {
    // 'interrupted' / 'canceled' are expected when speech is stopped on purpose
    if (error.error !== 'interrupted' && error.error !== 'canceled') {
      console.error('Speech synthesis error:', error);
    }
    release();
  };
  
  return utterance;
}

// Queue one utterance after whatever is already being spoken
function enqueueSpeech(text) {
  const spokenText = cleanTextForSpeech(text);
  if (!spokenText) return;
  const utterance = createUtterance(spokenText);
  pendingUtterances.push(utterance);
  speechSynthesis.speak(utterance);
}

function speakText(text) {
  if (!speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  // Stop any ongoing speech
  stopCurrentSpeech();
  
  enqueueSpeech(text);
}

// ---- Streaming speech: speak each sentence as soon as it is complete ----

// Shorter pieces are merged with the next sentence to avoid choppy speech (e.g. "Mr." or "Great!")
const STREAM_SPEECH_MIN_CHARS = 20;
let streamSpeechBuffer = '';
let streamSpeechActive = false;

function startStreamingSpeech() {
  // A new reply replaces anything still being read from the previous one
  stopCurrentSpeech();
  streamSpeechBuffer = '';
  streamSpeechActive = !!speechSynthesis && !AppState.isMuted;
}

function feedStreamingSpeech(delta) {
  if (!streamSpeechActive) return;
  if (AppState.isMuted) {
    streamSpeechActive = false;
    streamSpeechBuffer = '';
    return;
  }
  
  streamSpeechBuffer += delta;
  
  // A sentence ends with . ! ? (optionally followed by quotes/brackets) plus whitespace, or with a line break
  const boundary = /[.!?]+["')\]]*\s+|\n+/g;
  let lastCut = 0;
  let match;
  while ((match = boundary.exec(streamSpeechBuffer)) !== null) {
    const end = match.index + match[0].length;
    const sentence = streamSpeechBuffer.slice(lastCut, end);
    if (cleanTextForSpeech(sentence).length >= STREAM_SPEECH_MIN_CHARS) {
      enqueueSpeech(sentence);
      lastCut = end;
    }
  }
  streamSpeechBuffer = streamSpeechBuffer.slice(lastCut);
}

// Speak the remaining text (last sentence without trailing whitespace) and end the stream
function flushStreamingSpeech() {
  if (streamSpeechActive && !AppState.isMuted && streamSpeechBuffer.trim()) {
    enqueueSpeech(streamSpeechBuffer);
  }
  streamSpeechBuffer = '';
  streamSpeechActive = false;
}

function stopCurrentSpeech() {
  // Also stop queuing sentences from a reply that is still streaming
  streamSpeechActive = false;
  streamSpeechBuffer = '';
  if (speechSynthesis && (speechSynthesis.speaking || speechSynthesis.pending)) {
    speechSynthesis.cancel();
  }
  pendingUtterances = [];
  elements.stopBtn.classList.remove('active');
}

// Learning Progress Functions
function updateLearningProgress(speechAnalysis) {
  try {
    // Update session stats
    AppState.currentSession.messagesCount++;
    AppState.currentSession.wordsSpoken += speechAnalysis.wordCount || 0;
    
    // Update grammar score based on issues found
    if (speechAnalysis.grammarIssues && speechAnalysis.grammarIssues.length > 0) {
      AppState.currentSession.grammarErrors += speechAnalysis.grammarIssues.length;
      // Slightly decrease grammar score if issues found
      AppState.scores.grammar = Math.max(50, AppState.scores.grammar - 1);
    } else if (speechAnalysis.wordCount > 5) {
      // Improve grammar score for longer error-free sentences
      AppState.scores.grammar = Math.min(100, AppState.scores.grammar + 0.5);
    }
    
    // Update fluency score
    if (speechAnalysis.fluencyScore) {
      AppState.scores.fluency = Math.round((AppState.scores.fluency + speechAnalysis.fluencyScore) / 2);
    }
    
    // Update vocabulary tracking
    if (speechAnalysis.vocabularyLevel) {
      const levelScores = { 'beginner': 70, 'intermediate': 85, 'advanced': 95 };
      const targetScore = levelScores[speechAnalysis.vocabularyLevel] || 80;
      AppState.scores.vocabulary = Math.round((AppState.scores.vocabulary + targetScore) / 2);
    }
    
    // Save progress to localStorage
    localStorage.setItem('grammarScore', AppState.scores.grammar);
    localStorage.setItem('pronunciationScore', AppState.scores.pronunciation);
    localStorage.setItem('vocabularyScore', AppState.scores.vocabulary);
    localStorage.setItem('fluencyScore', AppState.scores.fluency);
    
    // Update progress display
    updateProgressDisplay();
    
  } catch (error) {
    console.error('Error updating learning progress:', error);
  }
}

function displayLearningFeedback(learningFeedback) {
  try {
    // This function can be enhanced to show specific feedback in the UI
    // For now, we'll log it and could add UI elements later
    console.log('Learning feedback:', learningFeedback);
    
    // Could add visual feedback indicators here
    if (learningFeedback.grammar && learningFeedback.grammar.length > 0) {
      console.log('Grammar feedback available');
    }
    
    if (learningFeedback.pronunciation && learningFeedback.pronunciation.length > 0) {
      console.log('Pronunciation feedback available');
    }
    
    if (learningFeedback.vocabulary && learningFeedback.vocabulary.length > 0) {
      console.log('Vocabulary feedback available');
    }
    
  } catch (error) {
    console.error('Error displaying learning feedback:', error);
  }
}

// Conversation History Management
function addToConversationHistory(sender, message, metadata = {}) {
  const timestamp = new Date().toISOString();
  const historyItem = {
    id: Date.now(),
    sender,
    message,
    metadata,
    timestamp
  };
  
  AppState.conversationHistory.unshift(historyItem);
  
  // Limit history size
  if (AppState.conversationHistory.length > CONFIG.maxHistoryItems) {
    AppState.conversationHistory = AppState.conversationHistory.slice(0, CONFIG.maxHistoryItems);
  }
  
  // Save to localStorage
  localStorage.setItem('conversationHistory', JSON.stringify(AppState.conversationHistory));
  
  // Update UI
  updateConversationHistoryUI();
}

function loadConversationHistory() {
  updateConversationHistoryUI();
}

function updateConversationHistoryUI() {
  const historyContainer = elements.chatHistory;
  
  // Clear existing history (except welcome message)
  const welcomeMessage = historyContainer.querySelector('.welcome-message');
  historyContainer.innerHTML = '';
  if (welcomeMessage) {
    historyContainer.appendChild(welcomeMessage);
  }
  
  // Add conversation items
  AppState.conversationHistory.forEach(item => {
    const messageElement = createMessageElement(item);
    historyContainer.appendChild(messageElement);
  });
  
  // Scroll to bottom
  historyContainer.scrollTop = historyContainer.scrollHeight;
}

function createMessageElement(item) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${item.sender}-message`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.innerHTML = item.sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
  
  const content = document.createElement('div');
  content.className = 'message-content';
  content.innerHTML = `<p>${item.message}</p>`;
  
  const time = document.createElement('div');
  time.className = 'message-time';
  time.textContent = formatTimestamp(item.timestamp);
  
  content.appendChild(time);
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  
  return messageDiv;
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function clearConversationHistory() {
  if (confirm(t('confirmClearHistory'))) {
    AppState.conversationHistory = [];
    localStorage.removeItem('conversationHistory');
    updateConversationHistoryUI();
    showToast(t('toastHistoryCleared'), 'success');
  }
}

// Theme Management
function applyTheme(theme) {
  AppState.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update theme button icon
  const icon = elements.themeBtn.querySelector('i');
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Settings Management
function applySettings() {
  // Apply settings to form elements safely
  if (elements.uiLanguageSelect) {
    elements.uiLanguageSelect.value = AppState.uiLanguage;
  }

  if (elements.tutorModeSelect) {
    elements.tutorModeSelect.value = AppState.tutorMode;
  }
  
  if (elements.difficultyLevelSelect) {
    elements.difficultyLevelSelect.value = AppState.difficultyLevel;
  }
  
  if (elements.feedbackStyleSelect) {
    elements.feedbackStyleSelect.value = AppState.feedbackStyle;
  }
  
  if (elements.languageSelect) {
    elements.languageSelect.value = AppState.settings.language;
  }
  
  if (elements.voiceSelect) {
    elements.voiceSelect.value = AppState.settings.selectedVoice;
  }
  
  if (elements.sessionLengthSelect) {
    elements.sessionLengthSelect.value = AppState.sessionLength;
  }
}

function updateAIModel() {
  // Note: AI model selection not implemented in current UI
  // AppState.settings.aiModel = elements.aiModelSelect.value;
  // localStorage.setItem('aiModel', AppState.settings.aiModel);
  // showToast(`AI Model changed to ${AppState.settings.aiModel}`, 'success');
  console.log('AI Model selection not available in current UI');
}

function updateLanguage() {
  AppState.settings.language = elements.languageSelect.value;
  localStorage.setItem('language', AppState.settings.language);
  
  if (recognition) {
    recognition.lang = AppState.settings.language;
  }
  
  showToast(t('toastRecogLangChanged', { lang: AppState.settings.language }), 'success');
}

function updatePersonality() {
  if (elements.tutorModeSelect) {
    AppState.tutorMode = elements.tutorModeSelect.value;
    localStorage.setItem('tutorMode', AppState.tutorMode);
    const selectedText = elements.tutorModeSelect.options[elements.tutorModeSelect.selectedIndex]?.textContent || AppState.tutorMode.replace('_', ' ');
    showToast(t('toastTutorModeChanged', { mode: selectedText }), 'success');
  }
}

function updateSelectedVoice() {
  AppState.settings.selectedVoice = elements.voiceSelect.value;
  localStorage.setItem('selectedVoice', AppState.settings.selectedVoice);
  showToast(t('toastVoiceUpdated'), 'success');
}

// Audio Controls
function toggleMute() {
  AppState.isMuted = !AppState.isMuted;
  elements.muteBtn.classList.toggle('active', AppState.isMuted);
  
  const icon = elements.muteBtn.querySelector('i');
  icon.className = AppState.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
  
  if (AppState.isMuted) {
    stopCurrentSpeech();
    showToast(t('toastMuted'), 'info');
  } else {
    showToast(t('toastUnmuted'), 'info');
  }
}

// Socket Event Handlers
function handleSocketConnect() {
  console.log('✅ Connected to server');
  elements.connectionStatus.className = 'status-dot connected';
  elements.statusText.setAttribute('data-i18n', 'statusConnected');
  elements.statusText.textContent = t('statusConnected');
}

function handleSocketDisconnect() {
  console.log('❌ Disconnected from server');
  elements.connectionStatus.className = 'status-dot disconnected';
  elements.statusText.setAttribute('data-i18n', 'statusDisconnected');
  elements.statusText.textContent = t('statusDisconnected');
  hideLoadingIndicator();
}

function handleSocketError(error) {
  console.error('Socket error:', error);
  showError(t('errSocketConnection'));
  hideLoadingIndicator();
}

// UI State Management
let loadingTimeout = null;

function showLoadingIndicator() {
  elements.loadingIndicator.classList.add('show');
  
  // Clear any existing timeout
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
  }
  
  // Auto-hide if no response starts in time, to prevent getting stuck
  loadingTimeout = setTimeout(() => {
    console.log('⏰ Loading indicator timeout - hiding automatically');
    hideLoadingIndicator();
    showError(t('errTimeout'));
  }, CONFIG.responseTimeout);
}

function hideLoadingIndicator() {
  elements.loadingIndicator.classList.remove('show');
  
  // Clear the timeout
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
    loadingTimeout = null;
  }
}

// Error Handling and Notifications
function showError(message) {
  showToast(message, 'error');
}

function showToast(message, type = 'info') {
  elements.toastMessage.textContent = message;
  elements.errorToast.className = `toast ${type}`;
  elements.errorToast.classList.add('show');
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  elements.errorToast.classList.remove('show');
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(event) {
  // Space bar to toggle recording (when not in input)
  if (event.code === 'Space' && !event.target.matches('input, textarea, select')) {
    event.preventDefault();
    toggleRecording();
  }
  
  // Escape to close settings
  if (event.code === 'Escape') {
    closeSettings();
    hideToast();
  }
  
  // Ctrl/Cmd + M to toggle mute
  if ((event.ctrlKey || event.metaKey) && event.code === 'KeyM') {
    event.preventDefault();
    toggleMute();
  }
  
  // Ctrl/Cmd + T to toggle theme
  if ((event.ctrlKey || event.metaKey) && event.code === 'KeyT') {
    event.preventDefault();
    toggleTheme();
  }
}

// Click Outside Handler
function handleOutsideClick(event) {
  if (!elements.settingsPanel.contains(event.target) && 
      !elements.settingsBtn.contains(event.target)) {
    closeSettings();
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  showError(t('errUnexpected'));
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export for global access
window.VoiceGPT = {
  toggleRecording,
  toggleTheme,
  toggleUILanguage,
  applyUILanguage,
  clearHistory: clearConversationHistory,
  hideToast
};

function updateDifficultyLevel() {
  if (elements.difficultyLevelSelect) {
    AppState.difficultyLevel = elements.difficultyLevelSelect.value;
    localStorage.setItem('difficultyLevel', AppState.difficultyLevel);
    const selectedText = elements.difficultyLevelSelect.options[elements.difficultyLevelSelect.selectedIndex]?.textContent || AppState.difficultyLevel;
    showToast(t('toastDifficultyChanged', { level: selectedText }), 'success');
  }
}

function updateFeedbackStyle() {
  if (elements.feedbackStyleSelect) {
    AppState.feedbackStyle = elements.feedbackStyleSelect.value;
    localStorage.setItem('feedbackStyle', AppState.feedbackStyle);
    const selectedText = elements.feedbackStyleSelect.options[elements.feedbackStyleSelect.selectedIndex]?.textContent || AppState.feedbackStyle;
    showToast(t('toastFeedbackStyleChanged', { style: selectedText }), 'success');
  }
}

function updateSessionLength() {
  if (elements.sessionLengthSelect) {
    AppState.sessionLength = elements.sessionLengthSelect.value;
    localStorage.setItem('sessionLength', AppState.sessionLength);
    const selectedText = elements.sessionLengthSelect.options[elements.sessionLengthSelect.selectedIndex]?.textContent || AppState.sessionLength;
    showToast(t('toastSessionLengthChanged', { length: selectedText }), 'success');
  }
}

// Update comprehensive scoring system
function updateComprehensiveScores(speechAnalysis) {
  if (!speechAnalysis) return;
  
  const {
    grammarScore = 0,
    pronunciationScore = 0,
    vocabularyScore = 0,
    fluencyScore = 0,
    overallScore = 0
  } = speechAnalysis;
  
  // Apply weighted updates (new score influences 30%, existing 70%)
  const updateWeight = 0.3;
  
  AppState.scores.grammar = Math.round(
    (AppState.scores.grammar * (1 - updateWeight)) + (grammarScore * updateWeight)
  );
  AppState.scores.pronunciation = Math.round(
    (AppState.scores.pronunciation * (1 - updateWeight)) + (pronunciationScore * updateWeight)
  );
  AppState.scores.vocabulary = Math.round(
    (AppState.scores.vocabulary * (1 - updateWeight)) + (vocabularyScore * updateWeight)
  );
  AppState.scores.fluency = Math.round(
    (AppState.scores.fluency * (1 - updateWeight)) + (fluencyScore * updateWeight)
  );
  
  // Calculate overall score
  AppState.scores.overall = Math.round(
    (AppState.scores.grammar + AppState.scores.pronunciation + 
     AppState.scores.vocabulary + AppState.scores.fluency) / 4
  );
  
  // Save to localStorage
  localStorage.setItem('grammarScore', AppState.scores.grammar);
  localStorage.setItem('pronunciationScore', AppState.scores.pronunciation);
  localStorage.setItem('vocabularyScore', AppState.scores.vocabulary);
  localStorage.setItem('fluencyScore', AppState.scores.fluency);
  localStorage.setItem('overallScore', AppState.scores.overall);
  
  // Update UI
  updateProgressDisplay();
  
  console.log('📈 Scores updated:', AppState.scores);
}

// Display enhanced learning feedback
function displayEnhancedFeedback(learningFeedback) {
  const feedbackContainer = document.getElementById('feedback-content');
  if (!feedbackContainer || !learningFeedback) return;
  
  const {
    grammarFeedback = '',
    pronunciationFeedback = '',
    vocabularyFeedback = '',
    fluencyFeedback = '',
    overallFeedback = '',
    suggestions = []
  } = learningFeedback;
  
  const feedbackHtml = `
    <div class="feedback-section">
      <h4 data-i18n="fbSectionTitle">${t('fbSectionTitle')}</h4>
      
      ${grammarFeedback ? `
        <div class="feedback-item grammar">
          <h5><i class="fas fa-grammar"></i> <span data-i18n="fbHeaderGrammar">${t('fbHeaderGrammar')}</span></h5>
          <p>${grammarFeedback}</p>
        </div>
      ` : ''}
      
      ${pronunciationFeedback ? `
        <div class="feedback-item pronunciation">
          <h5><i class="fas fa-microphone"></i> <span data-i18n="fbHeaderPronunciation">${t('fbHeaderPronunciation')}</span></h5>
          <p>${pronunciationFeedback}</p>
        </div>
      ` : ''}
      
      ${vocabularyFeedback ? `
        <div class="feedback-item vocabulary">
          <h5><i class="fas fa-book"></i> <span data-i18n="fbHeaderVocabulary">${t('fbHeaderVocabulary')}</span></h5>
          <p>${vocabularyFeedback}</p>
        </div>
      ` : ''}
      
      ${fluencyFeedback ? `
        <div class="feedback-item fluency">
          <h5><i class="fas fa-comments"></i> <span data-i18n="fbHeaderFluency">${t('fbHeaderFluency')}</span></h5>
          <p>${fluencyFeedback}</p>
        </div>
      ` : ''}
      
      ${overallFeedback ? `
        <div class="feedback-item overall">
          <h5><i class="fas fa-star"></i> <span data-i18n="fbHeaderOverall">${t('fbHeaderOverall')}</span></h5>
          <p>${overallFeedback}</p>
        </div>
      ` : ''}
      
      ${suggestions.length > 0 ? `
        <div class="feedback-item suggestions">
          <h5><i class="fas fa-lightbulb"></i> <span data-i18n="fbHeaderSuggestions">${t('fbHeaderSuggestions')}</span></h5>
          <ul>
            ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
  
  feedbackContainer.innerHTML = feedbackHtml;
  
  // Show feedback panel if hidden
  const feedbackPanel = document.getElementById('feedback-panel');
  if (feedbackPanel) {
    feedbackPanel.style.display = 'block';
  }
}

// Update session metadata
function updateSessionMetadata(metadata) {
  if (!metadata) return;
  
  const {
    sessionDuration = 0,
    wordsPerMinute = 0,
    confidenceLevel = 0,
    interactionQuality = 'good'
  } = metadata;
  
  // Update session stats
  AppState.sessionDuration = sessionDuration;
  
  // Update analytics
  AppState.analytics.totalMinutes += Math.round(sessionDuration / 60000);
  localStorage.setItem('totalMinutes', AppState.analytics.totalMinutes);
  
  console.log('📊 Session metadata updated:', metadata);
}

// Generate session report
function generateSessionReport() {
  const sessionDuration = Date.now() - AppState.sessionStartTime;
  const wordsSpoken = AppState.currentSession.wordsSpoken;
  const messagesCount = AppState.currentSession.messagesCount;
  const vocabularyUsed = AppState.currentSession.vocabularyUsed.size;
  
  const report = {
    duration: sessionDuration,
    wordsSpoken,
    messagesCount,
    vocabularyUsed,
    averageWordsPerMessage: Math.round(wordsSpoken / Math.max(messagesCount, 1)),
    wordsPerMinute: Math.round((wordsSpoken / (sessionDuration / 60000)) || 0),
    scores: { ...AppState.scores }
  };
  
  console.log('📋 Session Report:', report);
  
  // Show session summary toast
  showToast(t('toastSessionReport', { messages: messagesCount, words: wordsSpoken, unique: vocabularyUsed }), 'info');
  
  return report;
}

// Comprehensive microphone diagnostic
async function runMicrophoneDiagnostic() {
  console.log('🔧 Running comprehensive microphone diagnostic...');
  
  const diagnostics = {
    browserSupport: false,
    mediaDevicesAPI: false,
    speechRecognition: false,
    microphoneAccess: false,
    audioContext: false,
    permissions: 'unknown',
    errors: []
  };
  
  try {
    // Check browser support
    diagnostics.browserSupport = !!(window.navigator && window.navigator.userAgent);
    
    // Check MediaDevices API
    diagnostics.mediaDevicesAPI = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    
    // Check Speech Recognition
    diagnostics.speechRecognition = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    
    // Check AudioContext
    diagnostics.audioContext = !!(window.AudioContext || window.webkitAudioContext);
    
    // Test microphone access
    if (diagnostics.mediaDevicesAPI) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        diagnostics.microphoneAccess = true;
        diagnostics.permissions = 'granted';
        
        // Test audio levels
        if (diagnostics.audioContext) {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          analyser.fftSize = 256;
          microphone.connect(analyser);
          
          // Clean up
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
        }
        
        stream.getTracks().forEach(track => track.stop());
        
      } catch (error) {
        diagnostics.permissions = error.name;
        diagnostics.errors.push(`Microphone access: ${error.message}`);
      }
    }
    
  } catch (error) {
    diagnostics.errors.push(`Diagnostic error: ${error.message}`);
  }
  
  console.log('🔧 Microphone Diagnostic Results:', diagnostics);
  
  // Show diagnostic results
  showMicrophoneDiagnosticResults(diagnostics);
  
  return diagnostics;
}

// Show microphone diagnostic results
function showMicrophoneDiagnosticResults(diagnostics) {
  const issues = [];
  const fixes = [];
  
  if (!diagnostics.browserSupport) {
    issues.push(t('compatIssueHeader'));
    fixes.push(t('compatIssueFooter'));
  }
  
  if (!diagnostics.mediaDevicesAPI) {
    issues.push(t('compatMediaDevices'));
    fixes.push(t('errMicUnknownSug2'));
  }
  
  if (!diagnostics.speechRecognition) {
    issues.push(t('compatSpeechRecog'));
    fixes.push(t('compatIssueFooter'));
  }
  
  if (!diagnostics.microphoneAccess) {
    issues.push(t('errMicDenied'));
    fixes.push(t('errMicUnknownSug1'));
  }
  
  if (diagnostics.permissions === 'NotAllowedError') {
    fixes.push(t('errMicDeniedSug1'));
  }
  
  if (diagnostics.permissions === 'NotFoundError') {
    fixes.push(t('errMicNotFoundSug1'));
  }
  
  const resultHtml = `
    <div class="diagnostic-results">
      <h4>${t('diagTitle')}</h4>
      
      <div class="diagnostic-status">
        <p><span class="${diagnostics.browserSupport ? 'success' : 'error'}">●</span> ${t('diagBrowserSupport')}: ${diagnostics.browserSupport ? t('diagOk') : t('diagFailed')}</p>
        <p><span class="${diagnostics.mediaDevicesAPI ? 'success' : 'error'}">●</span> ${t('diagMediaDevices')}: ${diagnostics.mediaDevicesAPI ? t('diagOk') : t('diagFailed')}</p>
        <p><span class="${diagnostics.speechRecognition ? 'success' : 'error'}">●</span> ${t('diagSpeechRecog')}: ${diagnostics.speechRecognition ? t('diagOk') : t('diagFailed')}</p>
        <p><span class="${diagnostics.microphoneAccess ? 'success' : 'error'}">●</span> ${t('diagMicAccess')}: ${diagnostics.microphoneAccess ? t('diagOk') : t('diagFailed')}</p>
        <p><span class="${diagnostics.audioContext ? 'success' : 'error'}">●</span> ${t('diagAudioContext')}: ${diagnostics.audioContext ? t('diagOk') : t('diagFailed')}</p>
        <p><span class="info">●</span> ${t('diagPermissions')}: ${diagnostics.permissions}</p>
      </div>
      
      ${issues.length > 0 ? `
        <div class="diagnostic-issues">
          <h5>${t('diagIssuesTitle')}</h5>
          <ul>
            ${issues.map(issue => `<li>❌ ${issue}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${fixes.length > 0 ? `
        <div class="diagnostic-fixes">
          <h5>${t('diagFixesTitle')}</h5>
          <ul>
            ${fixes.map(fix => `<li>💡 ${fix}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${diagnostics.errors.length > 0 ? `
        <div class="diagnostic-errors">
          <h5>${t('diagErrorsTitle')}</h5>
          <ul>
            ${diagnostics.errors.map(error => `<li>⚠️ ${error}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
  
  showToast(resultHtml, 'info');
}

// Auto-run diagnostic on microphone issues
function autoFixMicrophoneIssues() {
  console.log('🔧 Auto-fixing microphone issues...');
  
  // Reinitialize speech recognition
  if (!recognition && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
    initializeSpeechRecognition();
  }
  
  // Test microphone access again
  testMicrophoneAccess();
  
  // Update UI state
  if (elements.micBtn) {
    elements.micBtn.disabled = false;
    elements.micBtn.style.opacity = '1';
  }
}

// Add diagnostic button to help users
function addMicrophoneDiagnosticButton() {
  const diagnosticBtn = document.createElement('button');
  diagnosticBtn.id = 'diagnostic-btn';
  diagnosticBtn.className = 'diagnostic-btn';
  diagnosticBtn.innerHTML = `<i class="fas fa-stethoscope"></i> <span data-i18n="diagBtnText">${t('diagBtnText')}</span>`;
  diagnosticBtn.onclick = runMicrophoneDiagnostic;
  
  // Add to controls area
  const controlsArea = document.querySelector('.controls');
  if (controlsArea && !document.getElementById('diagnostic-btn')) {
    controlsArea.appendChild(diagnosticBtn);
  }
}

// Initialize diagnostic features
function initializeDiagnostics() {
  addMicrophoneDiagnosticButton();
  
  // Auto-run diagnostic if microphone issues detected
  setTimeout(() => {
    if (!recognition || elements.micBtn.disabled) {
      console.log('🔧 Microphone issues detected, running auto-diagnostic...');
      runMicrophoneDiagnostic();
    }
  }, 2000);
}
