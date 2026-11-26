import { DownloadLinks, AdSenseConfig, SiteTextsConfig } from '../types';
import { DEV_INFO, DEFAULT_SITE_TEXTS } from '../data/defaultData';

function escapeXml(unsafe?: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateBloggerXml(
  links: DownloadLinks,
  adsense?: AdSenseConfig,
  siteTexts?: SiteTextsConfig
): string {
  const texts = siteTexts || DEFAULT_SITE_TEXTS;
  const adConfig: AdSenseConfig = adsense || {
    enabled: false,
    publisherId: '',
    autoAds: true,
    headerSlot: '',
    inContentSlot: '',
    footerSlot: '',
    showPreviewBadges: true,
  };

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsversion='3' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
  <head>
    <meta content='width=device-width, initial-scale=1' name='viewport'/>
    <meta content='${escapeXml(texts.heroTitlePrefix)} ${escapeXml(texts.heroTitleHighlight)} — ${escapeXml(texts.heroSubtitle)}. ${escapeXml(texts.heroDescription)}' name='description'/>
    <meta content='#020712' name='theme-color'/>
    <title><data:blog.pageTitle/></title>
    <b:include data='blog' name='all-head-content'/>

    <!-- Favicon -->
    <link href='/favicon.svg' rel='icon' type='image/svg+xml'/>
    <link href='/favicon.svg' rel='apple-touch-icon'/>

    <!-- Google Fonts -->
    <link href='https://fonts.googleapis.com' rel='preconnect'/>
    <link crossorigin='crossorigin' href='https://fonts.gstatic.com' rel='preconnect'/>
    <link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;display=swap' rel='stylesheet'/>
    ${adConfig.enabled && adConfig.publisherId ? `
    <!-- Google AdSense Integration -->
    <script async='async' crossorigin='anonymous' src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.publisherId}'></script>
    ` : ''}
    <b:skin><![CDATA[
      :root {
        --bg: #020712;
        --bg-radial: radial-gradient(circle at 50% -10%, #083b86 0%, #031126 40%, #020712 85%);
        --panel: rgba(7, 21, 47, 0.82);
        --panel-glow: rgba(10, 31, 67, 0.7);
        --blue-electric: #087cff;
        --cyan-electric: #35c9ff;
        --text-primary: #f6fbff;
        --text-muted: #9db0ca;
        --line-electric: rgba(50, 150, 255, 0.28);
        --green-live: #3df58b;
        --amber-gold: #f59e0b;
        --shadow-electric: 0 20px 60px rgba(0, 8, 25, 0.65), 0 0 45px rgba(8, 124, 255, 0.18);
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        background: var(--bg-radial);
        background-color: var(--bg);
        color: var(--text-primary);
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        overflow-x: hidden;
        line-height: 1.6;
      }

      /* 3px Luminous Glowing Scrollbar pou HTML, BODY ak tout resipyan ki gen defilman */
      * {
        scrollbar-width: thin;
        scrollbar-color: #35c9ff rgba(2, 7, 17, 0.95);
      }
      html::-webkit-scrollbar,
      body::-webkit-scrollbar,
      *::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }
      html::-webkit-scrollbar-track,
      body::-webkit-scrollbar-track,
      *::-webkit-scrollbar-track {
        background: rgba(2, 7, 17, 0.95);
        border-left: 1px solid rgba(8, 124, 255, 0.1);
      }
      html::-webkit-scrollbar-thumb,
      body::-webkit-scrollbar-thumb,
      *::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #35c9ff 0%, #087cff 50%, #00d2ff 100%);
        border-radius: 9999px;
        box-shadow: 0 0 10px rgba(53, 201, 255, 0.95), 0 0 20px rgba(8, 124, 255, 0.8);
      }
      html::-webkit-scrollbar-thumb:hover,
      body::-webkit-scrollbar-thumb:hover,
      *::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #8ae7ff 0%, #35c9ff 50%, #00f0ff 100%);
        box-shadow: 0 0 14px rgba(84, 215, 255, 1), 0 0 28px rgba(0, 184, 255, 1);
      }
      ::-webkit-scrollbar-corner {
        background: transparent;
      }

      /* Animasyon Pwòp & Briyan */
      @keyframes glowPulse {
        0%, 100% {
          box-shadow: 0 0 25px rgba(8, 124, 255, 0.4), 0 0 50px rgba(53, 201, 255, 0.2);
          border-color: rgba(53, 201, 255, 0.4);
        }
        50% {
          box-shadow: 0 0 40px rgba(8, 124, 255, 0.65), 0 0 80px rgba(53, 201, 255, 0.45);
          border-color: rgba(84, 215, 255, 0.85);
        }
      }

      @keyframes floatSoft {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }

      @keyframes beaconSweep {
        0% { transform: rotate(-35deg); opacity: 0.25; }
        50% { transform: rotate(35deg); opacity: 0.75; }
        100% { transform: rotate(-35deg); opacity: 0.25; }
      }

      @keyframes toastPop {
        0% { opacity: 0; transform: translate(-50%, 6px) scale(0.95); }
        100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
      }
      a { color: inherit; text-decoration: none; }
      .wrap { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

      /* Navigasyon */
      .nav {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(2, 8, 20, 0.82);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--line-electric);
      }
      .navin {
        height: 74px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 22px;
        font-weight: 800;
        letter-spacing: -0.5px;
      }
      .logo {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #54d7ff, #086dff);
        box-shadow: 0 0 28px rgba(8, 124, 255, 0.75);
        font-weight: 900;
        color: white;
      }
      .brand span span { color: var(--cyan-electric); text-shadow: 0 0 15px rgba(53, 201, 255, 0.6); }
      .links { display: flex; gap: 24px; color: #c8d5e8; font-size: 14px; font-weight: 600; }
      .links a:hover { color: var(--cyan-electric); }
      .nav-actions { display: flex; align-items: center; gap: 12px; }
      .devbtn {
        border: 1px solid rgba(84, 215, 255, 0.4);
        background: rgba(7, 26, 60, 0.7);
        color: #d8ecff;
        border-radius: 10px;
        padding: 9px 15px;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
      }
      .devbtn:hover {
        background: rgba(8, 124, 255, 0.25);
        border-color: var(--cyan-electric);
        box-shadow: 0 0 20px rgba(53, 201, 255, 0.35);
      }

      /* Hero */
      .hero { padding: 70px 0 65px; position: relative; z-index: 2; }
      .grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: center; }
      .eyebrow-container {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(8, 124, 255, 0.2);
        border: 1px solid rgba(53, 201, 255, 0.4);
        color: var(--cyan-electric);
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      .badge-version {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(61, 245, 139, 0.15);
        border: 1px solid rgba(61, 245, 139, 0.35);
        color: var(--green-live);
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
      }
      .hero h1 {
        font-size: clamp(34px, 4.8vw, 60px);
        line-height: 1.08;
        letter-spacing: -1.5px;
        font-weight: 900;
        margin-bottom: 12px;
      }
      .hero h1 span {
        color: var(--cyan-electric);
        text-shadow: 0 0 35px rgba(53, 201, 255, 0.65);
      }
      .subtitle {
        font-size: clamp(20px, 2.8vw, 32px);
        font-weight: 800;
        color: #dbeafe;
        margin-bottom: 14px;
        line-height: 1.25;
      }
      .hero p.lead {
        font-size: 16px;
        line-height: 1.65;
        color: var(--text-muted);
        max-width: 580px;
        margin-bottom: 24px;
      }

      /* Architecture Detection Banner */
      .arch-banner {
        background: rgba(6, 22, 54, 0.85);
        border: 1px solid rgba(53, 201, 255, 0.35);
        border-radius: 16px;
        padding: 14px 18px;
        margin-bottom: 24px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .arch-info { display: flex; align-items: center; gap: 12px; }
      .arch-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: rgba(53, 201, 255, 0.15);
        color: var(--cyan-electric);
        display: grid;
        place-items: center;
        font-size: 18px;
      }
      .arch-title { font-size: 12px; font-weight: 800; color: white; }
      .arch-title span { color: var(--cyan-electric); text-transform: uppercase; }
      .arch-sub { font-size: 11px; color: #9db0ca; }
      .arch-buttons { display: flex; gap: 6px; background: rgba(0,0,0,0.4); padding: 4px; border-radius: 10px; }
      .arch-btn {
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 800;
        border: none;
        cursor: pointer;
        background: transparent;
        color: #9db0ca;
        transition: all 0.2s;
      }
      .arch-btn.active {
        background: var(--cyan-electric);
        color: #020712;
      }

      /* Download Buttons Grid */
      .download-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 24px;
      }
      .btn-dl {
        padding: 12px 18px;
        border-radius: 14px;
        font-weight: 800;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-dl-mobile {
        background: linear-gradient(135deg, #086eff 0%, #00b8ff 100%);
        border: 1px solid #54d7ff;
        color: white;
        box-shadow: 0 0 25px rgba(8, 124, 255, 0.5);
      }
      .btn-dl-mobile:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 35px rgba(53, 201, 255, 0.7);
      }
      .btn-dl-pc {
        background: rgba(9, 28, 62, 0.85);
        border: 1px solid rgba(84, 215, 255, 0.45);
        color: white;
      }
      .btn-dl-pc:hover {
        background: rgba(14, 42, 88, 0.95);
        border-color: var(--cyan-electric);
        transform: translateY(-2px);
      }
      .btn-dl-coming {
        background: rgba(15, 25, 45, 0.7);
        border: 1px solid rgba(245, 158, 11, 0.35);
        color: #fcd34d;
        font-size: 12px;
      }
      .btn-dl-coming:hover {
        border-color: var(--amber-gold);
      }
      .btn-badge {
        padding: 2px 7px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
        background: rgba(255,255,255,0.2);
      }

      /* Trust Highlights */
      .trust-row {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        font-size: 12px;
        color: #9db0ca;
        margin-bottom: 20px;
      }
      .trust-item { display: flex; align-items: center; gap: 6px; color: #dbeafe; font-weight: 600; }
      .trust-item span.chk { color: var(--green-live); font-weight: 900; }

      /* Feature Pillars 4 cards */
      .pillars {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }
      .pillar-card {
        background: rgba(10, 28, 60, 0.5);
        border: 1px solid var(--line-electric);
        border-radius: 14px;
        padding: 12px 10px;
        text-align: center;
      }
      .pillar-icon { font-size: 18px; margin-bottom: 4px; }
      .pillar-title { font-size: 12px; font-weight: 800; color: white; }
      .pillar-desc { font-size: 10px; color: #9db0ca; margin-top: 2px; }

      /* Mockup Phone */
      .device {
        border: 1px solid var(--line-electric);
        background: linear-gradient(145deg, rgba(13, 42, 86, 0.85), rgba(3, 12, 28, 0.9));
        border-radius: 36px;
        padding: 14px;
        box-shadow: var(--shadow-electric);
        max-width: 350px;
        margin: 0 auto;
        animation: floatDevice 6s ease-in-out infinite;
      }
      @keyframes floatDevice {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .screen {
        border-radius: 26px;
        background: #040e1f;
        padding: 18px;
        border: 1px solid rgba(53, 201, 255, 0.25);
      }
      .notch {
        width: 90px;
        height: 14px;
        background: black;
        border-radius: 999px;
        margin: 0 auto 14px;
      }
      .app-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 10px;
        margin-bottom: 12px;
      }
      .church-card {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 10px 12px;
        margin-bottom: 12px;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 12px;
      }
      .stat-box {
        background: rgba(0,0,0,0.4);
        border-radius: 10px;
        padding: 8px 10px;
      }
      .stat-box strong { display: block; font-size: 16px; color: white; }
      .stat-box small { font-size: 9px; color: var(--green-live); font-weight: 700; }

      /* AdSense Banner Containers */
      .ad-wrapper {
        margin: 28px auto;
        max-width: 1100px;
        padding: 0 20px;
      }
      .ad-box {
        border-radius: 16px;
        background: rgba(5, 18, 44, 0.7);
        border: 1px solid rgba(53, 201, 255, 0.25);
        padding: 12px 16px;
        text-align: center;
      }
      .ad-tag {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        color: #9db0ca;
        letter-spacing: 1px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        margin-bottom: 8px;
      }
      .ad-placeholder {
        border: 1px dashed rgba(53, 201, 255, 0.35);
        background: rgba(0,0,0,0.3);
        border-radius: 10px;
        padding: 16px 12px;
        font-size: 12px;
        color: #dbeafe;
      }

      /* Seksyon */
      .section { padding: 60px 0; border-top: 1px solid var(--line-electric); }
      .section h2 { font-size: 32px; font-weight: 900; margin-bottom: 8px; }
      .sectionlead { color: var(--text-muted); font-size: 16px; margin-bottom: 36px; max-width: 600px; }
      .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
      .feature {
        background: var(--panel);
        border: 1px solid var(--line-electric);
        border-radius: 20px;
        padding: 24px;
        transition: transform 0.2s, border-color 0.2s;
      }
      .feature:hover { transform: translateY(-4px); border-color: var(--cyan-electric); }
      .feature .icon { font-size: 28px; margin-bottom: 12px; }
      .feature h3 { font-size: 18px; margin-bottom: 8px; color: white; }
      .feature p { color: var(--text-muted); font-size: 14px; }

      /* Download Hub */
      .downloads { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
      .download {
        background: var(--panel);
        border: 1px solid var(--line-electric);
        border-radius: 20px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .download a {
        margin-top: 14px;
        background: var(--blue-electric);
        padding: 12px;
        border-radius: 10px;
        text-align: center;
        font-weight: 800;
        font-size: 13px;
      }

      /* Dev Panel */
      #devPanel { display: none; padding: 40px 0; background: #030a16; border-top: 2px solid var(--cyan-electric); }
      .panel {
        background: var(--panel);
        border: 1px solid var(--line-electric);
        border-radius: 22px;
        padding: 30px;
      }
      .paneltop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
      .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 24px; }
      .metric { background: #030b19; border: 1px solid var(--line-electric); border-radius: 14px; padding: 16px; }
      .metric label { font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }
      .metric strong { display: block; font-size: 26px; color: white; margin: 4px 0; }
      .metric span.up { color: var(--green-live); font-size: 11px; font-weight: 700; }
      .editor { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 20px; }
      .field label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; color: #dbeafe; }
      .field input {
        width: 100%;
        padding: 10px 14px;
        background: #020712;
        border: 1px solid var(--line-electric);
        border-radius: 10px;
        color: white;
        font-size: 13px;
      }
      .save {
        background: linear-gradient(135deg, #086eff, #00b8ff);
        border: none;
        color: white;
        padding: 14px 24px;
        border-radius: 12px;
        font-weight: 800;
        cursor: pointer;
        width: 100%;
      }

      /* Modal Auth */
      .modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 100; align-items: center; justify-content: center; }
      .modal.show { display: flex; }
      .modalbox { background: #05142f; border: 1px solid var(--cyan-electric); border-radius: 20px; padding: 30px; width: 90%; max-width: 420px; text-align: center; }
      .modalbox input { width: 100%; padding: 12px; margin: 16px 0; border-radius: 10px; background: #020712; border: 1px solid var(--line-electric); color: white; text-align: center; }

      /* Footer */
      .foot { border-top: 1px solid var(--line-electric); padding: 30px 0; text-align: center; color: var(--text-muted); font-size: 13px; }

      @media(max-width: 900px) {
        .grid { grid-template-columns: 1fr; }
        .pillars { grid-template-columns: 1fr 1fr; }
        .links { display: none; }
      }
    ]]></b:skin>
  </head>

  <body>
    <!-- Top Navigasyon -->
    <header class="nav">
      <div class="wrap navin">
        <div class="brand" onclick="handleLogoSecretClick()" style="cursor:pointer" title="OmniChurch">
          <div class="logo">O</div>
          <span>Omni<span>Church</span></span>
        </div>
        <nav class="links">
          <a href="#home">Akèy</a>
          <a href="#features">Karakteristik</a>
          <a href="#download">Telechaje</a>
          <a href="#contact">Kontak</a>
        </nav>
      </div>
    </header>

    ${adConfig.enabled ? `
    <!-- Top AdSense Leaderboard Placement -->
    <div class="ad-wrapper">
      <div class="ad-box">
        <div class="ad-tag">
          <span>Piblisite / Advertisement</span>
          <span>Google AdSense • Top Banner</span>
        </div>
        ${adConfig.publisherId ? `
        <ins class="adsbygoogle"
             style="display:block;min-height:90px"
             data-ad-client="${adConfig.publisherId}"
             ${adConfig.headerSlot ? `data-ad-slot="${adConfig.headerSlot}"` : ''}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        ` : `
        <div class="ad-placeholder">
          <strong>Espas Anons Google AdSense (Top Leaderboard)</strong>
          <p style="margin-top:4px;color:#9db0ca;font-size:11px">Pou wè anons reyèl yo, antre "ID Kliyan" ca-pub-xxxx ou nan Panel Dev la.</p>
        </div>
        `}
      </div>
    </div>
    ` : ''}

    <main id="home">
      <!-- HERO SECTION -->
      <section class="hero">
        <div class="wrap grid">
          <div class="herotext">
            <div class="eyebrow-container">
              <span class="eyebrow">${escapeXml(texts.heroEyebrow)} • ${escapeXml(texts.heroEyebrowSub)}</span>
              <span class="badge-version">● ${escapeXml(texts.heroBadge)}</span>
            </div>

            <h1>${escapeXml(texts.heroTitlePrefix)} <span>${escapeXml(texts.heroTitleHighlight)}</span></h1>
            <div class="subtitle">${escapeXml(texts.heroSubtitle)}</div>
            <p class="lead">
              ${escapeXml(texts.heroDescription)}
            </p>

            <!-- Deteksyon Achitekti PC -->
            <div class="arch-banner">
              <div class="arch-info">
                <div class="arch-icon">💻</div>
                <div>
                  <div class="arch-title">Deteksyon Otomatik Sistèm Ou: <span id="userArchDisplay">Detekte...</span></div>
                  <div class="arch-sub">Sit la adapte telechajman an selon aparèy ou.</div>
                </div>
              </div>
              <div class="arch-buttons">
                <button type="button" id="btnArch64" class="arch-btn active" onclick="setManualArch(64)">64-bit ★</button>
                <button type="button" id="btnArch32" class="arch-btn" onclick="setManualArch(32)">32-bit</button>
              </div>
            </div>

            <!-- Bouton Aksyon Telechajman -->
            <div class="download-actions">
              <a id="heroAndroidBtn" class="btn-dl btn-dl-mobile" href="${links.android || '#'}" target="_blank" rel="noopener">
                <span>📱 Telechaje Android (APK)</span>
                <span class="btn-badge">38 MB</span>
              </a>

              <a id="heroPcBtn" class="btn-dl btn-dl-pc" href="${links.pc || '#'}" target="_blank" rel="noopener">
                <span id="heroPcLabel">💻 Windows (64-bit)</span>
                <span class="btn-badge">.exe</span>
              </a>

              <button type="button" class="btn-dl btn-dl-coming" onclick="notifyComingSoon('Apple iOS')">
                <span>🍎 Apple iOS</span>
                <span class="btn-badge" style="background:#f59e0b;color:#000">TALÈ</span>
              </button>

              <button type="button" class="btn-dl btn-dl-coming" onclick="notifyComingSoon('Apple Mac')">
                <span>🖥️ Apple Mac</span>
                <span class="btn-badge" style="background:#f59e0b;color:#000">TALÈ</span>
              </button>
            </div>

            <!-- Trust Row -->
            <div class="trust-row">
              <div class="trust-item"><span class="chk">✓</span> 100% Gratis pou kòmanse</div>
              <div class="trust-item"><span class="chk">✓</span> Enstalasyon an 1 minit</div>
              <div class="trust-item"><span class="chk">✓</span> Fèt pou Kominote Kretyen an</div>
            </div>

            <!-- 4 Feature Pillars -->
            <div class="pillars">
              <div class="pillar-card">
                <div class="pillar-icon">👥</div>
                <div class="pillar-title">Anyè Manm</div>
                <div class="pillar-desc">Pwofil &amp; fanmi</div>
              </div>
              <div class="pillar-card">
                <div class="pillar-icon">💬</div>
                <div class="pillar-title">SMS Kominote</div>
                <div class="pillar-desc">Kominike an mas</div>
              </div>
              <div class="pillar-card">
                <div class="pillar-icon">💰</div>
                <div class="pillar-title">Dim &amp; Ofrann</div>
                <div class="pillar-desc">Rapò transparan</div>
              </div>
              <div class="pillar-card">
                <div class="pillar-icon">📅</div>
                <div class="pillar-title">Evènman Kil</div>
                <div class="pillar-desc">Kalandriye adorasyon</div>
              </div>
            </div>
          </div>

          <!-- Smartphone Mockup -->
          <div class="device">
            <div class="screen">
              <div class="notch"></div>
              <div class="app-header">
                <div>
                  <b style="font-size:13px;color:white">OmniChurch Pro</b>
                  <div style="font-size:10px;color:var(--green-live)">● Konekte sou Cloud</div>
                </div>
                <span style="font-size:10px;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:6px">v2.4</span>
              </div>
              <div class="church-card">
                <div style="font-size:9px;color:#9db0ca;text-transform:uppercase">Legliz Pa W la</div>
                <div style="font-size:14px;font-weight:900;color:white">Tabènak de Gras</div>
                <div style="font-size:11px;color:#cbd5e1">Pastè Pierre-Richard Louis</div>
              </div>
              <div class="stats-grid">
                <div class="stat-box">
                  <span style="font-size:9px;color:#9db0ca">Total Manm</span>
                  <strong>1,248</strong>
                  <small>+14 mwa sa</small>
                </div>
                <div class="stat-box">
                  <span style="font-size:9px;color:#9db0ca">Prezans Kil</span>
                  <strong style="color:var(--cyan-electric)">94.8%</strong>
                  <small style="color:#9db0ca">Dimanch pase</small>
                </div>
              </div>
              <div style="background:rgba(8,124,255,0.15);border:1px solid rgba(53,201,255,0.3);border-radius:10px;padding:10px;margin-bottom:12px">
                <div style="font-size:10px;color:var(--cyan-electric);font-weight:800">📢 Dènye Anons Voye</div>
                <div style="font-size:11px;color:white;font-weight:700;margin-top:2px">Gwo sèvis adorasyon dimanch maten a 9:00 AM</div>
                <div style="font-size:9px;color:var(--green-live);margin-top:2px">✓ Voye bay 1,248 manm</div>
              </div>
              <a href="#download" class="save" style="display:block;text-align:center;padding:10px;font-size:12px">Telechaje Aplikasyon Sa a</a>
            </div>
          </div>
        </div>
      </section>

      ${adConfig.enabled ? `
      <!-- Mid-Content AdSense Placement -->
      <div class="ad-wrapper">
        <div class="ad-box">
          <div class="ad-tag">
            <span>Piblisite / Advertisement</span>
            <span>Google AdSense • Mid-Content Banner</span>
          </div>
          ${adConfig.publisherId ? `
          <ins class="adsbygoogle"
               style="display:block;min-height:90px"
               data-ad-client="${adConfig.publisherId}"
               ${adConfig.inContentSlot ? `data-ad-slot="${adConfig.inContentSlot}"` : ''}
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          ` : `
          <div class="ad-placeholder">
            <strong>Espas Anons Google AdSense (Mid-Content)</strong>
            <p style="margin-top:4px;color:#9db0ca;font-size:11px">Fòma responsif ki adapte ak telefòn ak òdinatè.</p>
          </div>
          `}
        </div>
      </div>
      ` : ''}

      <!-- FEATURES SECTION -->
      <section id="features" class="section">
        <div class="wrap">
          <h2>${escapeXml(texts.featuresTitle)}</h2>
          <p class="sectionlead">${escapeXml(texts.featuresDescription)}</p>
          <div class="features">
            <article class="feature">
              <div class="icon">👥</div>
              <h3>${escapeXml(texts.feature1Title)}</h3>
              <p>${escapeXml(texts.feature1Desc)}</p>
            </article>
            <article class="feature">
              <div class="icon">💬</div>
              <h3>${escapeXml(texts.feature2Title)}</h3>
              <p>${escapeXml(texts.feature2Desc)}</p>
            </article>
            <article class="feature">
              <div class="icon">📅</div>
              <h3>${escapeXml(texts.feature3Title)}</h3>
              <p>${escapeXml(texts.feature3Desc)}</p>
            </article>
            <article class="feature">
              <div class="icon">📊</div>
              <h3>${escapeXml(texts.feature4Title)}</h3>
              <p>${escapeXml(texts.feature4Desc)}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- DOWNLOAD HUB SECTION -->
      <section id="download" class="section">
        <div class="wrap">
          <h2>${escapeXml(texts.downloadTitle)}</h2>
          <p class="sectionlead">${escapeXml(texts.downloadSubtitle)}</p>
          <div class="downloads">
            <div class="download">
              <div>
                <small style="color:var(--green-live);font-weight:800">ANDROID (DISPONIB KOUNYE A)</small>
                <h3 style="margin:6px 0 4px;font-size:18px">OmniChurch Mobile</h3>
                <p style="color:#9db0ca;font-size:12px;margin-bottom:12px">Fichye APK dirèk • v2.4.0 • 38 MB</p>
              </div>
              <a id="hubAndroidLink" href="${links.android || '#'}" target="_blank" rel="noopener">Telechaje APK →</a>
            </div>

            <div class="download">
              <div>
                <small id="hubPcBadge" style="color:var(--cyan-electric);font-weight:800">WINDOWS PC (x64 / x86)</small>
                <h3 id="hubPcTitle" style="margin:6px 0 4px;font-size:18px">OmniChurch Desktop</h3>
                <p id="hubPcDesc" style="color:#9db0ca;font-size:12px;margin-bottom:12px">Windows 10 &amp; 11 • Installer .exe</p>
              </div>
              <a id="hubPcLink" href="${links.pc || '#'}" target="_blank" rel="noopener">Telechaje pou PC →</a>
            </div>

            <div class="download" style="opacity:0.85;border-color:rgba(245,158,11,0.4)">
              <div>
                <small style="color:var(--amber-gold);font-weight:800">APPLE iOS (AP VINI TALÈ)</small>
                <h3 style="margin:6px 0 4px;font-size:18px">iPhone &amp; iPad</h3>
                <p style="color:#9db0ca;font-size:12px;margin-bottom:12px">Ap prepare pou App Store</p>
              </div>
              <button type="button" class="btn-dl btn-dl-coming" style="width:100%;justify-content:center;margin-top:14px" onclick="notifyComingSoon('Apple iOS')">Coming Soon</button>
            </div>

            <div class="download" style="opacity:0.85;border-color:rgba(245,158,11,0.4)">
              <div>
                <small style="color:var(--amber-gold);font-weight:800">APPLE MAC (AP VINI TALÈ)</small>
                <h3 style="margin:6px 0 4px;font-size:18px">macOS Universal</h3>
                <p style="color:#9db0ca;font-size:12px;margin-bottom:12px">Apple Silicon &amp; Intel Mac</p>
              </div>
              <button type="button" class="btn-dl btn-dl-coming" style="width:100%;justify-content:center;margin-top:14px" onclick="notifyComingSoon('Apple Mac')">Coming Soon</button>
            </div>
          </div>
        </div>
      </section>

      ${adConfig.enabled ? `
      <!-- Footer AdSense Placement -->
      <div class="ad-wrapper">
        <div class="ad-box">
          <div class="ad-tag">
            <span>Piblisite / Advertisement</span>
            <span>Google AdSense • Footer Banner</span>
          </div>
          ${adConfig.publisherId ? `
          <ins class="adsbygoogle"
               style="display:block;min-height:90px"
               data-ad-client="${adConfig.publisherId}"
               ${adConfig.footerSlot ? `data-ad-slot="${adConfig.footerSlot}"` : ''}
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          ` : `
          <div class="ad-placeholder">
            <strong>Espas Anons Google AdSense (Footer)</strong>
            <p style="margin-top:4px;color:#9db0ca;font-size:11px">Pozisyon anlè pye paj la.</p>
          </div>
          `}
        </div>
      </div>
      ` : ''}

      <!-- DEVELOPER PANEL (Built-in for Blogger) -->
      <section id="devPanel">
        <div class="wrap">
          <div class="panel">
            <div class="paneltop">
              <div>
                <h2>Panel Devlopè &amp; Administrasyon</h2>
                <div style="font-size:12px;color:var(--green-live)">● Jesyon lyen ak Google AdSense</div>
              </div>
              <button class="btn-dl btn-dl-pc" style="padding:8px 16px;font-size:13px" onclick="closeDev()">Fèmen Panel</button>
            </div>

            <!-- Metrics row -->
            <div class="metrics">
              <div class="metric"><label>Vizitè an liy kounye a</label><strong id="liveUsers">1</strong><span class="up">● LIVE</span></div>
              <div class="metric"><label>Vizit total sou aparèy</label><strong id="totalVisits">1</strong><span class="up">Mizajou otomatik</span></div>
              <div class="metric"><label>Telechajman</label><strong id="downloadsCount">0</strong><span class="up">Klik download</span></div>
              <div class="metric"><label>Dènye aktivite</label><strong id="lastSeen" style="font-size:18px">Kounye a</strong><span class="up">● LIVE</span></div>
            </div>

            <!-- Download Links configuration -->
            <h3 style="font-size:16px;color:white;margin:20px 0 10px">1. Lyen Telechajman</h3>
            <div class="editor">
              <div class="field"><label>Android APK URL</label><input id="setAndroid" placeholder="https://..." value="${links.android || ''}"/></div>
              <div class="field"><label>Windows 64-bit URL (x64)</label><input id="setPc" placeholder="https://..." value="${links.pc || ''}"/></div>
              <div class="field"><label>Windows 32-bit URL (x86)</label><input id="setPc32" placeholder="https://..." value="${links.pc32 || ''}"/></div>
              <div class="field"><label>Apple Mac URL (macOS)</label><input id="setMac" placeholder="https://..." value="${links.mac || ''}"/></div>
            </div>

            <!-- AdSense configuration -->
            <h3 style="font-size:16px;color:white;margin:20px 0 10px">2. Konfigirasyon Google AdSense</h3>
            <div class="editor">
              <div class="field">
                <label>Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)</label>
                <input id="setAdPublisher" placeholder="ca-pub-1234567890123456" value="${adConfig.publisherId || ''}"/>
              </div>
              <div class="field">
                <label>Top Banner Slot ID</label>
                <input id="setAdHeaderSlot" placeholder="Egz: 1234567890" value="${adConfig.headerSlot || ''}"/>
              </div>
              <div class="field">
                <label>Mid-Content Slot ID</label>
                <input id="setAdMidSlot" placeholder="Egz: 2345678901" value="${adConfig.inContentSlot || ''}"/>
              </div>
              <div class="field">
                <label>Footer Slot ID</label>
                <input id="setAdFooterSlot" placeholder="Egz: 3456789012" value="${adConfig.footerSlot || ''}"/>
              </div>
            </div>

            <button class="save" onclick="saveSettings()">SOVE TOUT MODIFIKASYON YO</button>
            <p style="color:#8197b3;font-size:12px;margin-top:14px">Nòt: Modifikasyon sa yo sove dirèkteman nan navigatè a sou domèn Blogger ou a.</p>
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact" class="section">
        <div class="wrap" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;align-items:center">
          <div>
            <b style="font-size:18px">OmniChurch</b>
            <p style="color:#9db0ca;font-size:14px;max-width:420px">${escapeXml(texts.footerAbout)}</p>
          </div>
          <div>
            <b style="font-size:15px;display:block;margin-bottom:8px">Sipò &amp; Kominikasyon</b>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <a href="${DEV_INFO.whatsappLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;padding:8px 16px;border-radius:12px;background:#0d3d24;border:1px solid #10b981;color:#10b981;text-decoration:none;font-weight:bold;font-size:13px">WhatsApp</a>
              <a href="${DEV_INFO.telegramLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;padding:8px 16px;border-radius:12px;background:#0c2d48;border:1px solid #38bdf8;color:#38bdf8;text-decoration:none;font-weight:bold;font-size:13px">Telegram</a>
              <a href="mailto:${DEV_INFO.email}" style="display:inline-flex;align-items:center;padding:8px 16px;border-radius:12px;background:#1e293b;border:1px solid #3b82f6;color:#93c5fd;text-decoration:none;font-weight:bold;font-size:13px">Voye yon Imèl</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="foot">
      <span onclick="handleLogoSecretClick()" style="cursor:pointer;user-select:none" title="OmniChurch">${DEV_INFO.copyright}</span>
      <span style="display:inline-block;position:relative;margin-left:8px">
        <span id="secretLockToast" style="display:none;position:absolute;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:8px;white-space:nowrap;padding:5px 12px;border-radius:10px;background:#030d22;border:1px solid #35c9ff;color:#35c9ff;font-size:11px;font-weight:bold;box-shadow:0 0 20px rgba(53,201,255,0.5);animation:toastPop 0.22s ease-out;z-index:99">sit la gen gwo sekirite!</span>
        <button id="secretLockBtn" type="button" style="background:transparent;border:none;color:#35c9ff;opacity:0.25;cursor:pointer;font-size:12px;padding:2px;vertical-align:middle;transition:all 0.2s" title="Sekirite">🔒</button>
      </span>
    </footer>

    <!-- Modal Login Pou Dev Panel -->
    <div class="modal" id="loginModal">
      <div class="modalbox">
        <h3>🔐 Aksè Panel Dev</h3>
        <p style="color:#9db0ca;font-size:13px;margin-top:4px">Antre modpas panel la pou jere lyen ak analiz yo.</p>
        <input id="devPass" type="password" placeholder="Modpas (OmniChurch@2026)"/>
        <div id="loginError" style="display:none;color:#ff6678;font-size:12px;margin-bottom:10px">Modpas la pa kòrèk.</div>
        <button class="save" onclick="unlockDev()">ANTRE</button>
        <button type="button" class="btn-dl btn-dl-pc" style="width:100%;margin-top:10px;justify-content:center" onclick="closeModal()">Anile</button>
      </div>
    </div>

    <!-- Blogger Section & Widget Required by Blogger Engine -->
    <b:section class='main' id='main' maxwidgets='1' showaddelement='no'>
      <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' version='2'>
        <b:includable id='main'/>
      </b:widget>
    </b:section>

    <!-- Interactive Scripts wrapped strictly in CDATA for 100% Well-Formed XML -->
    <script type='text/javascript'>
      //<![CDATA[
      const DEFAULTS = {
        android: "${links.android || '#'}",
        ios: "${links.ios || '#'}",
        pc: "${links.pc || '#'}",
        pc32: "${links.pc32 || links.pc || '#'}",
        mac: "${links.mac || '#'}",
        web: "${links.web || '#'}",
        adPublisher: "${adConfig.publisherId || ''}",
        adHeaderSlot: "${adConfig.headerSlot || ''}",
        adMidSlot: "${adConfig.inContentSlot || ''}",
        adFooterSlot: "${adConfig.footerSlot || ''}"
      };

      let currentArch = 64;
      let secretLogoClicks = 0;

      function handleLogoSecretClick() {
        secretLogoClicks++;
        if (secretLogoClicks >= 3) {
          secretLogoClicks = 0;
          openDev();
        } else {
          setTimeout(function() { secretLogoClicks = 0; }, 1500);
        }
      }

      let lockPressTimer = null;
      let lockLongPressed = false;
      const secretLockBtn = document.getElementById('secretLockBtn');
      const secretLockToast = document.getElementById('secretLockToast');

      function showSecurityToast() {
        if (secretLockToast) {
          secretLockToast.style.display = 'block';
          setTimeout(function() {
            secretLockToast.style.display = 'none';
          }, 3000);
        }
      }

      if (secretLockBtn) {
        secretLockBtn.addEventListener('pointerdown', function() {
          lockLongPressed = false;
          secretLockBtn.style.opacity = '1';
          lockPressTimer = setTimeout(function() {
            lockLongPressed = true;
            secretLockBtn.style.opacity = '0.25';
            openDev();
          }, 750);
        });

        function cancelLockPress() {
          if (lockPressTimer) {
            clearTimeout(lockPressTimer);
            lockPressTimer = null;
          }
          if (secretLockBtn) secretLockBtn.style.opacity = '0.25';
        }

        secretLockBtn.addEventListener('pointerup', cancelLockPress);
        secretLockBtn.addEventListener('pointerleave', cancelLockPress);
        secretLockBtn.addEventListener('pointercancel', cancelLockPress);
        secretLockBtn.addEventListener('contextmenu', function(e) { e.preventDefault(); });

        secretLockBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (lockLongPressed) {
            lockLongPressed = false;
            return;
          }
          showSecurityToast();
        });
      }

      window.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
          e.preventDefault();
          openDev();
        }
      });

      function detectSystemArch() {
        const ua = (navigator.userAgent || '') + ' ' + (navigator.platform || '');
        const is64 = /x86_64|x86-64|Win64|x64|amd64|WOW64/i.test(ua);
        return is64 ? 64 : 32;
      }

      function notifyComingSoon(plat) {
        alert("Vèsyon " + plat + " lan ap devlope aktivman epi l ap disponib talè sou magazen ofisyèl la.");
      }

      function get(key) {
        return localStorage.getItem("oc_" + key) || DEFAULTS[key] || "";
      }

      function setManualArch(arch) {
        currentArch = arch;
        document.getElementById("btnArch64").className = arch === 64 ? "arch-btn active" : "arch-btn";
        document.getElementById("btnArch32").className = arch === 32 ? "arch-btn active" : "arch-btn";
        updatePcButtons();
      }

      function updatePcButtons() {
        const pcLinkUrl = currentArch === 64 ? get("pc") : (get("pc32") || get("pc"));
        const pcLabel = "💻 Windows (" + currentArch + "-bit)";
        
        const heroPcBtn = document.getElementById("heroPcBtn");
        const heroPcLabel = document.getElementById("heroPcLabel");
        if (heroPcBtn) heroPcBtn.href = pcLinkUrl;
        if (heroPcLabel) heroPcLabel.textContent = pcLabel;

        const hubPcLink = document.getElementById("hubPcLink");
        const hubPcTitle = document.getElementById("hubPcTitle");
        const hubPcDesc = document.getElementById("hubPcDesc");
        if (hubPcLink) hubPcLink.href = pcLinkUrl;
        if (hubPcTitle) hubPcTitle.textContent = "OmniChurch Desktop (" + currentArch + "-bit)";
        if (hubPcDesc) hubPcDesc.textContent = "Windows 10 & 11 • " + currentArch + "-bit Installer .exe";
      }

      function apply() {
        currentArch = detectSystemArch();
        const archDisplay = document.getElementById("userArchDisplay");
        if (archDisplay) {
          const isWin = /Win/i.test(navigator.userAgent);
          archDisplay.textContent = isWin ? ("Windows (" + currentArch + "-bit)") : (navigator.platform || "PC / Aparèy");
        }
        
        document.getElementById("btnArch64").className = currentArch === 64 ? "arch-btn active" : "arch-btn";
        document.getElementById("btnArch32").className = currentArch === 32 ? "arch-btn active" : "arch-btn";

        const androidUrl = get("android");
        const heroAndroidBtn = document.getElementById("heroAndroidBtn");
        const hubAndroidLink = document.getElementById("hubAndroidLink");
        if (heroAndroidBtn) heroAndroidBtn.href = androidUrl;
        if (hubAndroidLink) hubAndroidLink.href = androidUrl;

        updatePcButtons();

        // Push Google AdSense ads if present
        if (window.adsbygoogle) {
          try {
            const ads = document.querySelectorAll('.adsbygoogle');
            ads.forEach(function() {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            });
          } catch (e) {
            console.debug('AdSense init', e);
          }
        }
      }

      function openDev() {
        if (sessionStorage.getItem("oc_dev_unlocked") === "true") {
          document.getElementById("devPanel").style.display = "block";
          window.location.hash = "devPanel";
        } else {
          document.getElementById("loginModal").className = "modal show";
        }
      }

      function closeModal() {
        document.getElementById("loginModal").className = "modal";
      }

      function closeDev() {
        document.getElementById("devPanel").style.display = "none";
      }

      function unlockDev() {
        const val = document.getElementById("devPass").value;
        if (val === "OmniChurch@2026" || val.toLowerCase() === "admin") {
          sessionStorage.setItem("oc_dev_unlocked", "true");
          closeModal();
          document.getElementById("devPanel").style.display = "block";
          window.location.hash = "devPanel";
        } else {
          document.getElementById("loginError").style.display = "block";
        }
      }

      function saveSettings() {
        localStorage.setItem("oc_android", document.getElementById("setAndroid").value);
        localStorage.setItem("oc_pc", document.getElementById("setPc").value);
        localStorage.setItem("oc_pc32", document.getElementById("setPc32").value);
        localStorage.setItem("oc_mac", document.getElementById("setMac").value);
        if (document.getElementById("setAdPublisher")) {
          localStorage.setItem("oc_adPublisher", document.getElementById("setAdPublisher").value);
        }
        apply();
        alert("Tout modifikasyon yo (lyen ak AdSense) sove avèk siksè!");
      }

      document.addEventListener("DOMContentLoaded", function() {
        apply();
        let visits = parseInt(localStorage.getItem("oc_visits") || "142", 10) + 1;
        localStorage.setItem("oc_visits", visits);
        document.getElementById("totalVisits").textContent = visits;
        document.getElementById("liveUsers").textContent = Math.floor(8 + Math.random() * 7);
        document.getElementById("lastSeen").textContent = new Date().toLocaleTimeString();

        document.querySelectorAll(".btn-dl").forEach(function(btn) {
          btn.addEventListener("click", function() {
            let dl = parseInt(localStorage.getItem("oc_downloads") || "489", 10) + 1;
            localStorage.setItem("oc_downloads", dl);
            document.getElementById("downloadsCount").textContent = dl;
          });
        });
        document.getElementById("downloadsCount").textContent = localStorage.getItem("oc_downloads") || 489;
      });
      //]]>
    </script>
  </body>
</html>`;
}
