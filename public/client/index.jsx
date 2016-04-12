import 'pure/pure-min.css';

import React                                                      from 'react';
import { render }                                                 from 'react-dom';
import { Router, browserHistory }                                 from 'react-router';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { Provider }                                               from 'react-redux';
import thunkMiddleware                                            from 'redux-thunk';
import { getStoredState, persistStore, autoRehydrate }            from 'redux-persist'
import routes                                                     from './views/routes';
import * as reducers                                              from './store/reducers';

const reducer = combineReducers(reducers)

const restoreConfig = {
    skiprestore: true
};

getStoredState(restoreConfig, (error, initialState) => {

    // Create and persist store
    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware), // async behavior
            autoRehydrate()
        )
    );

    persistStore(store);

    // for debugging
    store.subscribe(() => {
        console.log('UPDATE: ', store.getState());
    });

    render (
        <Provider store={ store }>
            <Router routes={ routes } history={ browserHistory }></Router>
        </Provider>,
        document.getElementById('core')
    );
});

// // Create and persist store
// const store = createStore(
//     reducer, 
//     compose(
//         applyMiddleware(thunkMiddleware),
//         autoRehydrate()
//     )
// );
// persistStore(store);

// // for debugging
// store.subscribe(() => {
//     console.log('UPDATE: ', store.getState());
// });

// render (
//     <Provider store={ store }>
//         <Router routes={ routes } history={ browserHistory }></Router>
//     </Provider>,
//     document.getElementById('core')
// );