import React from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "../../stateManagement/usersSlice";

const Author = ({authorId}) => {
    const author = useSelector(state => selectUser(state, authorId))
    return (
        <span>By: {author ? author.name : 'unknown Author'}</span>
    );
};

export default Author;