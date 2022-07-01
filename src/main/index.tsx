import React from "react";
import ReactDOM from "react-dom";
import Router from "@/presentation/router/router";
import { makeLogin } from "./factories/pages/login/login-factory";

ReactDOM.render(
  <Router MakeLogin={makeLogin}/>,
  document.getElementById("App")
)
