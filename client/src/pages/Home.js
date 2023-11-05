import {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext';

function Home() {

  const [posts,setPosts] = useState([]);
  const [likedPosts,setLikedPosts] = useState([]);
  const {authState} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!localStorage.getItem('accessToken')) {

      navigate('/login');
    }
    else{
      axios.get('http://localhost:3001/posts',{headers:{accessToken:localStorage.getItem('accessToken')}}).then((res)=>{
      setPosts(res.data.Posts);
      setLikedPosts(res.data.likedPosts.map((like)=>{return like.post}));
    });
    }
    
  },[]);

  const likeAPost = (postID)=>{
    axios.post('http://localhost:3001/likes',{post:postID},{headers:{accessToken:localStorage.getItem('accessToken')}})
    .then((res)=>{
      setPosts(posts.map((post)=>{
        if (post._id === postID) {
          if (res.data.liked) {
            return {...post,Likes:[...post.Likes,0]};
          } else {
            const likes = post.Likes;
            likes.pop();
            return {...post,Likes:[...likes]};
          }
          
        } else {
          return post;
        }
      }))
    })
  }
  

  const LoadProfile = (author)=>{

    navigate(`/profile/${author}`);
  }
  return (
    <div>
      {
        posts.map((el,index)=>{
          return <div key={index} className='post' onClick={()=>{navigate(`post/byId/${el._id}`)}}>
                  <div className='title'>{el.title}</div>
                  <div className='body'>{el.postText}</div>
                  <div className='footer'>

                    <span onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      LoadProfile(el.author)}}>{el.username}</span> 
                    <ThumbUpIcon className={likedPosts.includes(el._id) ? 'liked' : 'unliked'} onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      if (likedPosts.includes(el._id)) {
                        setLikedPosts(likedPosts.filter((post)=>{return post !== el._id}));
                      } else {
                        setLikedPosts([...likedPosts,el._id]);
                      }
                      
                      likeAPost(el._id);
                      
                    }}/>
                    <span>{el.Likes.length}</span>
                    
                  </div>
            
                </div>
        })
      }
    </div>
  );
}

export default Home;