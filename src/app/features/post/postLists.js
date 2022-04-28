import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Post from "./post";
import {fetchPosts, selectPostIds} from "../../stateManagement/postsSlice";
import {useGetPostsQuery} from "../../stateManagement/apiSlice";
import classNames from "classnames";
import {Spinner} from "../../../components/Spinner";

const PostLists = () => {
    const {isLoading, isSuccess, isFetching, isError, error, data: posts = [], refetch} = useGetPostsQuery()
    const postStatus = useSelector(state => state.posts.status)
    const orderedLists = useSelector(selectPostIds)
    const dispatch = useDispatch()
    let renderItem

    // if(postStatus === 'pending') {
    //     renderItem = <h2>loading</h2>
    // } else if(postStatus === 'succeed') {
    //     renderItem = orderedLists.map(postId => <Post key={postId} postId={postId} />)
    // } else if(postStatus === 'error') {
    //     renderItem = <h4>Error while fetching the posts</h4>
    // }

    const sortedPosts = useMemo(() => {
        const sortPosts = posts.slice()
        sortPosts.sort((a, b) => b.date.localeCompare(a.date))
        return sortPosts
    }, [posts])
    if (isLoading) {
        renderItem = <Spinner title="loading.." />
    } else if (isSuccess) {
        renderItem = sortedPosts.map(post => <Post key={post.id} post={post}/>)
        const classContainer = classNames('posts-container', {disabled: isFetching})
        renderItem = <div className={classContainer}>{renderItem}</div>
    } else if (isError) {
        renderItem = <h4>Error while fetching the posts</h4>
    }


    // useEffect(() => {
    //     if(postStatus === 'idle') dispatch(fetchPosts())
    // },[postStatus, dispatch])


    return (
        <section className="posts-list">
            <h2>Posts</h2>
            <button onClick={refetch}>Refresh posts</button>
            {renderItem}

        </section>
    );
};

export default PostLists;