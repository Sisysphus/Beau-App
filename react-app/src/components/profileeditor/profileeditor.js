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
        firstName,
        genderId,
        photo,
      }),
    });
    const { Success } = await response.json();
    console.log(Success);
  };
  /* If display info is true actually return comp otherwise don't  */
  return displayInfo ? (
    <form className="profile-form" onSubmit={onEdit}>
      <div className="row">
        <div className="form-group col-6">
          <label className="text-white mb-2 mt-5">User Name</label>
          <input
            className="form-control mb-3"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div className="form-group col-6">
          <label className="text-white mb-2 mt-5">Email</label>
          <input
            className="form-control mb-3"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-6">
          <label className="text-white mb-2">Password</label>
          <input
            className="form-control mb-3"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div className="form-group col-6">
          <label className="text-white mb-2">Repeat Password</label>
          <input
            className="form-control mb-3"
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="text-white mb-2">First Name</label>
        <input
          className="form-control mb-3"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required={true}
        ></input>
      </div>
      <div className="form-group">
        <label className="text-white mb-2">Exercise level</label>
        <input
          className="form-control mb-3"
          type="number"
          onChange={(e) => setGenderId(Number(e.target.value))}
          value={genderId}
          required={true}
        ></input>
      </div>
      <div className="form-group ">
        <label className="text-white mb-2">Photo</label>
        <input
          className="form-control mb-3"
          type="text"
          onChange={(e) => setPhoto(e.target.value)}
          value={photo}
        ></input>
      </div>
      <div className="w-200 d-flex justify-content-center">
        <button
          className="btn btn-success mt-3 w-80 align-middle sizebuttoner"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  ) : null;
}

export default ProfileEditor;
