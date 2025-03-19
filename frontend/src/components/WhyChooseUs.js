// components/WhyChooseUs.js
import React from "react";
import "./WhyChooseUs.css";

function WhyChooseUs() {
  return (
    <div className="choose ">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>
                Why <span className="blu"> Choose Us</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="choose_bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 padding_right0">
                  <ul className="easy">
                    <li className="active">
                      <a href="#">Easy to cutomize</a>
                    </li>
                    <li>
                      <a href="#">More flexible</a>
                    </li>
                    <li>
                      <a href="#">Clean mode</a>
                    </li>
                    <li>
                      <a href="#">Ratinaready</a>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 padding_left0">
                  <div className="choose_box">
                    <i>
                      <img src="images/admin.png" alt="#" />
                    </i>
                    <h3>Ad Minim</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
