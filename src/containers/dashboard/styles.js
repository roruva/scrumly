// import { stylesConst } from '../../utilities/stylesConstants';

const styles = theme => ({
    tr: {
        width: theme.transitions.duration.enteringScreen,
        height: theme.transitions.duration.leavingScreen,
    },
    cntControls: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: theme.spacing.unit * 3,
        position: 'relative',
    }),
    ctnDateSelector: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cntTypeView: {
        flexDirection: 'row',
        position: 'absolute',
        top: '14px',
        right: '1em',
    },
    // WEEKLY VIEW
    cntDailyView: {
        display: 'flex',
    },
    cntDayWeek: {
        width: '14.27%',
        // width: 'calc(20% - 2em)',
        padding: '1em'
    },
    primaryColor: {
        color: theme.palette.secondary.main,
    },
    // MONTHLY VIEW
    mB: {
        marginBottom: theme.spacing.unit * 3,
    },
    dayName: {
        width: 'calc(14% - 8px)',
        margin: '0 4px',
        backgroundColor: theme.palette.grey[800],
        borderRadius: 10,
        // textTransform: 'uppercase',
    },
    dayNameColor: {
        color: theme.palette.primary.contrastText,
    },
    dayMonth: {
        position: 'relative',
        width: 'calc(14% - 8px)',
        height: '6em',
        borderRadius: '1em 3px',
        marginBottom: '8px',
        marginLeft: '4px',
        marginRight: '4px',
    },
    lightGrey: {
        color: theme.palette.grey[400],
    },
    toRight: {
        position: 'absolute',
        right: '.4em',
        top: '.1em',
        fontWeight: 300,
    },
    othersDays: {
        backgroundColor: '#505050',
    },
    fontColorWhite: {
        color: theme.palette.primary.contrastText
    },

    // TASK FORM
    widthTaskCnt: {
        flexDirection: 'row',
    },
});

export default styles;