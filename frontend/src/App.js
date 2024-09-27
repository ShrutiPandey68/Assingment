import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PaymentSuccess from "./PaymentSuccess";
import Form from "./Components/form"
import ImaggaImageAnalyzer from "./imagga";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/imagga" element={<ImaggaImageAnalyzer/>} />
      </Routes>
    </Router>
  );
}

export default App;
