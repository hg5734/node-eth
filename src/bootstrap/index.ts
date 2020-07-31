import AppService from '../services/app';
import logger from '../utils/logger';
try {
    logger.info('control in bootstrap user');
    AppService.createUser({
        email:'superadmin@gmail.com', 
        password :'testpassword', 
        name:'super admin', 
        role: 'ADMIN'
    }).then(()=>{})
}catch(error) {
}

