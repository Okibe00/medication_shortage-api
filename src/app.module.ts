import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugsModule } from './drugs/drugs.module';
import { ReportModule } from './report/report.module';
import { ShortageModule } from './shortage/shortage.module';
import { SubscriptionModule } from './subscription/subscription.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';

// console.log(process);
@Module({
  imports: [
    DrugsModule,
    ReportModule,
    ShortageModule,
    SubscriptionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
