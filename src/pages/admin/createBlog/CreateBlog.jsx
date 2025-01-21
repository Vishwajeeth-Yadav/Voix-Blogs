import React, { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import myContext from '../../../context/data/myContext';
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import toast from 'react-hot-toast';
import { storage, databases } from '../../../appWrite/AppwriteConfig';
import { ID } from "appwrite";
import { Helmet } from 'react-helmet';

function CreateBlog() {
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [blogs, setBlogs] = useState({
        title: '',
        category: '',
        content: '',
    });
    const [thumbnail, setThumbnail] = useState(null);

    // Constants for Appwrite
    const STORAGE_BUCKET_ID = import.meta.env.VITE_STORAGE_BUCKET_ID;
    const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
    const BlogCOLLECTION_ID = import.meta.env.VITE_BLOG_COLLECTION_ID;

    const Editior_Key = import.meta.env.VITE_EDITIOR_KEY;


    const validateForm = () => {
        if (!blogs.title.trim()) {
            toast.error('Please enter a title');
            return false;
        }
        if (!blogs.category.trim()) {
            toast.error('Please enter a category');
            return false;
        }
        if (!blogs.content.trim()) {
            toast.error('Please add some content');
            return false;
        }
        if (!thumbnail) {
            toast.error('Please upload a thumbnail');
            return false;
        }
        return true;
    };

    const addPost = async () => {
        try {
            if (!validateForm()) return;

            setIsLoading(true);

            // Upload image first
            const fileResponse = await storage.createFile(
                STORAGE_BUCKET_ID,
                ID.unique(),
                thumbnail
            );

            const imageUrl = await storage.getFileView(STORAGE_BUCKET_ID, fileResponse.$id);

            // Create blog document
            await databases.createDocument(
                DATABASE_ID,
                BlogCOLLECTION_ID,
                ID.unique(),
                {
                    title: blogs.title.trim(),
                    category: blogs.category.trim(),
                    content: blogs.content.trim(),
                    thumbnail: imageUrl,
                    time: new Date().toISOString(),
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })
                }
            );

            toast.success('Blog post created successfully');
            navigate('/dashboard');

        } catch (error) {
            console.error('Error creating blog post:', error);

            if (error.type === 'storage_exception') {
                toast.error('Error uploading image. Please check your storage bucket configuration.');
            } else if (error.type === 'database_exception') {
                toast.error('Error saving blog post. Please try again.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet><title>CreateBlog -Voix</title></Helmet>

            <div className='container mx-auto max-w-5xl py-6'>
                <div className="p-5" style={{
                    background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)',
                    borderBottom: mode === 'dark' ? '4px solid rgb(226, 232, 240)' : '4px solid rgb(30, 41, 59)'
                }}>
                    {/* Top Item */}
                    <div className="mb-2 flex justify-between">
                        <div className="flex gap-2 items-center">
                            <Link to={'/dashboard'}>
                                <BsFillArrowLeftCircleFill size={25} />
                            </Link>
                            <Typography
                                variant="h4"
                                style={{
                                    color: mode === 'dark' ? 'white' : 'black'
                                }}
                            >
                                Create blog
                            </Typography>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="mb-3">
                        {thumbnail && (
                            <img
                                className="w-full rounded-md mb-3 max-h-64 object-cover"
                                src={URL.createObjectURL(thumbnail)}
                                alt="thumbnail preview"
                            />
                        )}
                        <Typography
                            variant="small"
                            className="mb-2 font-semibold"
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                        >
                            Upload Thumbnail
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1"
                            style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
                            onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            placeholder="Enter Your Title"
                            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5"
                            style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
                            onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
                            value={blogs.title}
                            maxLength={100}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            placeholder="Enter Your Category"
                            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5"
                            style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
                            onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
                            value={blogs.category}
                            maxLength={50}
                        />
                    </div>

                    <Editor
                        apiKey={Editior_Key}
                        onEditorChange={(newValue, editor) => setBlogs({ ...blogs, content: newValue })}
                        init={{
                            plugins: 'a11ychecker advlist autosave emoticons link lists table wordcount',
                            height: 500,
                            menubar: false,
                            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link emoticons',
                        }}
                    />

                    <Button
                        className="w-full mt-5"
                        onClick={addPost}
                        disabled={isLoading}
                        style={{
                            background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                            color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? 'Creating...' : 'Create Post'}
                    </Button>
                </div>
            </div></>

    );
}

export default CreateBlog;