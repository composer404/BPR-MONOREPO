import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags(`TRAINING MACHINES ACTIONS`)
@Controller(`training-machines`)
export class TrainingMachinesController {}
