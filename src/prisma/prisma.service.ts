import { PrismaClient } from '@prisma/client';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

import { hashSync } from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const isCreateOrUpdate =
        params.action == 'create' || params.action == 'update';

      if (isCreateOrUpdate && params.model == 'User') {
        const { password, ...user } = params.args.data;
        const hashedPassword = hashSync(password, 10);

        params.args.data = {
          ...user,
          password: hashedPassword,
        };
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
