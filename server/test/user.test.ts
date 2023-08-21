import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';


import { AdminUserService } from '../src/service/admin/admin.user.service';

describe('test/service/user.test.ts', () => {

  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>();
    const userService = await app.getApplicationContext().getAsync<AdminUserService>(AdminUserService);

    const data = await userService.getAdminUserByNickName('admin1');
    console.log('test userService:',data)
    // close app
    await close(app);
  });

});