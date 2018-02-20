import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { routerListItems } from './routes';

import { toggleDraw } from '../navbar/actions';
import { readTasks } from '../../containers/dashboard/actions';
import { getAllUsers } from '../../containers/users/actions';
import { getAllTeams } from '../../containers/teams/actions';

import styles from './styles';


class Menu extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        open: PropTypes.bool,
        toggleDraw: PropTypes.func,
    };

    componentDidMount(){
        this.props.dispatch(readTasks());
        this.props.dispatch(getAllUsers());
        this.props.dispatch(getAllTeams());
    }

    handleDrawerClose = () => {
        this.props.dispatch(toggleDraw());
    }

    render() {
        const { classes, theme, open } = this.props;

        return (
            <Drawer
                variant="permanent"
                classes={{
                paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className={classes.list}>{routerListItems}</List>
                </div>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.navbar.open
    };
}

export default compose(
    withStyles(styles, { withTheme: true, name: 'Menu' }),
    connect(mapStateToProps)
)(Menu);