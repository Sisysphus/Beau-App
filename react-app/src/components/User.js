import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
import ProfileEditor from "./profileeditor/profileeditor";
import axios from "axios";

function User({ currentUserId }) {
  const [user, setUser] = useState({});
  const [displayInfo, setDisplayInfo] = useState(false);
  const [myMessages, setMyMessages] = useState([]);
  // Notice we use useParams here instead of getting the params
  // From props.
  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/users/${currentUserId}/my-messages`);
      setMyMessages(data.data.messages);
      console.log(data);
    })();
  }, []);

  console.log(myMessages);

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

  const retrieveName = async (id) => {
    const data = await axios.get(`/api/users/${id}/get-name`);
    console.log(data.data);
  };

  return (
    <div className="editor-info">
      <div className="card mb-2 bg-dark p-2 w-50 coloredboi">
        <div className="d-flex ">
          <strong className="text-white">User Id-</strong>{" "}
          <p className="text-white">{userId}</p>
        </div>
        <div className="d-flex ">
          <strong className="text-white">Username-</strong>{" "}
          <p className="text-white">{user.username}</p>
        </div>
        <div className="d-flex">
          <strong className="text-white">Email-</strong>{" "}
          <p className="text-white">{user.email}</p>
        </div>
        {/* <div className="d-flex">
        <strong className="text-white">Nickname-</strong>{" "}
        <p className="text-white">{user.nickname}</p>
        </div>
        <div className="d-flex">
        <strong className="text-white">Bio-</strong>{" "}
        <p className="text-white">{user.bio}</p>
      </div> */}

        <div className="d-flex">
          <strong className="text-white">First Name-</strong>{" "}
          <p className="text-white">{user.firstName}</p>
        </div>
      </div>
      <button className="btn btn-light " type="edit" onClick={onEdit}>
        Edit
      </button>
      {myMessages.map((card, id) => (
        <div className="card mt-3 bg-dark p-3 w-100">
          <p className="text-white mt-5">
            {card.message}{" "}
            <span className="text-muted">Sent By {card.user_Id}</span>
          </p>
          <button className="btn btn-success">Reply</button>
          <button className="btn btn-danger mt-2">Delete</button>
        </div>
      ))}

      <ProfileEditor displayInfo={displayInfo} />
    </div>
  );
}
export default User;
