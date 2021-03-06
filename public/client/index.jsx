import 'pure/pure-min.css';

import { Component }                                   from 'react';
import { render }                                      from 'react-dom';
import { Router, browserHistory }                      from 'react-router';
import { applyMiddleware, createStore, compose }       from 'redux';
import { Provider }                                    from 'react-redux';
import thunkMiddleware                                 from 'redux-thunk';
import { getStoredState, persistStore, autoRehydrate } from 'redux-persist'
import routes                                          from './views/routes';
import reducer                                         from './store/reducers';

const store = compose(
        applyMiddleware(thunkMiddleware),
        autoRehydrate()
    )(createStore)(reducer);

export default class AppProvider extends Component {

    constructor (props) {

        super(props);

        this.state = {

            rehydrated: false
        }
    }

    componentWillMount () {

        persistStore(store, {}, () => {

            this.setState({ rehydrated: true })
        })
    }

    render () {

        console.log(this.state);

        if(!this.state.rehydrated){

            return <div>Loading...</div>
        }

        return (
            <Provider store={ store }>
                <Router routes={ routes } history={ browserHistory }></Router>
            </Provider>,
        )
    }
}

render (
    <AppProvider />,
    document.getElementById('core')
);


/*
 * Attempt 2
 */
// const restoreConfig = {
//     skiprestore: true
// };

// getStoredState(restoreConfig, (error, initialState) => {

//     // Create and persist store
//     const store = createStore(
//         reducer,
//         initialState,
//         compose(
//             applyMiddleware(thunkMiddleware), // async behavior
//             autoRehydrate()
//         )
//     );

//     persistStore(store);

//     // for debugging
//     store.subscribe(() => {
//         console.log('UPDATE: ', store.getState());
//     });

//     render (
//         <Provider store={ store }>
//             <Router routes={ routes } history={ browserHistory }></Router>
//         </Provider>,
//         document.getElementById('core')
//     );
// });


/*
 * Attempt 1
 */
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