import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="w-full px-4 pb-4 sm:px-5 sm:pb-5" >
            <div className="rounded-[2rem] bg-white gap-12 p-8 sm:gap-24 md:p-12 xl:gap-0">
                <div className="flex flex-wrap justify-between gap-12 xl:flex-nowrap">
                    <div className="flex w-full max-w-[400px] flex-col gap-6">
                        <Link to={"/"} className="flex gap-2 items-center cursor-pointer">
                            <div className="text-lg md:text-xl text-primary">Final Round</div>
                            <div>
                                <img src="/image/icons/logo.png" alt="logo" />
                            </div>
                        </Link>
                        <div className="text-gray-600 text-lg">
                            Your trusted platform to ace any job interviews, craft the perfect
                            resumes, and land your dream jobs.
                        </div>
                        <div className="footer-icon-list flex items-start justify-start gap-2">
                            <Link
                                to="https://x.com/finalround_ai"
                                className="without-underline flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full bg-cyan-200"
                            >
                                <img
                                    alt="Twitter"
                                    loading="lazy"
                                    width={24}
                                    height={24}
                                    decoding="async"
                                    data-nimg={1}
                                    style={{ color: "transparent" }}
                                    src="/image/icons/icon-twitter.svg"
                                />
                            </Link>
                            <Link
                                to="https://www.instagram.com/finalround_ai/"
                                className="without-underline flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full bg-cyan-200"
                            >
                                <img
                                    alt="Instagram"
                                    loading="lazy"
                                    width={24}
                                    height={24}
                                    decoding="async"
                                    data-nimg={1}
                                    style={{ color: "transparent" }}
                                    src="/image/icons/icon-subtract.svg"
                                />
                            </Link>
                            <Link
                                to="https://www.youtube.com/@FinalRoundAI"
                                className="without-underline flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full bg-cyan-200"
                            >
                                <img
                                    alt="YouTube"
                                    loading="lazy"
                                    width={24}
                                    height={24}
                                    decoding="async"
                                    data-nimg={1}
                                    style={{ color: "transparent" }}
                                    src="/image/icons/icon-youtube.svg"
                                />
                            </Link>
                            <Link
                                to="https://discord.gg/6Ff3eQepcF"
                                className="without-underline flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full bg-cyan-200"
                            >
                                <img
                                    alt="Discord"
                                    loading="lazy"
                                    width={24}
                                    height={24}
                                    decoding="async"
                                    data-nimg={1}
                                    style={{ color: "transparent" }}
                                    src="/image/icons/icon-twitch.svg"
                                />
                            </Link>
                            <Link
                                to="https://www.tiktok.com/@finalroundai.com"
                                className="without-underline flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full bg-cyan-200"
                            >
                                <img
                                    alt="TikTok"
                                    loading="lazy"
                                    width={24}
                                    height={24}
                                    decoding="async"
                                    data-nimg={1}
                                    style={{ color: "transparent" }}
                                    src="/image/icons/icon-tiktok.svg"
                                />
                            </Link>
                        </div>
                        <Link
                            to="https://www.producthunt.com/posts/interview-copilot-by-final-round-ai"
                            id="elzFsCrTr"
                            className="product-hunt-badge"
                        >
                            <img
                                alt="Product Hunt Badge"
                                loading="lazy"
                                width={250}
                                height={54}
                                decoding="async"
                                data-nimg={1}
                                style={{ color: "transparent" }}
                                src="/image/icons/product-hunt.svg"
                            />
                        </Link>
                        <div>
                            <iframe
                                src="https://status.finalroundai.com/badge?theme=light"
                                width={250}
                                height={30}
                            />
                        </div>
                    </div>
                    <nav className="flex flex-wrap items-start justify-around gap-y-8">
                        <ul className="flex w-[240px] flex-col justify-center gap-3">
                            <li className="text-xl">Products</li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/interview-copilot">Interview Copilot</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-mock-interview">AI Mock Interview</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-resume-builder">AI Resume Builder</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/hirevue">Hirevue</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/phone-interview">Phone Interview</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/speech-analysis">Speech Analysis</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/college-admission">College Admission</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/auto-apply">Auto Apply</Link>
                            </li>
                        </ul>
                        <ul className="flex w-[240px] flex-col justify-center gap-3">
                            <li className="text-xl">Resources</li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/tutorial">Tutorials</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/special-discount">Special Discount</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/influencer-program">Influencer Program</Link>
                            </li>
                        </ul>
                        <ul className="flex w-[240px] flex-col justify-center gap-3">
                            <li className="text-xl">Support</li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/#new-faq">FAQ</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                        <ul className="flex w-[240px] flex-col justify-center gap-3">
                            <li className="text-xl">Company</li>
                            <li>
                                <Link className="text-lg text-gray-500" to="https://youtu.be/nBoH3bjPLWQ?si=_1dzqs5vv9wc5KPi">
                                    How Final Round AI works
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/about">About</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/careers">Careers</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/news">News</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/referral-program">Referral Program</Link>
                            </li>
                        </ul>
                        <ul className="flex w-[240px] flex-col justify-center gap-3">
                            <li className="text-xl">Interview Questions</li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog/career-ambition-interview-questions">
                                    Common Career Ambition Interview Questions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog/collaborative-leadership-interview-questions">
                                    Collaborative Leadership Interview Questions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog/product-knowledge-interview-questions">
                                    Product Manager Interview Questions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog/coding-interview-questions">
                                    Coding Interview Questions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog/technical-interview-questions">
                                    Technical Interview Questions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog/generative-ai-engineer-interview-questions">
                                    Generative AI Engineer Interview Questions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/blog/swift-developer-interview-questions">
                                    Swift Developer Interview Questions
                                </Link>
                            </li>
                        </ul>
                        <ul className="flex w-[240px] flex-col justify-center gap-3">
                            <li className="text-xl">AI Tools</li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/career-coach">AI Career Coach</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/chat-with-recruiters">Recruiters Hotline</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/cover-letter-generator">
                                    Cover Letter Generator
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/linkedin-profile-optimizer">
                                    LinkedIn Profile Optimizer
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/linkedin-resume-builder">
                                    LinkedIn Resume Builder
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-optimizer">Resume Optimizer</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/ats-resume-maker">ATS Resume maker</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-checker">Resume Checker</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-score">Resume Score</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-grader">Resume Grader</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-maker-for-ats">Resume Maker For ATS</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-maker-for-students">
                                    Resume Maker For Students
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-maker-for-veterans">
                                    Resume Maker For Veterans
                                </Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/resume-maker-by-chatgpt">ChatGPT Resume Maker</Link>
                            </li>
                            <li>
                                <Link className="text-lg text-gray-500" to="/ai-tools/usa-job-resume-builder">
                                    USA Job Resume Builder
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="mt-12 flex justify-between border-t border-gray-primary/10 pt-12 text-body/small">
                    <div className="footer-copyright items-end justify-between text-gray-primary lg:flex">
                        <div className="opacity-50 mb-4 lg:mb-0">
                            © {/* */}2025{/* */} Final Round, <br />
                            456 University Ave, Palo Alto, CA 94301
                        </div>
                    </div>
                    <div className="flex gap-5 opacity-50">
                        <div>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </div>
                        <div>
                            <Link to="/terms-of-use">Terms &amp; Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer