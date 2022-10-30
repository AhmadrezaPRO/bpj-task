import Home from "pages/Home";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import EditUser from "pages/EditUser";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Home/>}/>
                <Route
                    path="/editUser/:id"
                    element={<EditUser/>}/>
                {/* <Route path="/login" element={<Home />} /> */}
            </Routes>
        </div>
    );
}

export default App;
