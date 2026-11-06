/* ============================================================================
   LaswI Game — script.js
   1. 可變數據配置  2. i18n 字典  3. 幾何圖形生成
   4. 渲染  5. 交互（翻轉 / 篩選 / 語言 / 導航 / 視差 / 進場）
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------------- 1. 可變數據集中配置 ---------------- */
  const GAME = {
    brand: 'LaswI Game',
    studio: 'LaswI Studio',
    version: 'v0.1.0',
    updated: '2026-11-06',
    emails: ['3199704668@qq.com', '1828236908@qq.com'],
    tagline: '點開就玩，不用等',
    games: [
      {
        name: '汩汩的午夜後宮（3D 重製版）',
        nameEn: "Gugu's Midnight Harem (3D Remake)",
        type: 'web',
        url: 'https://guguh.game.laswi.com.cn',
        desc: '一款網頁端的 3D 小遊戲，打開瀏覽器就能直接進入。',
        color: '#B388FF',
        tags: ['3D', 'Web 網遊']
      },
      {
        name: '巨石飛船',
        nameEn: 'Megalith Spaceship',
        type: 'web',
        url: 'https://taikong.game.laswi.com.cn',
        desc: '網頁端即點即玩的輕鬆小品，適合隨時開一局。',
        color: '#39FF88',
        tags: ['Web 網遊']
      },
      {
        name: '點點樂',
        nameEn: 'TapFun',
        type: 'android',
        url: 'https://tapfun.game.laswi.com.cn',
        desc: '手機上的輕量點擊小遊戲，零碎時間也能玩幾局。',
        color: '#FFE14D',
        tags: ['Android 手遊']
      },
      {
        name: '撲騰一下',
        nameEn: 'FlapBird',
        type: 'android',
        url: 'https://flapbird.game.laswi.com.cn',
        desc: '安卓端的小遊戲，節奏輕快，一次點擊一次起飛。',
        color: '#FF4D9D',
        tags: ['Android 手遊']
      }
    ],
    platforms: [
      { key: 'all', label: '全部' },
      { key: 'web', label: 'Web 網遊' },
      { key: 'android', label: 'Android 手遊' }
    ]
  };

  /* ---------------- 2. i18n 字典（遊戲名／網址／平台標籤不譯） ---------------- */
  const I18N = {
    'zh-Hant': {
      'nav.home': '首頁',
      'nav.games': '遊戲',
      'nav.web': 'Web 網遊',
      'nav.android': 'Android 手遊',
      'nav.contact': '聯繫',
      'hero.kicker': '旗下遊戲品牌',
      'hero.tagline': '點開就玩，不用等',
      'hero.lead': '網頁端與安卓小遊戲，挑一個，五秒後你已經在玩了。',
      'hero.play': '開始玩',
      'hero.browse': '瀏覽全部',
      'hero.scroll': '向下滾動',
      'games.cn': '遊戲',
      'games.sub': '{n} 款遊戲 · 點開即玩',
      'games.hint': '懸停可查看詳情 · 點擊即開玩',
      'filter.all': '全部',
      'filter.web': 'Web 網遊',
      'filter.android': 'Android 手遊',
      'tile.play': '開始玩',
      'plat.cn': '平台',
      'plat.sub': '兩種玩法，同一種痛快',
      'plat.web.title': 'Web 網遊',
      'plat.web.desc': '打開網頁即玩，無需下載。',
      'plat.web.cta': '查看 Web 網遊',
      'plat.android.title': 'Android 手遊',
      'plat.android.desc': '下載安裝到手機，隨時開一局。',
      'plat.android.cta': '查看 Android 手遊',
      'howto.cn': '怎麼玩',
      'howto.s1.t': '選一個遊戲',
      'howto.s1.d': '瀏覽遊戲列表，挑一個你喜歡的。',
      'howto.s2.t': '點開就玩',
      'howto.s2.d': 'Web 網遊直接在瀏覽器玩，Android 手遊點擊下載。',
      'howto.s3.t': '玩得開心',
      'howto.s3.d': '遇到問題，寫封郵件給我們。',
      'ver.label': '當前版本',
      'ver.note': '遊戲持續更新中，歡迎郵件反饋問題。',
      'ver.updated': '更新於 {date}',
      'footer.note': '遊戲反饋、合作或授權，歡迎郵件聯繫。',
      'footer.made': 'HTML · CSS · JavaScript，無框架',
      'gameDesc.0': '一款網頁端的 3D 小遊戲，打開瀏覽器就能直接進入。',
      'gameDesc.1': '網頁端即點即玩的輕鬆小品，適合隨時開一局。',
      'gameDesc.2': '手機上的輕量點擊小遊戲，零碎時間也能玩幾局。',
      'gameDesc.3': '安卓端的小遊戲，節奏輕快，一次點擊一次起飛。'
    },
    'zh-Hans': {
      'nav.home': '首页',
      'nav.games': '游戏',
      'nav.web': 'Web 网游',
      'nav.android': 'Android 手游',
      'nav.contact': '联系',
      'hero.kicker': '旗下游戏品牌',
      'hero.tagline': '点开就玩，不用等',
      'hero.lead': '网页端与安卓小游戏，挑一个，五秒后你已经在玩了。',
      'hero.play': '开始玩',
      'hero.browse': '浏览全部',
      'hero.scroll': '向下滚动',
      'games.cn': '游戏',
      'games.sub': '{n} 款游戏 · 点开即玩',
      'games.hint': '悬停可查看详情 · 点击即开玩',
      'filter.all': '全部',
      'filter.web': 'Web 网游',
      'filter.android': 'Android 手游',
      'tile.play': '开始玩',
      'plat.cn': '平台',
      'plat.sub': '两种玩法，同一种痛快',
      'plat.web.title': 'Web 网游',
      'plat.web.desc': '打开网页即玩，无需下载。',
      'plat.web.cta': '查看 Web 网游',
      'plat.android.title': 'Android 手游',
      'plat.android.desc': '下载安装到手机，随时开一局。',
      'plat.android.cta': '查看 Android 手游',
      'howto.cn': '怎么玩',
      'howto.s1.t': '选一个游戏',
      'howto.s1.d': '浏览游戏列表，挑一个你喜欢的。',
      'howto.s2.t': '点开就玩',
      'howto.s2.d': 'Web 网游直接在浏览器玩，Android 手游点击下载。',
      'howto.s3.t': '玩得开心',
      'howto.s3.d': '遇到问题，写封邮件给我们。',
      'ver.label': '当前版本',
      'ver.note': '游戏持续更新中，欢迎邮件反馈问题。',
      'ver.updated': '更新于 {date}',
      'footer.note': '游戏反馈、合作或授权，欢迎邮件联系。',
      'footer.made': 'HTML · CSS · JavaScript，无框架',
      'gameDesc.0': '一款网页端的 3D 小游戏，打开浏览器就能直接进入。',
      'gameDesc.1': '网页端即点即玩的轻松小品，适合随时开一局。',
      'gameDesc.2': '手机上的轻量点击小游戏，零碎时间也能玩几局。',
      'gameDesc.3': '安卓端的小游戏，节奏轻快，一次点击一次起飞。'
    },
    en: {
      'nav.home': 'Home',
      'nav.games': 'Games',
      'nav.web': 'Web Games',
      'nav.android': 'Android',
      'nav.contact': 'Contact',
      'hero.kicker': 'game brand',
      'hero.tagline': 'Open it. Play it. No waiting.',
      'hero.lead': 'Browser games and Android minigames — pick one, you will be playing in five seconds.',
      'hero.play': 'Start playing',
      'hero.browse': 'Browse all',
      'hero.scroll': 'Scroll',
      'games.cn': 'Games',
      'games.sub': '{n} games · click to play',
      'games.hint': 'Hover for details · click to play',
      'filter.all': 'All',
      'filter.web': 'Web Games',
      'filter.android': 'Android',
      'tile.play': 'Play now',
      'plat.cn': 'Platforms',
      'plat.sub': 'Two ways to play, one kind of fun',
      'plat.web.title': 'Web Games',
      'plat.web.desc': 'Play right in the browser, no download needed.',
      'plat.web.cta': 'See Web games',
      'plat.android.title': 'Android',
      'plat.android.desc': 'Install on your phone and play anytime.',
      'plat.android.cta': 'See Android games',
      'howto.cn': 'How to play',
      'howto.s1.t': 'Pick a game',
      'howto.s1.d': 'Browse the list and choose the one you like.',
      'howto.s2.t': 'Click and play',
      'howto.s2.d': 'Web games run in the browser; Android games download on tap.',
      'howto.s3.t': 'Have fun',
      'howto.s3.d': 'If anything breaks, send us an email.',
      'ver.label': 'Current version',
      'ver.note': 'Games are updated continuously — email us about any issue.',
      'ver.updated': 'Updated {date}',
      'footer.note': 'Feedback, partnership or licensing — email us.',
      'footer.made': 'HTML · CSS · JavaScript, no framework',
      'gameDesc.0': 'A 3D browser game you can open and play right away.',
      'gameDesc.1': 'A light browser game for a quick session anytime.',
      'gameDesc.2': 'A lightweight tap game for your phone, perfect for short breaks.',
      'gameDesc.3': 'A fast little Android game — one tap, one takeoff.'
    }
  };

  /* ---------------- 3. 工具 ---------------- */
  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let lang = 'zh-Hant';
  let filter = 'all';

  function hexToRgba(hex, alpha) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map(function (c) { return c + c; }).join('') : h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }

  function t(key) {
    const dict = I18N[lang] || I18N['zh-Hant'];
    if (dict[key] !== undefined) return dict[key];
    const fb = I18N['zh-Hant'][key];
    return fb !== undefined ? fb : '';
  }

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function platLabel(type) {
    const found = GAME.platforms.filter(function (p) { return p.key === type; })[0];
    return found ? found.label : type;
  }

  /* ---------------- 4. 幾何視覺印象（純 SVG，隨配色自動變化） ---------------- */
  /* ① 立體房間意象：等角房間 + 發光門 + 地板像素方塊 */
  function artRoom(c) {
    var a = function (o) { return hexToRgba(c, o); };
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="200,40 52,98 52,206 200,260 348,206 348,98" fill="' + a(0.06) + '"/>' +
      '<polygon points="200,40 52,98 200,154 348,98" fill="' + a(0.28) + '"/>' +
      '<polygon points="200,154 52,206 200,260 348,206" fill="' + a(0.13) + '"/>' +
      '<polygon points="200,154 200,260 52,206 52,98" fill="' + a(0.19) + '"/>' +
      '<polygon points="200,154 200,260 348,206 348,98" fill="' + a(0.09) + '"/>' +
      '<polygon points="262,94 314,113 314,204 262,185" fill="' + a(0.6) + '"/>' +
      '<polygon points="262,94 314,113 314,204 262,185" fill="none" stroke="' + a(0.85) + '" stroke-width="1.6"/>' +
      '<rect x="286" y="150" width="3" height="16" rx="1.5" fill="' + a(0.9) + '"/>' +
      '<rect x="152" y="196" width="24" height="24" rx="7" fill="' + a(0.55) + '"/>' +
      '<rect x="188" y="212" width="18" height="18" rx="5" fill="' + a(0.34) + '"/>' +
      '<rect x="218" y="196" width="26" height="26" rx="8" fill="' + a(0.6) + '"/>' +
      '<rect x="252" y="214" width="13" height="13" rx="4" fill="' + a(0.3) + '"/>' +
      '<circle cx="196" cy="238" r="9" fill="' + a(0.28) + '"/>' +
      '<rect x="96" y="150" width="12" height="12" rx="3" fill="' + a(0.45) + '"/>' +
      '<rect x="118" y="168" width="8" height="8" rx="2" fill="' + a(0.3) + '"/>' +
      '</svg>';
  }

  /* ② 巨石 + 飛船輪廓 */
  function artShip(c) {
    var a = function (o) { return hexToRgba(c, o); };
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="52" y="76" width="9" height="9" rx="2" fill="' + a(0.35) + '"/>' +
      '<rect x="86" y="46" width="6" height="6" rx="1.5" fill="' + a(0.25) + '"/>' +
      '<rect x="322" y="60" width="7" height="7" rx="1.5" fill="' + a(0.3) + '"/>' +
      '<rect x="356" y="96" width="10" height="10" rx="2.5" fill="' + a(0.2) + '"/>' +
      '<polygon points="28,268 44,200 96,170 152,188 170,244 130,274 60,278" fill="' + a(0.15) + '"/>' +
      '<polygon points="44,200 96,170 112,206 70,220" fill="' + a(0.3) + '"/>' +
      '<polygon points="112,206 152,188 156,222 116,228" fill="' + a(0.2) + '"/>' +
      '<polygon points="236,150 300,124 330,150 300,176" fill="' + a(0.85) + '"/>' +
      '<polygon points="250,136 270,100 302,124" fill="' + a(0.5) + '"/>' +
      '<polygon points="250,164 270,200 302,176" fill="' + a(0.5) + '"/>' +
      '<circle cx="296" cy="150" r="8" fill="' + a(0.95) + '"/>' +
      '<rect x="214" y="142" width="22" height="16" rx="7" fill="' + a(0.45) + '"/>' +
      '<rect x="188" y="146" width="14" height="8" rx="4" fill="' + a(0.28) + '"/>' +
      '<rect x="168" y="148" width="9" height="4" rx="2" fill="' + a(0.18) + '"/>' +
      '<rect x="128" y="126" width="10" height="10" rx="2.5" fill="' + a(0.4) + '"/>' +
      '</svg>';
  }

  /* ③ 圓點陣列 */
  function artDots(c) {
    var a = function (o) { return hexToRgba(c, o); };
    var out = '';
    for (var r = 0; r < 5; r++) {
      for (var col = 0; col < 6; col++) {
        var x = 106 + col * 38;
        var y = 80 + r * 32;
        var k = (r * 6 + col) % 5;
        if (k === 0) out += '<circle cx="' + x + '" cy="' + y + '" r="11" fill="' + a(0.8) + '"/>';
        else if (k === 1) out += '<circle cx="' + x + '" cy="' + y + '" r="6" fill="' + a(0.4) + '"/>';
        else if (k === 2) out += '<circle cx="' + x + '" cy="' + y + '" r="9" fill="none" stroke="' + a(0.55) + '" stroke-width="2"/>';
        else out += '<rect x="' + (x - 5) + '" y="' + (y - 5) + '" width="10" height="10" rx="3" fill="' + a(0.26) + '"/>';
      }
    }
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + out +
      '<circle cx="330" cy="226" r="26" fill="none" stroke="' + a(0.5) + '" stroke-width="2"/>' +
      '<circle cx="330" cy="226" r="13" fill="' + a(0.35) + '"/>' +
      '<circle cx="330" cy="226" r="4" fill="' + a(0.9) + '"/>' +
      '</svg>';
  }

  /* ④ 小鳥幾何剪影 */
  function artBird(c) {
    var a = function (o) { return hexToRgba(c, o); };
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="292" y="66" width="34" height="10" rx="5" fill="' + a(0.18) + '"/>' +
      '<rect x="316" y="86" width="22" height="8" rx="4" fill="' + a(0.12) + '"/>' +
      '<rect x="60" y="120" width="26" height="8" rx="4" fill="' + a(0.16) + '"/>' +
      '<circle cx="212" cy="164" r="42" fill="' + a(0.85) + '"/>' +
      '<circle cx="256" cy="130" r="24" fill="' + a(0.95) + '"/>' +
      '<polygon points="274,120 316,132 274,144" fill="' + a(0.45) + '"/>' +
      '<polygon points="176,150 112,112 138,176" fill="' + a(0.5) + '"/>' +
      '<polygon points="186,196 150,224 208,206" fill="' + a(0.35) + '"/>' +
      '<circle cx="264" cy="124" r="5" fill="#0F0D1A"/>' +
      '<circle cx="265.5" cy="122.5" r="1.6" fill="#F0EEFF"/>' +
      '<rect x="128" y="88" width="12" height="12" rx="3" fill="' + a(0.3) + '"/>' +
      '<rect x="150" y="70" width="7" height="7" rx="2" fill="' + a(0.22) + '"/>' +
      '</svg>';
  }

  var ART = [artRoom, artShip, artDots, artBird];

  /* ---------------- 5. 街機框體像素畫面 ---------------- */
  var SPRITE = [
    '..G.....G..',
    '...G...G...',
    '..GGGGGGG..',
    '.GG.GGG.GG.',
    'GGGGGGGGGGG',
    'G.GGGGGGG.G',
    'G.G.....G.G',
    '...GG.GG...'
  ];

  function paintCabinet() {
    var group = document.getElementById('cabPixels');
    if (!group) return;
    var NS = 'http://www.w3.org/2000/svg';
    var cell = 26, cols = 11, rows = 8;
    var ox = 70 + (420 - cols * cell) / 2;
    var oy = 150 + (352 - rows * cell) / 2 - 6;
    var accents = { '2,5': '#FF4D9D', '3,2': '#FFE14D', '4,1': '#B388FF', '5,7': '#FFE14D', '6,3': '#FF4D9D' };
    SPRITE.forEach(function (row, r) {
      for (var col = 0; col < cols; col++) {
        if (row.charAt(col) !== '.') {
          var rect = document.createElementNS(NS, 'rect');
          rect.setAttribute('x', ox + col * cell + 2);
          rect.setAttribute('y', oy + r * cell + 2);
          rect.setAttribute('width', cell - 4);
          rect.setAttribute('height', cell - 4);
          rect.setAttribute('rx', 6);
          rect.setAttribute('fill', accents[r + ',' + col] || '#39FF88');
          rect.style.setProperty('--d', ((r + col) % 8) * 0.16 + 's');
          group.appendChild(rect);
        }
      }
    });
  }

  /* ---------------- 6. 渲染：磁貼 ---------------- */
  var flipTimers = [];

  function clearFlipTimers() {
    flipTimers.forEach(function (id) { clearTimeout(id); });
    flipTimers = [];
  }

  function tileHTML(g, idx) {
    var isAndroid = g.type === 'android';
    var chipCls = isAndroid ? 'chip chip--android' : 'chip';
    var tag = platLabel(g.type);
    var desc = t('gameDesc.' + idx) || g.desc;
    var art = (ART[idx % ART.length])(g.color);
    var href = g.url.replace(/^https?:\/\//, '');

    return '<a class="tile" href="' + esc(g.url) + '" target="_blank" rel="noopener"' +
      ' data-type="' + esc(g.type) + '"' +
      ' style="--c:' + g.color + ';--c-soft:' + hexToRgba(g.color, 0.26) + '"' +
      ' aria-label="' + esc(g.name) + '">' +
      '<span class="tile__inner">' +
        '<span class="tile__face tile__front">' +
          '<span class="tile__glow"></span>' +
          '<span class="tile__art">' + art + '</span>' +
          '<span class="tile__top">' +
            '<span class="' + chipCls + '">' + esc(tag) + '</span>' +
            '<span class="tile__dots"><i></i><i></i><i></i></span>' +
          '</span>' +
          '<span class="tile__pixel-corner"><i></i><i></i><i></i><i></i></span>' +
          '<span class="tile__body">' +
            '<span class="tile__name-en">' + esc(g.nameEn) + '</span>' +
            '<span class="tile__name">' + esc(g.name) + '</span>' +
          '</span>' +
        '</span>' +
        '<span class="tile__face tile__back">' +
          '<span class="tile__backhead">' +
            '<span class="' + chipCls + '">' + esc(tag) + '</span>' +
            '<span class="tile__name-en">' + esc(g.nameEn) + '</span>' +
          '</span>' +
          '<span class="tile__desc">' + esc(desc) + '</span>' +
          '<span class="tile__url">' + esc(href) + '</span>' +
          '<span class="tile__go">' + esc(t('tile.play')) +
            '<span class="material-symbols-rounded">arrow_outward</span>' +
          '</span>' +
        '</span>' +
      '</span>' +
    '</a>';
  }

  function scheduleFlip(tile) {
    if (reduced.matches) return;
    var id = setTimeout(function () {
      if (!tile.dataset.hover && !document.hidden) tile.classList.toggle('is-flipped');
      scheduleFlip(tile);
    }, 4200 + Math.random() * 1800);
    flipTimers.push(id);
  }

  function renderTiles() {
    var host = document.getElementById('tiles');
    if (!host) return;
    clearFlipTimers();
    host.innerHTML = GAME.games.map(function (g, i) {
      if (filter !== 'all' && g.type !== filter) return '';
      return tileHTML(g, i);
    }).join('');
    host.classList.toggle('tiles--filtered', filter !== 'all');

    $$('.tile', host).forEach(function (tile) {
      tile.addEventListener('pointerenter', function () { tile.dataset.hover = '1'; });
      tile.addEventListener('pointerleave', function () { delete tile.dataset.hover; });
      tile.addEventListener('focus', function () { tile.dataset.hover = '1'; });
      tile.addEventListener('blur', function () { delete tile.dataset.hover; });
      scheduleFlip(tile);
    });
  }

  function renderFilter() {
    var host = document.getElementById('gameFilter');
    if (!host) return;
    host.innerHTML = GAME.platforms.map(function (p) {
      var label = t('filter.' + p.key) || p.label;
      return '<button type="button" role="tab" data-key="' + esc(p.key) + '" aria-selected="' +
        (p.key === filter ? 'true' : 'false') + '">' + esc(label) + '</button>';
    }).join('');
    $$('button', host).forEach(function (btn) {
      btn.addEventListener('click', function () { setFilter(btn.dataset.key, false); });
    });
  }

  /* 篩選：淡出 → 換內容 → 淡入；篩選切換時清除翻轉狀態，避免殘留 180° 背面 */
  function setFilter(key, doScroll) {
    filter = (key === 'web' || key === 'android') ? key : 'all';
    $$('#gameFilter button').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.key === filter ? 'true' : 'false');
    });
    var host = document.getElementById('tiles');
    if (!host) return;
    host.classList.add('is-swapping');
    setTimeout(function () {
      renderTiles();
      host.classList.remove('is-swapping');
    }, 180);
    if (doScroll) {
      var sec = document.getElementById('games');
      if (sec) sec.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
    }
  }

  /* ---------------- 7. 語言切換 ---------------- */
  function applyI18n() {
    $$('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });
    var sub = document.getElementById('gamesSub');
    if (sub) sub.textContent = t('games.sub').replace('{n}', GAME.games.length);
    var date = document.getElementById('versionDate');
    if (date) date.textContent = t('ver.updated').replace('{date}', GAME.updated);
    document.title = GAME.brand + ' — ' + t('hero.tagline');
  }

  function setLang(next, animate) {
    lang = I18N[next] ? next : 'zh-Hant';
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : lang);
    document.documentElement.setAttribute('data-lang', lang);
    try { localStorage.setItem('laswi-game-lang', lang); } catch (e) { /* 隱私模式 */ }

    $$('#langSeg button').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.lang === lang ? 'true' : 'false');
    });

    applyI18n();
    renderFilter();
    renderTiles();

    if (animate) {
      document.body.classList.remove('lang-fade');
      void document.body.offsetWidth;
      document.body.classList.add('lang-fade');
    }
  }

  /* ---------------- 8. 聯繫方式與版本（讀配置） ---------------- */
  function renderStatic() {
    var nv = document.getElementById('navVersion');
    if (nv) nv.textContent = GAME.version;

    var vnum = document.getElementById('versionNum');
    if (vnum) vnum.textContent = GAME.version;

    var fv = document.getElementById('footerVersion');
    if (fv) fv.textContent = GAME.version;

    var mails = GAME.emails || [];
    var foot = document.getElementById('footerMails');
    if (foot) {
      foot.innerHTML = mails.map(function (m) {
        return '<a href="mailto:' + esc(m) + '">' + esc(m) + '</a>';
      }).join('');
    }
    var list = document.getElementById('versionMails');
    if (list) {
      list.innerHTML = mails.map(function (m) {
        return '<li><a href="mailto:' + esc(m) + '">' +
          '<span class="material-symbols-rounded">mail</span>' + esc(m) + '</a></li>';
      }).join('');
    }
    var tag = document.querySelector('.hero__tagline');
    if (tag && GAME.tagline) tag.setAttribute('data-i18n-fallback', GAME.tagline);
  }

  /* ---------------- 9. 首屏幾何拼貼 ---------------- */
  var PX_DEFS = [
    { x: '2.5%', y: '13%', s: 34, c: '#39FF88', o: .34, d: '-2s' },
    { x: '11%', y: '68%', s: 18, c: '#B388FF', o: .48, d: '-4s' },
    { x: '21%', y: '7%', s: 14, c: '#FFE14D', o: .52, d: '-1.2s' },
    { x: '30%', y: '86%', s: 22, c: '#FF4D9D', o: .32, d: '-3.4s' },
    { x: '45%', y: '15%', s: 22, c: '#FF4D9D', o: .38, d: '-3s' },
    { x: '52%', y: '80%', s: 30, c: '#B388FF', o: .32, d: '-5s' },
    { x: '63%', y: '9%', s: 16, c: '#39FF88', o: .55, d: '-2.4s' },
    { x: '76%', y: '86%', s: 20, c: '#FFE14D', o: .42, d: '-3.6s' },
    { x: '87%', y: '24%', s: 36, c: '#FF4D9D', o: .26, d: '-1.8s' },
    { x: '92%', y: '60%', s: 14, c: '#39FF88', o: .48, d: '-4.4s' },
    { x: '8%', y: '43%', s: 12, c: '#FFE14D', o: .42, d: '-5.2s' },
    { x: '59%', y: '47%', s: 13, c: '#B388FF', o: .26, d: '-1.4s' }
  ];

  function buildCollage() {
    var host = document.getElementById('heroCollage');
    if (!host) return;
    PX_DEFS.forEach(function (p) {
      var el = document.createElement('span');
      el.className = 'px';
      el.style.left = p.x;
      el.style.top = p.y;
      el.style.width = p.s + 'px';
      el.style.height = p.s + 'px';
      el.style.background = p.c;
      el.style.opacity = p.o;
      el.style.setProperty('--d', p.d);
      host.appendChild(el);
    });
  }

  /* ---------------- 10. 導航 / 進場 / 視差 ---------------- */
  function initNav() {
    var nav = document.getElementById('nav');
    var burger = document.getElementById('navBurger');
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle('nav--collapsed', window.scrollY > 16);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('nav--open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    $$('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
        if (a.dataset.filter) setFilter(a.dataset.filter, false);
      });
    });

    $$('#langSeg button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.lang !== lang) setLang(b.dataset.lang, true);
      });
    });

    $$('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () { setFilter(b.dataset.jump, true); });
    });
  }

  function initReveal() {
    var els = $$('.reveal');
    if (!els.length) return;
    els.forEach(function (el) {
      var i = 0, sib = el;
      while ((sib = sib.previousElementSibling)) {
        if (sib.classList.contains('reveal')) i++;
      }
      el.style.setProperty('--i', Math.min(i, 5));
    });
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function initParallax() {
    var hero = document.getElementById('top');
    var stage = document.getElementById('heroStage');
    var collage = document.getElementById('heroCollage');
    if (!hero || !stage || reduced.matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    var raf = null, tx = 0, ty = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        stage.style.transform = 'translate3d(' + (tx * 16).toFixed(2) + 'px,' + (ty * 12).toFixed(2) + 'px,0)';
        collage.style.transform = 'translate3d(' + (-tx * 22).toFixed(2) + 'px,' + (-ty * 16).toFixed(2) + 'px,0)';
      });
    });
    hero.addEventListener('pointerleave', function () {
      stage.style.transform = '';
      collage.style.transform = '';
    });
  }

  function watchReducedMotion() {
    var handler = function () {
      clearFlipTimers();
      if (reduced.matches) {
        $$('.tile').forEach(function (tile) { tile.classList.remove('is-flipped'); });
      } else {
        $$('.tile').forEach(scheduleFlip);
      }
    };
    if (reduced.addEventListener) reduced.addEventListener('change', handler);
    else if (reduced.addListener) reduced.addListener(handler);
  }

  /* ---------------- 11. 啟動 ---------------- */
  function init() {
    var saved = null;
    try { saved = localStorage.getItem('laswi-game-lang'); } catch (e) { /* noop */ }
    if (!saved) {
      var nav0 = (navigator.language || 'zh-Hant').toLowerCase();
      saved = (nav0 === 'zh-cn' || nav0.indexOf('zh-hans') > -1 || nav0 === 'zh') ? 'zh-Hans' : 'zh-Hant';
    }

    renderStatic();
    buildCollage();
    paintCabinet();
    initNav();
    initReveal();
    initParallax();
    watchReducedMotion();
    setLang(saved, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
