import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

export const ProductFilterSort: React.FC<any> = ({
  handleSearch,
  handleSort,
}) => {
  const [sortBy, setSortBy] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchItem);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;
    setSortBy(sortType);
    handleSort(event.target.value);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="search">
          <Form.Label>Search</Form.Label>
          <Form.Control
            onChange={handleSearchChange}
            value={searchItem}
            onKeyDown={handleEnter}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formSort">
          <Form.Label>Sort by</Form.Label>
          <Form.Select onChange={handleSortChange} value={sortBy}>
            <option value="">None</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="price-asc">Price (Ascending)</option>
            <option value="price-desc">Price (Descending)</option>
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
};
