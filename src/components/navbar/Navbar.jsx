import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Navbar,
    Typography,
    IconButton,
    Avatar,
} from "@material-tailwind/react";
import { LuLogOut } from "react-icons/lu";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import myContext from "../../context/data/myContext";
import SearchDialog from "../searchDailog/SearchDialog";
import ShareDialogBox from "../shareDailog/ShareDialog";
import { account } from "../../appWrite/AppwriteConfig";
import Blog_img from '../../assets/blog.png';

const NavLink = ({ to, children }) => (
    <motion.div
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
    >
        <Link
            to={to}
            className="relative group"
        >
            <span className="text-lg font-semibold">
                {children}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
        </Link>
    </motion.div>
);

export default function Nav() {
    const [openNav, setOpenNav] = useState(false);
    const { mode, toggleMode } = useContext(myContext);
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await account.deleteSessions('current');
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const navList = (
        <motion.ul
            variants={{
                open: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.2,
                        ease: "easeOut"
                    }
                },
                closed: {
                    opacity: 0,
                    y: -10,

                    transition: {
                        duration: 0.2,
                        ease: "easeIn"
                    }
                }
            }}
            className={`mb-4 mt-2 flex flex-col gap-6 lg:mb-0 lg:mt-0  lg:flex-row lg:items-center lg:gap-8 ${mode === 'dark' ? "text-blue-600" : "text-black"}`}
        >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/allblogs">Blogs</NavLink>
            {!(role) && (
                <NavLink to="/login">Login</NavLink>
            )}
        </motion.ul>
    );

    const containerVariants = {
        open: {
            height: "auto",
            opacity: 1,
            transition: {
                height: {
                    duration: 0.3,
                    ease: "easeOut"
                },
                opacity: {
                    duration: 0.2,
                    ease: "easeOut"
                }
            }
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                height: {
                    duration: 0.3,
                    ease: "easeIn"
                },
                opacity: {
                    duration: 0.2,
                    ease: "easeIn"
                }
            }
        }
    };

    return (
        <Navbar
            className="sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2 backdrop-blur-sm"
            style={{
                background: mode === 'dark'
                    ? 'rgba(10, 25, 40, 0.75)'
                    : 'rgba(255, 255,255, 0.75)',
                borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            }}
        >
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="flex items-center gap-2">
                        <motion.img
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            src={Blog_img}
                            className="w-10 h-10"
                            alt="Voix Blog Logo"
                        />
                        <Typography
                            className="font-sans font-semibold text-4xl"
                            style={{
                                fontFamily: 'Brush Script MT',
                                color: mode === 'dark' ? 'white' : '#001f3f',
                            }}
                        >
                            Voix
                        </Typography>
                    </Link>
                </motion.div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:block">{navList}</div>

                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SearchDialog />

                        <ShareDialogBox />


                        {role === "admin" ? (
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link to="/dashboard">
                                    <Avatar
                                        src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                                        alt="Admin Avatar"
                                        withBorder={true}
                                        className="p-0.5 w-10 h-10 border-2 border-purple-500"
                                    />
                                </Link>
                            </motion.div>
                        ) : (role ? (<motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <LuLogOut
                                size={20}
                                className="cursor-pointer text-purple-500 hover:text-red-500 transition-colors duration-300"
                                onClick={handleLogout}

                            />
                        </motion.div>) : null)}

                        <motion.div whileHover={{ scale: 1.1 }}>
                            <IconButton
                                onClick={toggleMode}
                                className={`rounded-full border  ${mode === 'dark' ? 'bg-blue-700 text-white/80 border-white' : 'bg-orange-500 text-black border-red-800'} transition-colors ease-in-out duration-300`}
                            >
                                {mode === 'light' ? (
                                    <FiSun className="h-5 w-5" />
                                ) : (
                                    <FiMoon className="h-5 w-5" />
                                )}
                            </IconButton>
                        </motion.div>

                        <IconButton
                            className="ml-auto h-10 w-10 lg:hidden rounded-full"
                            onClick={() => setOpenNav(!openNav)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={openNav ? "close" : "open"}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {openNav ? <FiX size={20} /> : <FiMenu size={20} />}
                                </motion.div>
                            </AnimatePresence>
                        </IconButton>
                    </motion.div>
                </div>
            </div>

            <div className="lg:hidden overflow-hidden">
                <AnimatePresence mode="wait">
                    {openNav && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={containerVariants}
                            className="overflow-hidden"
                        >
                            {navList}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Navbar>
    );
}