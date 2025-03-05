import Layout from "../../../components/layout"
import React, { useEffect, useState } from 'react'

const Guide = () => {
    const [activeSection, setActiveSection] = useState('');

    const [activeTab, setActiveTab] = React.useState('windows');

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'windows_how_to_set_up_audio_permissions',
                'windows_how_to_set_up_video_permissions',
                'windows_how_to_set_up_notification_permissions'
            ];

            // Find which section is currently in view
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the element is in the viewport (with some offset)
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
    };

    return (
        <Layout>
            <div className="text-center md:pt-[100px] px-3 pt-[100px] ">
                <div className="mx-auto max-w-[983px] font-[Albra] text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px] font-semibold">
                    <h1>Tutorial</h1>
                </div>
                <div className="flex flex-col-reverse items-center justify-center text-lg leading-[24px] tracking-tight text-slate-600 sm:mt-4 md:mt-6 md:flex-row">
                    Last updated: Sep 09, 2024
                </div>
            </div>
            {/* <div className="block lg:hidden my-10">
                <div className="cursor-pointer mx-auto w-fit px-10 py-2 my-6 rounded-lg border border-l-neutral-400 bg-white-background">
                    Menu
                </div>
            </div> */}
            <div className="my-10 lg:my-20 box-content max-w-[1200px] mx-auto flex  ">
                <div className="w-[420px] hidden lg:block ">
                    <div
                        className="min-w-[330px] box-border sticky top-36 w-36 hidden lg:block "
                        style={{ left: "5vw" }}
                    >
                        <ul className="flex flex-col gap-4 text-xl text-slate-800">
                            <li>
                                <a
                                    href="#windows_how_to_set_up_audio_permissions"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick('windows_how_to_set_up_audio_permissions');
                                    }}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'windows_how_to_set_up_audio_permissions'
                                            ? 'text-sky-500'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    How to set up audio permissions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#windows_how_to_set_up_video_permissions"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick('windows_how_to_set_up_video_permissions');
                                    }}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'windows_how_to_set_up_video_permissions'
                                            ? 'text-sky-500'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    How to set up video permissions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#windows_how_to_set_up_notification_permissions"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick('windows_how_to_set_up_notification_permissions');
                                    }}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'windows_how_to_set_up_notification_permissions'
                                            ? 'text-sky-500'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    How to set up notification permissions
                                </a>
                            </li>
                            {/* <li className="">
                                <a 
                                    href="#windows_how_to_set_up_extension_permissions"
                                    onClick={() => handleClick('windows_how_to_set_up_extension_permissions')}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'windows_how_to_set_up_extension_permissions' 
                                        ? 'text-sky-500' 
                                        : 'text-gray-700'
                                    }`}
                                >
                                    How to set up extension permissions
                                </a>
                                </li>
                            <li className="">
                                <a 
                                    href="#demo_hot_to_setup_copilot_permissions"
                                    onClick={() => handleClick('demo_hot_to_setup_copilot_permissions')}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'demo_hot_to_setup_copilot_permissions' 
                                        ? 'text-sky-500' 
                                        : 'text-gray-700'
                                    }`}
                                >
                                    How to set up Copilot permissions
                                </a>
                            </li>
                            <li className="">
                                <a 
                                    href="#demo_how_to_launch_live_interview"
                                    onClick={() => handleClick('demo_how_to_launch_live_interview')}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'demo_how_to_launch_live_interview' 
                                        ? 'text-sky-500' 
                                        : 'text-gray-700'
                                    }`}
                                >
                                    How to launch a Live interview
                                </a>
                            </li>
                            <li className="">
                                <a 
                                    href="#demo_how_to_launch_mock_interview"
                                    onClick={() => handleClick('demo_how_to_launch_mock_interview')}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'demo_how_to_launch_mock_interview' 
                                        ? 'text-sky-500' 
                                        : 'text-gray-700'
                                    }`}
                                >
                                    How to launch a Mock interview
                                </a>
                            </li>
                            <li className="">
                                <a 
                                    href="#demo_how_to_launch_coding_interview"
                                    onClick={() => handleClick('demo_how_to_launch_coding_interview')}
                                    className={`hover:text-sky-500 transition-colors ${
                                        activeSection === 'demo_how_to_launch_coding_interview' 
                                        ? 'text-sky-500' 
                                        : 'text-gray-700'
                                    }`}
                                >
                                    How to launch a Coding interview
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 p-6 gap-8 rounded-lg border border-[#dfe2e4] mx-6 lg:mx-0" id="guide-box">
                    <div>
                        <ul className="border-b-2 flex flex-row font-[Albra] gap-4 mb-4">
                            <li onClick={() => setActiveTab('windows')} className={` text-4xl cursor-pointer hover:text-sky-500 relative ${activeTab === 'windows' ? 'border-b-2 border-sky-500' : 'text-gray-700'}`}>Windows</li>
                            <li onClick={() => setActiveTab('macos')} className={` text-4xl cursor-pointer hover:text-sky-500 ${activeTab === 'macos' ? 'border-b-2 border-sky-500' : 'text-gray-700'}`}>Mac OS</li>
                        </ul>
                        {activeTab === "windows" && (
                            <article className="flex flex-col gap-5 items-start p-0">
                                <h2 className="text-3xl text-slate-600 hover:text-sky-500 font-semibold" id="windows_how_to_set_up_audio_permissions">
                                    <a href="#windows_how_to_set_up_audio_permissions">
                                        How to set up audio permissions
                                    </a>
                                </h2>
                                <div className="flex flex-col gap-5" data-mark="windows_how_to_set_up_audio_permissions">
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold"> Windows Privacy &amp; Security Settings</h3>
                                    <p className="text-xl text-slate-500 my-2 ">1. Click the Start button on the taskbar</p>
                                    <img
                                        src="/image/tutorial/click-start-button.png"
                                        alt="click-start-button"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">2. Go to "Settings" </p>
                                    <img
                                        src="/image/tutorial/go-to-settings.png"
                                        alt="go-to-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        3. Select "Privacy &amp; security " on the left, then choose
                                        "Microphone" under " App permissions "
                                    </p>
                                    <img
                                        src="/image/tutorial/choose-mic.png"
                                        alt="choose-mic"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">4. Find Google Chrome and toggle the switch to enable it</p>
                                    <img
                                        src="/image/tutorial/mic-enabled.png"
                                        alt="mic-enabled"
                                    />
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold"> Chrome on Windows</h3>
                                    <p className="text-xl text-slate-500 my-2 ">1. Open Google Chrome, click the menu</p>
                                    <p className="text-xl text-slate-500 my-2 "> icon (three vertical dots) in the top-right corner</p>
                                    <img
                                        src="/image/tutorial/click-menu-icon.png"
                                        alt="click-menu-icon"
                                    />
                                    <p className="text-xl text-slate-500 my-2 "> 2. Select "Settings"</p>
                                    <img
                                        src="/image/tutorial/select-settings.png"
                                        alt="select-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">3. Go to "Privacy and security" and then" Site settings"</p>
                                    <img
                                        src="/image/tutorial/go-to-site-settings.png"
                                        alt="go-to-site-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">4. Find "Microphone"and click to enter</p>
                                    <img
                                        src="/image/tutorial/mic-settings.png"
                                        alt="mic-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        5. In the"Not allowed to use your microphone"section, locate
                                        <em>https://theresidentguy.com</em> and click to enter
                                    </p>
                                    <img
                                        src="/image/tutorial/not-allowed-to-use-mic.png"
                                        alt="not-allowed-to-use-mic"
                                    />
                                    <p className="text-xl text-slate-500 my-2 "> 6. Find "Microphone"and set it to "Allow"</p>
                                    <img
                                        src="/image/tutorial/allow-mic.png"
                                        alt="allow-mic"
                                    />
                                </div>
                                <h2 className="text-3xl text-slate-600 hover:text-sky-500 font-semibold" id="windows_how_to_set_up_video_permissions">
                                    <a href="#windows_how_to_set_up_video_permissions">
                                        How to set up video permissions
                                    </a>
                                </h2>
                                <div data-mark="windows_how_to_set_up_video_permissions">
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mb-2">Windows Privacy &amp; Security</h3>
                                    <p className="text-xl text-slate-500 my-2 ">Settings 1. Click the Start button on the taskbar</p>
                                    <img
                                        src="/image/tutorial/click-start-button.png"
                                        alt="click-start-button"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">2. Go to"Settings"</p>
                                    <img
                                        src="/image/tutorial/go-to-settings.png"
                                        alt="go-to-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        3. Select"Privacy &amp; security"on the left, then choose"Camera"
                                        under"App permissions"
                                    </p>
                                    <img
                                        src="/image/tutorial/choose-camera.png"
                                        alt="choose-camera"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">4. Find Google Chrome and toggle the switch to enable it</p>
                                    <img
                                        src="/image/tutorial/camera-enabled.png"
                                        alt="camera-enabled"
                                    />
                                    <h3 className="text-xl py-2 text-slate-600 hover:text-sky-500 font-semibold"> Chrome on Windows </h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        1. Open Google Chrome, click the menu icon (three vertical dots) in
                                        the top-right corner
                                    </p>
                                    <img
                                        src="/image/tutorial/click-menu-icon.png"
                                        alt="click-menu-icon"
                                    />
                                    <p className="text-xl text-slate-500 my-2 "> 2. Select"Settings"</p>
                                    <img
                                        src="/image/tutorial/select-settings.png"
                                        alt="select-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">3. Go to"Privacy and security"and then"Site settings"</p>
                                    <img
                                        src="/image/tutorial/go-to-site-settings.png"
                                        alt="go-to-site-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">4. Find "Camera" and click to enter</p>
                                    <img
                                        src="/image/tutorial/camera-settings.png"
                                        alt="camera-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        5. In the"Not allowed to use your camera"section, locate
                                        <em>https://theresidentguy.com</em> and click to enter
                                    </p>
                                    <img
                                        src="/image/tutorial/not-allowed-to-use-camera.png"
                                        alt="not-allowed-to-use-camera"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">6. Find "Camera" and set it to "Allow"</p>
                                    <img
                                        src="/image/tutorial/allow-camera.png"
                                        alt="allow-camera"
                                    />
                                </div>
                                <h2 className="text-3xl text-slate-600 hover:text-sky-500 font-semibold" id="windows_how_to_set_up_notification_permissions">
                                    <a href="#windows_how_to_set_up_notification_permissions">
                                        How to set up notification permissions
                                    </a>
                                </h2>
                                <div data-mark="windows_how_to_set_up_notification_permissions">
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mb-2">Windows Privacy &amp; Security</h3>
                                    <p className="text-xl text-slate-500 my-2 "> Settings 1. Click the Start button on the taskbar</p>
                                    <img
                                        src="/image/tutorial/click-start-button.png"
                                        alt="click-start-button"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">2. Go to "Settings" </p>
                                    <img
                                        src="/image/tutorial/go-to-settings.png"
                                        alt="go-to-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        3. Select "Privacy &amp; security" on the left, then choose
                                        "Notifications" under "App permissions"
                                    </p>
                                    <img
                                        src="/image/tutorial/choose-notifications.png"
                                        alt="choose-notifications"
                                    />
                                    <p className="text-xl text-slate-500 my-2 "> 4. Find Google Chrome and toggle the switch to enable it</p>
                                    <img
                                        src="/image/tutorial/notifications-enabled.png"
                                        alt="notifications-enabled"
                                    />
                                    <h3 className="text-xl py-2 text-slate-600 hover:text-sky-500 font-semibold"> Chrome on Windows </h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        1. Open Google Chrome, click the menu icon (three vertical dots) in
                                        the top-right corner
                                    </p>
                                    <img
                                        src="/image/tutorial/click-menu-icon.png"
                                        alt="click-menu-icon"
                                    />
                                    <p className="text-xl text-slate-500 my-2 "> 2. Select "Settings" </p>
                                    <img
                                        src="/image/tutorial/select-settings.png"
                                        alt="select-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">3. Go to "Privacy and security" and then "Site settings"</p>
                                    <img
                                        src="/image/tutorial/go-to-site-settings.png"
                                        alt="go-to-site-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 "> 4. Find "Notifications" and click to enter</p>
                                    <img
                                        src="/image/tutorial/notifications-settings.png"
                                        alt="notifications-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        5. In the "Not allowed to use your notifications" section, locate
                                        <em>https://theresidentguy.com</em> and click to enter
                                    </p>
                                    <img
                                        src="/image/tutorial/not-allowed-to-use-notifications.png"
                                        alt="not-allowed-to-use-notifications"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">6. Find "Notifications" and set it to "Allow"</p>
                                    <img
                                        src="/image/tutorial/allow-notifications.png"
                                        alt="allow-notifications"
                                    />
                                </div>
                            </article>
                        )}
                        {activeTab === "macos" && (
                            <article className="flex flex-col items-start p-0">
                                <h2 className="text-3xl mb-5 text-slate-600 hover:text-sky-500 font-semibold" id="mac_how_to_set_up_audio_permissions">
                                    <a href="#mac_how_to_set_up_audio_permissions">
                                        How to set up audio permissions
                                    </a>
                                </h2>
                                <div className="flex flex-col gap-5" data-mark="mac_how_to_set_up_audio_permissions">
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mb-2"> Mac OS Privacy &amp; Security Settings </h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 1. Click the Apple icon in the top-left corner of the screen
                                        and then select " System Settings"
                                    </p>    
                                    <img
                                        src="/image/tutorial/click-the-apple-icon.png"
                                        alt="A1"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 2. Select "Privacy &amp; Security ", find " Microphone" under
                                        "Privacy"
                                    </p>
                                    <img
                                        src="/image/tutorial/select-mic-in-privacy-security.png"
                                        alt="select-mic-in-privacy-security"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 3. Find Google Chrome and toggle the switch on</p>
                                    <img
                                        src="/image/tutorial/find-chrome-toggle-mic-on.png"
                                        alt="find-chrome-toggle-mic-on"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Warning: To apply the new settings, Google Chrome needs to be
                                        reopened
                                    </p>
                                    <img
                                        src="/image/tutorial/mic-reopen-warning.png"
                                        alt="A4"
                                    />
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mt-5 mb-2"> Chrome on macOS</h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 1. Open Google Chrome, click the menu icon (three vertical
                                        dots) in the top-right corner
                                    </p>
                                    <img
                                        src="/image/tutorial/click-menu-icon.png"
                                        alt="click-menu-icon"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 2. Select "Settings " </p>
                                    <img
                                        src="/image/tutorial/select-settings.png"
                                        alt="select-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 3. Go to "Privacy and security" and then "Site settings"</p>
                                    <img
                                        src="/image/tutorial/go-to-site-settings.png"
                                        alt="go-to-site-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 4. Find "Microphone" and click to enter</p>
                                    <img
                                        src="/image/tutorial/find-mic-to-enter.png"
                                        alt="find-mic-to-enter"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 5. In the "Not allowed to use your microphone" section, locate{" "}
                                        <em>https://theresidentguy.com</em> and click to enter
                                    </p>
                                    <img
                                        src="/image/tutorial/not-allowed-to-use-mic.png"
                                        alt="not-allowed-to-use-mic"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 6. Find "Microphone" and set it to "Allow "{/* */} </p>
                                    <img
                                        src="/image/tutorial/find-mic-set-allow.png"
                                        alt="find-mic-set-allow"
                                    />
                                </div>
                                <h2 className="text-3xl text-slate-600 hover:text-sky-500 font-semibold:text-sky-500 font-semibold" id="mac_how_to_set_up_video_permissions">
                                    <a href="#mac_how_to_set_up_video_permissions">
                                        How to set up video permissions
                                    </a>
                                </h2>
                                <div data-mark="mac_how_to_set_up_video_permissions">
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mt-5 mb-2"> macOS Privacy &amp; Security Settings</h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 1. Click the Apple icon in the top-left corner of the screen
                                    </p>
                                    <img
                                        src="/image/tutorial/click-the-apple-icon.png"
                                        alt="A1"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 2. Select "Privacy &amp; Security" , find "Camera" under
                                        "Privacy"
                                    </p>
                                    <img
                                        src="/image/tutorial/select-camera-in-privacy-security.png"
                                        alt="select-camera-in-privacy-security"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 3. Find Google Chrome and toggle the switch on</p>
                                    <img
                                        src="/image/tutorial/find-chrome-toggle-camera-on.png"
                                        alt="find-chrome-toggle-camera-on"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Warning: To apply the new settings, Google Chrome needs to be
                                        reopened
                                    </p>
                                    <img
                                        src="/image/tutorial/camera-reopen-warning.png"
                                        alt="camera-reopen-warning"
                                    />
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mt-5 mb-2"> Chrome on macOS </h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 1. Open Google Chrome, click the menu icon (three vertical
                                        dots) in the top-right corner
                                    </p>
                                    <img
                                        src="/image/tutorial/click-menu-icon.png"
                                        alt="click-menu-icon"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 2. Select "Settings" </p>
                                    <img
                                        src="/image/tutorial/select-settings.png"
                                        alt="select-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 3. Go to "Privacy and security" and then " Site settings"</p>
                                    <img
                                        src="/image/tutorial/go-to-site-settings.png"
                                        alt="go-to-site-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 4. Find "Camera" and click to enter</p>
                                    <img
                                        src="/image/tutorial/find-camera-to-enter.png"
                                        alt="find-mic-to-enter"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 5. In the "Not allowed to use your camera" section, locate
                                        <em>https://theresidentguy.com</em> and click to enter
                                    </p>
                                    <img
                                        src="/image/tutorial/not-allowed-to-use-camera.png"
                                        alt="not-allowed-to-use-camera"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 6. Find "Camera" and set it to "Allow" </p>
                                    <img
                                        src="/image/tutorial/find-camera-set-allow.png"
                                        alt="find-camera-set-allow"
                                    />
                                </div>
                                <h2 className="text-3xl text-slate-600 hover:text-sky-500 font-semibold" id="mac_how_to_set_up_notification_permissions">
                                    <a href="#mac_how_to_set_up_notification_permissions">
                                        How to set up notification permissions
                                    </a>
                                </h2>
                                <div data-mark="mac_how_to_set_up_notification_permissions">
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mt-5 mb-2"> macOS Privacy &amp; Security Settings </h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 1. Click the Apple icon in the top-left corner of the screen
                                    </p>
                                    <img
                                        src="/image/tutorial/click-the-apple-icon.png"
                                        alt="click-the-apple-icon"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 2. Select "Notifications" , find "Google Chrome" under
                                        "Application Notifications"
                                    </p>
                                    <img
                                        src="/image/tutorial/select-notifications.png"
                                        alt="select-notifications"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 3. Click it to open its settings, make sure the following
                                        switches are turned on: - Allow notifications - Show notifications
                                        on lock screen - Show in Notification Center - Badge application
                                        icon - Play sound for notification
                                    </p>
                                    <img
                                        src="/image/tutorial/all-the-notifications-on.png"
                                        alt="all-the-notifications-on"
                                    />
                                    <h3 className="text-xl text-slate-600 hover:text-sky-500 font-semibold mt-5 mb-2"> Chrome on macOS</h3>
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 1. Open Google Chrome, click the menu icon (three vertical
                                        dots) in the top-right corner
                                    </p>
                                    <img
                                        src="/image/tutorial/click-menu-icon.png"
                                        alt="click-menu-icon"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 2. Select "Settings" </p>
                                    <img
                                        src="/image/tutorial/select-settings.png"
                                        alt="select-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 3. Go to "Privacy and security" and then " Site settings"</p>
                                    <img
                                        src="/image/tutorial/go-to-site-settings.png"
                                        alt="go-to-site-settings"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 4. Find "Notifications" and click to enter</p>
                                    <img
                                        src="/image/tutorial/find-notifications-to-enter.png"
                                        alt="find-mic-to-enter"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">
                                        Step 5. In the "Not allowed to use your notifications" section,
                                        locate<em>https://theresidentguy.com</em> and click to enter
                                    </p>
                                    <img
                                        src="/image/tutorial/not-allowed-to-use-notifications.png"
                                        alt="not-allowed-to-use-notifications"
                                    />
                                    <p className="text-xl text-slate-500 my-2 ">Step 6. Find "Notifications" and set it to " Allow"</p>
                                    <img
                                        src="/image/tutorial/find-notifications-set-allow.png"
                                        alt="find-notifications-set-allow"
                                    />
                                </div>
                            </article>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Guide    