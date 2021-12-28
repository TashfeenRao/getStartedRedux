import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectPostById, updateReaction} from "../../stateManagement/postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const Reaction = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId))
    const dispatch = useDispatch()
    const handleReaction = (postId, name) => dispatch(updateReaction(postId, name))

    const emojiButtons = Object.entries(reactionEmoji).map(([name,emoji]) => {
        return <button onClick={() => handleReaction(postId, name)} key={name} type="button" className="muted-button reaction-button">{emoji} {post.reactions[name]}</button>
    })
    return (
        <div>
            {emojiButtons}
        </div>
    );
};

export default Reaction;