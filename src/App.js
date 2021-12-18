import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import {Navbar} from './app/Navbar'
import PostLists from "./app/features/post/postLists";
import AddNewPost from "./app/features/post/addNewPost";
import ViewPost from "./app/features/post/viewPost";
import EditPost from "./app/features/post/editPost";

function App() {
    return (
        <Router>
            <Navbar/>
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <>
                                <AddNewPost/>
                                <PostLists/>
                            </>
                        )}
                    />
                    <Route exact path="/view-post/:postId" component={ViewPost}/>
                    <Route exact path="/edit-post/:postId" component={EditPost}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}

export default App
