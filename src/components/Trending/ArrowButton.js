import classNames from 'classnames/bind';
import styles from './Trending.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const cx = classNames.bind(styles);

export function NextPrevious({ className, onClick }) {
    const classes = cx(className, 'btn-arrow');
    return (
        <div className={classes} onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
}

export function PrevPrevious({ className, onClick }) {
    const classes = cx(className, 'btn-arrow');
    return (
        <div className={classes} onClick={onClick}>
            <ArrowBackIosNewIcon />
        </div>
    );
}
