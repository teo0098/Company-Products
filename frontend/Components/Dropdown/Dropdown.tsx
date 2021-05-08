import React from "react";
import {
  Dropdown as DropDown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import useDropDown from "../../customHooks/useDropdown";

import { DropdownInterface } from "../../interfaces/Dropdown";

const Dropdown: React.FC<DropdownInterface> = ({
  data,
  dispatchFilter,
  id,
  filters,
}) => {
  const { handleOnChange, dropdownOpen, toggle, renderSelection } = useDropDown(
    id,
    dispatchFilter
  );

  return (
    <DropDown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret> {renderSelection(filters)} </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => handleOnChange("*")}>
          {" "}
          Wszystko{" "}
        </DropdownItem>
        {data.map((value) => (
          <DropdownItem key={value} onClick={() => handleOnChange(value)}>
            {" "}
            {value}{" "}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropDown>
  );
};

export default Dropdown;
