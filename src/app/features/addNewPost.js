import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";
import {addPost} from "./postsSlice";

const AddNewPost = () => {
    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const dispatch = useDispatch()
    const onTitleChange = (e) => setTitle(e.target.value)
    const onDetailChange = (e) => setDetail(e.target.value)

    const postSubmitted = () => {
        if(title && detail)
        {
            dispatch(addPost({id: nanoid(), title, content: detail}))
            setTitle('')
            setDetail('')
        }

    }
    return (
        <section>
            <h2>Add New Post</h2>
            <form>
                <label htmlFor="post title">Post Title</label>
                <input id="title" name="post" type="text" onChange={onTitleChange} value={title}/>
                <label htmlFor="post detail">Post Detail:</label>
                <textarea id="detail" name="detail" onChange={onDetailChange} value={detail}/>
                <button type="button" onClick={postSubmitted}>Add Post</button>
            </form>
        </section>
    );
};

export default AddNewPost;