import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./HomePage.css";
const HomePage = () => {
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

  // Always allow keys in React for efficient re-render
  // Makes app super fast
  return (
    <div className="homepage">
      <h1>hello</h1>
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
  );
};

export default HomePage;
