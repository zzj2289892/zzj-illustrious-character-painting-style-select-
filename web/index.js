if (!window.Promise) {
    console.warn('浏览器不支持Promise，部分功能可能无法使用');
}

const PINYIN_DICT = {
    '阿': 'a', '啊': 'a', '安': 'an', '按': 'an', '爱': 'ai', '艾': 'ai', '安': 'an',
    '八': 'ba', '巴': 'ba', '白': 'bai', '百': 'bai', '北': 'bei', '本': 'ben', '边': 'bian',
    '不': 'bu', '布': 'bu', '步': 'bu', '部': 'bu', '被': 'bei', '比': 'bi', '必': 'bi',
    '变': 'bian', '表': 'biao', '别': 'bie', '并': 'bing', '波': 'bo', '伯': 'bo',
    '才': 'cai', '采': 'cai', '菜': 'cai', '参': 'can', '仓': 'cang', '操': 'cao',
    '草': 'cao', '层': 'ceng', '查': 'cha', '长': 'chang', '常': 'chang', '场': 'chang',
    '车': 'che', '成': 'cheng', '城': 'cheng', '程': 'cheng', '吃': 'chi', '持': 'chi',
    '初': 'chu', '出': 'chu', '处': 'chu', '传': 'chuan', '创': 'chuang', '春': 'chun',
    '次': 'ci', '从': 'cong', '村': 'cun', '错': 'cuo', '大': 'da', '达': 'da', '打': 'da',
    '代': 'dai', '带': 'dai', '待': 'dai', '单': 'dan', '但': 'dan', '当': 'dang',
    '党': 'dang', '到': 'dao', '道': 'dao', '得': 'de', '的': 'de', '地': 'de', '灯': 'deng',
    '等': 'deng', '低': 'di', '底': 'di', '点': 'dian', '电': 'dian', '店': 'dian',
    '调': 'diao', '定': 'ding', '东': 'dong', '动': 'dong', '都': 'dou', '度': 'du',
    '短': 'duan', '段': 'duan', '对': 'dui', '多': 'duo', '儿': 'er', '二': 'er',
    '发': 'fa', '法': 'fa', '翻': 'fan', '反': 'fan', '饭': 'fan', '方': 'fang',
    '房': 'fang', '放': 'fang', '飞': 'fei', '非': 'fei', '分': 'fen', '风': 'feng',
    '封': 'feng', '佛': 'fo', '否': 'fou', '夫': 'fu', '服': 'fu', '府': 'fu', '父': 'fu',
    '复': 'fu', '该': 'gai', '改': 'gai', '干': 'gan', '感': 'gan', '刚': 'gang',
    '高': 'gao', '告': 'gao', '哥': 'ge', '歌': 'ge', '格': 'ge', '个': 'ge', '各': 'ge',
    '给': 'gei', '根': 'gen', '更': 'geng', '工': 'gong', '公': 'gong', '共': 'gong',
    '古': 'gu', '谷': 'gu', '骨': 'gu', '固': 'gu', '关': 'guan', '观': 'guan',
    '官': 'guan', '光': 'guang', '广': 'guang', '归': 'gui', '规': 'gui', '国': 'guo',
    '果': 'guo', '过': 'guo', '海': 'hai', '害': 'hai', '含': 'han', '寒': 'han',
    '汉': 'han', '好': 'hao', '号': 'hao', '合': 'he', '何': 'he', '和': 'he', '河': 'he',
    '黑': 'hei', '很': 'hen', '红': 'hong', '后': 'hou', '候': 'hou', '湖': 'hu',
    '虎': 'hu', '户': 'hu', '花': 'hua', '化': 'hua', '话': 'hua', '坏': 'huai',
    '欢': 'huan', '还': 'huan', '换': 'huan', '黄': 'huang', '回': 'hui', '会': 'hui',
    '婚': 'hun', '活': 'huo', '火': 'huo', '或': 'huo', '机': 'ji', '基': 'ji', '级': 'ji',
    '极': 'ji', '几': 'ji', '己': 'ji', '记': 'ji', '技': 'ji', '际': 'ji', '济': 'ji',
    '加': 'jia', '家': 'jia', '价': 'jia', '假': 'jia', '间': 'jian', '建': 'jian',
    '健': 'jian', '见': 'jian', '件': 'jian', '江': 'jiang', '将': 'jiang', '讲': 'jiang',
    '交': 'jiao', '教': 'jiao', '角': 'jiao', '脚': 'jiao', '叫': 'jiao', '接': 'jie',
    '街': 'jie', '节': 'jie', '结': 'jie', '解': 'jie', '姐': 'jie', '界': 'jie',
    '金': 'jin', '近': 'jin', '进': 'jin', '京': 'jing', '经': 'jing', '精': 'jing',
    '景': 'jing', '静': 'jing', '九': 'jiu', '久': 'jiu', '酒': 'jiu', '旧': 'jiu',
    '就': 'jiu', '局': 'ju', '举': 'ju', '巨': 'ju', '具': 'ju', '决': 'jue', '觉': 'jue',
    '军': 'jun', '开': 'kai', '看': 'kan', '康': 'kang', '考': 'kao', '科': 'ke',
    '可': 'ke', '克': 'ke', '客': 'ke', '空': 'kong', '口': 'kou', '苦': 'ku', '快': 'kuai',
    '块': 'kuai', '拉': 'la', '来': 'lai', '兰': 'lan', '蓝': 'lan', '老': 'lao', '乐': 'le',
    '了': 'le', '雷': 'lei', '类': 'lei', '冷': 'leng', '离': 'li', '李': 'li', '里': 'li',
    '理': 'li', '力': 'li', '历': 'li', '立': 'li', '利': 'li', '连': 'lian', '联': 'lian',
    '脸': 'lian', '良': 'liang', '两': 'liang', '亮': 'liang', '林': 'lin', '临': 'lin',
    '灵': 'ling', '刘': 'liu', '六': 'liu', '龙': 'long', '楼': 'lou', '路': 'lu',
    '录': 'lu', '旅': 'lv', '绿': 'lv', '乱': 'luan', '论': 'lun', '落': 'luo',
    '妈': 'ma', '马': 'ma', '买': 'mai', '卖': 'mai', '满': 'man', '慢': 'man',
    '忙': 'mang', '毛': 'mao', '猫': 'mao', '么': 'me', '没': 'mei', '美': 'mei',
    '妹': 'mei', '门': 'men', '们': 'men', '米': 'mi', '面': 'mian', '民': 'min',
    '名': 'ming', '明': 'ming', '命': 'ming', '母': 'mu', '木': 'mu', '目': 'mu',
    '拿': 'na', '那': 'na', '南': 'nan', '男': 'nan', '难': 'nan', '内': 'nei',
    '能': 'neng', '你': 'ni', '年': 'nian', '鸟': 'niao', '牛': 'niu', '农': 'nong',
    '女': 'nv', '欧': 'ou', '怕': 'pa', '排': 'pai', '判': 'pan', '旁': 'pang',
    '胖': 'pang', '跑': 'pao', '朋': 'peng', '皮': 'pi', '片': 'pian', '品': 'pin',
    '平': 'ping', '破': 'po', '七': 'qi', '期': 'qi', '其': 'qi', '奇': 'qi', '气': 'qi',
    '起': 'qi', '器': 'qi', '千': 'qian', '前': 'qian', '钱': 'qian', '浅': 'qian',
    '强': 'qiang', '桥': 'qiao', '切': 'qie', '亲': 'qin', '青': 'qing', '清': 'qing',
    '情': 'qing', '请': 'qing', '秋': 'qiu', '求': 'qiu', '区': 'qu', '去': 'qu',
    '曲': 'qu', '全': 'quan', '权': 'quan', '确': 'que', '然': 'ran', '让': 'rang',
    '热': 're', '人': 'ren', '认': 'ren', '日': 'ri', '容': 'rong', '色': 'se',
    '山': 'shan', '善': 'shan', '上': 'shang', '少': 'shao', '社': 'she', '设': 'she',
    '身': 'shen', '深': 'shen', '神': 'shen', '生': 'sheng', '声': 'sheng', '胜': 'sheng',
    '十': 'shi', '时': 'shi', '实': 'shi', '识': 'shi', '史': 'shi', '使': 'shi',
    '始': 'shi', '市': 'shi', '示': 'shi', '世': 'shi', '事': 'shi', '式': 'shi',
    '手': 'shou', '首': 'shou', '受': 'shou', '书': 'shu', '术': 'shu', '树': 'shu',
    '数': 'shu', '水': 'shui', '说': 'shuo', '思': 'si', '死': 'si', '四': 'si',
    '送': 'song', '苏': 'su', '速': 'su', '算': 'suan', '随': 'sui', '岁': 'sui',
    '孙': 'sun', '所': 'suo', '他': 'ta', '它': 'ta', '她': 'ta', '台': 'tai',
    '太': 'tai', '谈': 'tan', '汤': 'tang', '堂': 'tang', '特': 'te', '提': 'ti',
    '题': 'ti', '体': 'ti', '天': 'tian', '田': 'tian', '条': 'tiao', '铁': 'tie',
    '听': 'ting', '庭': 'ting', '通': 'tong', '同': 'tong', '头': 'tou', '图': 'tu',
    '土': 'tu', '团': 'tuan', '推': 'tui', '外': 'wai', '完': 'wan', '玩': 'wan',
    '万': 'wan', '王': 'wang', '网': 'wang', '往': 'wang', '忘': 'wang', '望': 'wang',
    '危': 'wei', '为': 'wei', '位': 'wei', '委': 'wei', '文': 'wen', '问': 'wen',
    '我': 'wo', '五': 'wu', '午': 'wu', '武': 'wu', '物': 'wu', '务': 'wu', '误': 'wu',
    '西': 'xi', '希': 'xi', '息': 'xi', '席': 'xi', '习': 'xi', '喜': 'xi', '戏': 'xi',
    '系': 'xi', '细': 'xi', '下': 'xia', '夏': 'xia', '先': 'xian', '县': 'xian',
    '现': 'xian', '线': 'xian', '相': 'xiang', '香': 'xiang', '想': 'xiang', '向': 'xiang',
    '象': 'xiang', '像': 'xiang', '小': 'xiao', '校': 'xiao', '笑': 'xiao', '效': 'xiao',
    '些': 'xie', '写': 'xie', '谢': 'xie', '心': 'xin', '新': 'xin', '信': 'xin',
    '星': 'xing', '行': 'xing', '形': 'xing', '性': 'xing', '姓': 'xing', '兄': 'xiong',
    '休': 'xiu', '修': 'xiu', '秀': 'xiu', '需': 'xu', '许': 'xu', '学': 'xue',
    '雪': 'xue', '血': 'xue', '言': 'yan', '研': 'yan', '眼': 'yan', '演': 'yan',
    '羊': 'yang', '阳': 'yang', '洋': 'yang', '样': 'yang', '要': 'yao', '药': 'yao',
    '也': 'ye', '业': 'ye', '叶': 'ye', '页': 'ye', '夜': 'ye', '一': 'yi', '衣': 'yi',
    '医': 'yi', '已': 'yi', '以': 'yi', '意': 'yi', '义': 'yi', '艺': 'yi', '易': 'yi',
    '益': 'yi', '因': 'yin', '音': 'yin', '阴': 'yin', '引': 'yin', '英': 'ying',
    '应': 'ying', '营': 'ying', '影': 'ying', '映': 'ying', '硬': 'ying', '永': 'yong',
    '用': 'yong', '优': 'you', '由': 'you', '油': 'you', '游': 'you', '友': 'you',
    '有': 'you', '又': 'you', '右': 'you', '幼': 'you', '鱼': 'yu', '雨': 'yu',
    '语': 'yu', '玉': 'yu', '育': 'yu', '元': 'yuan', '原': 'yuan', '员': 'yuan',
    '园': 'yuan', '圆': 'yuan', '远': 'yuan', '院': 'yuan', '月': 'yue', '乐': 'yue',
    '越': 'yue', '云': 'yun', '运': 'yun', '再': 'zai', '在': 'zai', '咱': 'zan',
    '早': 'zao', '造': 'zao', '则': 'ze', '责': 'ze', '怎': 'zen', '曾': 'zeng',
    '张': 'zhang', '章': 'zhang', '长': 'zhang', '找': 'zhao', '照': 'zhao', '着': 'zhao',
    '真': 'zhen', '争': 'zheng', '正': 'zheng', '政': 'zheng', '之': 'zhi', '支': 'zhi',
    '知': 'zhi', '直': 'zhi', '指': 'zhi', '至': 'zhi', '志': 'zhi', '制': 'zhi',
    '治': 'zhi', '中': 'zhong', '忠': 'zhong', '终': 'zhong', '种': 'zhong', '重': 'zhong',
    '周': 'zhou', '州': 'zhou', '主': 'zhu', '住': 'zhu', '助': 'zhu', '注': 'zhu',
    '专': 'zhuan', '转': 'zhuan', '装': 'zhuang', '状': 'zhuang', '准': 'zhun',
    '着': 'zhuo', '子': 'zi', '字': 'zi', '自': 'zi', '总': 'zong', '走': 'zou',
    '足': 'zu', '族': 'zu', '组': 'zu', '最': 'zui', '罪': 'zui', '左': 'zuo',
    '作': 'zuo', '做': 'zuo', '坐': 'zuo', '座': 'zuo',
    '孙': 'sun', '悟': 'wu', '空': 'kong', '猪': 'zhu', '戒': 'jie', '沙': 'sha',
    '僧': 'seng', '唐': 'tang', '三': 'san', '藏': 'zang', '白': 'bai', '骨': 'gu',
    '精': 'jing', '红': 'hong', '孩': 'hai', '儿': 'er', '牛': 'niu', '魔': 'mo',
    '王': 'wang', '铁': 'tie', '扇': 'shan', '公': 'gong', '主': 'zhu', '龙': 'long',
    '太': 'tai', '子': 'zi', '哪': 'na', '吒': 'zha', '杨': 'yang', '戬': 'jian',
    '嫦': 'chang', '娥': 'e', '后': 'hou', '羿': 'yi', '女': 'nv', '娲': 'wa',
    '伏': 'fu', '羲': 'xi', '黄': 'huang', '帝': 'di', '炎': 'yan', '蚩': 'chi',
    '尤': 'you', '刑': 'xing', '天': 'tian', '共': 'gong', '工': 'gong', '祝': 'zhu',
    '融': 'rong', '女': 'nv', '英': 'ying', '招': 'zhao', '财': 'cai', '进': 'jin',
    '宝': 'bao', '福': 'fu', '禄': 'lu', '寿': 'shou', '喜': 'xi', '神': 'shen',
    '仙': 'xian', '圣': 'sheng', '佛': 'fo', '祖': 'zu', '菩': 'pu', '萨': 'sa',
    '罗': 'luo', '汉': 'han', '金': 'jin', '刚': 'gang', '韦': 'wei', '护': 'hu',
    '法': 'fa', '天': 'tian', '王': 'wang', '增': 'zeng', '长': 'zhang', '广': 'guang',
    '目': 'mu', '多': 'duo', '闻': 'wen', '国': 'guo', '托': 'tuo', '塔': 'ta',
    '李': 'li', '靖': 'jing', '哪': 'na', '吒': 'zha', '木': 'mu', '吒': 'zha',
    '金': 'jin', '吒': 'zha', '雷': 'lei', '震': 'zhen', '子': 'zi', '文': 'wen',
    '殊': 'shu', '普': 'pu', '贤': 'xian', '地': 'di', '藏': 'zang', '王': 'wang',
    '千': 'qian', '手': 'shou', '观': 'guan', '音': 'yin', '弥': 'mi', '勒': 'le',
    '阿': 'a', '难': 'nan', '迦': 'jia', '叶': 'ye', '达': 'da', '摩': 'mo',
    '祖': 'zu', '师': 'shi', '惠': 'hui', '能': 'neng', '玄': 'xuan', '奘': 'zang',
    '法': 'fa', '海': 'hai', '许': 'xu', '仙': 'xian', '白': 'bai', '素': 'su',
    '贞': 'zhen', '小': 'xiao', '青': 'qing', '断': 'duan', '桥': 'qiao', '相': 'xiang',
    '会': 'hui', '水': 'shui', '漫': 'man', '金': 'jin', '山': 'shan', '雷': 'lei',
    '峰': 'feng', '塔': 'ta', '梁': 'liang', '山': 'shan', '伯': 'bo', '祝': 'zhu',
    '英': 'ying', '台': 'tai', '化': 'hua', '蝶': 'die', '双': 'shuang', '飞': 'fei',
    '牛': 'niu', '郎': 'lang', '织': 'zhi', '女': 'nv', '鹊': 'que', '桥': 'qiao',
    '会': 'hui', '七': 'qi', '夕': 'xi', '孟': 'meng', '姜': 'jiang', '女': 'nv',
    '哭': 'ku', '长': 'chang', '城': 'cheng', '花': 'hua', '木': 'mu', '兰': 'lan',
    '替': 'ti', '父': 'fu', '从': 'cong', '军': 'jun', '穆': 'mu', '桂': 'gui',
    '英': 'ying', '挂': 'gua', '帅': 'shuai', '樊': 'fan', '梨': 'li', '花': 'hua',
    '薛': 'xue', '丁': 'ding', '山': 'shan', '杨': 'yang', '门': 'men', '女': 'nv',
    '将': 'jiang', '佘': 'she', '太': 'tai', '君': 'jun'
};

