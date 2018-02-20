import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

import { Menu } from './components/menu';
import { Navbar } from './components/navbar';
import RouterApp from './components/router-app';

import styles from './styles/app';

const themePpal = createMuiTheme({ palette: { type: 'dark' } });
const documentHeight = document.documentElement.clientHeight;

const App = ({ classes, theme }) => {
    return (
        <MuiThemeProvider theme={themePpal}>
            <div className={classes.root} style={{ height: documentHeight }}>
                <Reboot />
                <Router>
                    <div className={classes.appFrame}>
                        <Navbar />
                        <Menu />
                            <main className={classes.content}>
                                <RouterApp />
                            </main>
                    </div>
                </Router>
            </div>
        </MuiThemeProvider>
    )
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);

/*
<div className="App-header">
	<img src={logo} className="App-logo" alt="logo" />
	<h2>Welcome to React</h2>
</div>
<p className="App-intro">
	To get started, edit <code>src/App.js</code> and save to reload.
</p>

    <Navbar />
    <div className="container-fluid">
        <Router>
            <div className="row">
                <Menu />
                <RouterApp />
            </div>
        </Router>
    </div>
*/