import React from "react";
import { Link } from "@reach/router";

const footer = () => (
    <footer className="footer-light">
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-sm-12 col-xs-12">
                    <div className="widget">
                        <br />
                        <br />
                        <img
                            src="./assets/atari_mark.png"
                            alt=""
                            width="100%"
                        />
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="widget">
                        <ul>
                            <li>
                                <Link to="">Privacy policy</Link>
                            </li>
                            <li>
                                <Link to="">Terms of use</Link>
                            </li>
                            <li>
                                <Link to="">Risk factors</Link>
                            </li>
                            <li>
                                <Link to="">Regulatory oversight</Link>
                            </li>
                            <li>
                                <Link to="">AML & CFT Policy</Link>
                            </li>
                            <li>
                                <Link to="">Cookie policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="widget">
                        <ul className="s2">
                            <li>
                                <Link to="">Technical:</Link>
                                <br />
                                <Link to="">tech@icicb.com</Link>
                            </li>
                            <li>
                                <Link to="">Marketing:</Link>
                                <br />
                                <Link to="">marketing@icicb.com</Link>
                            </li>
                            <li>
                                <Link to="">Official website:</Link>
                                <br />
                                <Link to="">www.icicb.com</Link>
                            </li>
                            <li>
                                <Link to="">Official Channel:</Link>
                                <br />
                                <Link to="">t.me/icicbcoin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="widget">
                        <h5>Newsletter</h5>
                        <p>
                            Signup for our newsletter to get the latest news in
                            your inbox.
                        </p>
                        <br />
                        <div className="newLetterGroup">
                            <input type="text" className="newletterinput" />
                            <button className="newlettersubmit">Submit</button>
                        </div>
                        <br />
                        <div className="spacer-10"></div>
                        <br />
                        <br />
                        <h5>Follow Us</h5>
                        <div className="footerList">
                            <i className="social_facebook"></i>
                            <i className="social_twitter"></i>
                            <i className="social_pinterest"></i>
                            <i className="social_linkedin"></i>
                            <i className="social_instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);
export default footer;
