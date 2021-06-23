import React from "react";
import { Link } from "react-router-dom";
export default function PermissionDeny() {
  return (
    <div
      className="justify-content-md-center text-center"
      style={{ marginTop: "150px" }}
    >
      <h1> You do not have permission to do this!! </h1>
      <Link to="/login">Login to create survey from here</Link>
    </div>
  );
}
