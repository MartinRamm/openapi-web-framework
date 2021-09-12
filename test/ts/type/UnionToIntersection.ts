import { expectTypeOf } from 'expect-type';
import { UnionToIntersection } from 'src/types/UnionToIntersection';

type A = { a: true };
type B = { b: false };
type C = { c: 1 };
type D = { d: 'd' };
type E = { e: unknown };
type F = { f: null };

expectTypeOf<UnionToIntersection<A>>().toEqualTypeOf<A>();
expectTypeOf<UnionToIntersection<A | B>>().toEqualTypeOf<A & B>();
expectTypeOf<UnionToIntersection<A | B | C>>().toEqualTypeOf<A & B & C>();
expectTypeOf<UnionToIntersection<A | B | C | D>>().toEqualTypeOf<A & B & C & D>();
expectTypeOf<UnionToIntersection<A | B | C | D | E>>().toEqualTypeOf<A & B & C & D & E>();
expectTypeOf<UnionToIntersection<A | B | C | D | E | F>>().toEqualTypeOf<A & B & C & D & E & F>();
