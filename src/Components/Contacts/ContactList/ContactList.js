import { queryAllByAltText } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";
import contacts from "d:/reactprojects/data-tracker/contact-app/src/api/contacts";

const ContactList = () => {
  // const [query, setQuery] = useState({ text: "" });

  let searchContact = (event) => {
    // setQuery({ ...query, text: event.target.value });
    let searchedData = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({ ...state, filteredData: searchedData });
  };

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredData: [],
    errorMessage: "",
  });

  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await ContactService.getAllContacts();
  //       console.log(response.data);
  //     }
  //     fetchData();
  //   }, []);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await fetch("http://localhost:9000/contacts");
  //       //   console.log(response.data);
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //     fetchData();
  //   }, []);

  let clickDelete = async (contactId) => {
    let response = await axios.delete(
      `http://localhost:9000/contacts/${contactId}`
    );
    if (response) {
      // setState({
      //   ...state,
      // });
      let response = await axios.get("http://localhost:9000/contacts");
      setState({
        contacts: response.data,
        filteredData: response.data,
      });
    }
  };

  useEffect(() => {
    try {
      async function fetchData() {
        setState({ ...state, loading: true });
        const response = await axios.get("http://localhost:9000/contacts");
        //   no need to write response.json, its done when we use axios
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredData: response.data,
        });
      }
      fetchData();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, []);

  let { loading, contacts, filteredData, errorMessage } = state;

  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Contact Manager
                  <Link to={"/contact/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    Add New Contact
                  </Link>
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <form className="row">
                <div className="col">
                  <input
                    // value={query.text}
                    onChange={searchContact}
                    // name="text"
                    type="text"
                    className="form-control"
                    placeholder="search contact"
                  />
                </div>
                <div className="col">
                  <input
                    type="submit"
                    className="btn btn-outline-dark"
                    value="search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="contact-list">
          <div className="container">
            <div className="row mt-5">
              {filteredData.length > 0 &&
                filteredData.map((contact) => (
                  <div className="col-md-6 mb-4" key={contact.id}>
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                          <div className="col-md-4">
                            <img
                              src={contact.photo}
                              style={{ width: "150px" }}
                              alt="caller-image"
                            />
                          </div>
                          <div className="col-md-7">
                            <div className="list-group">
                              <div className="list-group-item list-group-item-action">
                                Name :{" "}
                                <span className="fw-bold">{contact.name}</span>
                              </div>
                              <div className="list-group-item list-group-item-action">
                                Mobile :{" "}
                                <span className="fw-bold">
                                  {contact.mobile}
                                </span>
                              </div>
                              <div className="list-group-item list-group-item-action">
                                Email :{" "}
                                <span className="fw-bold">{contact.email}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-1  d-flex flex-column align-items-center">
                            <Link
                              to={`/contact/view/${contact.id}`}
                              className="btn btn-warning my-1"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/contact/edit/${contact.id}`}
                              className="btn btn-primary my-1"
                            >
                              <i className="fa fa-pen" />
                            </Link>
                            <button
                              onClick={() => clickDelete(contact.id)}
                              className="btn btn-danger my-1"
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactList;
