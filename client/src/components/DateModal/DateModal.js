import React from "react";
import styled from "styled-components";
import Backdrop from "../UI/Backdrop";
import { THEMES } from "../THEMES";
import { db } from "../../services/firebase";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import { PartyPopper } from "../../assets";
import { FiXCircle, FiMessageCircle } from "react-icons/fi";

// Modify this for custom styles
import "react-datepicker/dist/react-datepicker.css";

const moment = require("moment");

const DateModal = (props) => {
  const startDate = props.date;
  const handleDateChange = props.handleDateChange;
  const closeModal = props.close;
  const movieID = props.movieID;

  function setMovieDate(date) {
    let formattedDate = moment(date).format();
    db.ref(`matches/${movieID}`).child("dates").update({ date: formattedDate });
  }

  return (
    <>
      <Backdrop show={props.show} closeHandler={props.close} />
      {props.show ? (
        <Modal>
          <Content>
            <h1>Set a Date</h1>
            <h3>{moment(startDate).format("YYYY/MM/DD h:mm A")}</h3>
            <DatePicker
              selected={props.date}
              onChange={(date) => handleDateChange(date)}
              inline
              showTimeSelect
              minDate={moment().toDate()}
            />
            <button
              onClick={() => {
                console.log("This date has been set!");
                setMovieDate(props.date);
                closeModal();
              }}
            >
              Submit
            </button>
            <button onClick={() => closeModal()}>Close</button>
          </Content>
        </Modal>
      ) : null}
    </>
  );
};

const Modal = styled.div`
  /* border: 2px solid red; */
  position: fixed;
  top: 20%;
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
    font-size: 44px;
  }
`;

export default DateModal;
