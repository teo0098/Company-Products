import React, { useState } from "react";
import {
  Dropdown as DropDown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Dropdown: React.FC<{ name: string; data: any[] }> = ({ name, data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <DropDown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret> {name} </DropdownToggle>
      <DropdownMenu>
        {data.map((value) => (
          <DropdownItem> {value} </DropdownItem>
        ))}
      </DropdownMenu>
    </DropDown>
  );
};

export default Dropdown;
