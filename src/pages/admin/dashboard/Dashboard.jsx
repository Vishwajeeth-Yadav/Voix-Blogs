import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../../../appWrite/AppwriteConfig';
import Loader from '../../../components/loader/Loader';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const context = useContext(myContext);
  const { mode, getallblog, deleteBlog } = context;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  // Theme colors
  const theme = {
    light: {
      primary: '#2563eb', // Bright blue
      secondary: '#3b82f6',
      background: '#f8fafc',
      card: '#f2f2f2',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      background: '#0f172a',
      card: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155'
    }
  };

  const currentTheme = mode === 'dark' ? theme.dark : theme.light;

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const logout = async () => {
    try {
      await account.deleteSessions('current');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1
      }
    })
  };

  return (
    <>
      <Helmet><title>Dashboard - Voix</title></Helmet>
      <Layout>
        <motion.div
          className="min-h-screen py-8"
          style={{ background: currentTheme.background }}
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={fadeIn}>
            {/* Profile Card */}
            <div
              style={{
                background: currentTheme.card,
                borderColor: currentTheme.border,
              }}
              className="rounded-xl shadow-lg border p-8 mb-8 "
            >
              <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Profile Image */}
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    className="w-40 h-40 rounded-full object-cover shadow-lg p-1"
                    style={{ borderColor: currentTheme.primary }}
                    src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                    alt="profile"
                  />
                  <div className="absolute -bottom-2 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4"
                    style={{ borderColor: currentTheme.card }} />
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div>
                    <h1
                      className="text-3xl font-bold mb-2"
                      style={{ color: currentTheme.text }}
                    >
                      Vishwajeeth Yadav
                    </h1>
                    <div className="space-y-1">
                      <p style={{ color: currentTheme.textSecondary }}>Web Developer</p>
                      <p style={{ color: currentTheme.textSecondary }}>viswajeethyadav@gmail.com</p>
                      <p style={{ color: currentTheme.textSecondary }}>
                        Total Blogs: <span className="font-semibold">{getallblog.length}</span>
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <Link to="/createblog">
                      <Button
                        className="px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        style={{
                          background: currentTheme.primary,
                          color: '#ffffff'
                        }}
                      >
                        Create Blog
                      </Button>
                    </Link>
                    <Button
                      onClick={logout}
                      disabled={loading}
                      className="px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      style={{
                        background: mode === 'dark' ? '#475569' : '#64748b',
                        color: '#ffffff'
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Table */}
            <motion.div
              className="rounded-xl shadow-lg overflow-hidden border"
              style={{
                background: currentTheme.card,
                borderColor: currentTheme.border
              }}
              variants={fadeIn}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: mode === 'dark' ? '#003554' : '#fcfcfa' }} >
                      {['S.No', 'Thumbnail', 'Title', 'Category', 'Date', 'Action'].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                          style={{ color: currentTheme.textSecondary }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y" style={{ borderColor: currentTheme.border }}>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-16 text-center">
                          <Loader />
                        </td>
                      </tr>
                    ) : getallblog.length > 0 ? (
                      getallblog.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={tableRowVariants}
                          className="group transition-colors hover:bg-gray-50/5"
                        >
                          <td className="px-6 py-4" style={{ color: currentTheme.textSecondary }}>
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="rounded-lg overflow-hidden shadow-sm"
                            >
                              <img
                                className="w-16 h-16 object-cover"
                                src={item.thumbnail}
                                alt="thumbnail"
                              />
                            </motion.div>
                          </td>
                          <td
                            className="px-6 py-4 font-medium"
                            style={{ color: currentTheme.text }}
                          >
                            {item.title}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="px-3 py-1 rounded-full text-sm font-medium inline-block"
                              style={{
                                background: mode === 'dark' ? '#1e40af30' : '#dbeafe',
                                color: currentTheme.primary
                              }}
                            >
                              {item.category}
                            </span>
                          </td>
                          <td
                            className="px-6 py-4"
                            style={{ color: currentTheme.textSecondary }}
                          >
                            {item.date}
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              onClick={() => deleteBlog(item.id)}
                              className="px-4 py-2 rounded-lg text-white transition-all duration-300 hover:shadow-lg"
                              style={{
                                background: '#ef4444',
                                opacity: 0.9,
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-16 text-center"
                          style={{ color: currentTheme.textSecondary }}
                        >
                          No blogs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Layout>
    </>
  );
};

export default Dashboard;