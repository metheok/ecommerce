import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import css from "./Loading.module.css";
export default function Loading() {
  return (
    <div className={css.container}>
      <BiDotsHorizontalRounded style={{ fontSize: "2rem" }} />
    </div>
  );
}
