import React from "react";
import { useSelector } from "react-redux";
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./FooterEl.css";

export const FooterEl = () => {
  // Access the pages slice from the Redux store
  const pages = useSelector((state) => state.pages.pages || {});

  return (
    <>
      <div className="footer_container">
        <div className="footer_content">
          <div className="footer_links">
            <div className="footer_column">
              <h3>Company</h3>
              <span>About Us</span>
              <span>Team</span>
              <span>Careers</span>
              <span>Blog</span>
            </div>
            <div className="footer_column">
              <h3>Services</h3>
              <span>Cleaning</span>
              <span>Plumbing</span>
              <span>Electrical</span>
              <span>Carpentry</span>
            </div>
            <div className="footer_column">
              <h3>Help & Support</h3>
              <span>FAQs</span>
              <span>Contact Us</span>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
            </div>
            <div className="footer_column">
              <h3>Legal</h3>
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
              <span>Cookie Policy</span>
              <span>Data Protection</span>
            </div>
            <div className="footer_column">
              <h3>Explore</h3>
              <span>Our Services</span>
              <span>Partner with Us</span>
              <span>Press</span>
              <span>Investors</span>
            </div>
          </div>

          {/* Dynamically render the routes from Redux store */}
          <div className="footer_dynamic_routes">
            <h3>Dynamic Pages</h3>
            <ul>
              {Object.values(pages).map((page,index) => (
                <li key={index}>
                  <Link to={page.route}>{page.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer_social">
            <h3>Connect with us</h3>
            <div className="social_icons">
              <FacebookOutlined className="social_icon" />
              <InstagramOutlined className="social_icon" />
              <LinkedinOutlined className="social_icon" />
              <TwitterOutlined className="social_icon" />
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <p>© {new Date().getFullYear()} Urban Company. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};
