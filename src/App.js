import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth, AuthContextProvider, NotFound } from './features';
import { AddProfile } from './features';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/addprofile" element={<AddProfile />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export { App };
