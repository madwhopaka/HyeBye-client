import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../images/avatar.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "../reducers/loading";
import { checkAlphanum } from "../utilites/checkAlphanumeric.js";
import joinRoomApiCall from "../utilites/joinRoomApiCall.js";
import copy from "copy-to-clipboard";
import Loading from "./Loading";
import contentCopy from "../images/copy-icon.png";
import {SocketContext} from '../reducers/socket.js';
import "../App.css";

const host = "http://192.168.0.105:8000";
const url = `${host}/api/room/create`;
function RoomPage(props) {
  const loaderDispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setusername] = useState("");
  const [joinPressed, toggleJoinPressed] = useState(false);
  const [createPressed, toggleCreatePressed] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    setusername(user.value.username);
    if (!user.value.username) {
      nav("../login", { replace: true });
    }
  }, [user]);

  const handleCreateRoom = async () => {
    loaderDispatch(
      setLoading({
        loadingvalue: true,
        loadingtext: "Creating a new room for you...!",
      })
    );
    const formdata = {
      username: username,
    };
    await axios
      .post(url, formdata)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setCode(response.data.code);
      })
      .catch((err) => {
        loaderDispatch(setLoading({ loadingvalue: false, loadingtext: "" }));
        console.log(err);
        setError("Error from the server. Try Again.");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
    setTimeout(() => {
      loaderDispatch(setLoading({ loadingvalue: false, loadingtext: "" }));
      toggleCreatePressed(true);
    }, 3000);
  };

  const handleJoinRoom = async () => {
    loaderDispatch(
      setLoading({
        loadingvalue: true,
        loadingtext: "Wait while we set you up!",
      })
    );
    setTimeout(() => {
      loaderDispatch(setLoading({ loadingvalue: false, loadingtext: "" }));
      toggleJoinPressed(true);
    }, 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAalign: "center",
        height: "100vh",
      }}
    >
      <div
        className="text-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          src={avatar}
          className="avatar"
          sx={{ height: "100px", width: "100px", background: "smokewhite" }}
        />
        <h1 className="simpletext" style={{ margin: 0 }}>
          Hello {username}{" "}
        </h1>
        <p className="sub-title">
          This is a temporary username which is valid only for this session.
        </p>
      </div>
      {createPressed === false && joinPressed === false ? (
        <div
          className="create-join-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <button className="create-join-btn" onClick={handleCreateRoom}>
            Create Room
          </button>
          <button className="create-join-btn" onClick={handleJoinRoom}>
            Join Room
          </button>
          <div className="eror-div">{error}</div>
        </div>
      ) : (
        <div>
          {createPressed ? (
            <CreateComp username={username} code={code} />
          ) : (
            <JoinComp username={username} />
          )}
        </div>
      )}
      <Loading />
    </div>
  );
}

export default RoomPage;














function CreateComp(props) {
  const socket = useContext(SocketContext);
  const [copyText, setCopyText] = useState(false);
  const nav = useNavigate();

  const loaderDispatch = useDispatch();

  const handleJoinCreatedRoom = () => {
    loaderDispatch(
      setLoading({ loadingvalue: true, loadingtext: "Entering the room..!" })
    );
    setTimeout(() => {
      loaderDispatch(
        setLoading({
          loadingvalue: false,
          loadingtext: "Entering the room...!",
        })
      );
      const data = {
        code: props.code,
        username: props.username,
      };
      socket.emit('join-room', data)
        nav(`/room/${props.code}`, { replace: true });
  
    }, 3000);
  };

  const handleCopyClick = () => {
    const code = props.code;
    copy(code);
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 3000);
  };
  return (
    <div className="createroom-comp">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button className="create-join-btn" onClick={handleJoinCreatedRoom}>
          {props.code}
        </button>
        {copyText ? (
          <p className="simpletext" style={{ marginLeft: 10, fontSize: 15 }}>
            Code Copied
          </p>
        ) : (
          <img
            src={contentCopy}
            height="30px"
            width="30px"
            style={{ marginLeft: 10, marginTop: 3 }}
            onClick={handleCopyClick}
          />
        )}
      </div>
      <p className="sub-title">Tap on the button to enter room</p>
      <Loading />
    </div>
  );
}

function JoinComp(props) {
  const socket = useContext(SocketContext);
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [eror, setError] = useState("");
  const loaderDispatch = useDispatch();
  const handleChange = (event) => {
    setCode(event.target.value);
  };
  const JoinRoom = async () => {
    if (code.length != 12) {
      setError("Invalid code: Code must have 12 Chars.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (!checkAlphanum(code)) {
      setError("Invalid Code: Code must be alphanumeric");
    } else {
      loaderDispatch(
        setLoading({ loadingvalue: true, loadingtext: "Validating the room" })
      );
      var response = await joinRoomApiCall(props.username, code);
      console.log(response);
      setTimeout(() => {
        loaderDispatch(setLoading({ loadingvalue: false, loadingtext: "" }));
        if (response === "Success") {
          loaderDispatch(
            setLoading({ loadingvalue: true, loadingtext: "Joining the room" })
          );
          setTimeout(() => {
            loaderDispatch(
              setLoading({ loadingvalue: false, loadingtext: "" })
            );
            const data = {
              code : code , 
              username : props.username
            }
            socket.emit('join-room', data) ; 
            nav(`/room/${code}`, { replace: true });
          }, 1000);
        } else if (typeof response == Object) {
          setError("Couldn't connect to the server.");
          setTimeout(() => {
            setError("");
          }, 2000);
        } else {
          setError("Room not found.");
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      }, 2000);
    }
  };
  return (
    <div className="join-room-component">
      <div className="input-container">
        <p className="sub-title" style={{ marginTop: 0, marginBottom: 10 }}>
          Enter the roomcode, ask your friend for it.
        </p>
        <input
          className="login-input"
          placeholder="Room Code"
          onChange={handleChange}
        ></input>
      </div>
      <div className="join-btn-container">
        <button className="join-button" onClick={JoinRoom}>
          Join
        </button>
      </div>
      <div className="eror-div">{eror}</div>
      <Loading />
    </div>
  );
}
