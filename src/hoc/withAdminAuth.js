import { useAdminAuth } from '../customhooks';


const WithAdminAuth = props =>  useAdminAuth(props) && props.children;

export default WithAdminAuth;