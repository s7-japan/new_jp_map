// HamburgerMenu.js
import React from "react";
import "./Footer.css"; // Reusing same CSS file
import { event } from "@/lib/gtag";

const HamburgerMenu = ({ isOpen, onClose }) => {
  const triggerURL = (url) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    console.log("working");
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  const handleMenuItemClick = (itemName, url) => {
    // Track menu item click
    event({
      action: 'menu_item_click',
      category: 'navigation',
      label: itemName
    });
    
    triggerURL(url);
  };
  
  const handleSocialClick = (platform, url) => {
    // Track social media click
    event({
      action: 'social_click',
      category: 'engagement',
      label: platform
    });
    
    triggerURL(url);
  };

  return (
    <div className={`footer-menu ${isOpen ? "is-show" : ""}`}>
      <div className="footer-menu__overlay" onClick={onClose}></div>
      <div className="footer-menu__nav">
        <div className="footer-menu__inner">
          <ul className="footer-link">
            <li
              onClick={() => {
                handleMenuItemClick("tickets", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenuticket");
              }}
              className="footer-link__item"
            >
              <a
                className="font-bold"
                href="https://www.suzukacircuit.jp/f1/ticket/index.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_ticket&utm_campaign=f1&utm_content=20250331"
              >
                チケット
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("access", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenuaccess");
              }}
              className="footer-link__item"
            >
              <a
                className="font-bold"
                href="https://www.suzukacircuit.jp/f1/access/index.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_access&utm_campaign=f1&utm_content=20250331"
              >
                アクセス
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("events", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenuevent");
              }}
              className="footer-link__item"
            >
              <a
                className="font-bold"
                href="https://miniapp.line.me/2007078799-0oWyrXee/eventcalender"
              >
                イベント情報
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("shop", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenushop");
              }}
              className="footer-link__item"
            >
              <a className="font-bold" href="https://goods.mobilitystation.jp/">
                オンラインショップ
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("members", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenumembers");
              }}
              className="footer-link__item"
            >
              <a
                className="font-bold"
                href="https://ticket.mobilitystation.jp/"
              >
                会員限定
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("dazn", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenudazn");
              }}
              className="footer-link__item"
            >
              <a
                className="font-bold"
                href="https://www.suzukacircuit.jp/f1/dazn.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_dazn&utm_campaign=f1&utm_content=20250331"
              >
                オンライン観戦
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("contact", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenucontact");
              }}
              className="footer-link__item"
            >
              <a
                className="font-bold"
                href="https://www.suzukacircuit.jp/contact_s/?utm_medium=lineeoa&utm_source=ln_miniapp_menu_contact&utm_campaign=f1&utm_content=20250331"
              >
                お問い合わせ
              </a>
            </li>
          </ul>
          <ul className="footer-sub">
            <li
              onClick={() => {
                handleMenuItemClick("terms", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenuterms");
              }}
              className="footer-sub__item"
            >
              <a
                className="font-bold"
                href="https://www.honda-ml.co.jp/legal/line/terms.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_terms&utm_campaign=f1&utm_content=20250331"
              >
                利用規約
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("privacy", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenuprivacy");
              }}
              className="footer-sub__item"
            >
              <a
                className="font-bold"
                href="https://www.honda-ml.co.jp/privacy/?utm_medium=lineeoa&utm_source=ln_miniapp_menu_privacy&utm_campaign=f1&utm_content=20250331"
              >
                プライバシーポリシー
              </a>
            </li>
            <li
              onClick={() => {
                handleMenuItemClick("credit", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenucredit");
              }}
              className="footer-sub__item"
            >
              <a
                className="font-bold"
                href="https://www.honda-ml.co.jp/legal/line/credit.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_credit&utm_campaign=f1&utm_content=20250331"
              >
                クレジットライセンス
              </a>
            </li>
          </ul>
          <ul className="footer-sns">
            <li
              onClick={() => {
                handleSocialClick("instagram", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenuinstagram");
              }}
              className="footer-sns__item"
            >
              <a
                className="font-bold"
                href="https://www.instagram.com/f1japanesegp/"
              >
                <img src="/FooterIcons/footer_sns_01.svg" alt="Instagram" />
              </a>
            </li>
            <li
              onClick={() => {
                handleSocialClick("facebook", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenufacebook");
              }}
              className="footer-sns__item"
            >
              <a
                className="font-bold"
                href="https://www.facebook.com/suzukacircuit/"
              >
                <img src="/FooterIcons/footer_sns_02.svg" alt="Facebook" />
              </a>
            </li>
            <li
              onClick={() => {
                handleSocialClick("x_twitter", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenux");
              }}
              className="footer-sns__item"
            >
              <a className="font-bold" href="https://twitter.com/suzuka_event">
                <img src="/FooterIcons/footer_sns_03.svg" alt="X" />
              </a>
            </li>
            <li
              onClick={() => {
                handleSocialClick("youtube", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenuyoutube");
              }}
              className="footer-sns__item"
            >
              <a
                className="font-bold"
                href="https://www.youtube.com/channel/UCbVkZ41otxc8rCAu7_gsO6Q"
              >
                <img src="/FooterIcons/footer_sns_04.svg" alt="YouTube" />
              </a>
            </li>
            <li
              onClick={() => {
                handleSocialClick("tiktok", "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appmenutiktok");
              }}
              className="footer-sns__item"
            >
              <a
                className="font-bold"
                href="https://www.tiktok.com/@suzuka.circuit.park?lang=ja-JP"
              >
                <img src="/FooterIcons/footer_sns_05.svg" alt="TikTok" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
