import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListComment from "./ListComment";
import Comment from "./Comment";
import Rate from "./Rate";
import StarRatings from "react-star-ratings";

function BlogDetail() {
    let params = useParams();
    const [data, setData] = useState("");
    const [comments, setComments] = useState([])
    const [idComment, setIdComment] = useState(0)
    const [averageRating, setAverageRating] = useState(0);
    function setId () {
        setIdComment(0)
    }
    function getCmt (data) {
        const listCmt = comments.concat(data)
        setComments(listCmt);
    }
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id)
            .then (respone => {
                const newComment = respone.data.data.comment;
                setData(respone.data.data)
                setComments(newComment)
            })
            .catch(err => console.error(err))
        
    }, [params.id, idComment])
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/rate/" + params.id)
            .then((response) => {
                const ratings = response.data.data;
                if(ratings.length && Array.isArray(ratings)){
                    const sum = ratings.reduce((total, rating) => total + rating.rate, 0);
                    const average = sum / ratings.length;
                    setAverageRating(average);
                }else if(typeof(ratings) === "object"){ 
                    const sum = Object.values(ratings).reduce((total, rating) => total + rating.rate, 0);
                    const average = sum / Object.values(ratings).length;
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
            <div className="col-sm-9">
                <div className="blog-post-area">
                <h2 className="title text-center">{data.title}</h2>
                <div className="single-blog-post">
                    {/* <h3>Girls Pink T Shirt arrived in store</h3> */}
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <StarRatings
                            rating={averageRating}
                            starRatedColor="red"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <a href>
                    <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + data.image} alt="" />
                    </a>
                    <p>{data.description}</p> <br />
                    
                    <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                    </ul>
                    </div>
                </div>
                </div>{/*/blog-post-area*/}
                <p >Đánh giá</p>
                <Rate setAverageRating={setAverageRating}/>
                <div className="socials-share">
                <a href><img src="images/blog/socials.png" alt="" /></a>
                </div>{/*/socials-share*/}
                <div className="response-area">
                    {/* <h2>2 Respone</h2> */}
                    <ul className="media-list">
                        <ListComment  comments={comments} setIdComment={setIdComment}/>
                    </ul>					
                </div>{/*/Response-area*/}
                <div className="replay-box">
                    <div className="row">
                        <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <Comment getCmt={getCmt} idComment={idComment}/>
                        <button onClick={setId}>Xoa IdReplay</button>
                        </div>
                    </div>
                </div>{/*/Repaly Box*/}
            </div>
    );
}

export default BlogDetail;