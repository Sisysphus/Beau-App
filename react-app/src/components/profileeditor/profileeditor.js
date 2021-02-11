import React, { useState } from "react";

function ProfileEditor({ displayInfo }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [genderId, setGenderId] = useState("");
  const [photo, setPhoto] = useState("");

  /* Keep useState type consistent num=num var=var */

  //   const [edit, onEdit] =
  const onEdit = async (submitEvent) => {
    submitEvent.preventDefault();
    const response = await fetch(`/api/users/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        repeatPassword,
        firstName,
        genderId,
        photo,
      }),
    });
  };
  /* If display info is true actually return comp otherwise don't  */
  return displayInfo ? (
    <form onSubmit={onEdit}>
      <div>
        <label>User Name</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required={true}
        ></input>
      </div>
      <div>
        <label>GenderId</label>
        <input
          type="number"
          onChange={(e) => setGenderId(Number(e.target.value))}
          value={genderId}
          required={true}
        ></input>
      </div>
      <div>
        <label>Photo</label>
        <input
          type="text"
          onChange={(e) => setPhoto(e.target.value)}
          value={photo}
        ></input>
      </div>
      <button type="submit">Submit</button>
    </form>
  ) : null;
}

export default ProfileEditor;
