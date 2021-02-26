import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TinderCard from "react-tinder-card";
import "./HomePage.css";
const HomePage = ({ currentUserId, loggedInUser }) => {
  const [people, setPeople] = useState([]);

  const [friendId, setFriendId] = useState(1);
  const [myId, setMyId] = useState(0);
  const [myMessage, myMessageId] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [direction, setDirection] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const onMessageFormSubmit = async (e) => {
    e.preventDefault();
    console.log({
      userAccountId: loggedInUser && loggedInUser.id,
      /* if user undefined or falsy
      / if we just put user.id if user is null we wont retrieve that
      / we are stopping user.id from being evaluated if user is false
      */
      userAccountId2: friendId,
      messageText: message,
    });
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAccountId: loggedInUser && loggedInUser.id,
        userAccountId2: friendId,
        messageText: message,
      }),
    });

    if (res.ok) {
      const res2 = await res.json();
      console.log(res2.messageSql);
      console.log(res2.conversation);
    }
  };

  const onSwipe = (direction, username) => {
    setCurrentUser(username);
    setDirection(direction);
    // console.log(username);
    // console.log(username);
    // console.log(currentUser);
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    setSuccess("Successfully sent!");
    const response = await fetch("/api/users/messages", {
      method: ["POST"],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId,
        recipient,
        message,
      }),
    });
  };

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const updateRecipient = (e) => {
    setRecipient(e.target.value);
  };

  // useEffect
  // Always allow keys in React for efficient re-render
  // Makes app super fast
  // thing = thing1 || thing2
  // thing becomes thing 1 if true or thing2 if false - Dependant on thing1

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/users/");
      const { users } = await response.json();
      setPeople(users);
    })();
  }, []);

  return loggedInUser ? (
    <>
      <div className="homepage">
        <h3 className="buds"></h3>
        <h1 className="text-white text-center">{currentUser}</h1>
        {direction ? (
          <p className="text-white text-center">You swiped {direction}</p>
        ) : (
          ""
        )}

        <div className="swipedCardsContainer">
          {people.map((person) => (
            <TinderCard
              onCardLeftScreen={(direction) =>
                onSwipe(direction, person.username)
              }
              className="swipedCard"
              key={person.name}
              preventSwipe={["up", "down"]}
            >
              <div
                className="card-display"
                style={{ backgroundImage: `url(${person.profilePhoto.url})` }}
              ></div>
            </TinderCard>
          ))}

          <div className="send-message">
            {/* {people.map((person) => (
            <>
              <h2 className="text-white">{person.name}</h2>
            </>
          ))} */}
            <h1 className="beau-logo text-center ">Send Message</h1>

            <form className="formy" onSubmit={submitMessage}>
              <div className="row">
                <div className="col-6">
                  <label className="text-white mb-2">User</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    onChange={updateRecipient}
                  />
                </div>
                <div className="col-6">
                  <label className="text-white mb-2">Message</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    onChange={updateMessage}
                  />
                </div>
              </div>
              <button
                className={
                  success
                    ? "bg-success text-white form-control animate__animated animate__pulse"
                    : "senderboi form-control "
                }
                type="submit"
              >
                {success ? success : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-5 thefooterprofilez">
        <div className="d-flex">
          <i class="fab fa-linkedin text-light footer-icon"></i>
          <a
            target="blank"
            href="https://www.linkedin.com/in/adam-faidy-bb8784105/"
            className="text-light footer-text"
          >
            LinkedIn
          </a>
        </div>
        <div className="d-flex">
          <i class="fab fa-github-square text-light footer-icon"></i>
          <a
            target="blank"
            href="https://github.com/Sisysphus/Beau-App"
            className="text-light footer-text"
          >
            Github
          </a>
        </div>
        <div className="d-flex">
          <i class="fas fa-globe-asia text-light footer-icon"></i>
          <a href="/" target="blank" className="text-light footer-text">
            Portfolio
          </a>
        </div>
      </div>
    </>
  ) : null;
};

export default HomePage;
