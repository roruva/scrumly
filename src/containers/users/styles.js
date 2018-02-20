// import { stylesConst } from '../../utilities/stylesConstants';

const styles = theme => ({
    cntMembers: theme.mixins.gutters({
        flex: 1,
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: theme.spacing.unit * 3,
        position: 'relative',
    }),
    centerChilds: {
        textAlign: 'center',
    },
    alignCenter: {
        display: 'block',
        // marginVertical: 0,
        // margin: 'auto',
    },
    btnAddMember: {
        position: 'absolute',
        top: '0.85em',
        left: '10em',
    },
    btnAddTeam: {
        left: '7.5em',
    }
});

export default styles;

const iconSize = 10;
const halfOfIconSize = iconSize / 2;
const selectorColorSize = 2.4;

const userFormStyles = theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    wrapperForm: {
        display: 'flex',
        width: '100%',
        height: '18em',
        backgroundColor: '#313131',
    },
    cardContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    widthTeamCnt: {
        width: 'calc(100% - 32px)',
        backgroundColor: '#313131',
    },
    widthTaskCnt: {
        flexDirection: 'row',
    },
    form: {
    },
    hide: {
        opacity: 0,
        width: 0,
        height: 0,
    },
    cntCentered: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cntColor: {
        width: `${selectorColorSize}em`,
        height: `${selectorColorSize}em`,
        borderRadius: `${selectorColorSize/2}em 0 ${selectorColorSize/2}em 0`,
        overflow: 'hidden',
    },
    cntFields: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1em 0',
    },
    uploadAvatar: {
        width: '100%',
        position: 'relative',
    },
    btnDelete: {
        position: 'absolute',
        right: '.2em',
        bottom: '.2em',
    },
    avatarFinal: {
        flex: 1,
    },
    cardActions: {
        justifyContent: 'center',
    },
    wrapperBtn: {
        position: 'relative',
    },
    submittingForm: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    listItemText: {
        paddingLeft: 0,
    },

    // DROPZONE
    cntDropzone: {
        width: '100%',
        height: '100%',
    },
    avatarDropzone: {
        position: 'relative',
        width: 'calc(100% - 8px)',
        height: 'calc(100% - 8px)',
        borderWidth: '4px',
        borderColor: theme.palette.grey[400],
        borderStyle: 'dashed',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileAccepted: {
        borderColor: 'green',
    },
    fileRejected: {
        borderColor: 'red',
    },
    avatarPreview: {
        position: 'absolute',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '2px',
    },
    instructions: {
        position: 'relative',
        textAlign: 'center',
        marginTop: '3em',
        color: theme.palette.grey[400],
    },
    invalidFeedback: {
    },
    icon: {
        position: 'absolute',
        top: '1em',
        left: `calc(50% - ${halfOfIconSize}em)`,
        width: `${iconSize}em`,
        height: `${iconSize}em`,
        fill: theme.palette.grey[300]
    },
});

export { userFormStyles };