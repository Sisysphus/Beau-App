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

  return (
    <div className="editor-info">
      <div className="d-flex">
        <strong className="text-white">User Id-</strong>{" "}
        <p className="text-white">{userId}</p>
      </div>
      <div className="d-flex">
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
        <strong className="text-white">Gender-</strong>{" "}
        <p className="text-white">{user.genderId}</p>
      </div>
      <div className="d-flex">
        <strong className="text-white">First Name-</strong>{" "}
        <p className="text-white">{user.firstName}</p>
      </div>
      <button className="btn btn-light" type="edit" onClick={onEdit}>
        Edit
      </button>
      {myMessages.map((card, id) => (
        <p className="text-white">
          {card.message} <span>Sent By{card.recipient}</span>
        </p>
      ))}

      <ProfileEditor displayInfo={displayInfo} />
    </div>
  );
}
export default User;
