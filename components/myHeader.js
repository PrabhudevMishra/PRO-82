import React from "react";
import { Header } from "react-native-elements";

const MyHeader = (props) => {
  return (
    <Header
      centerComponent={{
        text: props.title,
        style: { color: "#202", fontSize: 20, fontWeight: "bold" },
      }}
      backgroundColor="#160"
    />
  );
};

export default MyHeader;
