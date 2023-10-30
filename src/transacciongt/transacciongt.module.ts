import { Module } from '@nestjs/common';
import { TransacciongtService } from './transacciongt.service';

@Module({
  providers: [TransacciongtService]
})
export class TransacciongtModule {}
