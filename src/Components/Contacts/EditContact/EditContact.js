import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
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

  useEffect(() => {
    async function fetchContact() {
      setState({ ...state });
      const response = await axios.get(
        `http://localhost:9000/contacts/${contactId}`
      );
      //   no need to write response.json, its done when we use axios
      setState({ ...state, contact: response.data });
    }
    fetchContact();
  }, [contactId]);

  const UpdateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:9000/contacts/${contactId}`,
      state.contact
    );
    navigate("/contact/list", { replace: true });
  };

  let { contact } = state;
  return (
    <>
      <pre>{JSON.stringify(contact)}</pre>
      <section className="add-contact">
        <div className="container">
          <div className="row mt-2">
            <div className="col">
              <h3 className="text-primary">Edit Contact</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    name="name"
                    required={true}
                    onChange={UpdateInput}
                    value={contact.name}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="photo"
                    required={true}
                    onChange={UpdateInput}
                    value={contact.photo}
                    type="text"
                    className="form-control"
                    placeholder="Photo-URL"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="mobile"
                    required={true}
                    onChange={UpdateInput}
                    value={contact.mobile}
                    type="number"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="email"
                    required={true}
                    onChange={UpdateInput}
                    value={contact.email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="company"
                    required={true}
                    onChange={UpdateInput}
                    value={contact.company}
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="title"
                    required={true}
                    onChange={UpdateInput}
                    value={contact.title}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select className="form-control">
                    <option value="">select a group</option>
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Update"
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

export default EditContact;