function getPinyin(str) {
    if (!str) return '';
    let pinyin = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (PINYIN_DICT[char]) {
            pinyin += PINYIN_DICT[char];
        } else if (/[a-zA-Z0-9]/.test(char)) {
            pinyin += char.toLowerCase();
        }
    }
    return pinyin;
}

function matchPinyin(text, query) {
    if (!query || !text) return false;
    
    const queryLower = query.toLowerCase();
    const queryPinyin = queryLower.replace(/[^a-z0-9]/g, '');
    
    if (queryPinyin.length === 0) return false;
    
    const textPinyin = getPinyin(text);
    
    if (textPinyin.includes(queryPinyin)) {
        return true;
    }
    
    const textPinyinInitials = getPinyinInitials(text);
    if (textPinyinInitials.includes(queryPinyin)) {
        return true;
    }
    
    return false;
}

function getPinyinInitials(str) {
    if (!str) return '';
    let initials = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (PINYIN_DICT[char]) {
            initials += PINYIN_DICT[char][0];
        } else if (/[a-zA-Z0-9]/.test(char)) {
            initials += char.toLowerCase();
        }
    }
    return initials;
}

class CharacterSearch {
    constructor() {
        this.zhTWData = {};
        this.imageCache = {};
        this.loadedFiles = new Set();
        this.currentCharacter = null;
        this.debounceTimer = null;
        this.db = null;
        this.useIndexedDB = true;
        this.browserInfo = this.detectBrowser();
        this.pageSize = 50;
        this.currentPage = 1;
        this.allResults = [];
        this.isRendering = false;
        this.favorites = [];
        this.showFavoritesOnly = false;
        this.batchMode = false;
        this.selectedCharacters = new Set();
        this.characterTags = {};
        this.allTags = [];
        this.selectedTags = new Set();
        this.currentAddTags = [];
        this.currentEditTags = [];
        this.tagFilterInitialized = false;
        this.draggedItem = null;
        this.dragOverItem = null;
        this.promptsConfig = null;
        this.selectedPromptTags = new Set();
        this.currentCharacterForPrompt = null;
        this.promptFavorites = [];
        this.isPromptManuallyEdited = false;
        console.log('检测到浏览器:', this.browserInfo);
        this.init();
    }

