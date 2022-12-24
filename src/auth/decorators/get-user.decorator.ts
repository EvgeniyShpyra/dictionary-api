import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const { email } = ctx.switchToHttp().getRequest();
  return email;
});
