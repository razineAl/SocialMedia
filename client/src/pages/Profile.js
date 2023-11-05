import { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';


function Profile() {
    let { id } = useParams();
    const [username,setUsername] = useState('');
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/auth/profile/${id}`)
        .then((res)=>{
            setUsername(res.data.username);
        });
        axios.get(`http://localhost:3001/auth/profile/posts/${id}`)
        .then((res)=>{
            setPosts(res.data);
        });

    },[]);
    
     
    return(
        <div id='Profile-Page'>
            <div id='Username'><h2>{username}</h2></div>
            <div id='Profile-Posts'>{posts.map((post,index)=>{

            return <div className='post' key={index}>
                        <div className='title'>{post.title}</div>
                        <div className='body'>{post.postText}</div></div>})}
            </div>
        </div>
    )
}

export default Profile;