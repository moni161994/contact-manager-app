import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";

const ViewContact = () => {
  let { contactId } = useParams();

  const [state, setState] = useState({ loading: false, contact: {} });

  useEffect(() => {
    async function fetchContact() {
      setState({ ...state, loading: true });
      const response = await axios.get(
        `http://localhost:9000/contacts/${contactId}`
      );
      //   no need to write response.json, its done when we use axios
      setState({ ...state, loading: false, contact: response.data });
    }
    fetchContact();
  }, []);

  let { contact, loading } = state;

  return (
    <>
      <section className="view-contact-intro">
        <div className="container">
          <div className="row mt-2">
            <div className="col">
              <h3 className="text-warning">View Contact</h3>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="view-contact mt-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <img
                  src={contact.photo}
                  style={{ width: "150px" }}
                  alt="caller-image"
                />
              </div>
              <div className="col-md-8">
                <div className="list-group">
                  <div className="list-group-item list-group-item-action">
                    Name : <span className="fw-bold">{contact.name}</span>
                  </div>
                  <div className="list-group-item list-group-item-action">
                    Mobile : <span className="fw-bold">{contact.mobile}</span>
                  </div>
                  <div className="list-group-item list-group-item-action">
                    Email : <span className="fw-bold">{contact.email}</span>
                  </div>
                  <div className="list-group-item list-group-item-action">
                    Company : <span className="fw-bold">{contact.company}</span>
                  </div>
                  <div className="list-group-item list-group-item-action">
                    Title : <span className="fw-bold">{contact.title}</span>
                  </div>
                </div>
                <Link to={"/contact/list"} className="btn btn-warning mt-2">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ViewContact;
