import { unwrapResult } from '@reduxjs/toolkit';
import productApi from 'api/productApi';
import { getMe } from 'app/userSlice';
import SignIn from 'features/Auth/pages/SignIn/SignIn';
import firebase from 'firebase';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';


const Photo = React.lazy(() => import('./features/Photo/Photo'));
//remember have Suspense when using React

// Configure Firebase.
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

};
firebase.initializeApp(config);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const results = await productApi.getAll(params);
                console.log("🚀 ~ results", results);
            } catch (error) {
                console.log("🚀 ~ error", error);
            }
        };
        fetchProductList();
    }, []);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                console.log('User is not login');
                return;
            }

            try {
                const action = getMe();
                const actionResult = await dispatch(action);
                const currentUser = unwrapResult(actionResult);
                console.log("🚀 ~ currentUser", currentUser);
            } catch (error) { 
                console.log("🚀 ~ error", error); 
            }

        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <div className="photo-app">
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Redirect exact from="/" to="/photos" />

                        <Route path="/photos" component={Photo} />
                        <Route path="/signin" component={SignIn} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;

