import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Zoom from 'material-ui/transitions/Zoom';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import ContentPaste from 'material-ui-icons/ContentPaste';

import * as dashboardReducerActions from './actions';
import styles from './styles';

import { WEEK } from '../../utilities/utils';

class MonthlyView extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    buildCalendar = (date, tasks) => {
        const { classes } = this.props;
        const transitionDuration = { enter: 1025, exit: 195 };
        let prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
        let firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDayMonth  = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        let numDays  = lastDayMonth.getDate();
        let firstDay = firstDayMonth.getDay();
        let cells    = Math.ceil((numDays + firstDay)/7)*7;
        let dayToday = (new Date()).getDate();

        let numDaysPrevMonth = prevMonth.getDate();
        let numDaysNextMonth = 1;

        let datesTasks = {};
        let taskDate;
        tasks.filter((task, index) => {
            taskDate = new Date(task.createdAt);
            let key = taskDate.getDate();
            if (!datesTasks[key]) {
                datesTasks[key] = 0;
            }
            return datesTasks[key]++;
        });

        const calendar = [];
        let i = 0, day=1;
        while (i < cells) {
            let cntStyle = `${classes.dayMonth} ${classes.othersDays}`;
            let textDayStyle = `${classes.lightGrey} ${classes.toRight}`;
            let labelDay = numDaysNextMonth;
            let dayTasks;
            
            if (i < firstDay) {
                labelDay = numDaysPrevMonth - firstDay + 1;
                numDaysPrevMonth++;
            }else if(day <= numDays){
                cntStyle = `${classes.dayMonth}`;
                textDayStyle = day === dayToday ? `${classes.toRight} ${classes.primaryColor}` : classes.toRight;
                labelDay = day;

                if(datesTasks[day]) {
                    dayTasks = (
                        <IconButton style={{marginTop: '.4em'}}>
                            <Zoom
                                in={true}
                                timeout={transitionDuration}
                                style={{
                                    transitionDelay: transitionDuration.exit,
                                }}
                                unmountOnExit
                            >
                                <Badge className="" badgeContent={datesTasks[day]} color="primary">
                                    <ContentPaste
                                        style={{
                                            width: '1.4em',
                                            height: '1.4em',
                                        }}
                                    />
                                </Badge>
                            </Zoom>
                        </IconButton>
                    );
                }
                day++;
            } else {
                numDaysNextMonth++;
            }

            calendar.push(
                <Card className={cntStyle} key={i}>
                    <CardContent style={{ textAlign: 'center'}}>
                        <Typography className={textDayStyle} variant="subheading" component="h2">
                            {labelDay}
                        </Typography>
                        {dayTasks}
                    </CardContent>
                </Card>
            );
            i++;
        }
        return calendar;
    }

    buildCalendarHead(){
        const { classes } = this.props;
        let weekBuilded = [];
        WEEK.forEach( (day, index) => {
            weekBuilded.push(
                <Card className={classes.dayName} key={index}>
                    <CardContent>
                        <Typography className={classes.dayNameColor} variant="title" align="center" component="h2">
                            {day}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });
        return weekBuilded;
    }

    chooseDay(day, date){
        let targetDate = new Date(date);
        targetDate.setDate(day-1);
        this.props.changeDate(targetDate, false, false);
        this.props.changeView("day");
    }

    render(){
        const { classes, tasks, date } = this.props;
        const calendarHead = this.buildCalendarHead();
        const calendar = this.buildCalendar(date, tasks);
        return (
            <Grid container justify="center">
                <Grid item xs={12} lg={8}>
                    <Grid
                        container
                        className={classes.mB}
                        direction="row"
                        alignItems="stretch"
                        justify="center"
                    >
                        {calendarHead}
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        alignItems="stretch"
                        justify="center"
                    >
                        {calendar}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    controls: state.dashboard.controls,
    tasks: state.dashboard.tasks,
    date: state.dashboard.date
});

export default compose(
    withStyles(styles, { name: 'MonthlyView'}),
    connect(mapStateToProps, dashboardReducerActions)
)(MonthlyView);