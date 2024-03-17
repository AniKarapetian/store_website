import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const ProductFilterSort: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(filterMovies(selectedGenre));
  }, [selectedGenre]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("search");
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;
    setSortBy(sortType);
    // if (sortType === "year-asc") {
    //   dispatch(sortMoviesByYearAsc());
    // } else if (sortType === "year-desc") {
    //   dispatch(sortMoviesByYearDesc());
    // } else if (sortType === "rating-asc") {
    //   dispatch(sortMoviesByRatingAsc());
    // } else if (sortType === "rating-desc") {
    //   dispatch(sortMoviesByRatingDesc());
    // }
  };
  const handleSearchChange = () => {};
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

        <Form.Group as={Col} controlId="formGenre">
          <Form.Label>Filter by</Form.Label>
          <Form.Select onChange={handleGenreChange} value={selectedGenre}>
            <option value="">All</option>
            {/* {GENRE_TYPES.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))} */}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formSort">
          <Form.Label>Sort by</Form.Label>
          <Form.Select onChange={handleSortChange} value={sortBy}>
            <option value="">None</option>
            <option value="year-asc">Year (Ascending)</option>
            <option value="year-desc">Year (Descending)</option>
            <option value="rating-asc">Rating (Ascending)</option>
            <option value="rating-desc">Rating (Descending)</option>
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
};
