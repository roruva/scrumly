import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui-icons/Face';
import PersonAdd from 'material-ui-icons/PersonAdd';
import Close from 'material-ui-icons/Close';

import styles from './styles';
import * as userReducerActions from './actions';

import UserForm from './user-form';
import Loading from '../../components/loading';

class Members extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount(){
        this.props.getAllUsers();
    }

    toggleForm(){
        this.props.showFormCmp();
    }

    submit = (data) => { console.log('DTA', data);
        if (!data.bithdate) return;
        data.birthDate = new Date(data.bithdate.split('-')).getTime();
        this.props.createUser(data);
    }

    render() {
        const { classes, users, showForm, loading } = this.props;
        let currentView;  console.log('user', showForm, loading );
        if (loading) {
            currentView = <Loading centered={true}/>
        }else{
            if (showForm || users.length <= 0) {
                currentView = <UserForm onSubmit={this.submit} />
            }else{
                currentView = (
                    <Grid item xs={6} lg={4}>
                        <List>
                            {users.map((user, index) => (
                                <ListItem key={index} dense button>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Face />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.username}
                                        secondary={user.name}
                                        className={classes.listItemText}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                )
            }
        }
        
        return (
            <Grid container justify="center">
                <Grid item xs={12} lg={12}>
                    <Paper className={classes.cntMembers}>
                        <Typography variant="display2" component="h1">Members</Typography>
                        <Button
                            variant="fab"
                            mini
                            color="secondary"
                            aria-label="add"
                            className={classes.btnAddMember}
                            onClick={() => this.toggleForm()}
                        >
                            {showForm ?
                                <Close /> :
                                <PersonAdd />
                            }
                        </Button>
                        {currentView} 
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    users: state.user.users,
    showForm: state.user.showForm,
    loading: state.user.loading
});

export default compose(
    withStyles(styles, { name: 'Members' }),
    connect(mapStateToProps, userReducerActions)
)(Members);