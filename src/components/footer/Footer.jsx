import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Footer() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <footer
            className="body-font"
            style={{
                background: mode === 'dark' 
                    ? 'linear-gradient(135deg, #3A7CA5, #001f3f)' 
                    : 'linear-gradient(135deg, #3A7CA5, #76B5C5, #3A7CA5)',
                color: mode === 'dark' ? 'white' : 'black',
            }}
        >
            <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col ">
                {/* Left Section */}
                <div className="flex title-font font-medium items-center md:justify-start justify-center">
                    <span
                        className="text-4xl font-bold "
                        style={{
                            fontFamily: 'Brush Script MT',
                            color: mode === 'dark' ? 'white' : '#001f3f',
                        }}
                    >
                        Voix
                    </span>
                </div>

                {/* Center Section */}
                <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-0 mt-4 sm:mt-0">
                    © 2024 Voix —
                    <a
                        href="https://twitter.com/knyttneve"
                        className="text-blue-500 hover:underline ml-1"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        @Voix--Voices
                    </a>
                </p>

                {/* Right Section */}
                <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    {/* Icon 1 */}
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="text-gray-500 hover:text-blue-600 mx-2"
                    >
                        <svg
                            fill="currentColor"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                    </a>

                    {/* Icon 2 */}
                    <a
                        href="#"
                        aria-label="Twitter"
                        className="text-gray-500 hover:text-blue-400 mx-2"
                    >
                        <svg
                            fill="currentColor"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                    </a>

                    {/* Icon 3 */}
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="text-gray-500 hover:text-pink-500 mx-2"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                        >
                            <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                        </svg>
                    </a>

                    {/* Icon 4 */}
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="text-gray-500 hover:text-blue-700 mx-2"
                    >
                        <svg
                            fill="currentColor"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                            <circle cx={4} cy={4} r={2} />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
