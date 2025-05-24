import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InvitationModule } from './invitation/invitation.module';
import { ConfigModule } from '@nestjs/config';
import { FlatModule } from './flat/flat.module';
import { TagModule } from './tag/tag.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VisitsMiddleware } from './middleware/visit.middleware';
import { VisitsService } from './middleware/visit.service';
import { PrismaService } from './prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { ChatModule } from './chat/chat.module';
import { CounterModule } from './counter/counter.module';
import { FlatPaymentsModule } from './flatPayments/flatPayments.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    FlatModule,
    TagModule,
    ChatModule,
    CounterModule,
    InvitationModule,
    FlatPaymentsModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    // ThrottlerModule\ThrottlerGuard ограничивает макс частоту запросов
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
      // generateKey: (request) => request.ip,
    }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveStaticOptions: {
        index: false,
        fallthrough: false,
      },
      serveRoot: '/uploads/',
    }),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
    VisitsService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VisitsMiddleware)
      .forRoutes('*'); 
  }
}