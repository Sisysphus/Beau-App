import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
import ProfileEditor from "./profileeditor/profileeditor";

function User() {
  const [user, setUser] = useState({});
  const [displayInfo, setDisplayInfo] = useState(false);
  // Notice we use useParams here instead of getting the params
  // From props.

  const { userId } = useParams();

  const onEdit = () => {
    setDisplayInfo((whateverJM) => {
      return !whateverJM;
    });
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="editor-info">
      <strong>User Id:</strong> {userId}
      <strong>Username:</strong> {user.username}
      <strong>Email:</strong> {user.email}
      <strong>Nickname:</strong> {user.nickname}
      <strong>Bio:</strong> {user.bio}
      <strong>Gender:</strong> {user.genderId}
      <strong>First Name:</strong> {user.firstName}
      <button type="edit" onClick={onEdit}>
        Edit
      </button>
      <ProfileEditor displayInfo={displayInfo} />
    </div>
  );
}
export default User;
