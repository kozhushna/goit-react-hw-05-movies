import { Link } from 'react-router-dom';

const GoBackButton = ({ path, children }) => {
  return <Link to={path}>{children}</Link>;
};

export default GoBackButton;
