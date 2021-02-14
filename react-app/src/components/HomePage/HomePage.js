import React, { useState, useEffect } from "react";
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
    console.log("You swiped: " + direction, username);
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
      <h1 className="beau-text">Beau</h1>
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
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <h1>Send Message</h1>
      <form onSubmit={onMessageFormSubmit}>
        <label>Friend Id</label>
        <input
          type="number"
          value={friendId}
          onChange={(e) => setFriendId(Number(e.target.value))}
        />
        <label>Message</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  ) : null;
};

export default HomePage;
