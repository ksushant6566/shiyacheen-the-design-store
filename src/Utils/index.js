import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const { userRoles } = currentUser;
    if( userRoles.includes("admin")) return true;
    return false;
}

export const apiInstance = axios.create({
    // baseURL: 'https://shiyacheen-payment-server.herokuapp.com/'
    baseURL: 'https://shiyacheen-designs.herokuapp.com/'
});