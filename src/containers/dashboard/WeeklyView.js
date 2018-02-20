import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Grow from 'material-ui/transitions/Grow';
import Divider from 'material-ui/Divider';
import Note from 'material-ui-icons/Note';
import Visibility from 'material-ui-icons/Visibility';

import TaskDialog from './TaskDialog';

import { toggleNotes } from './actions';

import styles from './styles';
import { WEEK_FULL } from '../../utilities/utils';

class DailyView extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        showDialogTask: false,
        currentTask: null,
    }

    toggleNotes = (task) => {
        this.props.dispatch(toggleNotes(task));
    }

    handleOpenTaskDialog = (task) => {
        this.setState({
            showDialogTask: true,
            currentTask: task
        });
    }

    buildWeek(date, tasks){
        const { classes } = this.props;
        let today = (new Date()).getDate();
        
        let firstDayWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
        let datesTasks = {};
        let taskDate;
        
        tasks.forEach((task, index) => {
            taskDate = new Date(task.createdAt);
            let key = taskDate.getDate();
            if (!datesTasks[key]) {
                datesTasks[key] = [];
            }
            datesTasks[key].push(task);
        });
        
        const week = [];
        let i = 0;
        let currentDay;
        
        for (i; i < 7; i++) {
            currentDay = firstDayWeek.getDate();
            let isToday = currentDay === today? true : false;
            let titleDayStyle = isToday ? classes.primaryColor : classes.fontColorWhite;
            let contentDay;
            if(datesTasks[currentDay]){
                contentDay = (
                    <List>
                        {datesTasks[currentDay].map((task, index) => (
                            <ListItem
                                key={index}
                                dense
                                button
                            >
                                <ListItemIcon>
                                    <Note />
                                </ListItemIcon>
                                <ListItemText
                                    inset
                                    primary={
                                        <Typography noWrap>{task.description}</Typography>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => this.handleOpenTaskDialog(task)}>
                                        <Visibility />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )
            }
            week.push(
                <Grow
                    key={i}
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...({ timeout: 1500 })}
                >
                    <Paper className={classes.cntDayWeek}>
                        <Typography className={titleDayStyle} variant="display2" align="center" component="h2">
                            {currentDay}
                        </Typography>
                        <Typography className={titleDayStyle} variant="button" align="center" component="h2">
                            {WEEK_FULL[i+1]}
                        </Typography>
                        <Divider style={{marginTop: '.5em'}} />
                        {contentDay}
                    </Paper>
                </Grow>
            );
            firstDayWeek.setDate(currentDay + 1);
        }

        return week;
    }

    handleClose = () => { console.log('handleClose WeeklyView');
        this.setState({ showDialogTask: false, currentTask: null });
    }

    render(){
        const { classes, date, tasks } = this.props;
        const { showDialogTask, currentTask } = this.state;

        const week = this.buildWeek(date, tasks);
        return (
            <div className={classes.cntDailyView}>
                {week}
                {showDialogTask &&
                    <TaskDialog
                        open={showDialogTask}
                        onClose={this.handleClose}
                        task={currentTask}
                        toggleNotes={this.toggleNotes}
                    />
                }
            </div>
        );

    }
}

const mapStateToProps = state => ({
    loading: state.dashboard.loadingTask,
    tasks: state.dashboard.tasks,
});

export default compose(
    withStyles(styles, { name: 'DailyView' }),
    connect(mapStateToProps)
)(DailyView);