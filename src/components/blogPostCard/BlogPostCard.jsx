import { Button } from '@material-tailwind/react'
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router-dom';

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getallblog } = context;
  const navigate = useNavigate()

  function createMarkup(c) {
    return { __html: c };
  }

  return (
<div>
  <section className="text-gray-600 body-font">
    <div className="container px-5 py-10 mx-auto max-w-7xl">
      {/* Main Content */}
      <div className="flex flex-wrap justify-center -m-4 mb-5 gap-4">
        {/* Cards */}
        {getallblog.length > 0 ?
          getallblog.slice(0, 3).map((item, index) => {
            const { thumbnail, date, title, content, id } = item;
            // const trimmedContent = content.length > 150 ? content.slice(0, 45) + '...' : content;

            return (
              <div className="p-4  md:w-1/3 sm:w-1/2 w-full lg:w-96 max-h-[70vh]" key={index}>
                <div
                  style={{
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, #001f3f, #3A7CA5)'
                      : 'white',
                    borderBottom: mode === 'dark'
                      ? '4px solid rgb(226, 232, 240)'
                      : '4px solid rgb(30, 41, 59)'
                  }}
                  className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-cyan-300
                             ${mode === 'dark' ? 'shadow-gray-700 ' : 'shadow-xl'}
                             rounded-xl overflow-hidden`}
                >
                  {/* Blog Thumbnail */}
                  <div className="bg-gray-300">
                    <img onClick={() => navigate(`/bloginfo/${id}`)} className="w-full h-60 object-fill" src={thumbnail} alt="blog" />
                  </div>

                  {/* Top Items */}
                  <div className="p-6">
                    {/* Blog Date */}
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{
                      color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                    }}>
                      {date}
                    </h2>

                    {/* Blog Title */}
                    <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{
                      color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                    }}>
                      {title}
                    </h1>

                    {/* Blog Description */}
                    <p className="leading-relaxed mb-3 truncate" style={{
                      color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                    }} dangerouslySetInnerHTML={createMarkup(content)} />
                  </div>
                </div>
              </div>
            );
          })
          :
          <div className="flex flex-col justify-center items-center h-40 text-gray-500">
            <p className="text-lg">No Blogs Found</p>
            <p className="text-sm">Start creating some blogs to see them here.</p>
          </div>
        }
      </div>

      {/* See More Button */}
      <div className="flex justify-center my-5 overflow-hidden">
        <Button
          onClick={() => navigate('/allblogs')}
          className="hover:scale-110 transition-transform duration-200 ease-in-out"
          style={{
            background: mode === 'dark'
              ? 'rgb(226, 232, 240)'
              : 'rgb(30, 41, 59)',
            color: mode === 'dark'
              ? 'rgb(30, 41, 59)'
              : 'rgb(226, 232, 240)',
            willChange: 'transform',
            border: '2px solid black',
          }}
        >
          See More
        </Button>
      </div>
    </div>
  </section>
</div>

  )
}

export default BlogPostCard