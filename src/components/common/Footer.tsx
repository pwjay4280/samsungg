import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const navPrefix = language === "en" ? "/en" : "";

  return (
    <footer className="site-footer" id="footer">
      <div className="section-inner footer-grid">
        <div className="footer-meta">
          <nav aria-label="하단 메뉴">
            <Link to={`${navPrefix}/about`}>병원소개</Link>
            <Link to={`${navPrefix}/spine`}>척추센터</Link>
            <Link to={`${navPrefix}/knee`}>관절센터</Link>
            <Link to={`${navPrefix}/cs`}>고객센터</Link>
          </nav>
          <div className="footer-info">
            <div className="footer-address">
              <strong>주소</strong>
              <address>경기 군포시 군포로 522 4층</address>
              <span>[15855]</span>
              <div className="footer-policy">
                <Link to={`${navPrefix}/cs?tab=terms`}>이용약관</Link>
                <Link to={`${navPrefix}/cs?tab=privacy`}>개인정보처리방침</Link>
              </div>
            </div>
            <div className="footer-contact">
              <p>대표 : 이상철</p>
              <p>사업자등록번호 : 738-92-02239</p>
              <p>핸드폰 : 010-91514410</p>
              <p>이메일 : samsungggos@naver.com</p>
              <p>전화번호 : 031-452-3000</p>
              <p>팩스 : 031-452-3002</p>
            </div>
          </div>
        </div>
        <Link className="footer-logo" to="#top">
          <img src="/assets/logo-white.svg" alt="삼성G정형외과" />
        </Link>
      </div>
    </footer>
  );
};
