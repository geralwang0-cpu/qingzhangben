'use strict';

const STORAGE_KEY = 'qingzhangben_v1';
const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const PAYMENTS = ['微信', '支付宝', '京东', '抖音', '淘宝', '现金', '银行卡', '信用卡'];
const CHART_COLORS = ['#0f9d78', '#3b82f6', '#f0a21b', '#7c5cff', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#ef4444', '#0ea5e9', '#84cc16', '#a855f7'];
const MERCHANT_BRANDS = ['麦当劳', '肯德基', '星巴克', '瑞幸', '蜜雪冰城', '茶百道', '霸王茶姬', '沪上阿姨', '一点点', '书亦烧仙草', '古茗', '喜茶', '奈雪', '海底捞', '外婆家', '西贝', '太二酸菜鱼', '太二', '绿茶', '费大厨', '老乡鸡', '大米先生', '永和大王', '真功夫', '味千拉面', '萨莉亚', '必胜客', '达美乐', '汉堡王', '塔斯汀', '华莱士', '兰州拉面', '沙县小吃', '美团', '饿了么', '京东', '淘宝', '天猫', '拼多多', '滴滴', '高德', '12306', '山姆', '盒马', '永辉', '大润发', '优衣库', '名创优品', '屈臣氏', '宜家', '全家', '罗森'];

const PET_ALIASES = ['宠物', '宠物粮', '宠物零食', '宠物用品', '宠物玩具', '宠物衣服', '宠物医院', '宠物疫苗', '宠物洗澡', '宠物美容', '宠物寄养', '猫咪', '猫粮', '猫砂', '猫砂盆', '猫罐头', '猫零食', '猫抓板', '逗猫棒', '猫玩具', '猫窝', '猫包', '猫爬架', '猫疫苗', '猫驱虫', '狗狗', '狗粮', '狗罐头', '狗零食', '狗玩具', '狗窝', '狗绳', '牵引绳', '遛狗', '狗衣服', '狗疫苗', '狗驱虫', '仓鼠', '仓鼠粮', '兔粮', '鸟粮', '鱼粮', '龟粮', '龙猫', '荷兰猪'];

const EXPENSE_CATEGORIES = [
  { id: 'food', name: '餐饮', color: '#ff6f91', icon: 'cute-food', aliases: ['早餐', '早饭', '午餐', '午饭', '晚餐', '晚饭', '早点', '宵夜', '夜宵', '吃饭', '外卖', '咖啡', '奶茶', '水果', '零食', '火锅', '烧烤', '餐厅', '饭店', '面馆', '肯德基', '麦当劳', '汉堡', '小吃', '食堂', '米线', '面条', '啤酒', '烟酒', '下午茶', '饺子', '寿司', '披萨', '烤串', '麻辣烫', '甜品', '蛋糕', '面包', '盒饭', '便当', '盖浇饭', '快餐', '简餐', '拌饭', '炒饭'] },
  { id: 'transport', name: '交通', color: '#4cc3d9', icon: 'cute-bus', aliases: ['地铁', '公交', '打车', '滴滴', '出租车', '加油', '停车', '高铁', '火车', '机票', '飞机', '单车', '共享单车', '过路费', '车票', '公交卡', '充电', '网约车', '顺风车', 'etc'] },
  { id: 'clothing', name: '服饰', color: '#ff8fc8', icon: 'cute-bag', aliases: ['衣服', '裤子', '裙子', '衬衫', 'T恤', '外套', '卫衣', '毛衣', '鞋', '靴子', '袜子', '包包', '配饰', '首饰', '帽子', '皮带', '汉服', '西装', '睡衣'] },
  { id: 'shopping', name: '购物', color: '#9b7bf5', icon: 'cute-bag', aliases: ['超市', '便利店', '淘宝', '京东', '拼多多', '化妆品', '日用品', '百货', '商场', '优衣库', '文具', '数码', '手机壳', '家电', '买菜', '耳机', '手机', '电脑', '平板', '充电器', '键盘', '鼠标', '电器', '玩具', '洗衣液', '纸巾', '牙膏', '洗发水'] },
  { id: 'pet', name: '宠物', color: '#f97316', icon: 'cute-paw', aliases: PET_ALIASES },
  { id: 'housing', name: '居住', color: '#ffb454', icon: 'cute-home', aliases: ['房租', '水电', '电费', '水费', '燃气', '物业', '宽带', '维修', '家具', '房贷', '中介费', '燃气费', '取暖费', '网费'] },
  { id: 'entertainment', name: '娱乐', color: '#ff8fc8', icon: 'cute-film', aliases: ['电影', '游戏', 'KTV', '唱歌', '演出', '门票', '会员', '视频', '音乐', '旅游', '酒店', '景点', '健身', '演唱会', 'K歌', '酒吧', '桌游', '剧本杀', '盲盒', '游戏充值'] },
  { id: 'medical', name: '医疗', color: '#ff6b6b', icon: 'cute-pill', aliases: ['医院', '药', '挂号', '看病', '体检', '牙', '诊所', '疫苗', '感冒药', '牙医', '挂水', '检查'] },
  { id: 'education', name: '教育', color: '#4cc9a8', icon: 'cute-book', aliases: ['书', '课程', '培训', '考试', '学费', '网课', '报名', '教材', '考证', '证书'] },
  { id: 'communication', name: '通讯', color: '#6ea8ff', icon: 'cute-phone', aliases: ['话费', '流量', '手机费', '宽带费', '套餐'] },
  { id: 'social', name: '人情', color: '#ff9f5a', icon: 'cute-gift', aliases: ['红包', '礼物', '请客', '份子', '随礼', '结婚', '生日', '人情'] },
  { id: 'other', name: '其他', color: '#b8a5b5', icon: 'cute-more', aliases: [] }
];

const INCOME_CATEGORIES = [
  { id: 'salary', name: '工资', color: '#58c08e', icon: 'cute-brief', aliases: ['工资', '薪水', '工资到账', '工资条', '发薪'] },
  { id: 'bonus', name: '奖金', color: '#ffc24d', icon: 'cute-star', aliases: ['奖金', '年终奖', '绩效'] },
  { id: 'invest', name: '理财', color: '#56b7d9', icon: 'cute-trend', aliases: ['利息', '理财', '基金', '股票', '分红', '收益'] },
  { id: 'parttime', name: '兼职', color: '#9b8cf5', icon: 'cute-clock', aliases: ['兼职', '外快', '副业', '稿费'] },
  { id: 'redpacket', name: '红包', color: '#ff7d7d', icon: 'cute-gift', aliases: ['红包', '收红包'] },
  { id: 'reimburse', name: '报销', color: '#4fc9b2', icon: 'cute-receipt', aliases: ['报销', '退款', '返现', '转账收入', '收款'] },
  { id: 'income_other', name: '其他', color: '#b8a5b5', icon: 'cute-more', aliases: ['收入', '收款'] }
];

function myCategorySeed() {
  return [
    { id: 'groceries', name: '买菜', type: 'expense', color: '#4cc9a8', icon: 'cute-bag', custom: true, aliases: ['买菜', '菜市场', '蔬菜', '青菜', '白菜', '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼肉', '虾', '豆腐', '葱', '姜', '蒜', '排骨', '生鲜', '调味料', '调料', '生抽', '酱油', '蚝油', '醋', '盐', '糖', '食用油', '鸡精', '味精', '佐料', '米', '面粉'] },
    { id: 'fruit', name: '水果', type: 'expense', color: '#ffb454', icon: 'cute-food', custom: true, aliases: ['水果', '苹果', '香蕉', '橘子', '橙子', '西瓜', '葡萄', '草莓', '蓝莓', '梨', '桃', '芒果', '车厘子'] },
    { id: 'food', name: '餐饮', type: 'expense', color: '#ff6f91', icon: 'cute-food', custom: true, aliases: ['早餐', '早饭', '午餐', '午饭', '晚餐', '晚饭', '早点', '宵夜', '夜宵', '吃饭', '下馆子', '堂食', '外卖', '餐厅', '饭店', '湘菜', '川菜', '粤菜', '火锅', '烧烤', '肯德基', '麦当劳', '蜜雪冰城', '茶百道', '霸王茶姬', '沪上阿姨', '喜茶', '奈雪', '一点点', '书亦烧仙草', '古茗', '瑞幸', '星巴克', '海底捞', '外婆家', '西贝', '太二酸菜鱼', '太二', '绿茶', '费大厨', '老乡鸡', '大米先生', '永和大王', '真功夫', '味千拉面', '萨莉亚', '必胜客', '达美乐', '汉堡王', '塔斯汀', '华莱士', '兰州拉面', '沙县小吃', '咖啡', '奶茶', '汉堡', '小吃', '食堂', '米线', '面条', '啤酒', '烟酒', '下午茶', '饺子', '寿司', '披萨', '烤串', '麻辣烫', '甜品', '蛋糕', '面包', '盒饭', '便当', '盖浇饭', '快餐', '简餐', '拌饭', '炒饭'] },
    { id: 'transport', name: '交通', type: 'expense', color: '#4cc3d9', icon: 'cute-bus', custom: true, aliases: ['地铁', '公交', '打车', '滴滴', '出租车', '加油', '停车', '高铁', '火车', '机票', '飞机', '单车', '共享单车', '过路费', '车票', '公交卡', '充电', '网约车', '顺风车', 'etc'] },
    { id: 'clothing', name: '服饰', type: 'expense', color: '#ff8fc8', icon: 'cute-bag', custom: true, aliases: ['衣服', '裤子', '裙子', '衬衫', 'T恤', '外套', '卫衣', '毛衣', '鞋', '靴子', '袜子', '包包', '配饰', '首饰', '帽子', '皮带', '汉服', '西装', '睡衣'] },
    { id: 'snacks', name: '零食', type: 'expense', color: '#ff9f5a', icon: 'cute-food', custom: true, aliases: ['零食', '薯片', '辣条', '饼干', '糖果', '巧克力', '冰淇淋', '蛋糕', '面包', '坚果', '瓜子', '饮料', '酸奶'] },
    { id: 'daily', name: '日用', type: 'expense', color: '#6ea8ff', icon: 'cute-bag', custom: true, aliases: ['日用', '日用品', '纸巾', '抽纸', '卫生纸', '洗衣液', '洗衣粉', '牙膏', '牙刷', '洗发水', '沐浴露', '洗手液', '洗洁精', '垃圾袋', '毛巾', '肥皂', '衣架', '电池', '清洁', '消毒液', '湿巾'] },
    { id: 'pet', name: '宠物', type: 'expense', color: '#f97316', icon: 'cute-paw', custom: true, aliases: PET_ALIASES },
    { id: 'rent', name: '房租', type: 'expense', color: '#f59e0b', icon: 'cute-home', custom: true, aliases: ['房租', '租金', '中介费'] },
    { id: 'entertainment', name: '娱乐', type: 'expense', color: '#ff8fc8', icon: 'cute-film', custom: true, aliases: ['电影', '游戏', 'KTV', '唱歌', '演出', '门票', '会员', '视频', '音乐', '旅游', '酒店', '景点', '健身', '演唱会', 'K歌', '酒吧', '桌游', '剧本杀', '盲盒', '游戏充值'] },
    { id: 'medical', name: '医疗', type: 'expense', color: '#ff6b6b', icon: 'cute-pill', custom: true, aliases: ['医院', '药', '挂号', '看病', '体检', '牙', '诊所', '疫苗', '感冒药', '牙医', '挂水', '检查'] },
    { id: 'communication', name: '通讯', type: 'expense', color: '#6ea8ff', icon: 'cute-phone', custom: true, aliases: ['话费', '流量', '手机费', '宽带费', '套餐'] },
    { id: 'social', name: '人情', type: 'expense', color: '#ff9f5a', icon: 'cute-gift', custom: true, aliases: ['红包', '礼物', '请客', '份子', '随礼', '结婚', '生日', '人情'] }
  ];
}

function migrateCategoryDefinitions() {
  if (state.settings.categoryDefinitionsV2) return false;
  const daily = myCategorySeed().find((c) => c.id === 'daily');
  if (daily && !state.settings.customCategories.some((c) => c.id === daily.id)) {
    state.settings.customCategories.push(daily);
  }
  const groceries = state.settings.customCategories.find((c) => c.id === 'groceries');
  if (groceries) {
    groceries.aliases = myCategorySeed().find((c) => c.id === 'groceries').aliases;
  }
  const food = state.settings.customCategories.find((c) => c.id === 'food');
  if (food) {
    food.aliases = myCategorySeed().find((c) => c.id === 'food').aliases;
  }
  state.settings.categoryDefinitionsV2 = true;
  saveState();
  return true;
}

function migrateCategoryDefinitionsV3() {
  if (state.settings.categoryDefinitionsV3) return false;
  const food = state.settings.customCategories.find((c) => c.id === 'food');
  if (food) {
    food.aliases = myCategorySeed().find((c) => c.id === 'food').aliases;
  }
  state.settings.categoryDefinitionsV3 = true;
  saveState();
  return true;
}

function petCategorySeed() {
  return {
    id: 'pet',
    name: '宠物',
    type: 'expense',
    color: '#f97316',
    icon: 'cute-paw',
    custom: true,
    aliases: PET_ALIASES.slice()
  };
}

function ensurePetCategory() {
  if (state.settings.customMode) {
    let category = state.settings.customCategories.find((c) => (c.id === 'pet' || c.name === '宠物') && c.type === 'expense');
    if (category) return { category, added: false };
    category = petCategorySeed();
    state.settings.customCategories.push(category);
    return { category, added: true };
  }
  let category = allCategories('expense').find((c) => c.id === 'pet' || c.name === '宠物');
  if (!category) {
    category = petCategorySeed();
    state.settings.customCategories.push(category);
    return { category, added: true };
  }
  return { category, added: false };
}

function petRecordText(record) {
  return normalizeText([record.item, record.merchant, record.note, (record.tags || []).join(' ')].join(' '));
}

function isPetRecord(record) {
  const text = petRecordText(record);
  return PET_ALIASES.some((alias) => text.includes(alias));
}

function migratePetCategory(force) {
  if (!force && state.settings.petCategoryMigratedV1) return { added: false, moved: 0, cleaned: 0 };
  const { category: pet, added } = ensurePetCategory();
  const petAliasSet = new Set(PET_ALIASES);
  let moved = 0;
  let cleaned = 0;

  for (const category of state.settings.customCategories || []) {
    const shoppingLike = category.id === 'shopping' || String(category.name).includes('购物');
    if (!shoppingLike || category.id === pet.id) continue;
    const aliases = Array.isArray(category.aliases) ? category.aliases : [];
    const filtered = aliases.filter((alias) => !petAliasSet.has(alias));
    if (filtered.length !== aliases.length) {
      category.aliases = filtered;
      cleaned += 1;
    }
  }

  for (const record of state.records) {
    if (record.type !== 'expense' || record.category === pet.id) continue;
    if (isPetRecord(record)) {
      record.category = pet.id;
      moved += 1;
    }
  }

  if (added || moved || cleaned) state.settings.petCategoryMigratedV1 = true;
  return { added, moved, cleaned };
}

const DIMENSION_OPTIONS = [
  { value: 'category', label: '分类' },
  { value: 'item', label: '商品 / 事项' },
  { value: 'merchant', label: '商户' },
  { value: 'date', label: '日期' },
  { value: 'month', label: '月份' },
  { value: 'year', label: '年份' },
  { value: 'weekday', label: '星期' },
  { value: 'hour', label: '时段' },
  { value: 'payment', label: '支付方式' },
  { value: 'tag', label: '标签' },
  { value: 'type', label: '收支类型' }
];

const METRIC_OPTIONS = [
  { value: 'total', label: '金额' },
  { value: 'count', label: '笔数' },
  { value: 'avg', label: '平均' },
  { value: 'max', label: '最大' }
];

let state = null;
let editingId = null;
let currentType = 'expense';
let currentCategory = 'food';
let dialogResolver = null;
let deferredInstallPrompt = null;

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function dateKey(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function timeKey(d) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function todayKey() {
  return dateKey(new Date());
}

function parseDate(key) {
  const parts = String(key || '').split('-').map(Number);
  return new Date(parts[0] || 1970, (parts[1] || 1) - 1, parts[2] || 1);
}

function addDays(d, n) {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}

function monthKeyOf(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

function addMonthsToKey(key, n) {
  const d = new Date(Number(key.slice(0, 4)), Number(key.slice(5, 7)) - 1 + n, 1);
  return monthKeyOf(d);
}

function formatMonthKey(key) {
  return `${key.slice(0, 4)}年${Number(key.slice(5, 7))}月`;
}

function formatMoney(n) {
  const value = Number(n) || 0;
  return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatSigned(record) {
  return `${record.type === 'income' ? '+' : '-'}${formatMoney(record.amount)}`;
}

function formatDateHeading(key) {
  const d = parseDate(key);
  return `${d.getMonth() + 1}月${d.getDate()}日 ${WEEKDAYS[d.getDay()]}`;
}

function formatDateShort(key) {
  const d = parseDate(key);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function icon(name) {
  return `<svg><use href="#${name}"></use></svg>`;
}

function defaultState() {
  const now = new Date();
  return {
    records: [],
    settings: {
      rules: [],
      customCategories: [],
      customMode: false,
      categoryDefinitionsV2: false,
      categoryDefinitionsV3: false,
      petCategoryMigratedV1: false
    },
    filters: {
      type: 'all'
    },
    stats: {
      range: 'month',
      type: 'expense',
      category: '',
      payment: '',
      dimension: 'category',
      metric: 'total',
      mode: 'dist',
      customFrom: `${monthKeyOf(now)}-01`,
      customTo: todayKey()
    },
    month: monthKeyOf(new Date()),
    view: 'home'
  };
}

function normalizeRecord(record, index) {
  return {
    id: String(record.id || uid()),
    type: record.type === 'income' ? 'income' : 'expense',
    amount: Math.max(0, Number(record.amount) || 0),
    item: String(record.item || ''),
    category: String(record.category || 'other'),
    merchant: String(record.merchant || ''),
    payment: String(record.payment || '微信'),
    date: String(record.date || todayKey()),
    time: String(record.time || '12:00'),
    tags: Array.isArray(record.tags) ? record.tags.map(String).filter(Boolean) : [],
    note: String(record.note || ''),
    createdAt: Number(record.createdAt) || Date.now() + (index || 0)
  };
}

function loadState() {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const data = JSON.parse(raw);
    base.records = Array.isArray(data.records) ? data.records.map(normalizeRecord) : [];
    base.settings.rules = Array.isArray(data.settings && data.settings.rules) ? data.settings.rules : [];
    base.settings.customCategories = Array.isArray(data.settings && data.settings.customCategories) ? data.settings.customCategories : [];
    base.settings.customMode = !!(data.settings && data.settings.customMode);
    base.settings.categoryDefinitionsV2 = !!(data.settings && data.settings.categoryDefinitionsV2);
    base.settings.categoryDefinitionsV3 = !!(data.settings && data.settings.categoryDefinitionsV3);
    base.settings.petCategoryMigratedV1 = !!(data.settings && data.settings.petCategoryMigratedV1);
    base.filters = Object.assign({}, base.filters, data.filters || {});
    base.stats = Object.assign({}, base.stats, data.stats || {});
    base.month = /^\d{4}-\d{2}$/.test(String(data.month || '')) ? String(data.month) : base.month;
    base.view = ['home', 'stats', 'settings'].includes(data.view) ? data.view : base.view;
    return base;
  } catch (err) {
    return base;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function allCategories(type) {
  const builtIn = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const custom = (state.settings.customCategories || []).filter((c) => c.type === type);
  if (state.settings.customMode && type === 'expense') {
    return custom.length ? custom : [{ id: 'unclassified_expense', name: '未分类', type: 'expense', color: '#b8a5b5', icon: 'cute-more', aliases: [] }];
  }
  return builtIn.concat(custom);
}

function categoryById(id) {
  return allCategories('expense').concat(allCategories('income')).find((c) => c.id === id);
}

function categoryFallback(type) {
  const fallbackId = type === 'income' ? 'income_other' : 'other';
  return allCategories(type).find((c) => c.id === fallbackId) || allCategories(type)[0] || {
    id: `unclassified_${type}`,
    name: '未分类',
    type,
    color: '#b8a5b5',
    icon: 'cute-more',
    aliases: []
  };
}

function remapRecordsAfterCategoryChange() {
  for (const record of state.records) {
    if (categoryById(record.category)) continue;
    const fallback = categoryFallback(record.type);
    record.category = fallback.id;
  }
}

async function useMyCategories() {
  const ok = await showDialog({
    title: '重新设置分类',
    body: '支出分类将替换为：买菜、水果、餐饮、交通、服饰、零食、日用、宠物、房租、娱乐、医疗、通讯、人情。收入分类保持不变。',
    okText: '使用'
  });
  if (!ok) return;
  state.settings.customMode = true;
  state.settings.customCategories = myCategorySeed();
  state.settings.categoryDefinitionsV2 = true;
  state.settings.categoryDefinitionsV3 = true;
  migratePetCategory(true);
  state.settings.rules = (state.settings.rules || []).filter((rule) => categoryById(rule.categoryId));
  remapRecordsAfterCategoryChange();
  saveState();
  initControls();
  render();
  toast('已使用新分类');
}

function sumRecords(records, type) {
  const list = type ? records.filter((r) => r.type === type) : records;
  return list.reduce((sum, r) => sum + r.amount, 0);
}

function recordSort(a, b) {
  return `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`);
}

function getRecord(id) {
  return state.records.find((r) => r.id === id);
}

function normalizeText(text) {
  return String(text || '')
    .replace(/[，。；、]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectType(text) {
  if (/(工资|奖金|收入|收到|入账|到账|收款|报销|退款|返现|赚了|理财|利息|分红|稿费|红包收)/.test(text)) {
    return 'income';
  }
  return 'expense';
}

function extractAmount(text) {
  const matches = [...text.matchAll(/([+-]?\d+(?:\.\d{1,2})?)\s*(元|块钱|块|圆|rmb|美元|港币|￥|¥|\$)?/gi)];
  let best = null;
  let bestScore = -Infinity;
  let bestIndex = -1;
  for (const match of matches) {
    const num = parseFloat(match[1]);
    if (!Number.isFinite(num)) continue;
    const index = match.index;
    const before = text.slice(Math.max(0, index - 5), index);
    const after = text.slice(index + match[0].length, index + match[0].length + 4);
    let score = 0;
    if (/元|块钱|块|圆|rmb|美元|港币|￥|¥|\$/.test(match[2] || '')) score += 5;
    if (/花|买|付|款|收|转|消费|支出|用|充|订|费用|报销|工资|奖金/.test(before)) score += 2;
    const yearLike = num >= 1900 && num <= 2100 && match[1].length >= 4;
    if (yearLike || /^[月日号点时分]/.test(after) || /^[-/:]/.test(after) || /[-/:年月]$/.test(before)) {
      score -= 12;
    }
    if (score > bestScore || (score === bestScore && index > bestIndex)) {
      bestScore = score;
      best = num;
      bestIndex = index;
    }
  }
  return best;
}

function extractDate(text) {
  const now = new Date();
  if (/今天|现在/.test(text)) return dateKey(now);
  if (/昨天/.test(text)) return dateKey(addDays(now, -1));
  if (/前天/.test(text)) return dateKey(addDays(now, -2));

  let match = text.match(/(\d{4})[年/-](\d{1,2})[月/-](\d{1,2})日?/);
  if (match) return `${match[1]}-${pad(match[2])}-${pad(match[3])}`;

  match = text.match(/(\d{1,2})月(\d{1,2})日?/);
  if (match) {
    let year = now.getFullYear();
    const candidate = new Date(year, Number(match[1]) - 1, Number(match[2]));
    if (candidate.getTime() > addDays(now, 1).getTime()) year -= 1;
    return `${year}-${pad(match[1])}-${pad(match[2])}`;
  }

  match = text.match(/(\d{1,2})[号日]/);
  if (match) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return `${year}-${pad(month)}-${pad(match[1])}`;
  }

  return dateKey(now);
}

function extractTime(text) {
  const match = text.match(/(\d{1,2})[:：](\d{2})/);
  if (match) return `${pad(match[1])}:${match[2]}`;
  return timeKey(new Date());
}

function detectPayment(text) {
  for (const payment of PAYMENTS) {
    if (text.includes(payment)) return payment;
  }
  if (/刷卡/.test(text)) return '信用卡';
  if (/银行|储蓄卡|招行|工行|建行/.test(text)) return '银行卡';
  if (/抖/.test(text)) return '抖音';
  if (/淘/.test(text)) return '淘宝';
  return '';
}

function extractMerchant(text) {
  for (const brand of MERCHANT_BRANDS) {
    if (text.startsWith(brand) || text.startsWith(`在${brand}`)) {
      return brand;
    }
  }
  const match = text.match(/在([^，。；,\s]{1,12}?)(?:买了|买|花了|消费|付款|支付|吃饭|喝|吃|购物|下单|点)/);
  if (!match) return '';
  return match[1].replace(/^(给|去|向)/, '').trim();
}

function cleanItem(text, amount) {
  let item = text;
  if (amount !== null) {
    item = item.replace(new RegExp(`${amount.toString().replace('.', '\\.')}\\s*(元|块钱|块|圆|rmb|美元|港币)?`, 'gi'), ' ');
  }
  item = item.replace(/\d{4}[年/-]\d{1,2}[月/-]\d{1,2}日?/g, ' ');
  item = item.replace(/\d{1,2}月\d{1,2}日?/g, ' ');
  item = item.replace(/\d{1,2}[号日]/g, ' ');
  item = item.replace(/\d{1,2}[:：]\d{2}/g, ' ');
  for (const payment of PAYMENTS) item = item.replace(payment, ' ');
  item = item.replace(/在[^，。；,\s]{1,12}?(?:买了|买|花了|消费|付款|支付|吃饭|喝|吃|购物|下单|点)/g, ' ');
  item = item.replace(/(?:买了|买|花费|花了|消费|支出|用了|支付|付款|付了|收了|收到|入账|到账|赚了|转了|收款|今天|昨天|前天)/g, ' ');
  item = item.replace(/(?:直播间|官方旗舰店|旗舰店|网购|下单)/g, ' ');
  item = item.replace(/^\s*(?:吃了|吃个|吃)/, ' ');
  item = item.replace(/^\s*(一个|一杯|一份|一瓶|一袋|一条|一件|一碗|一盒|一支|一包|个)/, ' ');
  item = item.replace(/^[给去在向]/, ' ');
  return normalizeText(item);
}

function classify(type, text) {
  const rules = (state.settings.rules || []).filter((rule) => categoryById(rule.categoryId));
  let bestRule = null;
  for (const rule of rules) {
    if (text.includes(rule.keyword) && (!bestRule || rule.keyword.length > bestRule.keyword.length)) {
      bestRule = rule;
    }
  }
  if (bestRule) return categoryById(bestRule.categoryId);

  let bestCategory = null;
  let bestLength = 0;
  for (const category of allCategories(type)) {
    for (const alias of category.aliases || []) {
      if (text.includes(alias) && alias.length > bestLength) {
        bestLength = alias.length;
        bestCategory = category;
      }
    }
  }
  return bestCategory || categoryFallback(type);
}

function parseLine(line) {
  const text = normalizeText(line);
  if (!text) return null;
  const type = detectType(text);
  const amount = extractAmount(text);
  if (amount === null) return null;

  const date = extractDate(text);
  const time = extractTime(text);
  const payment = detectPayment(text) || '微信';
  const merchant = extractMerchant(text);
  let item = cleanItem(text, amount);
  if (merchant) {
    item = item.split(merchant).join(' ');
    item = item.replace(/^\s*(一个|一杯|一份|一瓶|一袋|一条|一件|一碗|一盒|一支|一包|个)/, ' ');
  }
  item = normalizeText(item);
  if (!item && merchant) item = merchant;
  const category = classify(type, `${item} ${merchant} ${text}`);
  const tags = [...text.matchAll(/#([^#\s]+)/g)].map((match) => match[1]);

  return {
    type,
    amount,
    item: item || category.name,
    category: category.id,
    merchant,
    payment,
    date,
    time,
    tags,
    note: ''
  };
}

function parseQuickText(raw) {
  return String(raw || '')
    .split(/\n|[；;，,]/)
    .map(normalizeText)
    .filter(Boolean)
    .map(parseLine)
    .filter(Boolean);
}

function addRecord(record) {
  const normalized = normalizeRecord(record, 0);
  state.records.push(normalized);
  return normalized;
}

function updateRecord(id, patch) {
  const index = state.records.findIndex((r) => r.id === id);
  if (index === -1) return;
  const existing = state.records[index];
  state.records[index] = normalizeRecord(Object.assign({}, existing, patch, { id }), index);
}

function getMonthRecords(key) {
  return state.records.filter((r) => r.date.slice(0, 7) === key);
}

function render() {
  document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
  const view = document.getElementById(`view-${state.view}`);
  if (view) view.classList.add('active');
  document.querySelectorAll('.nav-btn[data-view]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === state.view);
  });
  if (state.view === 'home') renderHome();
  if (state.view === 'stats') renderStats();
  if (state.view === 'settings') renderSettings();
}

function renderHome() {
  const monthRecords = getMonthRecords(state.month);
  const expense = sumRecords(monthRecords, 'expense');
  const income = sumRecords(monthRecords, 'income');
  const prevKey = addMonthsToKey(state.month, -1);
  const prevExpense = sumRecords(getMonthRecords(prevKey), 'expense');
  const delta = prevExpense > 0 ? ((expense - prevExpense) / prevExpense) * 100 : null;

  document.getElementById('monthTitle').textContent = formatMonthKey(state.month);

  const deltaHtml = delta === null
    ? '<span class="summary-delta">上月无支出</span>'
    : `<span class="summary-delta">${delta >= 0 ? '+' : ''}${delta.toFixed(1)}% <span>环比上月</span></span>`;

  document.getElementById('homeSummary').innerHTML = `
    <div class="summary-label">${formatMonthKey(state.month)}结余</div>
    <div class="summary-amount">¥ ${formatMoney(income - expense)}</div>
    <div class="summary-grid">
      <div class="summary-cell">
        <div class="cell-label">${icon('i-up')}支出</div>
        <div class="cell-value">¥ ${formatMoney(expense)}</div>
      </div>
      <div class="summary-cell">
        <div class="cell-label">${icon('i-down')}收入</div>
        <div class="cell-value">¥ ${formatMoney(income)}</div>
      </div>
    </div>
    ${deltaHtml}
  `;

  const byCategory = new Map();
  for (const record of monthRecords) {
    if (record.type !== 'expense') continue;
    const current = byCategory.get(record.category) || 0;
    byCategory.set(record.category, current + record.amount);
  }
  const topCategory = [...byCategory.entries()].sort((a, b) => b[1] - a[1])[0];
  const daysInMonth = new Date(Number(state.month.slice(0, 4)), Number(state.month.slice(5, 7)), 0).getDate();
  const dailyAvg = expense / Math.max(1, daysInMonth);
  const topCat = topCategory ? categoryById(topCategory[0]) : null;

  document.getElementById('homeBreakdown').innerHTML = `
    <div class="day-stat">
      <div class="day-label">最大支出</div>
      <div class="day-value">${topCat ? escapeHtml(topCat.name) : '暂无'}</div>
    </div>
    <div class="day-stat">
      <div class="day-label">${monthRecords.length} 笔</div>
      <div class="day-value">${topCat ? `¥ ${formatMoney(topCategory[1])}` : '—'}</div>
    </div>
    <div class="day-stat">
      <div class="day-label">日均支出</div>
      <div class="day-value">¥ ${formatMoney(dailyAvg)}</div>
    </div>
  `;

  renderRecordList(monthRecords);
}

function renderRecordList(monthRecords) {
  const typeFilter = state.filters.type;
  const visible = monthRecords.filter((r) => typeFilter === 'all' || r.type === typeFilter).sort(recordSort);
  document.querySelectorAll('.list-filters .chip').forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.value === typeFilter);
  });

  if (!visible.length) {
    document.getElementById('recordList').innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">${icon('i-wallet')}</span>
        <p class="empty-title">${formatMonthKey(state.month)}暂无账单</p>
      </div>
    `;
    return;
  }

  const groups = new Map();
  for (const record of visible) {
    if (!groups.has(record.date)) groups.set(record.date, []);
    groups.get(record.date).push(record);
  }

  let html = '';
  for (const [date, records] of [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]))) {
    const expense = sumRecords(records, 'expense');
    const income = sumRecords(records, 'income');
    const totalText = [
      expense ? `支出 ${formatMoney(expense)}` : '',
      income ? `收入 ${formatMoney(income)}` : ''
    ].filter(Boolean).join(' / ');
    html += `
      <div class="record-group">
        <div class="group-head">
          <strong>${formatDateHeading(date)}</strong>
          <span class="group-total">${totalText}</span>
        </div>
        ${records.map((record) => recordRow(record)).join('')}
      </div>
    `;
  }
  document.getElementById('recordList').innerHTML = html;
}

function recordRow(record) {
  const category = categoryById(record.category) || categoryFallback(record.type);
  const subParts = [category.name, record.merchant, record.payment]
    .filter((value, index, all) => value && all.indexOf(value) === index);
  return `
    <div class="record-item" data-action="edit-record" data-id="${record.id}">
      <span class="record-icon" style="background:${category.color}1f;color:${category.color}">${icon(category.icon)}</span>
      <div class="record-main">
        <div class="record-title">${escapeHtml(record.item)}</div>
        <div class="record-sub">${subParts.map(escapeHtml).join('<span class="dot">·</span>')}</div>
      </div>
      <div class="record-amount ${record.type}">${formatSigned(record)}</div>
      <button class="record-more" type="button" data-action="delete-record" data-id="${record.id}" title="删除" aria-label="删除">${icon('i-trash')}</button>
    </div>
  `;
}

function getStatsRange() {
  const now = new Date();
  const range = state.stats.range;
  if (range === 'month') {
    const key = monthKeyOf(now);
    return [`${key}-01`, `${key}-${pad(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate())}`];
  }
  if (range === 'lastMonth') {
    const key = monthKeyOf(addDays(new Date(now.getFullYear(), now.getMonth(), 1), -1));
    return [`${key}-01`, `${key}-${pad(new Date(Number(key.slice(0, 4)), Number(key.slice(5, 7)), 0).getDate())}`];
  }
  if (range === '7d') {
    const to = dateKey(now);
    const from = dateKey(addDays(now, -6));
    return [from, to];
  }
  if (range === 'year') {
    return [`${now.getFullYear()}-01-01`, `${now.getFullYear()}-12-31`];
  }
  if (range === 'custom') {
    return [state.stats.customFrom || `${monthKeyOf(now)}-01`, state.stats.customTo || todayKey()];
  }
  return ['0000-00-00', '9999-12-31'];
}

function rangeLabel() {
  const map = {
    month: '本月',
    lastMonth: '上月',
    '7d': '近7天',
    year: '今年',
    all: '全部',
    custom: `${formatDateShort(state.stats.customFrom || todayKey())} - ${formatDateShort(state.stats.customTo || todayKey())}`
  };
  return map[state.stats.range] || '全部';
}

function getStatsRecords() {
  const [from, to] = getStatsRange();
  const type = state.stats.type;
  return state.records
    .filter((record) => {
      if (type !== 'all' && record.type !== type) return false;
      if (state.stats.category && record.category !== state.stats.category) return false;
      if (state.stats.payment && record.payment !== state.stats.payment) return false;
      return record.date >= from && record.date <= to;
    })
    .sort(recordSort);
}

function groupValue(record, dimension) {
  if (dimension === 'category') return (categoryById(record.category) || categoryFallback(record.type)).name;
  if (dimension === 'item') return record.item || '未填写';
  if (dimension === 'merchant') return record.merchant || '未填写';
  if (dimension === 'date') return record.date;
  if (dimension === 'month') return record.date.slice(0, 7);
  if (dimension === 'year') return record.date.slice(0, 4);
  if (dimension === 'weekday') {
    const day = parseDate(record.date).getDay();
    return WEEKDAYS[day];
  }
  if (dimension === 'hour') {
    const hour = Number(record.time.slice(0, 2));
    if (hour < 6) return '凌晨 0-6点';
    if (hour < 9) return '早晨 6-9点';
    if (hour < 12) return '上午 9-12点';
    if (hour < 14) return '中午 12-14点';
    if (hour < 18) return '下午 14-18点';
    if (hour < 22) return '晚上 18-22点';
    return '深夜 22-24点';
  }
  if (dimension === 'payment') return record.payment || '未填写';
  if (dimension === 'tag') return record.tags.length ? record.tags[0] : '未打标签';
  if (dimension === 'type') return record.type === 'income' ? '收入' : '支出';
  return '未分组';
}

function metricValue(records, metric) {
  const amounts = records.map((r) => r.amount);
  if (metric === 'count') return records.length;
  if (metric === 'avg') return records.length ? amounts.reduce((a, b) => a + b, 0) / records.length : 0;
  if (metric === 'max') return records.length ? Math.max(...amounts) : 0;
  return amounts.reduce((a, b) => a + b, 0);
}

function groupRecords(records, dimension, metric) {
  const groups = new Map();
  for (const record of records) {
    const keys = dimension === 'tag' && record.tags.length ? record.tags : [groupValue(record, dimension)];
    for (const key of keys) {
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(record);
    }
  }
  const result = [];
  let colorIndex = 0;
  for (const [key, list] of groups.entries()) {
    const category = dimension === 'category' ? categoryById(list[0].category) : null;
    const color = category ? category.color : CHART_COLORS[colorIndex % CHART_COLORS.length];
    colorIndex += 1;
    result.push({
      key,
      label: dimension === 'date' ? formatDateShort(key) : dimension === 'month' ? `${key.slice(0, 4)}年${Number(key.slice(5, 7))}月` : key,
      value: metricValue(list, metric),
      count: list.length,
      color
    });
  }
  result.sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'zh-CN'));
  return result;
}

function renderStats() {
  const records = getStatsRecords();
  const stats = state.stats;
  document.querySelectorAll('#rangeSeg .seg-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.value === stats.range);
  });
  document.querySelectorAll('#chartModeSeg .seg-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.value === stats.mode);
  });
  document.getElementById('customRangeRow').hidden = stats.range !== 'custom';
  document.getElementById('statFrom').value = stats.customFrom;
  document.getElementById('statTo').value = stats.customTo;

  const expense = sumRecords(records, 'expense');
  const income = sumRecords(records, 'income');
  const total = stats.type === 'all' ? income - expense : sumRecords(records);
  const [from, to] = getStatsRange();
  const days = Math.max(1, Math.round((parseDate(to) - parseDate(from)) / 86400000) + 1);
  const count = records.length;
  const dailyAvg = total / days;
  const max = count ? Math.max(...records.map((r) => r.amount)) : 0;

  document.getElementById('statCards').innerHTML = `
    <div class="stat-card">
      <div class="stat-label">${stats.type === 'all' ? '净结余' : '总金额'}</div>
      <div class="stat-value accent">¥ ${formatMoney(total)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">笔数</div>
      <div class="stat-value">${count}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">日均</div>
      <div class="stat-value">¥ ${formatMoney(dailyAvg)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">单笔最高</div>
      <div class="stat-value">¥ ${formatMoney(max)}</div>
    </div>
  `;

  const groups = groupRecords(records, stats.dimension, stats.metric);
  const dimensionLabel = (DIMENSION_OPTIONS.find((d) => d.value === stats.dimension) || {}).label || '分组';
  const metricLabel = (METRIC_OPTIONS.find((m) => m.value === stats.metric) || {}).label || '金额';

  const chartPanel = document.getElementById('chartPanel');
  const tableWrap = document.getElementById('statTable');

  if (stats.mode === 'table') {
    chartPanel.innerHTML = '';
    tableWrap.innerHTML = renderStatTable(groups, dimensionLabel, metricLabel, stats.metric);
  } else {
    if (stats.mode === 'trend') {
      chartPanel.innerHTML = `
        <div class="panel-head">
          <h3>每日趋势</h3>
          <span class="panel-note">${rangeLabel()} · ${count} 笔</span>
        </div>
        ${renderTrendChart(records)}
      `;
    } else {
      chartPanel.innerHTML = `
        <div class="panel-head">
          <h3>${dimensionLabel}分布</h3>
          <span class="panel-note">${rangeLabel()} · ${count} 笔</span>
        </div>
        <div class="donut-wrap">
          ${renderDonut(groups)}
          <div class="bar-list">${renderBarList(groups)}</div>
        </div>
      `;
    }
    tableWrap.innerHTML = '';
  }
}

function renderDonut(groups) {
  if (!groups.length) {
    return `
      <div class="donut-chart">
        <div class="donut-center">
          <div class="donut-total">¥ 0.00</div>
          <div class="donut-sub">暂无数据</div>
        </div>
      </div>
    `;
  }
  const total = groups.reduce((sum, group) => sum + group.value, 0);
  const top = groups.slice(0, 8);
  const otherValue = groups.slice(8).reduce((sum, group) => sum + group.value, 0);
  const segments = top.concat(otherValue > 0 ? [{ label: '其他', value: otherValue, color: '#cbd5e1' }] : []);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const circles = segments
    .filter((segment) => segment.value > 0)
    .map((segment) => {
      const dash = (segment.value / total) * circumference;
      const circle = `<circle r="${radius}" cx="88" cy="88" fill="none" stroke="${segment.color}" stroke-width="30" stroke-dasharray="${dash} ${circumference - dash}" stroke-dashoffset="${-offset}"></circle>`;
      offset += dash;
      return circle;
    })
    .join('');

  return `
    <div class="donut-chart">
      <svg viewBox="0 0 176 176">${circles}</svg>
      <div class="donut-center">
        <div class="donut-total">¥ ${formatMoney(total)}</div>
        <div class="donut-sub">${segments.length} 组</div>
      </div>
    </div>
    <div class="legend-list">
      ${segments.slice(0, 6).map((segment) => `
        <div class="legend-item">
          <span class="legend-dot" style="background:${segment.color}"></span>
          <span class="legend-name">${escapeHtml(segment.label)}</span>
          <span class="legend-value">${formatMoney(segment.value)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderBarList(groups) {
  if (!groups.length) return '<div class="empty-state"><p>暂无数据</p></div>';
  const max = Math.max(...groups.map((group) => group.value), 1);
  return groups.slice(0, 6).map((group) => `
    <div class="bar-row">
      <div class="bar-label" title="${escapeHtml(group.label)}">${escapeHtml(group.label)}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.max(2, (group.value / max) * 100)}%;background:${group.color}"></div>
      </div>
      <div class="bar-value">${formatMoney(group.value)}</div>
    </div>
  `).join('');
}

function renderTrendChart(records) {
  if (!records.length) {
    return `
      <div class="empty-state">
        <p>暂无数据</p>
      </div>
    `;
  }
  const byDate = new Map();
  for (const record of [...records].sort(recordSort)) {
    if (!byDate.has(record.date)) byDate.set(record.date, []);
    byDate.get(record.date).push(record);
  }
  const dates = [...byDate.keys()].sort();
  const values = dates.map((date) => sumRecords(byDate.get(date)));
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const width = 340;
  const height = 170;
  const padLeft = 16;
  const padRight = 16;
  const padTop = 18;
  const padBottom = 26;
  const x = (index) => (dates.length === 1 ? width / 2 : padLeft + ((width - padLeft - padRight) * index) / (dates.length - 1));
  const y = (value) => padTop + (height - padTop - padBottom) * (1 - (value - min) / span);
  const points = values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`);
  const linePart = points.length > 1 ? ` L ${points.slice(1).join(' L ')}` : '';
  const areaPath = `M ${points[0]}${linePart} L ${x(dates.length - 1).toFixed(1)},${height - padBottom} L ${x(0).toFixed(1)},${height - padBottom} Z`;
  const gridLines = [0, 0.5, 1].map((ratio) => {
    const value = min + span * ratio;
    const gy = y(value);
    return `<line x1="${padLeft}" y1="${gy.toFixed(1)}" x2="${width - padRight}" y2="${gy.toFixed(1)}" stroke="#e3e8ef" stroke-width="1"></line><text x="${padLeft - 5}" y="${(gy + 3).toFixed(1)}" text-anchor="end" font-size="10" fill="#98a2b3">${Math.round(value)}</text>`;
  }).join('');
  const labels = [];
  const labelIndexes = dates.length === 1 ? [0] : [0, Math.floor((dates.length - 1) / 2), dates.length - 1];
  for (const index of labelIndexes) {
    labels.push(`<text x="${x(index).toFixed(1)}" y="${height - 8}" text-anchor="${index === 0 ? 'start' : index === dates.length - 1 ? 'end' : 'middle'}" font-size="10" fill="#98a2b3">${formatDateShort(dates[index])}</text>`);
  }
  return `
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="每日支出趋势">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f9d78" stop-opacity=".28"></stop>
          <stop offset="100%" stop-color="#0f9d78" stop-opacity=".02"></stop>
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${areaPath}" fill="url(#trendFill)"></path>
      <polyline points="${points.join(' ')}" fill="none" stroke="#0f9d78" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${dates.length <= 14 ? values.map((value, index) => `<circle cx="${x(index).toFixed(1)}" cy="${y(value).toFixed(1)}" r="2.6" fill="#0f9d78"></circle>`).join('') : ''}
      ${labels.join('')}
    </svg>
  `;
}

function renderStatTable(groups, dimensionLabel, metricLabel, metric) {
  if (!groups.length) {
    return `
      <div class="empty-state">
        <p>暂无数据</p>
      </div>
    `;
  }
  const totalMetric = metric === 'avg'
    ? groups.reduce((sum, group) => sum + group.value, 0) / groups.length
    : metric === 'max'
      ? Math.max(...groups.map((group) => group.value))
      : groups.reduce((sum, group) => sum + group.value, 0);
  const rows = groups.slice(0, 30).map((group) => `
    <tr>
      <td><span class="legend-dot" style="display:inline-block;margin-right:6px;background:${group.color}"></span>${escapeHtml(group.label)}</td>
      <td>${group.count}</td>
      <td>${formatMoney(group.value)}</td>
      <td>${totalMetric ? ((group.value / totalMetric) * 100).toFixed(1) : '0.0'}%</td>
    </tr>
  `).join('');
  return `
    <table class="stat-table">
      <thead>
        <tr>
          <th>${dimensionLabel}</th>
          <th>笔数</th>
          <th>${metricLabel}</th>
          <th>占比</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr class="row-total">
          <td>合计</td>
          <td>${groups.reduce((sum, group) => sum + group.count, 0)}</td>
          <td>${formatMoney(totalMetric)}</td>
          <td>100.0%</td>
        </tr>
      </tbody>
    </table>
  `;
}

function renderSettings() {
  const settings = state.settings;
  document.getElementById('ruleList').innerHTML = settings.rules.length ? settings.rules.map((rule, index) => {
    const category = categoryById(rule.categoryId);
    return `
      <li class="rule-item">
        <div class="rule-text">
          <strong>${escapeHtml(rule.keyword)}</strong>
          <span>→ ${category ? escapeHtml(category.name) : '未知分类'}</span>
        </div>
        <button class="icon-btn" type="button" data-action="remove-rule" data-index="${index}" title="删除" aria-label="删除">${icon('i-trash')}</button>
      </li>
    `;
  }).join('') : '<li class="rule-item"><div class="rule-text"><span>暂无自定义规则</span></div></li>';

  const categoryHtml = ['expense', 'income'].map((type) => allCategories(type).map((category) => {
    const aliasPreview = (category.aliases || []).length
      ? `${category.aliases.slice(0, 4).join('、')}${category.aliases.length > 4 ? '…' : ''}`
      : '未设置关键词';
    const editable = category.custom && !String(category.id).startsWith('unclassified');
    return `
      <li class="category-item">
        <div class="category-text">
          <span class="cat-dot" style="background:${category.color}"></span>
          <strong>${escapeHtml(category.name)}</strong>
          <span>${type === 'expense' ? '支出' : '收入'}</span>
        </div>
        <div class="category-meta">
          <span class="cat-aliases" title="${escapeHtml((category.aliases || []).join('、'))}">${escapeHtml(aliasPreview)}</span>
          ${editable ? `
            <div class="category-actions">
              <button class="icon-btn" type="button" data-action="edit-category" data-id="${category.id}" title="编辑" aria-label="编辑">${icon('i-pencil')}</button>
              <button class="icon-btn" type="button" data-action="remove-category" data-id="${category.id}" title="删除" aria-label="删除">${icon('i-trash')}</button>
            </div>
          ` : ''}
        </div>
      </li>
    `;
  }).join('')).join('');
  document.getElementById('categoryList').innerHTML = categoryHtml;

  const bytes = new Blob([localStorage.getItem(STORAGE_KEY) || '']).size;
  document.getElementById('storageLine').textContent = `${state.records.length} 条记录 · ${(bytes / 1024).toFixed(1)} KB`;
}

function initControls() {
  document.getElementById('statType').value = state.stats.type;
  fillSelect('statCategory', [{ value: '', label: '全部分类' }].concat(allCategories('expense').concat(allCategories('income')).map((c) => ({ value: c.id, label: c.name }))), state.stats.category);
  fillSelect('statPayment', [{ value: '', label: '全部支付方式' }].concat(PAYMENTS.map((p) => ({ value: p, label: p }))), state.stats.payment);
  fillSelect('fPayment', PAYMENTS.map((p) => ({ value: p, label: p })), '微信');
  fillSelect('statDimension', DIMENSION_OPTIONS, state.stats.dimension);
  fillSelect('statMetric', METRIC_OPTIONS, state.stats.metric);
  fillSelect('ruleCategory', allCategories('expense').concat(allCategories('income')).map((c) => ({ value: c.id, label: `${c.name}（${c.type === 'expense' ? '支出' : '收入'}）` })), 'food');
}

function fillSelect(id, options, selected) {
  const select = document.getElementById(id);
  select.innerHTML = options.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join('');
  select.value = selected;
}

function renderCategoryPicker(type, activeId) {
  const categories = allCategories(type);
  if (!categories.find((c) => c.id === activeId)) activeId = categoryFallback(type).id;
  currentType = type;
  currentCategory = activeId;
  document.getElementById('categoryPicker').innerHTML = categories.map((category) => `
    <button type="button" class="category-tile ${category.id === activeId ? 'active' : ''}" data-action="pick-category" data-id="${category.id}" style="--cat:${category.color}">
      ${icon(category.icon)}
      <span>${escapeHtml(category.name)}</span>
    </button>
  `).join('');
}

function openRecordModal(draft) {
  const record = draft && draft.id ? draft : null;
  const source = draft && !draft.id ? draft : null;
  editingId = record ? record.id : null;
  const type = record ? record.type : source ? source.type : 'expense';
  currentType = type;
  document.querySelectorAll('#recordTypeSeg .type-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.value === type);
  });
  document.getElementById('fAmount').value = record ? record.amount : source ? source.amount : '';
  document.getElementById('fItem').value = record ? record.item : source ? source.item : '';
  document.getElementById('fMerchant').value = record ? record.merchant : source ? source.merchant : '';
  document.getElementById('fPayment').value = record ? record.payment : source ? source.payment : '微信';
  document.getElementById('fDate').value = record ? record.date : source ? source.date : todayKey();
  document.getElementById('fTime').value = record ? record.time : source ? source.time : timeKey(new Date());
  document.getElementById('fTags').value = record ? record.tags.join(', ') : source ? source.tags.join(', ') : '';
  document.getElementById('fNote').value = record ? record.note : source ? source.note : '';
  currentCategory = record ? record.category : source ? source.category : categoryFallback(type).id;
  renderCategoryPicker(type, currentCategory);
  document.getElementById('recordModal').hidden = false;
  setTimeout(() => document.getElementById('fAmount').focus(), 80);
}

function closeRecordModal() {
  document.getElementById('recordModal').hidden = true;
  editingId = null;
}

function handleQuickText() {
  const input = document.getElementById('quickText');
  const raw = input.value.trim();
  if (!raw) {
    input.focus();
    return;
  }
  const drafts = parseQuickText(raw);
  if (!drafts.length) {
    toast('没有识别到金额');
    return;
  }
  const addedIds = [];
  for (const draft of drafts) {
    const record = addRecord(draft);
    addedIds.push(record.id);
  }
  saveState();
  render();
  input.value = '';
  const label = drafts.length === 1
    ? `${drafts[0].item} · ${categoryById(drafts[0].category).name}`
    : `${drafts.length} 笔`;
  toastWithAction(`已记 ${label}`, '撤销', () => {
    state.records = state.records.filter((record) => !addedIds.includes(record.id));
    saveState();
    render();
    toast('已撤销');
  });
}

function submitRecordForm(event) {
  event.preventDefault();
  const amount = Math.abs(Number(document.getElementById('fAmount').value));
  if (!amount || !Number.isFinite(amount)) {
    toast('请输入金额');
    return;
  }
  const item = document.getElementById('fItem').value.trim();
  if (!item) {
    toast('请输入商品或事项');
    return;
  }
  const tags = document.getElementById('fTags').value.split(/[,，、\s]+/).map((tag) => tag.trim()).filter(Boolean);
  const record = {
    id: editingId,
    type: currentType,
    amount,
    item,
    category: currentCategory,
    merchant: document.getElementById('fMerchant').value.trim(),
    payment: document.getElementById('fPayment').value || '微信',
    date: document.getElementById('fDate').value,
    time: document.getElementById('fTime').value,
    tags,
    note: document.getElementById('fNote').value.trim()
  };
  if (editingId) {
    updateRecord(editingId, record);
    toast('已更新');
  } else {
    addRecord(record);
    toast('已记录');
  }
  saveState();
  closeRecordModal();
  render();
}

function exportData() {
  const payload = {
    app: 'qingzhangben',
    version: 1,
    exportedAt: new Date().toISOString(),
    records: state.records,
    settings: state.settings
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `轻账本-${todayKey()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast('已导出');
}

async function importData(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data.records)) throw new Error('bad file');
    state.records = data.records.map(normalizeRecord);
    state.settings.rules = Array.isArray(data.settings && data.settings.rules) ? data.settings.rules : [];
    state.settings.customCategories = Array.isArray(data.settings && data.settings.customCategories) ? data.settings.customCategories : [];
    state.settings.customMode = !!(data.settings && data.settings.customMode);
    const petMigration = migratePetCategory(true);
    saveState();
    initControls();
    render();
    toast(petMigration.moved ? `已导入 ${state.records.length} 条记录，${petMigration.moved} 条归入「宠物」` : `已导入 ${state.records.length} 条记录`);
  } catch (err) {
    toast('导入失败，请检查文件');
  }
}

async function clearData() {
  const ok = await showDialog({
    title: '清空账单',
    body: `将删除全部 ${state.records.length} 条记录。`,
    okText: '清空'
  });
  if (!ok) return;
  state.records = [];
  saveState();
  render();
  toast('已清空');
}

let editingCategoryId = null;

function addCustomCategory() {
  openCategoryEditor();
}

function openCategoryEditor(category) {
  editingCategoryId = category ? category.id : null;
  document.getElementById('categoryModalTitle').textContent = category ? '编辑分类' : '新增分类';
  document.getElementById('catName').value = category ? category.name : '';
  document.getElementById('catType').value = category ? category.type : 'expense';
  document.getElementById('catAliases').value = category ? (category.aliases || []).join(', ') : '';
  document.getElementById('categoryModal').hidden = false;
  setTimeout(() => document.getElementById('catName').focus(), 80);
}

function closeCategoryModal() {
  document.getElementById('categoryModal').hidden = true;
  editingCategoryId = null;
}

function submitCategoryForm(event) {
  event.preventDefault();
  const name = document.getElementById('catName').value.trim();
  if (!name) {
    toast('请输入分类名称');
    return;
  }
  const type = document.getElementById('catType').value;
  const aliases = document.getElementById('catAliases').value
    .split(/[,，、\s]+/)
    .map((alias) => alias.trim())
    .filter(Boolean);
  const existing = editingCategoryId
    ? allCategories('expense').concat(allCategories('income')).find((c) => c.id === editingCategoryId)
    : null;
  if (existing && !existing.custom) {
    toast('内置分类需要先使用我的分类后编辑');
    return;
  }

  if (editingCategoryId) {
    const index = state.settings.customCategories.findIndex((c) => c.id === editingCategoryId);
    if (index === -1) return;
    if (existing && existing.type !== type) {
      for (const record of state.records) {
        if (record.category === editingCategoryId) record.type = type;
      }
    }
    state.settings.customCategories[index] = Object.assign({}, state.settings.customCategories[index], { name, type, aliases });
    saveState();
    initControls();
    render();
    closeCategoryModal();
    toast('分类已更新');
    return;
  }

  if (allCategories(type).some((c) => c.name === name)) {
    toast('分类已存在');
    return;
  }
  const color = CHART_COLORS[(state.settings.customCategories.length + CHART_COLORS.length) % CHART_COLORS.length];
  state.settings.customCategories.push({
    id: `custom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    type,
    name,
    color,
    icon: 'cute-more',
    custom: true,
    aliases
  });
  saveState();
  initControls();
  render();
  closeCategoryModal();
  toast('已新增分类');
}

async function removeCustomCategory(id) {
  const category = categoryById(id);
  if (!category || !category.custom) return;
  const ok = await showDialog({
    title: '删除分类',
    body: `将把「${category.name}」下的记录移到「${categoryFallback(category.type).name}」。`,
    okText: '删除'
  });
  if (!ok) return;
  const fallback = categoryFallback(category.type);
  for (const record of state.records) {
    if (record.category === id) record.category = fallback.id;
  }
  state.settings.customCategories = state.settings.customCategories.filter((c) => c.id !== id);
  state.settings.rules = state.settings.rules.filter((rule) => rule.categoryId !== id);
  saveState();
  initControls();
  render();
  toast('已删除分类');
}

function pickMonth() {
  const input = document.createElement('input');
  input.type = 'month';
  input.value = state.month;
  input.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;';
  document.body.appendChild(input);
  input.addEventListener('change', () => {
    if (input.value) state.month = input.value;
    input.remove();
    render();
  });
  input.addEventListener('blur', () => input.remove());
  if (typeof input.showPicker === 'function') {
    try {
      input.showPicker();
      return;
    } catch (err) {
      // fall through to click
    }
  }
  input.click();
}

function showDialog(options) {
  const opts = Object.assign({ title: '提示', body: '', okText: '确定', input: false, placeholder: '' }, options);
  document.getElementById('dialogTitle').textContent = opts.title;
  document.getElementById('dialogBody').textContent = opts.body;
  const inputEl = document.getElementById('dialogInput');
  inputEl.hidden = !opts.input;
  inputEl.placeholder = opts.placeholder;
  inputEl.value = '';
  document.getElementById('dialogOk').textContent = opts.okText;
  document.getElementById('dialogModal').hidden = false;
  if (opts.input) setTimeout(() => inputEl.focus(), 50);
  return new Promise((resolve) => {
    dialogResolver = resolve;
  });
}

function resolveDialog(value) {
  if (dialogResolver) {
    dialogResolver(value);
    dialogResolver = null;
  }
  document.getElementById('dialogModal').hidden = true;
}

function toast(message) {
  const root = document.getElementById('toastRoot');
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  root.appendChild(node);
  setTimeout(() => node.remove(), 2200);
}

function toastWithAction(message, actionLabel, onAction) {
  const root = document.getElementById('toastRoot');
  const node = document.createElement('div');
  node.className = 'toast toast-action';
  const text = document.createElement('span');
  text.textContent = message;
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = actionLabel;
  button.addEventListener('click', () => {
    onAction();
    node.remove();
  });
  node.appendChild(text);
  node.appendChild(button);
  root.appendChild(node);
  setTimeout(() => node.remove(), 5000);
}

function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  const recognition = new SpeechRecognition();
  recognition.lang = 'zh-CN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  const voiceBtn = document.getElementById('voiceBtn');
  voiceBtn.classList.add('recording');
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    document.getElementById('quickText').value = text;
    handleQuickText();
  };
  recognition.onerror = () => toast('语音识别不可用');
  recognition.onend = () => voiceBtn.classList.remove('recording');
  recognition.start();
}

async function installApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    toast(choice && choice.outcome === 'accepted' ? '已安装' : '未安装');
    return;
  }
  await showDialog({
    title: '安装到手机',
    body: '安卓：Chrome 菜单选「安装应用」；苹果：Safari 分享按钮选「添加到主屏幕」。',
    okText: '知道了'
  });
}

async function handleAction(action, el) {
  if (action === 'goto') {
    state.view = el.dataset.view;
    render();
    return;
  }
  if (action === 'add') {
    openRecordModal();
    return;
  }
  if (action === 'parse') {
    handleQuickText();
    return;
  }
  if (action === 'voice') {
    startVoice();
    return;
  }
  if (action === 'month-prev') {
    state.month = addMonthsToKey(state.month, -1);
    renderHome();
    return;
  }
  if (action === 'month-next') {
    state.month = addMonthsToKey(state.month, 1);
    renderHome();
    return;
  }
  if (action === 'month-picker') {
    pickMonth();
    return;
  }
  if (action === 'filter-type') {
    state.filters.type = el.dataset.value;
    renderHome();
    return;
  }
  if (action === 'stats-range') {
    state.stats.range = el.dataset.value;
    renderStats();
    return;
  }
  if (action === 'chart-mode') {
    state.stats.mode = el.dataset.value;
    renderStats();
    return;
  }
  if (action === 'record-type') {
    renderCategoryPicker(el.dataset.value, currentCategory);
    document.querySelectorAll('#recordTypeSeg .type-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.value === el.dataset.value);
    });
    return;
  }
  if (action === 'pick-category') {
    currentCategory = el.dataset.id;
    document.querySelectorAll('#categoryPicker .category-tile').forEach((tile) => {
      tile.classList.toggle('active', tile.dataset.id === currentCategory);
    });
    return;
  }
  if (action === 'close-modal') {
    closeRecordModal();
    return;
  }
  if (action === 'edit-record') {
    const record = getRecord(el.dataset.id);
    if (record) openRecordModal(record);
    return;
  }
  if (action === 'delete-record') {
    const record = getRecord(el.dataset.id);
    if (!record) return;
    const ok = await showDialog({
      title: '删除这笔',
      body: `${record.item} · ${formatSigned(record)}`,
      okText: '删除'
    });
    if (!ok) return;
    state.records = state.records.filter((r) => r.id !== record.id);
    saveState();
    render();
    toast('已删除');
    return;
  }
  if (action === 'export') {
    exportData();
    return;
  }
  if (action === 'import') {
    document.getElementById('importFile').click();
    return;
  }
  if (action === 'reset') {
    clearData();
    return;
  }
  if (action === 'remove-rule') {
    state.settings.rules.splice(Number(el.dataset.index), 1);
    saveState();
    renderSettings();
    toast('已删除规则');
    return;
  }
  if (action === 'add-category') {
    addCustomCategory();
    return;
  }
  if (action === 'use-my-categories') {
    useMyCategories();
    return;
  }
  if (action === 'edit-category') {
    const category = categoryById(el.dataset.id);
    if (category) openCategoryEditor(category);
    return;
  }
  if (action === 'close-category-modal') {
    closeCategoryModal();
    return;
  }
  if (action === 'remove-category') {
    removeCustomCategory(el.dataset.id);
    return;
  }
  if (action === 'install') {
    installApp();
  }
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-backdrop')) {
      if (!document.getElementById('recordModal').hidden) closeRecordModal();
      if (!document.getElementById('categoryModal').hidden) closeCategoryModal();
      resolveDialog(false);
      return;
    }
    const el = event.target.closest('[data-action]');
    if (el) handleAction(el.dataset.action, el);
  });

  document.getElementById('recordForm').addEventListener('submit', submitRecordForm);
  document.getElementById('categoryForm').addEventListener('submit', submitCategoryForm);
  document.getElementById('quickText').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleQuickText();
    }
  });
  document.getElementById('ruleForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const keyword = document.getElementById('ruleKeyword').value.trim();
    const categoryId = document.getElementById('ruleCategory').value;
    if (!keyword || !categoryId) return;
    state.settings.rules.push({ keyword, categoryId });
    saveState();
    document.getElementById('ruleKeyword').value = '';
    renderSettings();
    toast('规则已添加');
  });
  document.getElementById('importFile').addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) importData(file);
    event.target.value = '';
  });
  document.getElementById('dialogCancel').addEventListener('click', () => resolveDialog(false));
  document.getElementById('dialogOk').addEventListener('click', () => {
    const inputEl = document.getElementById('dialogInput');
    if (!inputEl.hidden) {
      resolveDialog(inputEl.value.trim());
    } else {
      resolveDialog(true);
    }
  });

  for (const id of ['statCategory', 'statPayment', 'statDimension', 'statMetric', 'statType']) {
    document.getElementById(id).addEventListener('change', (event) => {
      const key = id.replace('stat', '').toLowerCase();
      state.stats[key] = event.target.value;
      renderStats();
    });
  }

  for (const id of ['statFrom', 'statTo']) {
    document.getElementById(id).addEventListener('change', () => {
      let from = document.getElementById('statFrom').value;
      let to = document.getElementById('statTo').value;
      if (from && to && from > to) {
        state.stats.customFrom = to;
        state.stats.customTo = from;
      } else {
        state.stats.customFrom = from;
        state.stats.customTo = to;
      }
      state.stats.range = 'custom';
      renderStats();
    });
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

function init() {
  state = loadState();
  const petMigration = migratePetCategory();
  let appliedCustomCategories = false;
  let migratedDefinitions = false;
  let migratedFood = false;
  if (!state.settings.customMode) {
    state.settings.customMode = true;
    state.settings.customCategories = myCategorySeed();
    remapRecordsAfterCategoryChange();
    saveState();
    appliedCustomCategories = true;
  }
  if (migrateCategoryDefinitions()) migratedDefinitions = true;
  if (migrateCategoryDefinitionsV3()) migratedFood = true;
  if (petMigration.added || petMigration.moved || petMigration.cleaned) saveState();
  initControls();
  const voiceBtn = document.getElementById('voiceBtn');
  if (window.SpeechRecognition || window.webkitSpeechRecognition) voiceBtn.hidden = false;
  bindEvents();
  render();
  if (appliedCustomCategories) toast('已使用新的 13 个分类');
  else if (petMigration.added || petMigration.moved) toast(petMigration.moved ? `已迁移 ${petMigration.moved} 条宠物记录到「宠物」` : '已新增「宠物」分类');
  else if (migratedDefinitions) toast('已新增「日用」并更新买菜、餐饮定义');
  else if (migratedFood) toast('已更新餐饮分类定义');
}

init();
