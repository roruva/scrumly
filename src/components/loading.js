import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

const Loading = ({ centered }) => (
    <CircularProgress thickness={5}/>
);

Loading.propTypes = {
    centered: PropTypes.bool,
};

export default Loading;