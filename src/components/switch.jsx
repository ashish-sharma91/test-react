import React from "react";
import Switch from "@material-ui/core/Switch";

function CustomSwitch(props) {
  const handleChange = (event) => {
    props.onChange(event.target.checked);
  };

  return (
    <Switch
      checked={props.checked}
      onChange={handleChange}
      name="checkedA"
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
  );
}

export default CustomSwitch;
