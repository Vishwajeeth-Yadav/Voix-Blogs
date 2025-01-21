import { Button } from '@material-tailwind/react';
import React, { useContext, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import { account } from "../../appWrite/AppwriteConfig";

function Comment({ addComment, commentText, setcommentText, allComments, setFullName }) {
  const context = useContext(myContext);
  const { mode } = context;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setFullName(user.name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, [setFullName]);

  // Prevent form submission and trigger add comment
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment();
  };

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Make Comment
          </h2>
        </div>

        {/* Comment Form */}
        <form className="mb-6" onSubmit={handleSubmit}>
          {/* Text Area */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)'
            }}
          >
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows={6}
              value={commentText}
              onChange={(e) => setcommentText(e.target.value)}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none placeholder:text-gray-600 dark:placeholder-gray-400"
              style={{
                background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)',
                color: mode === 'dark' ? 'white' : 'black'
              }}
              placeholder="Write a comment..." required
            />
          </div>

          {/* Button */}
          <div>
            <Button
              type="submit"
              style={{
                background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
              }}
            >
              Post Comment
            </Button>
          </div>
        </form>

        {/* Display Comments */}
        {/* <article
          className="p-6 mb-6 text-base rounded-lg"
          style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}
        >
          {allComments.map((item, index) => {
            const { fullName, date, commentText } = item;
            return (
              <div key={index}>
                <footer className="flex justify-between items-center mb-3">
                  <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg">
                    <p
                      className="inline-flex items-center mr-3 text-lg"
                      style={{ color: mode === 'dark' ? 'black' : 'black' }}
                    >
                      {fullName}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: mode === 'dark' ? 'black' : 'black' }}
                    >
                      {date}
                    </p>
                  </div>
                </footer>
                <p
                  className="text-gray-500 dark:text-gray-400 text-md"
                  style={{ color: mode === 'dark' ? 'white' : 'black' }}
                >
                  ↳ {commentText}
                </p>
              </div>
            );
          })}
        </article> */}
        <article className="p-6 mb-6 text-base rounded-lg bg-slate-200 dark:bg-slate-800 border-2 border-gray-400 ">
          {allComments.map((comment, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <footer className="flex justify-between items-center mb-[2px]">
                <div className="flex items-center my-0 bg-white dark:bg-slate-700 px-3 py-2 rounded-lg shadow-sm">
                  <p className="inline-flex items-center mr-3 text-lg font-medium text-gray-900 dark:text-gray-100">
                    {comment.fullName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {comment.date}
                  </p>
                </div>
              </footer>
              <div className="pl-4 border-l-2 bg-blue-50 py-1 rounded-md border-gray-300 dark:border-gray-600">
                <p className="text-gray-800 dark:text-gray-200 text-md">
                  {comment.commentText}
                </p>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

export default Comment;
