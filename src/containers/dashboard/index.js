import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import * as dashboardReducerActions from './actions';

import '../../styles/dashboard.css';
import styles from './styles';
import DailyView from './DailyView';
import WeeklyView from './WeeklyView';
import MonthlyView from './MonthlyView';

import { getMonthName, getFirstAndLastDayWeek, WEEK_FULL } from '../../utilities/utils';

class Dashboard extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        classes: PropTypes.object.isRequired,
        readTasks: PropTypes.func.isRequired,
        currentView: PropTypes.string,
        tasks: PropTypes.array,
        date: PropTypes.instanceOf(Date)
    };

    componentDidMount(){
        // this.props.readTasks();
    }

    toggleView = (event, newView) => {
        this.props.changeView(newView);
    }

    changeMonth = (isPrev) => {
        this.props.changeMonth(isPrev);
    }

    changeDay = (date, backward, forWeek) => {
        this.props.changeDate(date, backward, forWeek);
    }

    render() {
        const { classes, tasks, currentView, date } = this.props;
        const fullYear = date.getFullYear();
        const monthName = getMonthName(date.getMonth(), true);

        let view = <DailyView />;
        let currentControls = (
            <div className={classes.ctnDateSelector}>
                <IconButton>
                    <ChevronLeftIcon onClick={() => this.changeDay(date, true, false)}/>
                </IconButton>
                <Typography variant="display2" component="h3">{WEEK_FULL[date.getDay()]} - {date.getDate()}</Typography>
                <IconButton>
                    <ChevronRightIcon onClick={() => this.changeDay(date, false, false)}/>
                </IconButton>
                <Typography variant="title" component="h3">{monthName} - {fullYear}</Typography>
            </div>
        );
        
        if (currentView === 'month') {
            view =  <MonthlyView tasks={tasks} date={date} />;
            currentControls = (
                <div className={classes.ctnDateSelector}>
                    <IconButton>
                        <ChevronLeftIcon onClick={() => this.changeMonth(true)}/>
                    </IconButton>
                    <Typography variant="display2" component="h3">{monthName}</Typography>
                    <IconButton>
                        <ChevronRightIcon onClick={() => this.changeMonth(false)}/>
                    </IconButton>
                    <Typography variant="title" component="h3">{fullYear}</Typography>
                </div>
            );
        } else if (currentView === 'week') {
            view = <WeeklyView date={date} />;
            let [ firstDayWeek, lastDayWeek ] = getFirstAndLastDayWeek(date);

            currentControls = (
                <div className={classes.ctnDateSelector}>
                    <IconButton>
                        <ChevronLeftIcon onClick={() => this.changeDay(date, true, true)}/>
                    </IconButton>
                    <Typography variant="display2" component="h3">{ firstDayWeek.getDate() } - { lastDayWeek.getDate() }</Typography>
                    <IconButton>
                        <ChevronRightIcon onClick={() => this.changeDay(date, false, true)}/>
                    </IconButton>
                    <Typography variant="title" component="h3">{monthName} - {fullYear}</Typography>
                </div>
            );
        }

        return (
            <Grid container>
                <Grid item xs={12} lg={12}
                >
                    <Paper className={classes.cntControls}>
                        {currentControls}
                        <RadioGroup
                            aria-label="typeView"
                            name="typeView"
                            className={classes.cntTypeView}
                            value={currentView}
                            onChange={this.toggleView}
                            >
                            <FormControlLabel value="month" control={<Radio />} label="Month"/>
                            <FormControlLabel value="week" control={<Radio />} label="Week"/>
                            <FormControlLabel value="day" control={<Radio />} label="Day"/>
                        </RadioGroup>
                    </Paper>
                    {view}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    currentView: state.dashboard.currentView,
    tasks: state.dashboard.tasks,
    date: state.dashboard.date
});

export default compose(
    withStyles(styles, { name: 'Dashboard' }),
    connect(mapStateToProps, dashboardReducerActions)
)(Dashboard);