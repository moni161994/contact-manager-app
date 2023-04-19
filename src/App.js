import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AddContact from "./Components/Contacts/AddContact/AddContact";
import ContactList from "./Components/Contacts/ContactList/ContactList";
import EditContact from "./Components/Contacts/EditContact/EditContact";
import ViewContact from "./Components/Contacts/ViewContact/ViewContact";
import NavBar from "./Components/NavBar/NavBar";
import Spinner from "./Components/Spinner/Spinner";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/contact/list"} />} />
        <Route path={"/contact/list"} element={<ContactList />} />
        <Route path={"/contact/add"} element={<AddContact />} />
        <Route path={"/contact/view/:contactId"} element={<ViewContact />} />
        <Route path={"/contact/edit/:contactId"} element={<EditContact />} />
      </Routes>
    </div>
  );
}

export default App;
