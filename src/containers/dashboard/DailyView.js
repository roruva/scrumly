import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Zoom from 'material-ui/transitions/Zoom';
// import Task from 'material-ui-icons/Task';
import Add from 'material-ui-icons/Add';
import UpIcon from 'material-ui-icons/KeyboardArrowUp';
import BusinessCenter from 'material-ui-icons/BusinessCenter';

import * as dashboardReducerActions from './actions';

import TaskForm from './TaskForm';
import TasksList from './TasksList';

class DailyView extends Component {
    toggleTaskForm(){ this.props.toggleTaskForm(); }
    
    submit = (data) => {
        this.props.createTask(data);
    }

    toggleNotes = (task) => {
        this.props.toggleNotes(task);
    }

    toggleTaskOpts = (task) => {
        this.props.toggleTaskOpts(task);
    }

    render(){
        const { tasks, showTaskForm, loadingTask, users, teams } = this.props;
        const transitionDuration = { enter: 225, exit: 195 };
        let currentView;

        if (showTaskForm) {
            currentView = (
                <TaskForm
                    onSubmit={this.submit}
                    users={users}
                    teams={teams}
                    />
            )
        } else if (tasks.length <= 0){
            currentView = (
                <div style={{ textAlign: 'center', padding: '2em' }}>
                    <BusinessCenter
                        style={{
                            fill: '#eee',
                            width: '10em',
                            height: '10em',
                        }}
                    />
                    <Typography variant="display1" component="p" style={{ color: '#ddd' }}>
                        No one is working!
                    </Typography>
                </div>
            );
        } else {
            currentView = (
                <TasksList
                    tasks={tasks}
                    users={users}
                    toggleNotes={this.toggleNotes}
                    toggleTaskOpts={this.toggleTaskOpts}
                />
            )
        }

        return (
            <Grid container justify="center">
                <Grid item xs={12} lg={12}>
                    <Paper  style={{ position: 'relative' }}>
                        <Zoom
                            in={true}
                            timeout={transitionDuration}
                            style={{
                                transitionDelay: transitionDuration.exit,
                            }}
                            unmountOnExit
                        >
                            <Button
                                variant="fab"
                                color="primary"
                                style={{
                                    position: 'absolute',
                                    top: '.5em',
                                    right: '.5em',
                                    zIndex: 1
                                }}
                                onClick={() => this.toggleTaskForm()}
                            >
                                {showTaskForm ?
                                    <UpIcon /> :
                                    <Add />
                                }
                            </Button>
                        </Zoom>
                        {currentView} 
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.dashboard.loadingTask,
    tasks: state.dashboard.tasks,
    showTaskForm: state.dashboard.showTaskForm,
    users: state.user.users,
    teams: state.team.teams,
});

export default connect(mapStateToProps, dashboardReducerActions)(DailyView);