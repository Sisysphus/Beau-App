import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./HomePage.css";
const HomePage = ({ loggedInUser }) => {
  const [people, setPeople] = useState([
    {
      name: "Golden Retriever",
      url:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
    },
    {
      name: "Rotweiler",
      url:
        "https://vetstreet.brightspotcdn.com/dims4/default/016b763/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fde%2F7def60a7fb11e0a0d50050568d634f%2Ffile%2FRottweiler-5-645mk062811.jpg",
    },
  ]);

  const [message, setMessage] = useState("");
  const [friendId, setFriendId] = useState(1);
  const [myId, setMyId] = useState(0);

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

  // useEffect
  // Always allow keys in React for efficient re-render
  // Makes app super fast
  // thing = thing1 || thing2
  // thing becomes thing 1 if true or thing2 if false - Dependant on thing1

  return loggedInUser ? (
    <div className="homepage">
      <h1 className="beau-text">Beau</h1>
      <div className="swipedCardsContainer">
        {people.map((person) => (
          <TinderCard
            className="swipedCard"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              className="card-display"
              style={{ backgroundImage: `url(${person.url})` }}
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
