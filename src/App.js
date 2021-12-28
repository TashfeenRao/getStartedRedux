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
import UserPage from "./app/features/user/userPage";
import UsersList from "./app/features/user/usersList";
import NotificationList from "./app/features/notifications/notificationList";

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
                    <Route exact path="/notifications" component={NotificationList} />
                    <Route exact path="/all-users" component={UsersList} />
                    <Route exact path="/view-post/:postId" component={ViewPost}/>
                    <Route exact path="/edit-post/:postId" component={EditPost}/>
                    <Route exact path="/all-users/:userId" component={UserPage} />
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}

export default App
