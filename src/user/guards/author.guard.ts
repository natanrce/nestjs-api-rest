import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsAuthorGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.user;
    const { id: targetId } = request.params;

    return userId === targetId;
  }
}
