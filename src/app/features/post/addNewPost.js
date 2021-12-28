import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { saveNewPostToDb} from "../../stateManagement/postsSlice";
import {selectAllUsers} from "../../stateManagement/usersSlice";

const AddNewPost = () => {
    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [postStatus, setPostStatus] = useState('idle')
    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch()
    const onTitleChange = (e) => setTitle(e.target.value)
    const onDetailChange = (e) => setDetail(e.target.value)
    const onAuthorSelect = (e) => setAuthorId(e.target.value)

    const postSubmitted = async () => {
        try {
            setPostStatus('pending')
            if (canSave) {
               await dispatch(saveNewPostToDb({
                    title,
                    content: detail,
                    user: authorId
                }))
                setPostStatus('succeed')
                setTitle('')
                setDetail('')
                setAuthorId('')
            }
        } catch (e) {
            console.log("error in saving post",e)
        } finally {
            setPostStatus('idle')
        }
    }

    const canSave = [title, detail, authorId].every(Boolean) && postStatus === 'idle'

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