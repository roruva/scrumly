import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import styles from '../users/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
import People from 'material-ui-icons/People';
import Close from 'material-ui-icons/Close';
import * as teamReducerActions from './actions';

import TeamForm from './team-form';
import TeamsList from './teamsList';
import Loading from '../../components/loading';

class Teams extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount(){
        this.props.getAllTeams();
    }

    toggleForm(){
        this.props.toggleTeamForm();
    }

    submit = (data) => {
        this.props.createTeam(data);
    }

    toggleTodo = (team, toCreate) => {
        console.log('TEAM', team);
        this.props.toggleTeamTodo(team, toCreate);
    }

    addTodo = (data) => {
        const keyTodo = Object.keys(data)[0];
        const teamId = keyTodo.split('todo_')[1];
        const toDos = [data[keyTodo]];
        this.props.addTeamTodo(teamId, { toDos });
    }

    toogleTodoForm = (team) => {
        console.log('toogleTodoForm >> TEAM', team);
        this.props.toogleTodoForm(team);
    }

    render() {
        const { classes, teams, showCreateTeamForm, loading } = this.props;
        console.log('TEAMS', teams);
        let currentView;
        if (loading) {
            currentView = <Loading />
        } else {
            if (showCreateTeamForm) {
                currentView = <TeamForm onSubmit={this.submit} styles={classes} />
            } else if (teams.length <= 0) {
                currentView = (
                    <div style={{ textAlign: 'center' }}>
                        <People
                            style={{
                                fill: '#eee',
                                width: '10em',
                                height: '10em',
                            }}
                        />
                        <Typography variant="display1" component="p" style={{ color: '#ddd' }}>
                            We don't have Teams, start you first Team
                        </Typography>
                    </div>
                )
            } else {
                currentView = <TeamsList
                    teams={teams}
                    toggleTodoForm={this.toogleTodoForm}
                    toggleTodo={this.toogleTodoForm}
                    addTodo={this.addTodo}
                />
            }
        }
        
        return (
            <Grid container justify="center">
                <Grid item xs={12} lg={12}>
                    <Paper className={classes.cntMembers}>
                        <Typography variant="display2" component="h1">Teams</Typography>
                        <Button
                            variant="fab"
                            mini
                            color="secondary"
                            aria-label="add"
                            className={`${classes.btnAddMember} ${classes.btnAddTeam}`}
                            onClick={() => this.toggleForm()}
                        >
                            {showCreateTeamForm ?
                                <Close /> :
                                <People />
                            }
                        </Button>
                        {currentView} 
                    </Paper>
                </Grid>
            </Grid>
            // <div className="row cnt">
            //     <div className="col-sm-12">
            //         <h1>
            //             Teams
            //             <button className="btn btn-primary rounded-circle float-right size-3" onClick={ this.toggleForm.bind(this, showCreateTeamForm) }>{buttonValue}</button>
            //         </h1>
            //     </div>
            //     {currentView}
            // </div>
        )
    }
}

const mapStateToProps = (state) => ({
    team: state.team.team,
    teams: state.team.teams,
    showCreateTeamForm: state.team.showCreateTeamForm,
    loading: state.team.loading
});

export default compose(
    withStyles(styles, { name: 'Teams' }),
    connect(mapStateToProps, teamReducerActions)
)(Teams);