import React from "react";

const ListComment = (props) => {
    const comments = props.comments
    console.log(comments)
    const handleReplayClick = (id) => {
        props.setIdComment(id)
    }
    if(comments) {
        return comments.map((value, i) => {
            if(value.id_comment == 0) {
                return (
                    <React.Fragment key = {i}>
                        <li className="media" key={value.id}>
                            <a className="pull-left" href="#">
                                <img className="media-object" src={`http://localhost/laravel8/laravel8/public/upload/user/avatar/${value.image_user}`} alt='image' />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user" />{value.name_user}</li>
                                </ul>
                                <p>{value.comment}</p>
                                <a  className="btn btn-primary" onClick={() => handleReplayClick(value.id)} ><i className="fa fa-reply" />Replay</a>
                            </div>
                            
                        </li>

                        {comments.map((value2, j)=>{
                            if(value.id == value2.id_comment) {
                                return (
                                    <li className="media second-media" key={j} index={j}>
                                        <a className="pull-left" href="#">
                                        <img className="media-object" src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + value2.image_user} alt='image' />
                                        </a>
                                        <div className="media-body">
                                            <ul className="sinlge-post-meta">
                                                <li><i className="fa fa-user" />{value2.name_user}</li>
                                            </ul>
                                            <p>{value2.comment}</p>
                                            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                                        </div>
                                    </li>
                                )
                            }
                        })}
                        
                        
                    </React.Fragment>
                )
            }
        }
        )
    }
    
};
export default ListComment;