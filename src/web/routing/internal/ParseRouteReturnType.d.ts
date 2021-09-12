import { Either } from 'src/fp/Either';
import { MalformedUrlException } from 'src/errors/routing/MalformedUrlException';
import { NoRouteFoundException } from 'src/errors/routing/NoRouteFoundException';
import { MethodNotAllowedException } from 'src/errors/routing/MethodNotAllowedException';
import { GenericRoute } from 'src/web/routing/Route';
import { InvalidParamException } from 'src/errors/routing/InvalidParamException';
import { MultipleRoutesMatchException } from 'src/errors/routing/MultipleRoutesMatchException';

export type ParseRouteReturnType = Either<
  MalformedUrlException | NoRouteFoundException | MethodNotAllowedException | InvalidParamException | MultipleRoutesMatchException,
  GenericRoute
>;
