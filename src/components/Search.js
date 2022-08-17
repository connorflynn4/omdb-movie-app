import React from "react";
import { InputGroup, Input, Button } from "reactstrap";

export default function Search(props) {
  const { onChangeSearchValue, onKeyPressSearchValue, onClickSearch } = props;

  return (
    <div className="search">
      <InputGroup>
        <Input
          placeholder="Type here to search for a movie..."
          onChange={onChangeSearchValue}
          onKeyPress={onKeyPressSearchValue}
        />
        <Button color="primary" onClick={onClickSearch}>
          Search
        </Button>
      </InputGroup>
    </div>
  );
}