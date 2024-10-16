import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PaymentSuccess from "./PaymentSuccess";
import Form from "./Components/form"
import ImaggaImageAnalyzer from "./imagga";
import Login from "./Assingment/Login";
import PropertyList from './Assingment/PropertList';
import AdminPanel from './Assingment/AdminPanel';
import VRViewer from './Assingment/VRViewer';
function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" exact component={PropertyList} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/imagga" element={<ImaggaImageAnalyzer/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel/>} />
        <Route path="/vr-viewer/:id" element={<VRViewer/>} />
      </Routes>
    </Router>
  );
}

export default App;
