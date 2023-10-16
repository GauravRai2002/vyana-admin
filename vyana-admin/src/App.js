import Login from "./Login";
import Layout from "./pages/Layout";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <Routes> */}
        {/* <Route exact path='/login' element={<Login />} /> */}
        {/* <Route exact path='/' element={<Layout />} /> */}
      {/* </Routes> */}
      <Layout/>
    </>
  );
}

export default App;
