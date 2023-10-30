import { Module } from '@nestjs/common';
import { TransaccionggController } from './transacciongg.controller';

@Module({
  controllers: [TransaccionggController]
})
export class TransaccionggModule {}
