import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogSingle from './BlogSingle';

const Blog = () => {
    const [data, setData] = useState([])
    useEffect (()=>{
        axios.get('http://localhost/laravel8/laravel8/public/api/blog')
        .then((res) => {
            setData(res?.data.blog.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    return (
            <div className="col-sm-9">
                <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {data.map(function(blog) {
                    return <BlogSingle key={blog.id} blog={blog}/>
                })}
                </div>
            </div>
    )
};

export default Blog;