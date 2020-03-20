import { PassportModule } from '@nestjs/passport';

export const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});
