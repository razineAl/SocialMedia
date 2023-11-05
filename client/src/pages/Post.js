import { useParams,useNavigate  } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
  let {id} = useParams();
  const navigate = useNavigate();
  const [post,setPost] = useState({});
  const [comments,setComments] = useState([]);
  const [value,setValue] = useState('');
  const { authState } = useContext(AuthContext);
  useEffect(()=>{
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((res)=>{setPost(res.data)});
    axios.get(`http://localhost:3001/comments/${id}`).then((res)=>{setComments(res.data)});
  },[]);
  
  const deleteComment = (id)=>{
    axios
    .delete(`http://localhost:3001/comments/${id}`,{headers:{accessToken:localStorage.getItem('accessToken')}})
    .then((res)=>{
      setComments(comments.filter((val)=>{return val._id !== id;}));
    })
    
  }
  const deletePost = (id)=>{
    axios.delete(`http://localhost:3001/posts/${id}`,{headers:{accessToken:localStorage.getItem('accessToken')}})
    .then((res)=>{
      navigate('/');
    })


  }
  const updatePost = ()=>{
    
  }

  return (
    <div className="pagePost">
      <div className="leftSide">
        <div className="titre">
          <h1 onClick={()=>{updatePost()}}>{post.title}</h1>
        </div> 
        <div className="postText" onClick={updatePost}>
          {post.postText}
        </div>
        <div className="pied">
          {post.username}
          {authState.username === post.username && (<button onClick={(e)=>{deletePost(post._id)}}>delete</button>)}
        </div>
      </div>
      <div className="rightSide">
        <div id="addComments">
          <input type="text" className="commentInput" value={value} onChange={(e)=>{setValue(e.target.value)}}></input>
          <button type="click" onClick={()=>{
              axios.post('http://localhost:3001/comments',
              {commentBody:value,post:id},
                {
                  headers:{
                    accessToken:localStorage.getItem('accessToken'),
                  }
                }
              ).then((res)=>{
                if (res.data.error) {
                  alert(res.data.error);
                  setValue('');
                } else {
                  setComments([...comments,{commentBody:value,username:res.data.username}]);
                  setValue('');
                }
                
                
              })
              
            }
          }>add comment</button>
        </div>
        <div id="commentsContainer">
          {comments.map((comment,key)=>{
            return <div key={key} className="comment">
              <div>
                {comment.commentBody}
              </div>
              {authState.username === comment.username && (<button id="delete" onClick={()=>{
                deleteComment(comment._id);
              }}>×</button>)}
              <span id="utilisateur">{comment.username}</span>
              </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;