    detectBrowser() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Edg') > -1) {
            return 'Microsoft Edge';
        } else if (userAgent.indexOf('Chrome') > -1) {
            return 'Chrome';
        } else if (userAgent.indexOf('Safari') > -1) {
            return 'Safari';
        } else if (userAgent.indexOf('Firefox') > -1) {
            return 'Firefox';
        } else {
            return 'Unknown';
        }
    }

    async init() {
        try {
            await this.initIndexedDB();
        } catch (error) {
            console.error('IndexedDB初始化失败:', error);
            this.useIndexedDB = false;
        }
        
        this.loadFavorites();
        this.loadTags();
        this.loadPromptFavorites();
        this.loadSelectedTags();
        this.loadSearchState();
        await this.loadData();
        await this.loadPromptsConfig();
        this.bindEvents();
        this.bindAddCharacterEvents();
        this.bindPromptBuilderEvents();
        
        setTimeout(() => {
            this.initEditCharacterModal();
        }, 500);
        
        this.displayAllCharacters();
        
        const tagFilterVisible = localStorage.getItem('tagFilterVisible') === 'true';
        if (tagFilterVisible || this.selectedTags.size > 0) {
            const tagFilterBtn = document.getElementById('tagFilterBtn');
            const tagFilterContainer = document.getElementById('tagFilterContainer');
            if (tagFilterBtn && tagFilterContainer) {
                tagFilterBtn.classList.add('active');
                tagFilterContainer.style.display = 'block';
                this.renderTagFilter();
                this.initTagFilterEvents();
            }
        }
    }

    async initIndexedDB() {
        return new Promise((resolve) => {
            if (!window.indexedDB) {
                console.warn('IndexedDB不支持，将使用localStorage');
                this.useIndexedDB = false;
                resolve();
                return;
            }

            try {
                const request = indexedDB.open('CharacterImageCache', 1);

                request.onerror = () => {
                    console.warn('IndexedDB初始化失败，将使用localStorage');
                    this.useIndexedDB = false;
                    resolve();
                };

                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    console.log('IndexedDB初始化成功');
                    resolve();
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains('images')) {
                        db.createObjectStore('images', { keyPath: 'key' });
                    }
                };

                request.onblocked = () => {
                    console.warn('IndexedDB被阻止，将使用localStorage');
                    this.useIndexedDB = false;
                    resolve();
                };
            } catch (error) {
                console.error('IndexedDB初始化异常:', error);
                this.useIndexedDB = false;
                resolve();
            }
        });
    }

    async loadImageFromDB(key) {
        if (!this.useIndexedDB || !this.db) {
            return null;
        }

        return new Promise((resolve) => {
            const transaction = this.db.transaction(['images'], 'readonly');
            const store = transaction.objectStore('images');
            const request = store.get(key);

            request.onsuccess = () => {
                resolve(request.result ? request.result.value : null);
            };

            request.onerror = () => {
                resolve(null);
            };
        });
    }

    async saveImageToDB(key, value) {
        if (!this.useIndexedDB || !this.db) {
            return false;
        }

        return new Promise((resolve) => {
            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            const request = store.put({ key, value });

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                resolve(false);
            };
        });
    }

    async deleteImageFromDB(key) {
        if (!this.useIndexedDB || !this.db) {
            return false;
        }

        return new Promise((resolve) => {
            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            const request = store.delete(key);

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                resolve(false);
            };
        });
    }

    async loadData() {
        try {
            const zhResponse = await fetch('./zh_CN.json');
            this.zhTWData = await zhResponse.json();
            
            await this.loadImageCache();
            this.displayAllCharacters();
           
        } catch (error) {
            console.error('加载数据失败:', error);
            this.showError('加载数据失败，请检查文件路径');
        }
    }

    async loadImageCache() {
        if (this.useIndexedDB) {
            await this.loadImageCacheFromDB();
        } else {
            this.loadImageCacheFromLocalStorage();
        }
    }

    async loadImageCacheFromDB() {
        try {
            const transaction = this.db.transaction(['images'], 'readonly');
            const store = transaction.objectStore('images');
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result || [];
                this.imageCache = {};
                results.forEach(item => {
                    this.imageCache[item.key] = item.value;
                });
                console.log('从IndexedDB加载了', Object.keys(this.imageCache).length, '张图片');
            };

            request.onerror = () => {
                console.warn('从IndexedDB加载缓存失败');
            };
        } catch (error) {
            console.warn('加载IndexedDB缓存失败:', error);
        }
    }

    loadImageCacheFromLocalStorage() {
        try {
            const cachedData = localStorage.getItem('imageCache');
            if (cachedData) {
                this.imageCache = JSON.parse(cachedData);
                console.log('从localStorage加载了', Object.keys(this.imageCache).length, '张图片');
            }
        } catch (error) {
            console.warn('加载localStorage缓存失败:', error);
        }
    }

    async saveImageCache() {
        if (this.useIndexedDB) {
            await this.saveImageCacheToDB();
        } else {
            this.saveImageCacheToLocalStorage();
        }
    }

    async saveImageCacheToDB() {
        try {
            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            
            for (const [key, value] of Object.entries(this.imageCache)) {
                store.put({ key, value });
            }

            console.log('已保存到IndexedDB');
        } catch (error) {
            console.warn('保存到IndexedDB失败:', error);
        }
    }

    saveImageCacheToLocalStorage() {
        try {
            localStorage.setItem('imageCache', JSON.stringify(this.imageCache));
        } catch (error) {
            console.warn('保存到localStorage失败:', error);
        }
    }

    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const randomArtistBtn = document.getElementById('randomArtistBtn');
        const favoritesBtn = document.getElementById('favoritesBtn');
        const batchModeBtn = document.getElementById('batchModeBtn');
        const batchExportBtn = document.getElementById('batchExportBtn');
        const batchImportBtn = document.getElementById('batchImportBtn');
        const batchDeleteBtn = document.getElementById('batchDeleteBtn');
        const importFileInput = document.getElementById('importFileInput');
        const tagFilterBtn = document.getElementById('tagFilterBtn');
        const clearTagFilterBtn = document.getElementById('clearTagFilterBtn');
        const themeToggleBtn = document.getElementById('themeToggleBtn');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                this.debounceSearch(query);
            } else {
                this.saveSearchState('');
                this.displayAllCharacters();
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    this.searchCharacters(query);
                } else {
                    this.saveSearchState('');
                    this.displayAllCharacters();
                }
            }
        });

        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                this.searchCharacters(query);
            } else {
                this.displayAllCharacters();
            }
        });

        randomArtistBtn.addEventListener('click', () => {
            window.location.href = 'random_artist.php';
        });

        favoritesBtn.addEventListener('click', () => {
            this.toggleFavoritesView();
        });

        batchModeBtn.addEventListener('click', () => {
            this.toggleBatchMode();
        });

        batchExportBtn.addEventListener('click', () => {
            this.batchExport();
        });

        batchImportBtn.addEventListener('click', () => {
            importFileInput.click();
        });

        importFileInput.addEventListener('change', (e) => {
            this.batchImport(e.target.files[0]);
        });

        batchDeleteBtn.addEventListener('click', () => {
            this.batchDelete();
        });

        const batchEditTagsBtn = document.getElementById('batchEditTagsBtn');
        batchEditTagsBtn.addEventListener('click', () => {
            this.openBatchEditTagsModal();
        });

        tagFilterBtn.addEventListener('click', () => {
            this.toggleTagFilter();
        });

        clearTagFilterBtn.addEventListener('click', () => {
            this.clearTagFilter();
        });

        const resetSortBtn = document.getElementById('resetSortBtn');
        if (resetSortBtn) {
            resetSortBtn.addEventListener('click', () => {
                this.resetCustomOrder();
            });
        }

        themeToggleBtn.addEventListener('click', () => {
            this.toggleTheme();
        });

        const shortcutHelpBtn = document.getElementById('shortcutHelpBtn');
        const shortcutHelpModal = document.getElementById('shortcutHelpModal');
        const shortcutCloseBtn = document.getElementById('shortcutCloseBtn');

        if (shortcutHelpBtn && shortcutHelpModal) {
            shortcutHelpBtn.addEventListener('click', () => {
                shortcutHelpModal.style.display = 'flex';
            });

            shortcutCloseBtn.addEventListener('click', () => {
                shortcutHelpModal.style.display = 'none';
            });

            shortcutHelpModal.addEventListener('click', (e) => {
                if (e.target === shortcutHelpModal) {
                    shortcutHelpModal.style.display = 'none';
                }
            });
        }

        const metadataBtn = document.getElementById('metadataBtn');
        if (metadataBtn) {
            metadataBtn.addEventListener('click', () => {
                try {
                    window.location.href = 'yuanshuju.html';
                } catch (error) {
                    console.error('跳转失败:', error);
                    alert('跳转失败，请检查文件路径是否正确。');
                }
            });
        }

        this.initTheme();
        this.initKeyboardShortcuts();
    }

    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            const isInputFocused = document.activeElement.tagName === 'INPUT' || 
                                   document.activeElement.tagName === 'TEXTAREA';
            
            if (e.key === 'Escape') {
                this.closeAllModals();
                return;
            }
            
            if (isInputFocused) return;
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                this.focusSearch();
                return;
            }
            
            if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.focusSearch();
                return;
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openAddCharacterModal();
                return;
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleBatchMode();
                return;
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.goToPrevPage();
                return;
            }
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.goToNextPage();
                return;
            }
            
            if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.toggleFavoritesView();
                return;
            }
            
            if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.toggleTagFilter();
                return;
            }
        });
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
        
        const tagFilterContainer = document.getElementById('tagFilterContainer');
        if (tagFilterContainer && tagFilterContainer.style.display !== 'none') {
            this.toggleTagFilter();
        }

        const shortcutHelpModal = document.getElementById('shortcutHelpModal');
        if (shortcutHelpModal && shortcutHelpModal.style.display !== 'none') {
            shortcutHelpModal.style.display = 'none';
        }
    }

    focusSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }

    openAddCharacterModal() {
        const addCharacterBtn = document.getElementById('addCharacterBtn');
        if (addCharacterBtn) {
            addCharacterBtn.click();
        }
    }

    goToPrevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.displayResults(this.allResults, '');
            this.scrollToResults();
        }
    }

    goToNextPage() {
        const totalPages = Math.ceil(this.allResults.length / this.pageSize);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.displayResults(this.allResults, '');
            this.scrollToResults();
        }
    }

    scrollToResults() {
        const container = document.getElementById('resultsContainer');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            this.updateThemeIcon(true);
        } else {
            this.updateThemeIcon(false);
        }
    }

    toggleTheme() {
        const body = document.body;
        const isDarkMode = body.classList.toggle('dark-mode');
        
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        this.updateThemeIcon(isDarkMode);
    }

    updateThemeIcon(isDarkMode) {
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const icon = themeToggleBtn.querySelector('i');
        
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    debounceSearch(query) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.searchCharacters(query);
        }, 300);
    }

    searchCharacters(query) {
        const hasTagFilter = this.selectedTags.size > 0;
        
        if (!query.trim() && !hasTagFilter) {
            this.displayAllCharacters();
            return;
        }

        const container = document.getElementById('resultsContainer');
        const skeletonContainer = document.getElementById('skeletonContainer');
        
        container.style.display = 'none';
        skeletonContainer.style.display = 'block';

        setTimeout(() => {
            const results = this.performSearch(query);
            this.currentPage = 1;
            this.allResults = results;
            this.saveSearchState(query);
            this.displayResults(results, query);
        }, 300);
    }

    displayAllCharacters() {
        this.allResults = [];
        
        const hasTagFilter = this.selectedTags.size > 0;
        
        for (const [chineseName, englishPrompt] of Object.entries(this.zhTWData)) {
            let matchesTags = true;
            if (hasTagFilter) {
                const characterTags = this.getCharacterTags(chineseName);
                matchesTags = Array.from(this.selectedTags).some(tag => characterTags.includes(tag));
            }
            
            if (matchesTags) {
                this.allResults.push({
                    chineseName: chineseName,
                    englishPrompt: englishPrompt
                });
            }
        }

        const totalPages = Math.ceil(this.allResults.length / this.pageSize);
        if (this.currentPage > totalPages) {
            this.currentPage = Math.max(1, totalPages);
        }
        
        this.displayResults(this.allResults, '');
    }

    performSearch(query) {
        const results = [];
        const hasTagFilter = this.selectedTags.size > 0;

        for (const [chineseName, englishPrompt] of Object.entries(this.zhTWData)) {
            const matchesQuery = !query || 
                chineseName.toLowerCase().includes(query.toLowerCase()) || 
                englishPrompt.toLowerCase().includes(query.toLowerCase()) ||
                matchPinyin(chineseName, query);
            
            let matchesTags = true;
            if (hasTagFilter) {
                const characterTags = this.getCharacterTags(chineseName);
                matchesTags = Array.from(this.selectedTags).some(tag => characterTags.includes(tag));
            }

            if (matchesQuery && matchesTags) {
                results.push({
                    chineseName: chineseName,
                    englishPrompt: englishPrompt
                });
            }
        }

        return results;
    }

    displayResults(results, query) {
        this.isRendering = false;
        
        const container = document.getElementById('resultsContainer');
        const skeletonContainer = document.getElementById('skeletonContainer');
        
        if (results.length === 0) {
            container.style.display = 'block';
            skeletonContainer.style.display = 'none';
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search-minus fa-2x mb-3 text-muted"></i>
                    <p>未找到相关角色</p>
                </div>
            `;
            return;
        }

        const totalPages = Math.ceil(results.length / this.pageSize);
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        
        const orderedResults = this.applyCustomOrder(results, query);
        const pageResults = orderedResults.slice(startIndex, endIndex);

        let html = `
            <div class="pagination-info">
                <span>显示 ${startIndex + 1}-${Math.min(endIndex, results.length)} / 共 ${results.length} 个角色</span>
                <div class="pagination-controls">
                    <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="prev">
                        <i class="fas fa-chevron-left"></i> 上一页
                    </button>
                    <span class="page-number">第 ${this.currentPage} / ${totalPages} 页</span>
                    <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="next">
                        下一页 <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="character-list">
        `;

        html += pageResults.map((result, index) => {
            const isFavorite = this.isFavorite(result.chineseName);
            const tags = this.getCharacterTags(result.chineseName);
            const tagsHtml = tags.length > 0 
                ? `<div class="character-tags">${tags.map(tag => `<span class="character-tag">${this.escapeHtml(tag)}</span>`).join('')}</div>`
                : '';
            const escapedName = this.escapeAttr(result.chineseName);
            const escapedPrompt = this.escapeAttr(result.englishPrompt);
            const isSelected = this.selectedCharacters.has(result.chineseName);
            const selectedClass = this.batchMode && isSelected ? 'batch-selected' : '';
            return `
            <div class="character-item fade-in ${!this.batchMode ? 'draggable' : ''} ${selectedClass}" 
                 data-index="${startIndex + index}" 
                 data-character="${escapedName}" 
                 data-prompt="${escapedPrompt}"
                 ${!this.batchMode ? 'draggable="true"' : ''}>
                ${this.batchMode ? `
                <div class="character-checkbox">
                    <input type="checkbox" class="batch-checkbox" data-chinese-name="${escapedName}" ${isSelected ? 'checked' : ''}>
                </div>
                ` : `
                <div class="drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                `}
                <div class="character-content">
                    <div class="character-name">${query ? this.highlightMatch(result.chineseName, query) : this.escapeHtml(result.chineseName)}</div>
                    <div class="character-prompt">${this.escapeHtml(result.englishPrompt)}</div>
                    ${tagsHtml}
                </div>
                <div class="character-actions">
                    <button class="btn btn-sm btn-outline-primary edit-btn" data-chinese-name="${escapedName}" data-english-prompt="${escapedPrompt}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger favorite-btn ${isFavorite ? 'active' : ''}" data-chinese-name="${escapedName}">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        }).join('');

        html += '</div>';

        container.innerHTML = html;
        container.style.display = 'block';
        skeletonContainer.style.display = 'none';

        if (!this.batchMode) {
            this.initDragAndDrop(query);
        }

        container.querySelector('.pagination-controls').addEventListener('click', (e) => {
            const btn = e.target.closest('.pagination-btn');
            if (!btn || btn.disabled) return;
            
            const page = btn.dataset.page;
            if (page === 'prev' && this.currentPage > 1) {
                this.currentPage--;
            } else if (page === 'next' && this.currentPage < totalPages) {
                this.currentPage++;
            }
            
            container.style.display = 'none';
            skeletonContainer.style.display = 'block';
            
            setTimeout(() => {
                this.displayResults(results, query);
            }, 200);
        });

        container.querySelector('.character-list').addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-btn');
            if (editBtn) {
                e.stopPropagation();
                const chineseName = editBtn.dataset.chineseName;
                const englishPrompt = editBtn.dataset.englishPrompt;
                this.openEditCharacterModal(chineseName, englishPrompt);
                return;
            }
            
            const favoriteBtn = e.target.closest('.favorite-btn');
            if (favoriteBtn) {
                e.stopPropagation();
                const chineseName = favoriteBtn.dataset.chineseName;
                this.toggleFavorite(chineseName);
                return;
            }
            
            const characterItem = e.target.closest('.character-item');
            if (characterItem) {
                if (this.batchMode) {
                    const chineseName = characterItem.dataset.character;
                    const batchCheckbox = characterItem.querySelector('.batch-checkbox');
                    
                    if (this.selectedCharacters.has(chineseName)) {
                        this.selectedCharacters.delete(chineseName);
                        if (batchCheckbox) batchCheckbox.checked = false;
                        characterItem.classList.remove('batch-selected');
                    } else {
                        this.selectedCharacters.add(chineseName);
                        if (batchCheckbox) batchCheckbox.checked = true;
                        characterItem.classList.add('batch-selected');
                    }
                    this.updateBatchButtons();
                } else {
                    this.selectCharacter(characterItem);
                }
            }
        });
    }

    async selectCharacter(element) {
        document.querySelectorAll('.character-item').forEach(item => {
            item.classList.remove('active');
        });

        element.classList.add('active');
        const characterName = element.dataset.character;
        
        const englishPrompt = this.zhTWData[characterName];
        if (englishPrompt) {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(englishPrompt)
                    .then(() => {
                        this.showCopySuccess(englishPrompt);
                    })
                    .catch(err => {
                        console.error('复制失败:', err);
                        this.fallbackCopyToClipboard(englishPrompt);
                    });
            } else {
                this.fallbackCopyToClipboard(englishPrompt);
            }
        }
        
        this.currentCharacter = {
            chineseName: characterName,
            englishPrompt: englishPrompt
        };
        
        this.updatePromptCharacter(this.currentCharacter);
        
        await this.displayCharacter(characterName);
    }

    showNotification(message, type = 'success', duration = 2000) {
        const existingToasts = document.querySelectorAll('.notification-toast');
        existingToasts.forEach((t, index) => {
            t.style.top = `${20 + index * 60}px`;
        });

        const toast = document.createElement('div');
        toast.className = `notification-toast notification-${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle',
            favorite: 'fa-heart',
            delete: 'fa-trash-alt',
            edit: 'fa-edit',
            add: 'fa-plus-circle'
        };

        const icon = icons[type] || icons.info;
        
        toast.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
            <div class="notification-progress"></div>
        `;
        
        document.body.appendChild(toast);

        const progress = toast.querySelector('.notification-progress');
        progress.style.animation = `progress ${duration}ms linear forwards`;

        setTimeout(() => {
            toast.classList.add('notification-fade-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration - 300);
    }

    showCopySuccess(text) {
        this.showNotification(`已复制: ${text.substring(0, 30)}${text.length > 30 ? '...' : ''}`, 'success');
    }

    showFavoriteAnimation(element, isFavorite) {
        if (isFavorite) {
            element.classList.add('favorite-animate');
            this.showNotification('已添加到收藏', 'favorite');
            setTimeout(() => {
                element.classList.remove('favorite-animate');
            }, 500);
        } else {
            this.showNotification('已取消收藏', 'info');
        }
    }

    showDeleteAnimation(element, callback) {
        element.classList.add('delete-animate');
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }

    showSuccessAnimation(element) {
        element.classList.add('success-animate');
        setTimeout(() => {
            element.classList.remove('success-animate');
        }, 500);
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess(text);
        } catch (err) {
            console.error('复制失败:', err);
        }
        
        document.body.removeChild(textArea);
    }

    async displayCharacter(characterName) {
        const characterData = {
            chineseName: characterName,
            englishPrompt: this.zhTWData[characterName]
        };
        await this.displayImage(characterData);
    }

    async displayImage(characterData) {
        const container = document.getElementById('rightImageContainer');
        const skeletonImageContainer = document.getElementById('skeletonImageContainer');
        const englishPrompt = characterData.englishPrompt;
        
        if (!englishPrompt) {
            container.style.display = 'flex';
            skeletonImageContainer.style.display = 'none';
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-image fa-2x mb-3 text-muted"></i>
                    <p>未找到 ${characterData.chineseName} 的预览图片</p>
                </div>
            `;
            return;
        }

        container.style.display = 'none';
        skeletonImageContainer.style.display = 'flex';

        let imageData = this.imageCache[englishPrompt];

        if (!imageData && this.useIndexedDB) {
            imageData = await this.loadImageFromDB(englishPrompt);
            if (imageData) {
                this.imageCache[englishPrompt] = imageData;
            }
        }

        if (!imageData) {
            imageData = await this.loadImageForCharacter(englishPrompt);
        }

        skeletonImageContainer.style.display = 'none';
        container.style.display = 'flex';

        if (!imageData) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-image fa-2x mb-3 text-muted"></i>
                    <p>未找到 ${characterData.chineseName} 的预览图片</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="fade-in">
                <img src="${imageData}" 
                     alt="${characterData.chineseName}" 
                     class="img-fluid">
            </div>
        `;
    }

    async loadImageForCharacter(englishPrompt) {
        for (let i = 1; i <= 10; i++) {
            try {
                const response = await fetch(`./output_${i}.json`);
                const data = await response.json();

                for (const item of data) {
                    for (const [key, value] of Object.entries(item)) {
                        this.imageCache[key] = value;
                        if (this.useIndexedDB) {
                            await this.saveImageToDB(key, value);
                        }
                    }
                }

                if (!this.useIndexedDB) {
                    this.saveImageCacheToLocalStorage();
                }
            } catch (error) {
                console.warn(`无法加载output_${i}.json:`, error);
            }
        }

        return this.imageCache[englishPrompt] || null;
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeAttr(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // 修改初始消息，移除loading状态
    showInitialMessage() {
        // 直接显示所有角色，而不是显示提示消息
        this.displayAllCharacters();
    }

    showError(message) {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-triangle fa-2x mb-3 text-danger"></i>
                <p>${message}</p>
            </div>
        `;
    }

    // 添加角色相关方法
    bindAddCharacterEvents() {
        const addCharacterBtn = document.getElementById('addCharacterBtn');
        const translateBtn = document.getElementById('translateBtn');
        const translateDirection = document.getElementById('translateDirection');
        const doTranslateBtn = document.getElementById('doTranslateBtn');
        const copyTranslationBtn = document.getElementById('copyTranslationBtn');
        const clearCacheBtn = document.getElementById('clearCacheBtn');
        const saveCharacterBtn = document.getElementById('saveCharacterBtn');
        const characterImage = document.getElementById('characterImage');
        const addCharacterModal = new bootstrap.Modal(document.getElementById('addCharacterModal'));

        addCharacterBtn.addEventListener('click', () => {
            this.resetAddCharacterForm();
            this.currentAddTags = this.renderTagsInput('addTagsList', 'addTagsInput', []);
            addCharacterModal.show();
        });

        translateBtn.addEventListener('click', () => {
            const translateContainer = document.getElementById('translateContainer');
            translateContainer.style.display = translateContainer.style.display === 'none' ? 'block' : 'none';
        });

        translateDirection.addEventListener('change', () => {
            const direction = translateDirection.value;
            const inputLabel = document.getElementById('inputLabel');
            const outputLabel = document.getElementById('outputLabel');
            const translateInput = document.getElementById('translateInput');
            const translateOutput = document.getElementById('translateOutput');

            if (direction === 'zh|en') {
                inputLabel.textContent = '中文输入：';
                outputLabel.textContent = '英文结果：';
                translateInput.placeholder = '输入要翻译的中文内容...';
                translateOutput.placeholder = '翻译结果将显示在这里...';
            } else {
                inputLabel.textContent = '英文输入：';
                outputLabel.textContent = '中文结果：';
                translateInput.placeholder = '输入要翻译的英文内容...';
                translateOutput.placeholder = '翻译结果将显示在这里...';
            }
        });

        doTranslateBtn.addEventListener('click', async () => {
            const input = document.getElementById('translateInput').value.trim();
            if (input) {
                await this.translateText(input);
            } else {
                alert('请输入要翻译的内容');
            }
        });

        copyTranslationBtn.addEventListener('click', () => {
            const output = document.getElementById('translateOutput').value;
            if (output) {
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(output)
                        .then(() => {
                            this.showCopySuccess('翻译结果');
                        })
                        .catch(err => {
                            this.fallbackCopyToClipboard(output);
                        });
                } else {
                    this.fallbackCopyToClipboard(output);
                }
            } else {
                alert('没有可复制的翻译结果');
            }
        });

        clearCacheBtn.addEventListener('click', async () => {
            if (confirm('确定要清除所有缓存吗？这将删除所有已缓存的图片数据。')) {
                await this.clearCache();
                alert('缓存已清除');
            }
        });

        characterImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 100 * 1024) {
                    alert('图片大小不能超过100KB，请选择更小的图片');
                    e.target.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const imagePreview = document.getElementById('imagePreview');
                    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
                    imagePreview.src = event.target.result;
                    imagePreviewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        saveCharacterBtn.addEventListener('click', () => {
            this.saveCharacter(addCharacterModal);
        });
    }

    async clearCache() {
        try {
            if (this.useIndexedDB && this.db) {
                const transaction = this.db.transaction(['images'], 'readwrite');
                const store = transaction.objectStore('images');
                await new Promise((resolve, reject) => {
                    const request = store.clear();
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject();
                });
                console.log('IndexedDB缓存已清除');
            }

            localStorage.removeItem('imageCache');
            console.log('localStorage缓存已清除');

            this.imageCache = {};
            this.loadedFiles.clear();

            console.log('所有缓存已清除');
        } catch (error) {
            console.error('清除缓存失败:', error);
            throw error;
        }
    }

    async translateText(text) {
        const output = document.getElementById('translateOutput');
        const direction = document.getElementById('translateDirection').value;
        output.value = '翻译中...';
        output.disabled = true;

        const maxRetries = 3;
        let retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${direction}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    cache: 'no-cache'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP错误: ${response.status}`);
                }
                
                const data = await response.json();

                if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
                    output.value = data.responseData.translatedText;
                    console.log('翻译成功:', data.responseData.translatedText);
                    return;
                } else {
                    console.error('翻译API响应异常:', data);
                    throw new Error('翻译失败');
                }
            } catch (error) {
                console.error(`翻译失败 (尝试 ${retryCount + 1}/${maxRetries}):`, error);
                retryCount++;
                
                if (retryCount >= maxRetries) {
                    console.error('翻译失败:', error);
                    output.value = '翻译失败，请稍后重试';
                    
                    if (error.message.includes('HTTP错误')) {
                        alert('翻译服务暂时不可用，请稍后重试');
                    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                        alert('网络连接失败，请检查网络设置');
                    } else {
                        alert('翻译失败，请检查网络连接或稍后重试');
                    }
                } else {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
        
        output.disabled = false;
    }

    initEditCharacterModal() {
        const editCharacterImage = document.getElementById('editCharacterImage');
        const updateCharacterBtn = document.getElementById('updateCharacterBtn');
        const deleteCharacterBtn = document.getElementById('deleteCharacterBtn');

        editCharacterImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const editImagePreview = document.getElementById('editImagePreview');
                    const editImagePreviewContainer = document.getElementById('editImagePreviewContainer');
                    editImagePreview.src = event.target.result;
                    editImagePreviewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        updateCharacterBtn.addEventListener('click', () => {
            this.updateCharacter();
        });

        deleteCharacterBtn.addEventListener('click', () => {
            this.deleteCharacter();
        });
    }

    resetAddCharacterForm() {
        document.getElementById('addCharacterForm').reset();
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('imagePreview').src = '';
        document.getElementById('addTagsList').innerHTML = '';
        this.currentAddTags = [];
    }

    openEditCharacterModal(chineseName, englishPrompt) {
        document.getElementById('oldChineseName').value = chineseName;
        document.getElementById('editChineseName').value = chineseName;
        document.getElementById('editEnglishPrompt').value = englishPrompt;
        document.getElementById('editCharacterImage').value = '';
        document.getElementById('editImagePreviewContainer').style.display = 'none';
        document.getElementById('editImagePreview').src = '';
        
        const existingTags = this.getCharacterTags(chineseName);
        this.currentEditTags = this.renderTagsInput('editTagsList', 'editTagsInput', existingTags);
        
        const editCharacterModal = new bootstrap.Modal(document.getElementById('editCharacterModal'));
        editCharacterModal.show();
    }

    async saveCharacter(modal) {
        const chineseName = document.getElementById('chineseName').value.trim();
        const englishPrompt = document.getElementById('englishPrompt').value.trim();
        const characterImage = document.getElementById('characterImage');
        const hasImage = characterImage.files.length > 0;
        const tags = this.currentAddTags || [];

        if (!chineseName || !englishPrompt) {
            alert('请填写中文名称和英文提示词');
            return;
        }

        try {
            let response;
            
            if (hasImage) {
                const imageBase64 = await this.convertImageToBase64(characterImage.files[0]);
                response = await fetch('api.php?action=add_character_with_image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chinese_name: chineseName,
                        english_prompt: englishPrompt,
                        image_base64: imageBase64
                    })
                });
            } else {
                response = await fetch('api.php?action=add_character', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chinese_name: chineseName,
                        english_prompt: englishPrompt
                    })
                });
            }

            const result = await response.json();

            if (result.success) {
                this.showNotification('角色添加成功！', 'add');
                
                this.zhTWData[chineseName] = englishPrompt;
                this.setCharacterTags(chineseName, tags);
                
                if (hasImage) {
                    const imageBase64 = await this.convertImageToBase64(characterImage.files[0]);
                    this.imageCache[englishPrompt] = imageBase64;
                    if (this.useIndexedDB) {
                        await this.saveImageToDB(englishPrompt, imageBase64);
                    } else {
                        this.saveImageCacheToLocalStorage();
                    }
                }
                
                this.displayAllCharacters();
                modal.hide();
            } else {
                this.showNotification('添加失败：' + result.error, 'error');
            }
        } catch (error) {
            console.error('添加角色时出错:', error);
            this.showNotification('添加角色时出错，请检查服务器', 'error');
        }
    }

    async updateCharacter() {
        const oldChineseName = document.getElementById('oldChineseName').value.trim();
        const newChineseName = document.getElementById('editChineseName').value.trim();
        const newEnglishPrompt = document.getElementById('editEnglishPrompt').value.trim();
        const editCharacterImage = document.getElementById('editCharacterImage');
        const hasImage = editCharacterImage.files.length > 0;
        const tags = this.currentEditTags || [];

        if (!oldChineseName || !newChineseName || !newEnglishPrompt) {
            this.showNotification('请填写中文名称和英文提示词', 'warning');
            return;
        }

        try {
            let imageBase64 = '';
            if (hasImage) {
                imageBase64 = await this.convertImageToBase64(editCharacterImage.files[0]);
            }

            const response = await fetch('api.php?action=update_character', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    old_chinese_name: oldChineseName,
                    new_chinese_name: newChineseName,
                    new_english_prompt: newEnglishPrompt,
                    new_image_base64: imageBase64
                })
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('角色更新成功！', 'edit');
                
                const oldEnglishPrompt = this.zhTWData[oldChineseName];
                delete this.zhTWData[oldChineseName];
                this.zhTWData[newChineseName] = newEnglishPrompt;
                
                if (oldChineseName !== newChineseName) {
                    delete this.characterTags[oldChineseName];
                }
                this.setCharacterTags(newChineseName, tags);
                
                if (hasImage) {
                    const imageBase64 = await this.convertImageToBase64(editCharacterImage.files[0]);
                    this.imageCache[newEnglishPrompt] = imageBase64;
                    if (this.useIndexedDB) {
                        await this.saveImageToDB(newEnglishPrompt, imageBase64);
                    } else {
                        this.saveImageCacheToLocalStorage();
                    }
                } else if (oldEnglishPrompt && oldEnglishPrompt !== newEnglishPrompt) {
                    const existingImage = this.imageCache[oldEnglishPrompt] || 
                        (this.useIndexedDB ? await this.loadImageFromDB(oldEnglishPrompt) : null);
                    
                    if (existingImage) {
                        this.imageCache[newEnglishPrompt] = existingImage;
                        delete this.imageCache[oldEnglishPrompt];
                        
                        if (this.useIndexedDB) {
                            await this.saveImageToDB(newEnglishPrompt, existingImage);
                            await this.deleteImageFromDB(oldEnglishPrompt);
                        } else {
                            this.saveImageCacheToLocalStorage();
                        }
                    }
                }
                
                this.displayAllCharacters();
                
                const modalElement = document.getElementById('editCharacterModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            } else {
                this.showNotification('更新失败：' + result.error, 'error');
            }
        } catch (error) {
            console.error('更新角色时出错:', error);
            this.showNotification('更新角色时出错，请检查服务器', 'error');
        }
    }

    async deleteCharacter() {
        const oldChineseName = document.getElementById('oldChineseName').value.trim();

        if (!oldChineseName) {
            this.showNotification('无法获取角色信息', 'error');
            return;
        }

        if (!confirm('确定要删除这个角色吗？此操作不可恢复！')) {
            return;
        }

        try {
            const response = await fetch('api.php?action=delete_character', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chinese_name: oldChineseName
                })
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('角色删除成功！', 'delete');
                
                delete this.zhTWData[oldChineseName];
                
                this.displayAllCharacters();
                
                const modalElement = document.getElementById('editCharacterModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            } else {
                this.showNotification('删除失败：' + result.error, 'error');
            }
        } catch (error) {
            console.error('删除角色时出错:', error);
            this.showNotification('删除角色时出错，请检查服务器', 'error');
        }
    }

    convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    loadFavorites() {
        try {
            const savedFavorites = localStorage.getItem('characterFavorites');
            if (savedFavorites) {
                this.favorites = JSON.parse(savedFavorites);
                console.log('已加载', this.favorites.length, '个收藏角色');
            }
        } catch (error) {
            console.error('加载收藏失败:', error);
            this.favorites = [];
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem('characterFavorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('保存收藏失败:', error);
        }
    }

    loadTags() {
        try {
            const savedTags = localStorage.getItem('characterTags');
            if (savedTags) {
                this.characterTags = JSON.parse(savedTags);
                this.updateAllTags();
                console.log('已加载标签数据');
            }
        } catch (error) {
            console.error('加载标签失败:', error);
            this.characterTags = {};
            this.allTags = [];
        }
    }

    saveTags() {
        try {
            localStorage.setItem('characterTags', JSON.stringify(this.characterTags));
            this.updateAllTags();
        } catch (error) {
            console.error('保存标签失败:', error);
        }
    }

    loadSelectedTags() {
        try {
            const savedSelectedTags = localStorage.getItem('characterSelectedTags');
            if (savedSelectedTags) {
                const tags = JSON.parse(savedSelectedTags);
                this.selectedTags = new Set(tags);
                console.log('已加载筛选标签状态');
            }
        } catch (error) {
            console.error('加载筛选标签失败:', error);
            this.selectedTags = new Set();
        }
    }

    saveSelectedTags() {
        try {
            localStorage.setItem('characterSelectedTags', JSON.stringify(Array.from(this.selectedTags)));
        } catch (error) {
            console.error('保存筛选标签失败:', error);
        }
    }

    loadSearchState() {
        try {
            const savedSearchState = localStorage.getItem('characterSearchState');
            if (savedSearchState) {
                const searchState = JSON.parse(savedSearchState);
                if (searchState.query) {
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) {
                        searchInput.value = searchState.query;
                        if (searchState.query) {
                            this.searchCharacters(searchState.query);
                        }
                    }
                }
                console.log('已加载搜索状态');
            }
        } catch (error) {
            console.error('加载搜索状态失败:', error);
        }
    }

    saveSearchState(query) {
        try {
            localStorage.setItem('characterSearchState', JSON.stringify({ query }));
        } catch (error) {
            console.error('保存搜索状态失败:', error);
        }
    }

    applyCustomOrder(results, query = '') {
        const orderKey = this.getOrderKey(query);
        const customOrder = this.getCustomOrderByKey(orderKey);
        
        if (customOrder.length === 0) {
            const hasArtistStringTag = Array.from(this.selectedTags).some(tag => tag.includes('画师串'));
            
            if (hasArtistStringTag) {
                return [...results].sort((a, b) => {
                    const tagsA = this.getCharacterTags(a.chineseName);
                    const tagsB = this.getCharacterTags(b.chineseName);
                    
                    const artistTagA = tagsA.find(tag => tag.includes('画师串'));
                    const artistTagB = tagsB.find(tag => tag.includes('画师串'));
                    
                    const matchA = artistTagA ? artistTagA.match(/画师串(\d+)/) : null;
                    const matchB = artistTagB ? artistTagB.match(/画师串(\d+)/) : null;
                    
                    if (matchA && matchB) {
                        const numA = parseInt(matchA[1]);
                        const numB = parseInt(matchB[1]);
                        return numA - numB;
                    }
                    
                    if (matchA) return -1;
                    if (matchB) return 1;
                    
                    const nameMatchA = a.chineseName.match(/画师串(\d+)/);
                    const nameMatchB = b.chineseName.match(/画师串(\d+)/);
                    
                    if (nameMatchA && nameMatchB) {
                        return parseInt(nameMatchA[1]) - parseInt(nameMatchB[1]);
                    }
                    if (nameMatchA) return -1;
                    if (nameMatchB) return 1;
                    
                    return a.chineseName.localeCompare(b.chineseName, 'zh-CN');
                });
            }
            
            return [...results].sort((a, b) => a.chineseName.localeCompare(b.chineseName, 'zh-CN'));
        }

        const orderedResults = [];
        const remainingResults = [...results];
        
        for (const name of customOrder) {
            const index = remainingResults.findIndex(r => r.chineseName === name);
            if (index !== -1) {
                orderedResults.push(remainingResults.splice(index, 1)[0]);
            }
        }
        
        return [...orderedResults, ...remainingResults];
    }

    getOrderKey(query = '') {
        if (this.showFavoritesOnly) {
            return 'favorites';
        } else if (query) {
            return 'search';
        }
        
        const selectedTagsArray = Array.from(this.selectedTags).sort();
        if (selectedTagsArray.length > 0) {
            return 'tags_' + selectedTagsArray.join(',');
        }
        
        return 'default';
    }

    getCustomOrderByKey(key) {
        try {
            const allOrders = JSON.parse(localStorage.getItem('characterCustomOrders') || '{}');
            return allOrders[key] || [];
        } catch (error) {
            return [];
        }
    }

    saveCustomOrderByKey(key, order) {
        try {
            const allOrders = JSON.parse(localStorage.getItem('characterCustomOrders') || '{}');
            allOrders[key] = order;
            localStorage.setItem('characterCustomOrders', JSON.stringify(allOrders));
        } catch (error) {
            console.error('保存自定义排序失败:', error);
        }
    }

    updateCustomOrder(fromIndex, toIndex, query = '') {
        try {
            const orderKey = this.getOrderKey(query);
            const allItems = document.querySelectorAll('.character-item');
            const fromItem = allItems[fromIndex];
            const toItem = allItems[toIndex];
            
            if (!fromItem || !toItem) return;
            
            const fromName = fromItem.dataset.character;
            const toName = toItem.dataset.character;
            
            if (!fromName || !toName) return;
            
            let customOrder = this.getCustomOrderByKey(orderKey);
            
            if (customOrder.length === 0) {
                customOrder = Array.from(allItems).map(item => item.dataset.character);
            }
            
            const fromOrderIndex = customOrder.indexOf(fromName);
            const toOrderIndex = customOrder.indexOf(toName);
            
            if (fromOrderIndex !== -1 && toOrderIndex !== -1) {
                customOrder.splice(fromOrderIndex, 1);
                customOrder.splice(toOrderIndex, 0, fromName);
                this.saveCustomOrderByKey(orderKey, customOrder);
            }
        } catch (error) {
            console.error('更新自定义排序失败:', error);
        }
    }

    initDragAndDrop(query = '') {
        const characterList = document.querySelector('.character-list');
        if (!characterList) return;

        const items = characterList.querySelectorAll('.character-item.draggable');
        const currentQuery = query;
        
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                this.draggedItem = item;
                item.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', item.dataset.index);
            });

            item.addEventListener('dragend', () => {
                if (this.draggedItem) {
                    this.draggedItem.classList.remove('dragging');
                }
                this.draggedItem = null;
                
                items.forEach(i => {
                    i.classList.remove('drag-over');
                });
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                if (this.draggedItem && this.draggedItem !== item) {
                    item.classList.add('drag-over');
                }
            });

            item.addEventListener('dragleave', () => {
                item.classList.remove('drag-over');
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.classList.remove('drag-over');
                
                if (this.draggedItem && this.draggedItem !== item) {
                    const fromIndex = parseInt(this.draggedItem.dataset.index);
                    const toIndex = parseInt(item.dataset.index);
                    
                    this.updateCustomOrder(fromIndex, toIndex, currentQuery);
                    
                    const parent = item.parentNode;
                    const allItems = Array.from(parent.querySelectorAll('.character-item'));
                    const fromItem = allItems.find(i => i.dataset.index === fromIndex.toString());
                    const toItem = allItems.find(i => i.dataset.index === toIndex.toString());
                    
                    if (fromItem && toItem) {
                        if (fromIndex < toIndex) {
                            toItem.after(fromItem);
                        } else {
                            toItem.before(fromItem);
                        }
                        
                        allItems.forEach((i, idx) => {
                            i.dataset.index = idx.toString();
                        });
                        
                        this.showNotification('排序已保存', 'success', 1500);
                    }
                }
            });
        });
    }

    updateAllTags() {
        this.allTags = [];
        for (const tags of Object.values(this.characterTags)) {
            for (const tag of tags) {
                if (!this.allTags.includes(tag)) {
                    this.allTags.push(tag);
                }
            }
        }
        this.allTags.sort();
    }

    getCharacterTags(chineseName) {
        return this.characterTags[chineseName] || [];
    }

    setCharacterTags(chineseName, tags) {
        if (tags.length === 0) {
            delete this.characterTags[chineseName];
        } else {
            this.characterTags[chineseName] = tags;
        }
        this.saveTags();
    }

    isFavorite(chineseName) {
        return this.favorites.includes(chineseName);
    }

    toggleFavorite(chineseName) {
        const index = this.favorites.indexOf(chineseName);
        const isFavorite = index === -1;
        
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(chineseName);
        }
        
        this.saveFavorites();
        
        const favoriteBtn = document.querySelector(`.favorite-btn[data-chinese-name="${chineseName}"]`);
        if (favoriteBtn) {
            if (isFavorite) {
                favoriteBtn.classList.add('active');
                this.showFavoriteAnimation(favoriteBtn, true);
            } else {
                favoriteBtn.classList.remove('active');
                this.showFavoriteAnimation(favoriteBtn, false);
            }
        }
        
        if (this.showFavoritesOnly) {
            setTimeout(() => {
                this.refreshCurrentDisplay();
            }, 300);
        }
    }

    refreshCurrentDisplay() {
        if (this.showFavoritesOnly) {
            this.displayFavorites();
        } else {
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.trim();
            const hasTagFilter = this.selectedTags.size > 0;
            
            if (hasTagFilter) {
                const results = this.performSearch(query);
                this.allResults = results;
                const totalPages = Math.ceil(results.length / this.pageSize);
                if (this.currentPage > totalPages) {
                    this.currentPage = Math.max(1, totalPages);
                }
                this.displayResults(results, query);
            } else if (query) {
                this.searchCharacters(query);
            } else {
                this.displayAllCharacters();
            }
        }
    }

    displayFavorites() {
        const favoriteResults = [];
        const hasTagFilter = this.selectedTags.size > 0;
        
        for (const chineseName of this.favorites) {
            if (this.zhTWData[chineseName]) {
                let matchesTags = true;
                if (hasTagFilter) {
                    const characterTags = this.getCharacterTags(chineseName);
                    matchesTags = Array.from(this.selectedTags).some(tag => characterTags.includes(tag));
                }
                
                if (matchesTags) {
                    favoriteResults.push({
                        chineseName: chineseName,
                        englishPrompt: this.zhTWData[chineseName]
                    });
                }
            }
        }

        this.allResults = favoriteResults;
        
        const totalPages = Math.ceil(favoriteResults.length / this.pageSize);
        if (this.currentPage > totalPages) {
            this.currentPage = Math.max(1, totalPages);
        }
        
        this.displayResults(favoriteResults, '');
    }

    toggleFavoritesView() {
        const favoritesBtn = document.getElementById('favoritesBtn');
        this.showFavoritesOnly = !this.showFavoritesOnly;
        
        if (this.showFavoritesOnly) {
            favoritesBtn.classList.add('active');
            this.displayFavorites();
        } else {
            favoritesBtn.classList.remove('active');
            this.displayAllCharacters();
        }
    }

    toggleBatchMode() {
        const batchModeBtn = document.getElementById('batchModeBtn');
        const batchActionsContainer = document.getElementById('batchActionsContainer');
        
        this.batchMode = !this.batchMode;
        this.selectedCharacters.clear();
        
        if (this.batchMode) {
            batchModeBtn.classList.add('active');
            batchActionsContainer.style.display = 'flex';
        } else {
            batchModeBtn.classList.remove('active');
            batchActionsContainer.style.display = 'none';
        }
        
        this.refreshCurrentDisplay();
    }

    batchExport() {
        if (this.selectedCharacters.size === 0) {
            this.showNotification('请先选择要导出的角色', 'warning');
            return;
        }

        const exportData = [];
        for (const chineseName of this.selectedCharacters) {
            if (this.zhTWData[chineseName]) {
                exportData.push({
                    chineseName: chineseName,
                    englishPrompt: this.zhTWData[chineseName],
                    tags: this.getCharacterTags(chineseName)
                });
            }
        }

        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `characters_export_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification(`已导出 ${exportData.length} 个角色`, 'success');
    }

    batchImport(file) {
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                
                if (!Array.isArray(importData)) {
                    throw new Error('导入文件格式错误');
                }

                let importCount = 0;
                let updateCount = 0;
                
                for (const item of importData) {
                    if (item.chineseName && item.englishPrompt) {
                        if (this.zhTWData[item.chineseName]) {
                            this.zhTWData[item.chineseName] = item.englishPrompt;
                            updateCount++;
                        } else {
                            this.zhTWData[item.chineseName] = item.englishPrompt;
                            importCount++;
                        }
                        
                        if (item.tags && Array.isArray(item.tags)) {
                            this.setCharacterTags(item.chineseName, item.tags);
                        }
                    }
                }

                this.refreshCurrentDisplay();
                this.showNotification(`导入成功：新增 ${importCount} 个，更新 ${updateCount} 个`, 'add');
            } catch (error) {
                console.error('导入失败:', error);
                this.showNotification('导入失败：文件格式错误', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    batchDelete() {
        if (this.selectedCharacters.size === 0) {
            this.showNotification('请先选择要删除的角色', 'warning');
            return;
        }

        if (!confirm(`确定要删除选中的 ${this.selectedCharacters.size} 个角色吗？`)) {
            return;
        }

        let deleteCount = 0;
        for (const chineseName of this.selectedCharacters) {
            if (this.zhTWData[chineseName]) {
                delete this.zhTWData[chineseName];
                deleteCount++;
            }
        }

        this.selectedCharacters.clear();
        this.refreshCurrentDisplay();
        this.showNotification(`已删除 ${deleteCount} 个角色`, 'delete');
    }

    openBatchEditTagsModal() {
        if (this.selectedCharacters.size === 0) {
            this.showNotification('请先选择要编辑标签的角色', 'warning');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('batchEditTagsModal'));
        const batchEditCount = document.getElementById('batchEditCount');
        const batchCurrentTags = document.getElementById('batchCurrentTags');
        const batchAddTagsList = document.getElementById('batchAddTagsList');
        const batchRemoveTagsList = document.getElementById('batchRemoveTagsList');
        
        batchEditCount.textContent = this.selectedCharacters.size;
        
        const commonTags = this.getCommonTags();
        if (commonTags.length > 0) {
            batchCurrentTags.innerHTML = commonTags.map(tag => 
                `<span class="batch-current-tag">${this.escapeHtml(tag)}</span>`
            ).join('');
        } else {
            batchCurrentTags.innerHTML = '<small class="text-muted">选中的角色没有共同标签</small>';
        }
        
        batchAddTagsList.innerHTML = '';
        batchRemoveTagsList.innerHTML = '';
        
        this.batchAddTags = [];
        this.batchRemoveTags = [];
        
        this.bindBatchEditTagsEvents();
        
        modal.show();
    }

    getCommonTags() {
        const tagCounts = {};
        const totalSelected = this.selectedCharacters.size;
        
        for (const chineseName of this.selectedCharacters) {
            const tags = this.getCharacterTags(chineseName);
            for (const tag of tags) {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
        }
        
        const commonTags = [];
        for (const [tag, count] of Object.entries(tagCounts)) {
            if (count === totalSelected) {
                commonTags.push(tag);
            }
        }
        
        return commonTags.sort();
    }

    bindBatchEditTagsEvents() {
        const batchAddTagsInput = document.getElementById('batchAddTagsInput');
        const batchRemoveTagsInput = document.getElementById('batchRemoveTagsInput');
        const batchSaveTagsBtn = document.getElementById('batchSaveTagsBtn');
        const batchAddTagsList = document.getElementById('batchAddTagsList');
        const batchRemoveTagsList = document.getElementById('batchRemoveTagsList');
        
        if (this.batchEditTagsBound) return;
        this.batchEditTagsBound = true;
        
        batchAddTagsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = batchAddTagsInput.value.trim();
                if (tag && !this.batchAddTags.includes(tag)) {
                    this.batchAddTags.push(tag);
                    this.renderBatchTagsList(batchAddTagsList, this.batchAddTags, 'add');
                    batchAddTagsInput.value = '';
                }
            }
        });
        
        batchRemoveTagsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = batchRemoveTagsInput.value.trim();
                if (tag && !this.batchRemoveTags.includes(tag)) {
                    this.batchRemoveTags.push(tag);
                    this.renderBatchTagsList(batchRemoveTagsList, this.batchRemoveTags, 'remove');
                    batchRemoveTagsInput.value = '';
                }
            }
        });
        
        batchSaveTagsBtn.addEventListener('click', () => {
            this.saveBatchTags();
        });
        
        batchAddTagsList.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.tag-remove-btn');
            if (removeBtn) {
                const tag = removeBtn.dataset.tag;
                const index = this.batchAddTags.indexOf(tag);
                if (index > -1) {
                    this.batchAddTags.splice(index, 1);
                    this.renderBatchTagsList(batchAddTagsList, this.batchAddTags, 'add');
                }
            }
        });
        
        batchRemoveTagsList.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.tag-remove-btn');
            if (removeBtn) {
                const tag = removeBtn.dataset.tag;
                const index = this.batchRemoveTags.indexOf(tag);
                if (index > -1) {
                    this.batchRemoveTags.splice(index, 1);
                    this.renderBatchTagsList(batchRemoveTagsList, this.batchRemoveTags, 'remove');
                }
            }
        });
    }

    renderBatchTagsList(container, tags, type) {
        container.innerHTML = tags.map(tag => `
            <span class="batch-tag-item ${type === 'add' ? 'tag-add' : 'tag-remove'}">
                ${this.escapeHtml(tag)}
                <button type="button" class="tag-remove-btn" data-tag="${this.escapeAttr(tag)}">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
    }

    saveBatchTags() {
        if (this.batchAddTags.length === 0 && this.batchRemoveTags.length === 0) {
            this.showNotification('请添加或移除至少一个标签', 'warning');
            return;
        }
        
        let updatedCount = 0;
        
        for (const chineseName of this.selectedCharacters) {
            let tags = this.getCharacterTags(chineseName);
            
            for (const tag of this.batchAddTags) {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            }
            
            tags = tags.filter(tag => !this.batchRemoveTags.includes(tag));
            
            this.characterTags[chineseName] = tags;
            updatedCount++;
        }
        
        this.saveTags();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('batchEditTagsModal'));
        if (modal) {
            modal.hide();
        }
        
        this.refreshCurrentDisplay();
        
        let message = '';
        if (this.batchAddTags.length > 0 && this.batchRemoveTags.length > 0) {
            message = `已为 ${updatedCount} 个角色添加 ${this.batchAddTags.length} 个标签并移除 ${this.batchRemoveTags.length} 个标签`;
        } else if (this.batchAddTags.length > 0) {
            message = `已为 ${updatedCount} 个角色添加 ${this.batchAddTags.length} 个标签`;
        } else {
            message = `已为 ${updatedCount} 个角色移除 ${this.batchRemoveTags.length} 个标签`;
        }
        
        this.showNotification(message, 'success');
    }

    updateBatchButtons() {
        const batchExportBtn = document.getElementById('batchExportBtn');
        const batchDeleteBtn = document.getElementById('batchDeleteBtn');
        const batchEditTagsBtn = document.getElementById('batchEditTagsBtn');
        
        const hasSelection = this.selectedCharacters.size > 0;
        batchExportBtn.disabled = !hasSelection;
        batchDeleteBtn.disabled = !hasSelection;
        if (batchEditTagsBtn) batchEditTagsBtn.disabled = !hasSelection;
        
        if (hasSelection) {
            batchExportBtn.classList.remove('disabled');
            batchDeleteBtn.classList.remove('disabled');
            if (batchEditTagsBtn) batchEditTagsBtn.classList.remove('disabled');
        } else {
            batchExportBtn.classList.add('disabled');
            batchDeleteBtn.classList.add('disabled');
            if (batchEditTagsBtn) batchEditTagsBtn.classList.add('disabled');
        }
    }

    initTagFilterEvents() {
        if (this.tagFilterInitialized) return;
        
        const tagFilterList = document.getElementById('tagFilterList');
        if (!tagFilterList) return;
        
        tagFilterList.addEventListener('click', (e) => {
            const tagBtn = e.target.closest('.tag-filter-item');
            if (!tagBtn) return;
            
            const tag = tagBtn.dataset.tag;
            if (this.selectedTags.has(tag)) {
                this.selectedTags.delete(tag);
            } else {
                this.selectedTags.add(tag);
            }
            
            this.saveSelectedTags();
            this.renderTagFilter();
            this.refreshCurrentDisplay();
        });
        this.tagFilterInitialized = true;
    }

    toggleTagFilter() {
        const tagFilterBtn = document.getElementById('tagFilterBtn');
        const tagFilterContainer = document.getElementById('tagFilterContainer');
        
        const isHidden = tagFilterContainer.style.display === 'none';
        
        if (isHidden) {
            tagFilterBtn.classList.add('active');
            tagFilterContainer.style.display = 'block';
            this.renderTagFilter();
            this.initTagFilterEvents();
            localStorage.setItem('tagFilterVisible', 'true');
        } else {
            tagFilterBtn.classList.remove('active');
            tagFilterContainer.style.display = 'none';
            localStorage.setItem('tagFilterVisible', 'false');
        }
    }

    renderTagFilter() {
        const tagFilterList = document.getElementById('tagFilterList');
        
        if (!tagFilterList) {
            console.error('标签筛选列表容器未找到');
            return;
        }
        
        if (this.allTags.length === 0) {
            tagFilterList.innerHTML = `
                <div class="no-tags">
                    <i class="fas fa-tag fa-2x mb-3 text-muted"></i>
                    <p>暂无标签，请先为角色添加标签</p>
                </div>
            `;
            return;
        }

        // 对标签进行排序，从小到大
        const sortedTags = [...this.allTags].sort((a, b) => {
            // 先按类型分类，画师串标签优先
            const isArtistStringA = a.includes('画师串');
            const isArtistStringB = b.includes('画师串');
            
            if (isArtistStringA && !isArtistStringB) return -1;
            if (!isArtistStringA && isArtistStringB) return 1;
            
            // 如果都是画师串标签，提取数字进行排序
            if (isArtistStringA && isArtistStringB) {
                const matchA = a.match(/画师串(\d+)/);
                const matchB = b.match(/画师串(\d+)/);
                const numA = matchA ? parseInt(matchA[1]) : 0;
                const numB = matchB ? parseInt(matchB[1]) : 0;
                console.log(`排序: ${a}(${numA}) vs ${b}(${numB}) = ${numA - numB}`);
                return numA - numB;
            }
            
            // 然后按字母顺序排序
            return a.localeCompare(b);
        });

        const html = sortedTags.map(tag => {
            const isSelected = this.selectedTags.has(tag);
            return `
                <button class="tag-filter-item ${isSelected ? 'active' : ''}" data-tag="${tag}">
                    <i class="fas fa-tag"></i>
                    ${tag}
                    ${isSelected ? '<i class="fas fa-check"></i>' : ''}
                </button>
            `;
        }).join('');

        tagFilterList.innerHTML = html;
    }

    clearTagFilter() {
        this.selectedTags.clear();
        this.saveSelectedTags();
        this.renderTagFilter();
        this.refreshCurrentDisplay();
    }

    resetCustomOrder() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput ? searchInput.value.trim() : '';
        const orderKey = this.getOrderKey(query);
        
        try {
            const allOrders = JSON.parse(localStorage.getItem('characterCustomOrders') || '{}');
            if (allOrders[orderKey]) {
                delete allOrders[orderKey];
                localStorage.setItem('characterCustomOrders', JSON.stringify(allOrders));
                this.showNotification('排序已重置为默认', 'success', 1500);
                this.refreshCurrentDisplay();
            } else {
                this.showNotification('当前已是默认排序', 'info', 1500);
            }
        } catch (error) {
            console.error('重置排序失败:', error);
            this.showNotification('重置排序失败', 'error');
        }
    }

    renderTagsInput(containerId, inputId, initialTags = []) {
        const container = document.getElementById(containerId);
        const input = document.getElementById(inputId);
        
        if (!container || !input) {
            console.error('标签容器或输入框未找到:', containerId, inputId);
            return [];
        }
        
        container.innerHTML = '';
        
        const tags = [...initialTags];
        
        const renderTags = () => {
            container.innerHTML = tags.map(tag => `
                <span class="tag-item">
                    ${tag}
                    <i class="fas fa-times tag-remove" data-tag="${tag}"></i>
                </span>
            `).join('');
        };
        
        renderTags();
        
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        
        const newContainer = container.cloneNode(false);
        container.parentNode.replaceChild(newContainer, container);
        
        newContainer.innerHTML = tags.map(tag => `
            <span class="tag-item">
                ${tag}
                <i class="fas fa-times tag-remove" data-tag="${tag}"></i>
            </span>
        `).join('');
        
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = newInput.value.trim();
                if (tag && !tags.includes(tag)) {
                    tags.push(tag);
                    newContainer.innerHTML += `
                        <span class="tag-item">
                            ${tag}
                            <i class="fas fa-times tag-remove" data-tag="${tag}"></i>
                        </span>
                    `;
                    newInput.value = '';
                }
            }
        });
        
        newContainer.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.tag-remove');
            if (removeBtn) {
                const tag = removeBtn.dataset.tag;
                const index = tags.indexOf(tag);
                if (index > -1) {
                    tags.splice(index, 1);
                    const tagElement = removeBtn.parentElement;
                    if (tagElement) {
                        tagElement.remove();
                    }
                }
            }
        });
        
        return tags;
    }

    async loadPromptsConfig() {
        try {
            const response = await fetch('./prompts_config.json');
            this.promptsConfig = await response.json();
            console.log('提示词配置加载成功');
        } catch (error) {
            console.error('加载提示词配置失败:', error);
            this.showNotification('加载提示词配置失败', 'error');
        }
    }

    bindPromptBuilderEvents() {
        const promptBuilderBtn = document.getElementById('promptBuilderBtn');
        const closePromptBuilderBtn = document.getElementById('closePromptBuilderBtn');
        const clearCharacterBtn = document.getElementById('clearCharacterBtn');
        const promptCopyBtn = document.getElementById('promptCopyBtn');
        const promptFavoriteBtn = document.getElementById('promptFavoriteBtn');
        const promptClearBtn = document.getElementById('promptClearBtn');

        if (promptBuilderBtn) {
            promptBuilderBtn.addEventListener('click', () => this.togglePromptBuilder());
        }

        if (closePromptBuilderBtn) {
            closePromptBuilderBtn.addEventListener('click', () => this.togglePromptBuilder());
        }

        if (clearCharacterBtn) {
            clearCharacterBtn.addEventListener('click', () => this.clearCharacter());
        }

        if (promptCopyBtn) {
            promptCopyBtn.addEventListener('click', () => this.copyPrompt());
        }

        if (promptFavoriteBtn) {
            promptFavoriteBtn.addEventListener('click', () => this.favoritePrompt());
        }

        if (promptClearBtn) {
            promptClearBtn.addEventListener('click', () => this.clearPrompt());
        }

        const promptResultTextarea = document.getElementById('promptResult');
        if (promptResultTextarea) {
            promptResultTextarea.addEventListener('input', () => {
                this.isPromptManuallyEdited = true;
            });
        }

        this.renderPromptCategories();
    }

    togglePromptBuilder() {
        const container = document.getElementById('promptBuilderContainer');
        const resultSection = document.getElementById('promptResultSection');
        if (container) {
            const isVisible = container.style.display !== 'none';
            container.style.display = isVisible ? 'none' : 'block';
            
            if (resultSection) {
                resultSection.style.display = isVisible ? 'none' : 'block';
            }
            
            if (!isVisible && this.currentCharacter) {
                this.updatePromptCharacter(this.currentCharacter);
            }
        }
    }

    updatePromptCharacter(character) {
        this.currentCharacterForPrompt = character;
        this.isPromptManuallyEdited = false;
        const characterNameEl = document.getElementById('promptCharacterName');
        if (characterNameEl) {
            characterNameEl.textContent = character.chineseName || character.name || '未选择角色';
        }
        this.generatePrompt();
    }

    clearCharacter() {
        this.currentCharacterForPrompt = null;
        const characterNameEl = document.getElementById('promptCharacterName');
        if (characterNameEl) {
            characterNameEl.textContent = '未选择角色';
        }
        this.generatePrompt();
        this.showNotification('已清除角色选择', 'info');
    }

    renderPromptCategories() {
        if (!this.promptsConfig || !this.promptsConfig.categories) return;

        const categories = Object.keys(this.promptsConfig.categories);
        categories.forEach(category => {
            this.renderCategoryTags(category);
        });

        document.querySelectorAll('.prompt-category-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.toggleCategory(category);
            });
        });
    }

    renderCategoryTags(category) {
        if (!this.promptsConfig || !this.promptsConfig.categories[category]) return;

        const container = document.getElementById(`${category}Category`);
        if (!container) return;

        const tags = this.promptsConfig.categories[category];
        const html = tags.map(tag => {
            const isSelected = this.selectedPromptTags.has(tag.name);
            const displayName = tag.chinese || tag.name;
            return `
                <button class="prompt-tag-item ${isSelected ? 'selected' : ''}" 
                        data-tag="${tag.name}" 
                        data-weight="${tag.weight}"
                        data-category="${category}">
                    ${displayName}
                    ${tag.weight !== 1 ? `<span class="prompt-tag-weight">(${tag.weight})</span>` : ''}
                </button>
            `;
        }).join('');

        container.innerHTML = html;

        container.querySelectorAll('.prompt-tag-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tagName = e.currentTarget.dataset.tag;
                this.togglePromptTag(tagName);
            });
        });
    }

    toggleCategory(category) {
        const content = document.getElementById(`${category}Category`);
        const toggle = document.querySelector(`.prompt-category-toggle[data-category="${category}"]`);
        
        if (content && toggle) {
            content.classList.toggle('collapsed');
            toggle.classList.toggle('collapsed');
        }
    }

    togglePromptTag(tagName) {
        if (this.selectedPromptTags.has(tagName)) {
            this.selectedPromptTags.delete(tagName);
        } else {
            this.selectedPromptTags.add(tagName);
        }
        
        this.isPromptManuallyEdited = false;
        this.updateTagSelectionUI();
        this.generatePrompt();
    }

    updateTagSelectionUI() {
        document.querySelectorAll('.prompt-tag-item').forEach(item => {
            const tagName = item.dataset.tag;
            if (this.selectedPromptTags.has(tagName)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    generatePrompt() {
        if (this.isPromptManuallyEdited) {
            return;
        }

        const tags = [];

        if (this.currentCharacterForPrompt) {
            const characterPrompt = this.currentCharacterForPrompt.englishPrompt || 
                                   this.currentCharacterForPrompt.prompt || '';
            if (characterPrompt) {
                tags.push(characterPrompt);
            }
        }

        this.selectedPromptTags.forEach(tag => {
            tags.push(tag);
        });

        const prompt = tags.join(', ');
        const resultTextarea = document.getElementById('promptResult');
        if (resultTextarea) {
            resultTextarea.value = prompt;
        }
    }

    copyPrompt() {
        const resultTextarea = document.getElementById('promptResult');
        if (resultTextarea && resultTextarea.value) {
            navigator.clipboard.writeText(resultTextarea.value).then(() => {
                this.showNotification('提示词已复制到剪贴板', 'success');
            }).catch(() => {
                this.showNotification('复制失败', 'error');
            });
        } else {
            this.showNotification('没有可复制的提示词', 'warning');
        }
    }

    favoritePrompt() {
        const resultTextarea = document.getElementById('promptResult');
        if (resultTextarea && resultTextarea.value) {
            const prompt = resultTextarea.value;
            const favoriteBtn = document.getElementById('promptFavoriteBtn');
            
            const existingIndex = this.promptFavorites.findIndex(f => f.prompt === prompt);
            
            if (existingIndex > -1) {
                this.promptFavorites.splice(existingIndex, 1);
                favoriteBtn.classList.remove('active');
                this.showNotification('已取消收藏', 'info');
            } else {
                this.promptFavorites.push({
                    prompt: prompt,
                    character: this.currentCharacterForPrompt?.chineseName || '未选择角色',
                    timestamp: Date.now()
                });
                favoriteBtn.classList.add('active');
                this.showNotification('已收藏提示词', 'success');
            }
            
            this.savePromptFavorites();
        } else {
            this.showNotification('没有可收藏的提示词', 'warning');
        }
    }

    savePromptFavorites() {
        try {
            localStorage.setItem('promptFavorites', JSON.stringify(this.promptFavorites));
        } catch (error) {
            console.error('保存提示词收藏失败:', error);
        }
    }

    loadPromptFavorites() {
        try {
            const saved = localStorage.getItem('promptFavorites');
            if (saved) {
                this.promptFavorites = JSON.parse(saved);
            }
        } catch (error) {
            console.error('加载提示词收藏失败:', error);
        }
    }

    clearPrompt() {
        this.selectedPromptTags.clear();
        this.currentCharacterForPrompt = null;
        this.isPromptManuallyEdited = false;
        
        const characterNameEl = document.getElementById('promptCharacterName');
        if (characterNameEl) {
            characterNameEl.textContent = '未选择角色';
        }
        
        this.updateTagSelectionUI();
        this.generatePrompt();
        this.showNotification('已清空提示词', 'info');
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new CharacterSearch();
});