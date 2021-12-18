import React from 'react';
import {useSelector} from "react-redux";

const Author = ({authorId}) => {
    const author = useSelector(state => state.users.find(user => user.id === authorId))
    return (
        <span>By: {author ? author.name : 'unknown Author'}</span>
    );
};

export default Author;