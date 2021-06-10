import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

function Progressbar(props) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 6,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 10,
      backgroundColor: (props.value * 100) / 255 < 20 ? '#FA6D6B' : (props.value * 100) / 255 < 40 ? '#FA9E6B' : (props.value * 100) / 255 < 60 ? '#47D0AF' : "#FDE697" ,
    },
  }))(LinearProgress);

  return (
    <BorderLinearProgress className="progressbar" variant="determinate" value={(props.value * 100) / 255} />
  );
}

export default Progressbar;