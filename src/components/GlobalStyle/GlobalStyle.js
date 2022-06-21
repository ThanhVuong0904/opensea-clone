import './GlobalStyle.module.scss';
import PropTypes from 'prop-types';

export default function GlobalStyle({ children }) {
    return <div>{children}</div>;
}

GlobalStyle.propTypes = {
    children: PropTypes.node.isRequired,
};
