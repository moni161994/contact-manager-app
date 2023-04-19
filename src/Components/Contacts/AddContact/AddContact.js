import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getDefaultNormalizer } from "@testing-library/react";

const AddContact = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
  });

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:9000/contacts`,
      state.contact
    );
    navigate("/contact/list", { replace: true });
  };

  const UpdateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const { contact } = state;

  return (
    <>
      <section className="add-contact">
        <div className="container">
          <div className="row mt-2">
            <div className="col">
              <h3 className="text-success">Create Contact</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    onChange={UpdateInput}
                    value={contact.name}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    onChange={UpdateInput}
                    value={contact.photo}
                    name="photo"
                    type="text"
                    className="form-control"
                    placeholder="Photo-URL"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    onChange={UpdateInput}
                    value={contact.mobile}
                    name="mobile"
                    type="number"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    onChange={UpdateInput}
                    value={contact.email}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    onChange={UpdateInput}
                    value={contact.company}
                    name="company"
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    onChange={UpdateInput}
                    value={contact.title}
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={"/contact/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
