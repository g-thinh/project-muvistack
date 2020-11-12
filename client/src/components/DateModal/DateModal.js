import React from "react";
import styled from "styled-components";
import Backdrop from "../UI/Backdrop";
import { THEMES } from "../THEMES";
import { db, auth } from "../../services/firebase";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import { PartyPopper } from "../../assets";
import { FiCheck, FiXCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
// Modify this for custom styles
import "react-datepicker/dist/react-datepicker.css";

const moment = require("moment");

const DateModal = (props) => {
  const dispatch = useDispatch();
  const startDate = props.date;
  const handleDateChange = props.handleDateChange;
  const closeModal = props.close;
  const movieID = props.movieID;
  const [user, setUser] = React.useState(auth().currentUser);

  function setMovieDate(date) {
    let formattedDate = moment(date).format();

    //new requests will remove users
    db.ref(`matches/${movieID}/dates/users`).remove();

    // this updates the current suggested date
    db.ref(`matches/${movieID}`)
      .child("dates")
      .update({ date: formattedDate, suggestDate: false });

    // user who suggested the date is going
    db.ref(`matches/${movieID}/dates/users/${user.uid}`).update({
      isGoing: true,
    });

    //this sends the message
    db.ref(`matches/${movieID}/chat`)
      .child("messages")
      .push({
        suggestedDate: formattedDate,
        timestamp: Date.now(),
        content: `Hey! How about watching the movie on ${moment(date).format(
          "MMMM Do"
        )} at ${moment(date).format("h:mm A")}?`,
        user: user.uid,
        setDate: true,
      });
  }

  return (
    <>
      <Backdrop show={props.show} closeHandler={props.close} />
      {props.show ? (
        <Modal>
          <Content>
            <h1>Set a Date</h1>

            <DatePicker
              selected={props.date}
              onChange={(date) => handleDateChange(date)}
              inline
              showTimeSelect
              minDate={moment().toDate()}
            />
            <h3>
              {moment(startDate).format("MMMM Do")} at{" "}
              <span>{moment(startDate).format("h:mm A")}</span>
            </h3>

            <Buttons>
              <Button
                onClick={() => {
                  console.log("This date has been set!");
                  setMovieDate(props.date);
                  // closeModal();
                  dispatch(closeModal(false));
                }}
              >
                <FiCheck size={32} color="green" />
              </Button>
              <Button onClick={() => dispatch(closeModal(false))}>
                <FiXCircle size={32} color="red" />
              </Button>
            </Buttons>
          </Content>
        </Modal>
      ) : null}
    </>
  );
};

const Modal = styled.div`
  /* border: 2px solid red; */
  position: fixed;
  top: 15%;
  /* bottom: 50%; */
  align-self: center;
  justify-self: center;
  z-index: 8;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

  width: 70vw;
  height: auto;
  /* border: 5px solid goldenrod; */
  background: ${THEMES.Primary};
  & h1 {
    color: ${THEMES.White};
    font-size: 38px;
    user-select: none;
  }

  & h3 {
    font-size: 22px;
    user-select: none;

    & span {
      color: ${THEMES.White};
      text-decoration: underline;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
  width: 80%;
`;

const Button = styled.button`
  border: 1px solid #d9d9d9d9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  background-color: ${THEMES.White};
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 8px;

  &:hover {
    transform: scale(1.1);
  }
`;

export default DateModal;
