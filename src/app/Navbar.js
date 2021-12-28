import React from 'react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { fetchAllNotifications, selectAllNotification} from "./stateManagement/notificationsSlice";

export const Navbar = () => {

    const dispatch = useDispatch()
    const notifications = useSelector(selectAllNotification)
    const fetchNotifications = () => {
        dispatch(fetchAllNotifications())
    }

    const unReadNotificationCount = notifications.filter((n) => !n.read).length
    let unReadNotification;
    if(unReadNotificationCount > 0) {
        unReadNotification = (<span className="badge">{unReadNotificationCount}</span>)
    }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
              <Link to='/'>Home</Link>
              <Link to='/all-users'>Users</Link>
              <Link to='/notifications'>Notifications {unReadNotification}</Link>
          </div>
            <button className="button" onClick={fetchNotifications}>Refresh Notifications</button>

        </div>
      </section>
    </nav>
  )
}
