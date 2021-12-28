import React from 'react';
import {useSelector} from "react-redux";
import {selectAllUsers} from "../../stateManagement/usersSlice";
import {Link} from "react-router-dom";

const UsersList = () => {
    const users  = useSelector(selectAllUsers)
    
    const renderUsers = users.map((user) => (
        <li key={user.id}>
            {user.username}
            <Link to={`all-users/${user.id}`}  >View User</Link>
        </li>
    ))
    return (
        <div>
            {renderUsers}
        </div>
    );
};

export default UsersList;