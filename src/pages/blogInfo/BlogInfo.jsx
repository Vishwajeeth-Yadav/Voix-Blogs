import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import MyContext from '../../context/data/myContext';
import Comment from '../../components/comment/Comment';
import { databases } from '../../appWrite/AppwriteConfig';
import { toast } from 'react-hot-toast';
import { Query } from 'appwrite';
import { Helmet } from 'react-helmet';

function BlogInfo() {
  const context = useContext(MyContext);
  const { mode, getallblog, loading } = context;
  const { id } = useParams();  // Get the blog post ID from URL params

  const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
  const BLOGS_COMMENTS = import.meta.env.VITE_COMMENT_ID;


  // Find the blog post based on the ID from the URL
  const blogPost = getallblog.find((blog) => blog.id === id);

  // States for comment form
  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComments, setAllComments] = useState([]);

  // Function to create markup for the blog post content
  function createMarkup(content) {
    return { __html: content };
  }

  // Add a comment
  const addComment = async (blogId) => {
    const commentData = {
      fullName,
      commentText,
      blogId,  // Use the passed blogId instead of calling useParams again
      time: new Date().toISOString(),
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    };

    try {
      await databases.createDocument(
        DATABASE_ID, // Database ID
        BLOGS_COMMENTS, // Comment collection ID
        'unique()', // Document ID
        commentData // Comment data
      );

      toast.success('Comment added successfully!');
      setFullName(''); // Reset input fields
      setCommentText('');

      getComments(blogId);  // Refetch comments after adding a new one
    } catch (error) {
      console.error('Error adding comment:', error);
      const user = localStorage.getItem('role')
      if (!user) {
        toast.error("Login to comment !")
      }
      else
        toast.error('Failed to add comment.');
    }
  };

  // Fetch all comments for the blog post
  const getComments = async (blogId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,  // Database ID
        BLOGS_COMMENTS,  // Comment collection ID
        [
          Query.equal('blogId', blogId),  // Filter by blogId
          Query.orderAsc('time'), // Order by time
        ]
      );

      const comments = response.documents.map((doc) => ({
        ...doc,
        id: doc.$id,
      }));

      setAllComments(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Fetch comments when the component mounts or the blog ID changes
  useEffect(() => {
    if (id) {
      getComments(id);
    }
  }, [id]);

  return (
    <>
      {blogPost ? (
        <>
          <Helmet>
            <title>Blog Info - {blogPost.title} - Voix</title>
          </Helmet>
          <Layout>
            <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
              <div className="py-4 lg:py-8">
                {loading ? (
                  <Loader />
                ) : (
                  <div >
                    {/* Thumbnail */}
                    <img
                      alt="content"
                      className="mb-5 mx-auto rounded-lg w-[60%] h-[50vh] "
                      src={blogPost.thumbnail}
                    />
                    {/* Title and Date */}
                    <div className="flex justify-between items-center mb-3">
                      <h1
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                        className="text-xl md:text-2xl lg:text-2xl font-semibold"
                      >
                        {blogPost.title}
                      </h1>
                      <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                        {blogPost.date}
                      </p>
                    </div>
                    <div
                      className={`border-b mb-5 ${mode === 'dark' ? 'border-gray-600' : 'border-gray-400'
                        }`}
                    />

                    {/* Blog Content */}
                    <div className="content">
                      <div
                        className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                          ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}
                          [&>p]:text-[16px] [&>p]:mb-1.5
                          ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-gray-800'}
                          [&>img]:rounded-lg`}
                        dangerouslySetInnerHTML={createMarkup(blogPost.content)}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <Comment
                addComment={() => addComment(id)} // Pass 'id' to addComment
                commentText={commentText}
                setcommentText={setCommentText}
                allComments={allComments}
                setFullName={setFullName}
              />
            </section>
          </Layout>
        </>
      ) : (
        <div className="text-center">Blog post not found</div>
      )}
    </>
  );

}

export default BlogInfo;
