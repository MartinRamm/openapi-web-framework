import { Either } from 'src/fp/Either';
import { MalformedUrlException } from 'src/errors/routing/MalformedUrlException';
import { NoRouteFoundException } from 'src/errors/routing/NoRouteFoundException';
import { MethodNotAllowedException } from 'src/errors/routing/MethodNotAllowedException';
import { Handler } from 'src/web/Handler';

export type ParseRouteReturnType = Either<
  MalformedUrlException | NoRouteFoundException | MethodNotAllowedException,
  Handler
>;
