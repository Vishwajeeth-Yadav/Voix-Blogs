import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { databases } from '../../appWrite/AppwriteConfig';
import { Query } from 'appwrite';
import toast from 'react-hot-toast';

function MyState(props) {
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#01161e';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = '#faf3dd';
        }
    }

    const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
    const BlogCOLLECTION_ID = import.meta.env.VITE_BLOG_COLLECTION_ID;

    
    const [searchkey, setSearchkey] = useState('')
    const [loading, setLoading] = useState(false)
    const [getallblog, setAllblog] = useState([])

    //* getAllBlogs Function
    const getAllBlogs = async () => {
        setLoading(true);
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                BlogCOLLECTION_ID,
                [Query.orderAsc('time')] // Replace 'time' with the field for sorting
            );

            const blogArray = response.documents.map((doc) => ({
                ...doc,
                id: doc.$id, // Ensure each document has an 'id' field
            }));

            setAllblog(blogArray);
            // console.log(blogArray);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await databases.deleteDocument(DATABASE_ID, BlogCOLLECTION_ID, id)
            getAllBlogs();
            toast("Blog Deleted Sucessfully 👍")
        }
        catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Failed to delete the blog");
        }
    }

    useEffect(() => {
        getAllBlogs();

    }, []);

    return (
        <MyContext.Provider value={{ mode, toggleMode, searchkey, setSearchkey, loading, setLoading, getallblog, setAllblog, deleteBlog }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState