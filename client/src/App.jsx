import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';

/* Import pages and style below */
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ProfilePage from './Pages/ProfilePage';
import AdminHomePage from './Pages/AdminHomePage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminAddUserPage from './Pages/AdminAddUserPage';
import PrivateComponent from './components/PrivateComponent';
import AdminEditUserPage from './Pages/AdminEditUserPage';
import AdminPrivateComponent from './components/AdminPrivateComponent';
import './App.css';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<PrivateComponent />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                            </Route>
                            <Route element={<AdminPrivateComponent />}>
                                <Route path="/admin/home" element={<AdminHomePage />} />
                                <Route path="/admin/add-user" element={<AdminAddUserPage />} />
                                <Route path="/admin/update-user/:id" element={<AdminEditUserPage />} />
                            </Route>
                            <Route path="/admin" element={<AdminLoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
