import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import iconLogo from "@assets/img/icon-logo.png";

export default function Alert(props) {
  const { alert } = props;
  const [show, setShow] = useState(true);

  return (
    <Toast id={alert.id} onClose={() => setShow(false)} bg={alert.type} show={show} delay={alert.delay} autohide>
      <Toast.Header>
        <img src={iconLogo} width="20" className="rounded me-2" alt="" />
        <strong className="me-auto">{alert.title}</strong>
      </Toast.Header>
      <Toast.Body>{alert.body}</Toast.Body>
    </Toast>
  );
}
