import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import * as navbarReducerActions from './actions';
import styles from './styles';

class Navbar extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        open: PropTypes.bool,
        toggleDraw: PropTypes.func,
    };
    
    handleDrawerOpen = () => {
        this.props.toggleDraw();
    }
    
    handleDrawerClose = () => {
        this.props.toggleDraw();
    }

    render() {
        const { classes, open } = this.props;

        return (
            <AppBar className={classNames(classes.appBar, open && classes.appBarShift)}>
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.flex} variant="title" color="inherit" noWrap>
                        Scrumly
                    </Typography>
                    <Button color="inherit" onClick={this.handleDrawerClose}>Login</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.navbar.open
    };
}

export default compose(
    withStyles(styles, { name: 'Navbar' }),
    connect(mapStateToProps, navbarReducerActions)
)(Navbar);