import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditBook() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState({
    name: "",
    author: "",
    price: "",
    pages: "",
  });

  const { name, author, price, pages } = book;

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit2 = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/book/${id}`, book);
    navigate("/");
    console.log("book edited");
  };

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8080/book/${id}`);
    setBook(result.data);
  };

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border-rounded p-5 mt-5 shadow">
          <h2 className="text-center">Edit Book Details</h2>

          <form onSubmit={(e) => onSubmit2(e)}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="form-label float-start mt-3 mb-2"
              >
                Enter Book Name :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Book Name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              ></input>

              <label htmlFor="name" className="form-label float-start mt-4">
                Enter name of author :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Author Name"
                name="author"
                value={author}
                onChange={(e) => onInputChange(e)}
              ></input>

              <label htmlFor="name" className="form-label float-start mt-4">
                Enter Book Price :
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Book Price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              ></input>

              <label htmlFor="name" className="form-label float-start mt-4">
                Enter No. of Pages :
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="No.of pages"
                name="pages"
                value={pages}
                onChange={(e) => onInputChange(e)}
              ></input>

              <button type="submit" className="btn btn-outline-dark me-2 mt-3">
                Submit
              </button>
              <Link className="btn btn-outline-danger mt-3" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
