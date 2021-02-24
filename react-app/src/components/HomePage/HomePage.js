import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TinderCard from "react-tinder-card";
import "./HomePage.css";
const HomePage = ({ loggedInUser }) => {
  const [people, setPeople] = useState([]);

  const [message, setMessage] = useState("");
  const [friendId, setFriendId] = useState(1);
  const [myId, setMyId] = useState(0);
  const [myMessage, myMessageId] = useState(null);
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
    alert("You swiped: " + username, direction);
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
    <div className="homepage">
      <h3 className="buds"></h3>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those
        fields below.
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
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
          <h1 className="beau-logo text-center">Send Message</h1>
          <form className="formy" onSubmit={onMessageFormSubmit}>
            <div className="row">
              <div className="col-6">
                <label className="text-white mb-2">User</label>
                <input
                  className="form-control mb-3"
                  type="number"
                  value={friendId}
                  onChange={(e) => setFriendId(Number(e.target.value))}
                />
              </div>
              <div className="col-6">
                <label className="text-white mb-2">Message</label>
                <input
                  className="form-control mb-3"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <button
              className="senderboi"
              type="submit"
              className="form-control"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default HomePage;
