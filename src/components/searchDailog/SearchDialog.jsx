import { Fragment, useContext, useState } from "react";
import {
    Dialog,
    DialogBody,
    Input,
} from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchDialog() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const context = useContext(myContext);
    const { mode, searchkey, getallblog: getAllBlog, setSearchkey, loading } = context;
    const navigate = useNavigate();

    // Function to filter blogs
    // const filteredBlogs = (getallblog || []).filter((blog) => {
    //     const blogTitle = blog.title?.toLowerCase() || "";
    //     const searchTerm = searchkey?.toLowerCase() || "";
    //     return blogTitle.includes(searchTerm);
    // });

    return (
        <Fragment>
            {/* Search Icon */}
            <div onClick={handleOpen}>
                <Search size={20} color={mode==='dark'?'white':'black'} />
            </div>
            {/* Dialog */}
            <Dialog
                className="relative right-[1em] w-[25em] md:right-0 md:w-0 lg:right-0 lg:w-0"
                open={open}
                handler={handleOpen}
                style={{ background: mode === 'light' ? '#2f3542' : '#2f3542', color: mode === 'dark' ? 'white' : 'black' }}
            >
                {/* Dialog Body */}
                <DialogBody>
                    <div className="flex w-full justify-center">
                        {/* Input */}
                        <Input
                            color="white"
                            type="search"
                            label="Type here..."
                            className="bg-[#2C3A47]"
                            name="searchkey"
                            value={searchkey}
                            onChange={(e) => setSearchkey(e.target.value.toLowerCase())}
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                        />
                    </div>

                    {/* Blog Cards */}
                    <div className="flex justify-center flex-wrap sm:mx-auto sm:mb-2 -mx-2 mt-4 mb-2">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading blogs...</p>
                        ) : searchkey.trim() ? (
                            (getAllBlog || [])
                                .filter((obj) => obj.title?.toLowerCase().includes(searchkey || "")).slice(0, 3)
                                .map((item, index) => {
                                    const { thumbnail, title, date, id } = item;
                                    return (
                                        <div className="p-2 sm:w-1/4 w-full" key={index}>
                                            <div
                                                onClick={() => navigate(`/bloginfo/${id}`)}
                                                className="container mx-auto px-4 bg-gray-400 p-2 rounded-lg h-[25vh] hover:scale-105 hover:shadow-lg hover:shadow-cyan-400 transition-all duration-300 ease-in-out   "
                                            >
                                                {/* Blog Thumbnail */}
                                                <img className="w-20 h-20 mb-2 rounded-lg " src={thumbnail} alt={title} />

                                                {/* Blog Title */}
                                                <h1 className="text-gray-900">{title}</h1>

                                                {/* Blog Date */}
                                                <p className="w-40 text-sm text-gray-900">{date}</p>
                                            </div>
                                        </div>
                                    );
                                })
                        ):(
                            <p className="text-center text-gray-500">No blogs available.</p>
                        )}
                    </div>
                </DialogBody>
            </Dialog>
        </Fragment>
    );
}
