/**
 * Created by Khushi on 23/01/17.
 */
//@flow

'use strict';

const React = require('React');
const {Provider} = require('react-redux');
const configureStore = require('./store/configureStore');

import TrackingApp from './TrackingApp';

function setup(): ReactClass<{}> {
    console.disableYellowBox = true;

    class Root extends React.Component {
        state: {
            isLoading: boolean;
            store: any;
        };

        constructor() {
            super();
            this.state = {
                isLoading: true,
                store: configureStore(() => this.setState({isLoading: false}))
            };
        }

        render() {
            if (this.state.isLoading) {
                return null;
            }
            return (
                <Provider store={this.state.store}>
                    <TrackingApp/>
                </Provider>
            );
        }
    }
    return Root;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;