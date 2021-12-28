import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectPostById, updatePost} from "../../stateManagement/postsSlice";
import {useHistory} from "react-router-dom";

const EditPost = ({match}) => {
    const {postId} = match.params
    const post = useSelector(state => selectPostById(state, postId))
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const onTitleChange = (e) => setTitle(e.target.value)
    const onDetailChange = (e) => setContent(e.target.value)
    const dispatch = useDispatch()
    const history = useHistory()

    const postSubmitted = () => {
        if(title && content)
        {
            dispatch(updatePost({id: postId, title, content}))
            history.push(`/view-post/${postId}`)
            setTitle('')
            setContent('')
        }

    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="post title">Post Title</label>
                <input id="title" name="post" type="text" onChange={onTitleChange} value={title}/>
                <label htmlFor="post detail">Post Detail:</label>
                <textarea id="detail" name="detail" onChange={onDetailChange} value={content}/>
                <button type="button" onClick={postSubmitted}>Edit Post</button>
            </form>
        </section>
    );
};

export default EditPost;