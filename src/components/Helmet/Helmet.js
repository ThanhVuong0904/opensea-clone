import PropTypes from 'prop-types';
export default function Helmet({ title, children }) {
    document.title = title;
    return <div>{children}</div>;
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
