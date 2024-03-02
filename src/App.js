
import Login from './Login/Login';
import Payment from './Payment/Payment';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div >
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
