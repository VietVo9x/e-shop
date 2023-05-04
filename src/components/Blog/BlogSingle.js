import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogSingle = (props) => {
    const blog = props.blog
    const [averageRating,setAverageRating] = useState(0)
    
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/rate/" + blog.id)
            .then((response) => {
                const ratings = response.data.data;
                if(ratings.length){
                    const sum = ratings.reduce((total, rating) => total + rating.rate, 0);
                    const average = sum / ratings.length;
                    setAverageRating(average);
                }else {
                    setAverageRating(averageRating);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [averageRating])
    return (
        <div className="single-blog-post">
            <h3>{blog.title}</h3>
            <div className="post-meta">
            <ul>
                <li><i className="fa fa-user" /> Mac Doe</li>
                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            </div>
            <a href>
            <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + blog.image} alt={blog.image} />
            </a>
            <p>{blog.description}</p>
            <Link className="btn btn-primary" to={"/blog/detail/" +  blog.id}>Read More</Link>
        </div>
    )
};

export default BlogSingle;