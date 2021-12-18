import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {postAdded} from "../../stateManagement/postsSlice";

const AddNewPost = () => {
    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [authorId, setAuthorId] = useState('')
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const onTitleChange = (e) => setTitle(e.target.value)
    const onDetailChange = (e) => setDetail(e.target.value)
    const onAuthorSelect = (e) => setAuthorId(e.target.value)

    const postSubmitted = () => {
        if (title && detail && authorId) {
            dispatch(postAdded(title, detail, authorId))
            setTitle('')
            setDetail('')
            setAuthorId('')
        }

    }

    const canSave = Boolean(title) && Boolean(detail) && Boolean(authorId)

    const authorOptions = users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)
    return (
        <section>
            <h2>Add New Post</h2>
            <form>
                <label htmlFor="post title">Post Title</label>
                <input id="title" name="post" type="text" onChange={onTitleChange} value={title}/>
                <label htmlFor="post detail">Post Detail:</label>
                <textarea id="detail" name="detail" onChange={onDetailChange} value={detail}/>
                <label htmlFor="author name">Author:</label>
                <select id="postAuthor" value={authorId} onChange={onAuthorSelect}>
                    <option value="">None</option>
                    {authorOptions}
                </select>
                <button type="button" onClick={postSubmitted} disabled={!canSave}>Add Post</button>
            </form>

        </section>
    );
};

export default AddNewPost;