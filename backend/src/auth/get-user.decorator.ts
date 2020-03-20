import { User } from './user.entity';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req): User => req.user);
