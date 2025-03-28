// HamburgerMenu.js
import React from "react";
import "./Footer.css"; // Reusing same CSS file

const HamburgerMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`footer-menu ${isOpen ? "is-show" : ""}`}>
      <div className="footer-menu__overlay" onClick={onClose}></div>
      <div className="footer-menu__nav">
        <div className="footer-menu__inner">
          <ul className="footer-link">
            <li className="footer-link__item">
              <a href="https://www.suzukacircuit.jp/f1/ticket/index.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_ticket&utm_campaign=f1&utm_content=20250331">
                チケット
              </a>
            </li>
            <li className="footer-link__item">
              <a href="https://www.suzukacircuit.jp/f1/access/index.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_access&utm_campaign=f1&utm_content=20250331">
                アクセス
              </a>
            </li>
            <li className="footer-link__item">
              <a href="https://goods.mobilitystation.jp/">オンラインショップ</a>
            </li>
            <li className="footer-link__item">
              <a href="https://ticket.mobilitystation.jp/">会員限定</a>
            </li>
            <li className="footer-link__item">
              <a href="https://www.suzukacircuit.jp/f1/dazn.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_dazn&utm_campaign=f1&utm_content=20250331">
                オンライン観戦
              </a>
            </li>
            <li className="footer-link__item">
              <a href="https://www.suzukacircuit.jp/contact_s/?utm_medium=lineeoa&utm_source=ln_miniapp_menu_contact&utm_campaign=f1&utm_content=20250331">
                お問い合わせ
              </a>
            </li>
            {/* <li className="footer-link__item">
              <a href="#">お問い合わせ</a>
            </li> */}
          </ul>
          <ul className="footer-sub">
            <li className="footer-sub__item">
              <a href="https://www.honda-ml.co.jp/legal/line/terms.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_terms&utm_campaign=f1&utm_content=20250331">
                利用規約
              </a>
            </li>
            <li className="footer-sub__item">
              <a href="https://www.honda-ml.co.jp/privacy/?utm_medium=lineeoa&utm_source=ln_miniapp_menu_privacy&utm_campaign=f1&utm_content=20250331">
                プライバシーポリシー
              </a>
            </li>
            <li className="footer-sub__item">
              <a href="https://www.honda-ml.co.jp/legal/line/credit.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_credit&utm_campaign=f1&utm_content=20250331">
                クレジットライセンス
              </a>
            </li>
          </ul>
          <ul className="footer-sns">
            <li className="footer-sns__item">
              <a href="https://www.instagram.com/f1japanesegp/">
                <img src="/FooterIcons/footer_sns_01.svg" alt="Instagram" />
              </a>
            </li>
            <li className="footer-sns__item">
              <a href="https://www.facebook.com/suzukacircuit/">
                <img src="/FooterIcons/footer_sns_02.svg" alt="Facebook" />
              </a>
            </li>
            <li className="footer-sns__item">
              <a href="https://twitter.com/suzuka_event">
                <img src="/FooterIcons/footer_sns_03.svg" alt="X" />
              </a>
            </li>
            <li className="footer-sns__item">
              <a href="https://www.youtube.com/channel/UCbVkZ41otxc8rCAu7_gsO6Q">
                <img src="/FooterIcons/footer_sns_04.svg" alt="YouTube" />
              </a>
            </li>
            <li className="footer-sns__item">
              <a href="https://www.tiktok.com/@suzuka.circuit.park?lang=ja-JP">
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
