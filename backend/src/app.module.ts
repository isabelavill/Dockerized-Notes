import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    
  TypeOrmModule.forRootAsync({
  imports: [ConfigModule, NotesModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,


  }),
}),
    
  NotesModule,


  ],
})
export class AppModule {}
