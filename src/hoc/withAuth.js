import { useAuth } from './../customhooks';

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;