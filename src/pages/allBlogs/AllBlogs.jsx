import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function AllBlogs() {
    const context = useContext(myContext);
    const { mode, getallblog } = context;
    const navigate = useNavigate()

    function createMarkup(c) {
        return { __html: c };
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <Helmet><title>All Blogs -Voix</title></Helmet>
            <Layout>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto max-w-7xl ">
                        {/* Top Heading  */}
                        <div className="mb-5">
                            <h1 className=' text-center text-2xl font-bold'
                                style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                All Blogs
                            </h1>
                        </div>
                        <hr className={`mb-5 border-b-4  ${mode === 'dark' ? 'border-white shadow-md shadow-teal-300' : 'border-black'}`}></hr>
                        {/* Main Content  */}
                        <div className="flex flex-wrap justify-center -m-4 mb-5">
                            {getallblog.length > 0
                                ? <>
                                    {getallblog.map((item, index) => {
                                        const { title, thumbnail, content, date, id } = item
                                        return (
                                            <div className="p-4 w-96 max-h-[70vh]" key={index}>
                                                <div
                                                    style={{
                                                        background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white',
                                                        borderBottom: mode === 'dark' ? '4px solid rgb(226, 232, 240)' : '4px solid rgb(30, 41, 59)',
                                                    }}
                                                    className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer transition-transform duration-300
                ${mode === 'dark' ? 'shadow-gray-800' : 'shadow-gray-300'}
                rounded-xl flex flex-col`}
                                                >
                                                    {/* Blog Thumbnail */}
                                                    <img
                                                        className="w-full h-52 object-fill"
                                                        src={thumbnail}
                                                        alt="blog"
                                                        style={{
                                                            borderTopLeftRadius: '0.75rem',
                                                            borderTopRightRadius: '0.75rem',
                                                        }}
                                                    />

                                                    {/* Blog Content */}
                                                    <div className="p-6 flex-1 flex flex-col">
                                                        {/* Blog Date */}
                                                        <h2
                                                            className="tracking-widest text-xs uppercase font-medium mb-2"
                                                            style={{
                                                                color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                                            }}
                                                        >
                                                            {date}
                                                        </h2>

                                                        {/* Blog Title */}
                                                        <h1
                                                            className="text-lg font-bold mb-4"
                                                            style={{
                                                                color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                                            }}
                                                        >
                                                            {title}
                                                        </h1>

                                                        {/* Blog Description */}
                                                        <p
                                                            className="leading-relaxed text-sm mb-5 truncate flex-grow"
                                                            style={{
                                                                color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                                                lineHeight: '1.6',
                                                            }}
                                                            dangerouslySetInnerHTML={createMarkup(content)}
                                                        ></p>
                                                    </div>

                                                    {/* Read More Button */}
                                                    <div className="p-4">
                                                        <button
                                                            onClick={() => navigate(`/bloginfo/${id}`)}
                                                            className="w-full py-2 px-4 text-white font-medium bg-cyan-900 hover:bg-cyan-700 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                                                        >
                                                            Read More
                                                        </button>
                                                    </div>
                                                </div>


                                            </div>
                                        );
                                    })}
                                </>
                                : <h2>No Blogs Found</h2>}
                        </div>

                    </div>
                </section >
            </Layout ></>

    )
}

export default AllBlogs