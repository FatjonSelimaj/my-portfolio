
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserDetails
 * 
 */
export type UserDetails = $Result.DefaultSelection<Prisma.$UserDetailsPayload>
/**
 * Model Painting
 * 
 */
export type Painting = $Result.DefaultSelection<Prisma.$PaintingPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDetails`: Exposes CRUD operations for the **UserDetails** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDetails
    * const userDetails = await prisma.userDetails.findMany()
    * ```
    */
  get userDetails(): Prisma.UserDetailsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.painting`: Exposes CRUD operations for the **Painting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Paintings
    * const paintings = await prisma.painting.findMany()
    * ```
    */
  get painting(): Prisma.PaintingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserDetails: 'UserDetails',
    Painting: 'Painting',
    Project: 'Project',
    Portfolio: 'Portfolio',
    Article: 'Article',
    PasswordResetToken: 'PasswordResetToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userDetails" | "painting" | "project" | "portfolio" | "article" | "passwordResetToken"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserDetails: {
        payload: Prisma.$UserDetailsPayload<ExtArgs>
        fields: Prisma.UserDetailsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDetailsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDetailsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload>
          }
          findFirst: {
            args: Prisma.UserDetailsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDetailsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload>
          }
          findMany: {
            args: Prisma.UserDetailsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload>[]
          }
          create: {
            args: Prisma.UserDetailsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload>
          }
          createMany: {
            args: Prisma.UserDetailsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDetailsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload>
          }
          update: {
            args: Prisma.UserDetailsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload>
          }
          deleteMany: {
            args: Prisma.UserDetailsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDetailsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserDetailsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDetailsPayload>
          }
          aggregate: {
            args: Prisma.UserDetailsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDetails>
          }
          groupBy: {
            args: Prisma.UserDetailsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDetailsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserDetailsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserDetailsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserDetailsCountArgs<ExtArgs>
            result: $Utils.Optional<UserDetailsCountAggregateOutputType> | number
          }
        }
      }
      Painting: {
        payload: Prisma.$PaintingPayload<ExtArgs>
        fields: Prisma.PaintingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaintingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaintingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload>
          }
          findFirst: {
            args: Prisma.PaintingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaintingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload>
          }
          findMany: {
            args: Prisma.PaintingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload>[]
          }
          create: {
            args: Prisma.PaintingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload>
          }
          createMany: {
            args: Prisma.PaintingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PaintingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload>
          }
          update: {
            args: Prisma.PaintingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload>
          }
          deleteMany: {
            args: Prisma.PaintingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaintingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaintingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaintingPayload>
          }
          aggregate: {
            args: Prisma.PaintingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePainting>
          }
          groupBy: {
            args: Prisma.PaintingGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaintingGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PaintingFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PaintingAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PaintingCountArgs<ExtArgs>
            result: $Utils.Optional<PaintingCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ProjectFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ProjectAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PortfolioFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PortfolioAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ArticleFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ArticleAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PasswordResetTokenFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PasswordResetTokenAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userDetails?: UserDetailsOmit
    painting?: PaintingOmit
    project?: ProjectOmit
    portfolio?: PortfolioOmit
    article?: ArticleOmit
    passwordResetToken?: PasswordResetTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    portfolios: number
    articles: number
    passwordResetTokens: number
    Project: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolios?: boolean | UserCountOutputTypeCountPortfoliosArgs
    articles?: boolean | UserCountOutputTypeCountArticlesArgs
    passwordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs
    Project?: boolean | UserCountOutputTypeCountProjectArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type UserDetailsCountOutputType
   */

  export type UserDetailsCountOutputType = {
    paintings: number
  }

  export type UserDetailsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paintings?: boolean | UserDetailsCountOutputTypeCountPaintingsArgs
  }

  // Custom InputTypes
  /**
   * UserDetailsCountOutputType without action
   */
  export type UserDetailsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetailsCountOutputType
     */
    select?: UserDetailsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserDetailsCountOutputType without action
   */
  export type UserDetailsCountOutputTypeCountPaintingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaintingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    gender: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    gender: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    gender: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    gender?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    gender?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    gender?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    gender: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    gender?: boolean
    portfolios?: boolean | User$portfoliosArgs<ExtArgs>
    details?: boolean | User$detailsArgs<ExtArgs>
    articles?: boolean | User$articlesArgs<ExtArgs>
    passwordResetTokens?: boolean | User$passwordResetTokensArgs<ExtArgs>
    Project?: boolean | User$ProjectArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    gender?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "gender", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolios?: boolean | User$portfoliosArgs<ExtArgs>
    details?: boolean | User$detailsArgs<ExtArgs>
    articles?: boolean | User$articlesArgs<ExtArgs>
    passwordResetTokens?: boolean | User$passwordResetTokensArgs<ExtArgs>
    Project?: boolean | User$ProjectArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
      details: Prisma.$UserDetailsPayload<ExtArgs> | null
      articles: Prisma.$ArticlePayload<ExtArgs>[]
      passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[]
      Project: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      gender: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolios<T extends User$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, User$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    details<T extends User$detailsArgs<ExtArgs> = {}>(args?: Subset<T, User$detailsArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    articles<T extends User$articlesArgs<ExtArgs> = {}>(args?: Subset<T, User$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passwordResetTokens<T extends User$passwordResetTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Project<T extends User$ProjectArgs<ExtArgs> = {}>(args?: Subset<T, User$ProjectArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.portfolios
   */
  export type User$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * User.details
   */
  export type User$detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    where?: UserDetailsWhereInput
  }

  /**
   * User.articles
   */
  export type User$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * User.passwordResetTokens
   */
  export type User$passwordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    cursor?: PasswordResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * User.Project
   */
  export type User$ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserDetails
   */

  export type AggregateUserDetails = {
    _count: UserDetailsCountAggregateOutputType | null
    _min: UserDetailsMinAggregateOutputType | null
    _max: UserDetailsMaxAggregateOutputType | null
  }

  export type UserDetailsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    bio: string | null
    phone: string | null
    imageUrl: string | null
  }

  export type UserDetailsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    bio: string | null
    phone: string | null
    imageUrl: string | null
  }

  export type UserDetailsCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    bio: number
    phone: number
    imageUrl: number
    _all: number
  }


  export type UserDetailsMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    bio?: true
    phone?: true
    imageUrl?: true
  }

  export type UserDetailsMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    bio?: true
    phone?: true
    imageUrl?: true
  }

  export type UserDetailsCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    bio?: true
    phone?: true
    imageUrl?: true
    _all?: true
  }

  export type UserDetailsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDetails to aggregate.
     */
    where?: UserDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDetails to fetch.
     */
    orderBy?: UserDetailsOrderByWithRelationInput | UserDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDetails
    **/
    _count?: true | UserDetailsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDetailsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDetailsMaxAggregateInputType
  }

  export type GetUserDetailsAggregateType<T extends UserDetailsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDetails]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDetails[P]>
      : GetScalarType<T[P], AggregateUserDetails[P]>
  }




  export type UserDetailsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDetailsWhereInput
    orderBy?: UserDetailsOrderByWithAggregationInput | UserDetailsOrderByWithAggregationInput[]
    by: UserDetailsScalarFieldEnum[] | UserDetailsScalarFieldEnum
    having?: UserDetailsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDetailsCountAggregateInputType | true
    _min?: UserDetailsMinAggregateInputType
    _max?: UserDetailsMaxAggregateInputType
  }

  export type UserDetailsGroupByOutputType = {
    id: string
    userId: string
    firstName: string
    lastName: string
    bio: string | null
    phone: string | null
    imageUrl: string | null
    _count: UserDetailsCountAggregateOutputType | null
    _min: UserDetailsMinAggregateOutputType | null
    _max: UserDetailsMaxAggregateOutputType | null
  }

  type GetUserDetailsGroupByPayload<T extends UserDetailsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDetailsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDetailsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDetailsGroupByOutputType[P]>
            : GetScalarType<T[P], UserDetailsGroupByOutputType[P]>
        }
      >
    >


  export type UserDetailsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    bio?: boolean
    phone?: boolean
    imageUrl?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    paintings?: boolean | UserDetails$paintingsArgs<ExtArgs>
    _count?: boolean | UserDetailsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDetails"]>



  export type UserDetailsSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    bio?: boolean
    phone?: boolean
    imageUrl?: boolean
  }

  export type UserDetailsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "firstName" | "lastName" | "bio" | "phone" | "imageUrl", ExtArgs["result"]["userDetails"]>
  export type UserDetailsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    paintings?: boolean | UserDetails$paintingsArgs<ExtArgs>
    _count?: boolean | UserDetailsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserDetailsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDetails"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      paintings: Prisma.$PaintingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string
      lastName: string
      bio: string | null
      phone: string | null
      imageUrl: string | null
    }, ExtArgs["result"]["userDetails"]>
    composites: {}
  }

  type UserDetailsGetPayload<S extends boolean | null | undefined | UserDetailsDefaultArgs> = $Result.GetResult<Prisma.$UserDetailsPayload, S>

  type UserDetailsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDetailsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDetailsCountAggregateInputType | true
    }

  export interface UserDetailsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDetails'], meta: { name: 'UserDetails' } }
    /**
     * Find zero or one UserDetails that matches the filter.
     * @param {UserDetailsFindUniqueArgs} args - Arguments to find a UserDetails
     * @example
     * // Get one UserDetails
     * const userDetails = await prisma.userDetails.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDetailsFindUniqueArgs>(args: SelectSubset<T, UserDetailsFindUniqueArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDetails that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDetailsFindUniqueOrThrowArgs} args - Arguments to find a UserDetails
     * @example
     * // Get one UserDetails
     * const userDetails = await prisma.userDetails.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDetailsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDetailsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDetailsFindFirstArgs} args - Arguments to find a UserDetails
     * @example
     * // Get one UserDetails
     * const userDetails = await prisma.userDetails.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDetailsFindFirstArgs>(args?: SelectSubset<T, UserDetailsFindFirstArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDetails that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDetailsFindFirstOrThrowArgs} args - Arguments to find a UserDetails
     * @example
     * // Get one UserDetails
     * const userDetails = await prisma.userDetails.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDetailsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDetailsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDetailsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDetails
     * const userDetails = await prisma.userDetails.findMany()
     * 
     * // Get first 10 UserDetails
     * const userDetails = await prisma.userDetails.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDetailsWithIdOnly = await prisma.userDetails.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDetailsFindManyArgs>(args?: SelectSubset<T, UserDetailsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDetails.
     * @param {UserDetailsCreateArgs} args - Arguments to create a UserDetails.
     * @example
     * // Create one UserDetails
     * const UserDetails = await prisma.userDetails.create({
     *   data: {
     *     // ... data to create a UserDetails
     *   }
     * })
     * 
     */
    create<T extends UserDetailsCreateArgs>(args: SelectSubset<T, UserDetailsCreateArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDetails.
     * @param {UserDetailsCreateManyArgs} args - Arguments to create many UserDetails.
     * @example
     * // Create many UserDetails
     * const userDetails = await prisma.userDetails.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDetailsCreateManyArgs>(args?: SelectSubset<T, UserDetailsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserDetails.
     * @param {UserDetailsDeleteArgs} args - Arguments to delete one UserDetails.
     * @example
     * // Delete one UserDetails
     * const UserDetails = await prisma.userDetails.delete({
     *   where: {
     *     // ... filter to delete one UserDetails
     *   }
     * })
     * 
     */
    delete<T extends UserDetailsDeleteArgs>(args: SelectSubset<T, UserDetailsDeleteArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDetails.
     * @param {UserDetailsUpdateArgs} args - Arguments to update one UserDetails.
     * @example
     * // Update one UserDetails
     * const userDetails = await prisma.userDetails.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDetailsUpdateArgs>(args: SelectSubset<T, UserDetailsUpdateArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDetails.
     * @param {UserDetailsDeleteManyArgs} args - Arguments to filter UserDetails to delete.
     * @example
     * // Delete a few UserDetails
     * const { count } = await prisma.userDetails.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDetailsDeleteManyArgs>(args?: SelectSubset<T, UserDetailsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDetailsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDetails
     * const userDetails = await prisma.userDetails.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDetailsUpdateManyArgs>(args: SelectSubset<T, UserDetailsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserDetails.
     * @param {UserDetailsUpsertArgs} args - Arguments to update or create a UserDetails.
     * @example
     * // Update or create a UserDetails
     * const userDetails = await prisma.userDetails.upsert({
     *   create: {
     *     // ... data to create a UserDetails
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDetails we want to update
     *   }
     * })
     */
    upsert<T extends UserDetailsUpsertArgs>(args: SelectSubset<T, UserDetailsUpsertArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDetails that matches the filter.
     * @param {UserDetailsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userDetails = await prisma.userDetails.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserDetailsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserDetails.
     * @param {UserDetailsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userDetails = await prisma.userDetails.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserDetailsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of UserDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDetailsCountArgs} args - Arguments to filter UserDetails to count.
     * @example
     * // Count the number of UserDetails
     * const count = await prisma.userDetails.count({
     *   where: {
     *     // ... the filter for the UserDetails we want to count
     *   }
     * })
    **/
    count<T extends UserDetailsCountArgs>(
      args?: Subset<T, UserDetailsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDetailsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDetailsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDetailsAggregateArgs>(args: Subset<T, UserDetailsAggregateArgs>): Prisma.PrismaPromise<GetUserDetailsAggregateType<T>>

    /**
     * Group by UserDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDetailsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDetailsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDetailsGroupByArgs['orderBy'] }
        : { orderBy?: UserDetailsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDetailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDetailsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDetails model
   */
  readonly fields: UserDetailsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDetails.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDetailsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    paintings<T extends UserDetails$paintingsArgs<ExtArgs> = {}>(args?: Subset<T, UserDetails$paintingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDetails model
   */
  interface UserDetailsFieldRefs {
    readonly id: FieldRef<"UserDetails", 'String'>
    readonly userId: FieldRef<"UserDetails", 'String'>
    readonly firstName: FieldRef<"UserDetails", 'String'>
    readonly lastName: FieldRef<"UserDetails", 'String'>
    readonly bio: FieldRef<"UserDetails", 'String'>
    readonly phone: FieldRef<"UserDetails", 'String'>
    readonly imageUrl: FieldRef<"UserDetails", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserDetails findUnique
   */
  export type UserDetailsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * Filter, which UserDetails to fetch.
     */
    where: UserDetailsWhereUniqueInput
  }

  /**
   * UserDetails findUniqueOrThrow
   */
  export type UserDetailsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * Filter, which UserDetails to fetch.
     */
    where: UserDetailsWhereUniqueInput
  }

  /**
   * UserDetails findFirst
   */
  export type UserDetailsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * Filter, which UserDetails to fetch.
     */
    where?: UserDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDetails to fetch.
     */
    orderBy?: UserDetailsOrderByWithRelationInput | UserDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDetails.
     */
    cursor?: UserDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDetails.
     */
    distinct?: UserDetailsScalarFieldEnum | UserDetailsScalarFieldEnum[]
  }

  /**
   * UserDetails findFirstOrThrow
   */
  export type UserDetailsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * Filter, which UserDetails to fetch.
     */
    where?: UserDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDetails to fetch.
     */
    orderBy?: UserDetailsOrderByWithRelationInput | UserDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDetails.
     */
    cursor?: UserDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDetails.
     */
    distinct?: UserDetailsScalarFieldEnum | UserDetailsScalarFieldEnum[]
  }

  /**
   * UserDetails findMany
   */
  export type UserDetailsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * Filter, which UserDetails to fetch.
     */
    where?: UserDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDetails to fetch.
     */
    orderBy?: UserDetailsOrderByWithRelationInput | UserDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDetails.
     */
    cursor?: UserDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDetails.
     */
    skip?: number
    distinct?: UserDetailsScalarFieldEnum | UserDetailsScalarFieldEnum[]
  }

  /**
   * UserDetails create
   */
  export type UserDetailsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDetails.
     */
    data: XOR<UserDetailsCreateInput, UserDetailsUncheckedCreateInput>
  }

  /**
   * UserDetails createMany
   */
  export type UserDetailsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDetails.
     */
    data: UserDetailsCreateManyInput | UserDetailsCreateManyInput[]
  }

  /**
   * UserDetails update
   */
  export type UserDetailsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDetails.
     */
    data: XOR<UserDetailsUpdateInput, UserDetailsUncheckedUpdateInput>
    /**
     * Choose, which UserDetails to update.
     */
    where: UserDetailsWhereUniqueInput
  }

  /**
   * UserDetails updateMany
   */
  export type UserDetailsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDetails.
     */
    data: XOR<UserDetailsUpdateManyMutationInput, UserDetailsUncheckedUpdateManyInput>
    /**
     * Filter which UserDetails to update
     */
    where?: UserDetailsWhereInput
    /**
     * Limit how many UserDetails to update.
     */
    limit?: number
  }

  /**
   * UserDetails upsert
   */
  export type UserDetailsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDetails to update in case it exists.
     */
    where: UserDetailsWhereUniqueInput
    /**
     * In case the UserDetails found by the `where` argument doesn't exist, create a new UserDetails with this data.
     */
    create: XOR<UserDetailsCreateInput, UserDetailsUncheckedCreateInput>
    /**
     * In case the UserDetails was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDetailsUpdateInput, UserDetailsUncheckedUpdateInput>
  }

  /**
   * UserDetails delete
   */
  export type UserDetailsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
    /**
     * Filter which UserDetails to delete.
     */
    where: UserDetailsWhereUniqueInput
  }

  /**
   * UserDetails deleteMany
   */
  export type UserDetailsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDetails to delete
     */
    where?: UserDetailsWhereInput
    /**
     * Limit how many UserDetails to delete.
     */
    limit?: number
  }

  /**
   * UserDetails findRaw
   */
  export type UserDetailsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserDetails aggregateRaw
   */
  export type UserDetailsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserDetails.paintings
   */
  export type UserDetails$paintingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    where?: PaintingWhereInput
    orderBy?: PaintingOrderByWithRelationInput | PaintingOrderByWithRelationInput[]
    cursor?: PaintingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaintingScalarFieldEnum | PaintingScalarFieldEnum[]
  }

  /**
   * UserDetails without action
   */
  export type UserDetailsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDetails
     */
    select?: UserDetailsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDetails
     */
    omit?: UserDetailsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDetailsInclude<ExtArgs> | null
  }


  /**
   * Model Painting
   */

  export type AggregatePainting = {
    _count: PaintingCountAggregateOutputType | null
    _min: PaintingMinAggregateOutputType | null
    _max: PaintingMaxAggregateOutputType | null
  }

  export type PaintingMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    userDetailsId: string | null
  }

  export type PaintingMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    userDetailsId: string | null
  }

  export type PaintingCountAggregateOutputType = {
    id: number
    title: number
    content: number
    userDetailsId: number
    _all: number
  }


  export type PaintingMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    userDetailsId?: true
  }

  export type PaintingMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    userDetailsId?: true
  }

  export type PaintingCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    userDetailsId?: true
    _all?: true
  }

  export type PaintingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Painting to aggregate.
     */
    where?: PaintingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Paintings to fetch.
     */
    orderBy?: PaintingOrderByWithRelationInput | PaintingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaintingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Paintings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Paintings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Paintings
    **/
    _count?: true | PaintingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaintingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaintingMaxAggregateInputType
  }

  export type GetPaintingAggregateType<T extends PaintingAggregateArgs> = {
        [P in keyof T & keyof AggregatePainting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePainting[P]>
      : GetScalarType<T[P], AggregatePainting[P]>
  }




  export type PaintingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaintingWhereInput
    orderBy?: PaintingOrderByWithAggregationInput | PaintingOrderByWithAggregationInput[]
    by: PaintingScalarFieldEnum[] | PaintingScalarFieldEnum
    having?: PaintingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaintingCountAggregateInputType | true
    _min?: PaintingMinAggregateInputType
    _max?: PaintingMaxAggregateInputType
  }

  export type PaintingGroupByOutputType = {
    id: string
    title: string
    content: string
    userDetailsId: string
    _count: PaintingCountAggregateOutputType | null
    _min: PaintingMinAggregateOutputType | null
    _max: PaintingMaxAggregateOutputType | null
  }

  type GetPaintingGroupByPayload<T extends PaintingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaintingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaintingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaintingGroupByOutputType[P]>
            : GetScalarType<T[P], PaintingGroupByOutputType[P]>
        }
      >
    >


  export type PaintingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    userDetailsId?: boolean
    userDetails?: boolean | UserDetailsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["painting"]>



  export type PaintingSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    userDetailsId?: boolean
  }

  export type PaintingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "userDetailsId", ExtArgs["result"]["painting"]>
  export type PaintingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userDetails?: boolean | UserDetailsDefaultArgs<ExtArgs>
  }

  export type $PaintingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Painting"
    objects: {
      userDetails: Prisma.$UserDetailsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      userDetailsId: string
    }, ExtArgs["result"]["painting"]>
    composites: {}
  }

  type PaintingGetPayload<S extends boolean | null | undefined | PaintingDefaultArgs> = $Result.GetResult<Prisma.$PaintingPayload, S>

  type PaintingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaintingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaintingCountAggregateInputType | true
    }

  export interface PaintingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Painting'], meta: { name: 'Painting' } }
    /**
     * Find zero or one Painting that matches the filter.
     * @param {PaintingFindUniqueArgs} args - Arguments to find a Painting
     * @example
     * // Get one Painting
     * const painting = await prisma.painting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaintingFindUniqueArgs>(args: SelectSubset<T, PaintingFindUniqueArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Painting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaintingFindUniqueOrThrowArgs} args - Arguments to find a Painting
     * @example
     * // Get one Painting
     * const painting = await prisma.painting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaintingFindUniqueOrThrowArgs>(args: SelectSubset<T, PaintingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Painting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaintingFindFirstArgs} args - Arguments to find a Painting
     * @example
     * // Get one Painting
     * const painting = await prisma.painting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaintingFindFirstArgs>(args?: SelectSubset<T, PaintingFindFirstArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Painting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaintingFindFirstOrThrowArgs} args - Arguments to find a Painting
     * @example
     * // Get one Painting
     * const painting = await prisma.painting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaintingFindFirstOrThrowArgs>(args?: SelectSubset<T, PaintingFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Paintings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaintingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Paintings
     * const paintings = await prisma.painting.findMany()
     * 
     * // Get first 10 Paintings
     * const paintings = await prisma.painting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paintingWithIdOnly = await prisma.painting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaintingFindManyArgs>(args?: SelectSubset<T, PaintingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Painting.
     * @param {PaintingCreateArgs} args - Arguments to create a Painting.
     * @example
     * // Create one Painting
     * const Painting = await prisma.painting.create({
     *   data: {
     *     // ... data to create a Painting
     *   }
     * })
     * 
     */
    create<T extends PaintingCreateArgs>(args: SelectSubset<T, PaintingCreateArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Paintings.
     * @param {PaintingCreateManyArgs} args - Arguments to create many Paintings.
     * @example
     * // Create many Paintings
     * const painting = await prisma.painting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaintingCreateManyArgs>(args?: SelectSubset<T, PaintingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Painting.
     * @param {PaintingDeleteArgs} args - Arguments to delete one Painting.
     * @example
     * // Delete one Painting
     * const Painting = await prisma.painting.delete({
     *   where: {
     *     // ... filter to delete one Painting
     *   }
     * })
     * 
     */
    delete<T extends PaintingDeleteArgs>(args: SelectSubset<T, PaintingDeleteArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Painting.
     * @param {PaintingUpdateArgs} args - Arguments to update one Painting.
     * @example
     * // Update one Painting
     * const painting = await prisma.painting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaintingUpdateArgs>(args: SelectSubset<T, PaintingUpdateArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Paintings.
     * @param {PaintingDeleteManyArgs} args - Arguments to filter Paintings to delete.
     * @example
     * // Delete a few Paintings
     * const { count } = await prisma.painting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaintingDeleteManyArgs>(args?: SelectSubset<T, PaintingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Paintings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaintingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Paintings
     * const painting = await prisma.painting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaintingUpdateManyArgs>(args: SelectSubset<T, PaintingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Painting.
     * @param {PaintingUpsertArgs} args - Arguments to update or create a Painting.
     * @example
     * // Update or create a Painting
     * const painting = await prisma.painting.upsert({
     *   create: {
     *     // ... data to create a Painting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Painting we want to update
     *   }
     * })
     */
    upsert<T extends PaintingUpsertArgs>(args: SelectSubset<T, PaintingUpsertArgs<ExtArgs>>): Prisma__PaintingClient<$Result.GetResult<Prisma.$PaintingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Paintings that matches the filter.
     * @param {PaintingFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const painting = await prisma.painting.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PaintingFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Painting.
     * @param {PaintingAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const painting = await prisma.painting.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PaintingAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Paintings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaintingCountArgs} args - Arguments to filter Paintings to count.
     * @example
     * // Count the number of Paintings
     * const count = await prisma.painting.count({
     *   where: {
     *     // ... the filter for the Paintings we want to count
     *   }
     * })
    **/
    count<T extends PaintingCountArgs>(
      args?: Subset<T, PaintingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaintingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Painting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaintingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaintingAggregateArgs>(args: Subset<T, PaintingAggregateArgs>): Prisma.PrismaPromise<GetPaintingAggregateType<T>>

    /**
     * Group by Painting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaintingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaintingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaintingGroupByArgs['orderBy'] }
        : { orderBy?: PaintingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaintingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaintingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Painting model
   */
  readonly fields: PaintingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Painting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaintingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userDetails<T extends UserDetailsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDetailsDefaultArgs<ExtArgs>>): Prisma__UserDetailsClient<$Result.GetResult<Prisma.$UserDetailsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Painting model
   */
  interface PaintingFieldRefs {
    readonly id: FieldRef<"Painting", 'String'>
    readonly title: FieldRef<"Painting", 'String'>
    readonly content: FieldRef<"Painting", 'String'>
    readonly userDetailsId: FieldRef<"Painting", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Painting findUnique
   */
  export type PaintingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * Filter, which Painting to fetch.
     */
    where: PaintingWhereUniqueInput
  }

  /**
   * Painting findUniqueOrThrow
   */
  export type PaintingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * Filter, which Painting to fetch.
     */
    where: PaintingWhereUniqueInput
  }

  /**
   * Painting findFirst
   */
  export type PaintingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * Filter, which Painting to fetch.
     */
    where?: PaintingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Paintings to fetch.
     */
    orderBy?: PaintingOrderByWithRelationInput | PaintingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Paintings.
     */
    cursor?: PaintingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Paintings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Paintings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Paintings.
     */
    distinct?: PaintingScalarFieldEnum | PaintingScalarFieldEnum[]
  }

  /**
   * Painting findFirstOrThrow
   */
  export type PaintingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * Filter, which Painting to fetch.
     */
    where?: PaintingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Paintings to fetch.
     */
    orderBy?: PaintingOrderByWithRelationInput | PaintingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Paintings.
     */
    cursor?: PaintingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Paintings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Paintings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Paintings.
     */
    distinct?: PaintingScalarFieldEnum | PaintingScalarFieldEnum[]
  }

  /**
   * Painting findMany
   */
  export type PaintingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * Filter, which Paintings to fetch.
     */
    where?: PaintingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Paintings to fetch.
     */
    orderBy?: PaintingOrderByWithRelationInput | PaintingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Paintings.
     */
    cursor?: PaintingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Paintings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Paintings.
     */
    skip?: number
    distinct?: PaintingScalarFieldEnum | PaintingScalarFieldEnum[]
  }

  /**
   * Painting create
   */
  export type PaintingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * The data needed to create a Painting.
     */
    data: XOR<PaintingCreateInput, PaintingUncheckedCreateInput>
  }

  /**
   * Painting createMany
   */
  export type PaintingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Paintings.
     */
    data: PaintingCreateManyInput | PaintingCreateManyInput[]
  }

  /**
   * Painting update
   */
  export type PaintingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * The data needed to update a Painting.
     */
    data: XOR<PaintingUpdateInput, PaintingUncheckedUpdateInput>
    /**
     * Choose, which Painting to update.
     */
    where: PaintingWhereUniqueInput
  }

  /**
   * Painting updateMany
   */
  export type PaintingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Paintings.
     */
    data: XOR<PaintingUpdateManyMutationInput, PaintingUncheckedUpdateManyInput>
    /**
     * Filter which Paintings to update
     */
    where?: PaintingWhereInput
    /**
     * Limit how many Paintings to update.
     */
    limit?: number
  }

  /**
   * Painting upsert
   */
  export type PaintingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * The filter to search for the Painting to update in case it exists.
     */
    where: PaintingWhereUniqueInput
    /**
     * In case the Painting found by the `where` argument doesn't exist, create a new Painting with this data.
     */
    create: XOR<PaintingCreateInput, PaintingUncheckedCreateInput>
    /**
     * In case the Painting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaintingUpdateInput, PaintingUncheckedUpdateInput>
  }

  /**
   * Painting delete
   */
  export type PaintingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
    /**
     * Filter which Painting to delete.
     */
    where: PaintingWhereUniqueInput
  }

  /**
   * Painting deleteMany
   */
  export type PaintingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Paintings to delete
     */
    where?: PaintingWhereInput
    /**
     * Limit how many Paintings to delete.
     */
    limit?: number
  }

  /**
   * Painting findRaw
   */
  export type PaintingFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Painting aggregateRaw
   */
  export type PaintingAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Painting without action
   */
  export type PaintingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Painting
     */
    select?: PaintingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Painting
     */
    omit?: PaintingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaintingInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    url: string | null
    logoUrl: string | null
    userId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    url: string | null
    logoUrl: string | null
    userId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    content: number
    url: number
    logoUrl: number
    userId: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    logoUrl?: true
    userId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    logoUrl?: true
    userId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    logoUrl?: true
    userId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    content: string
    url: string
    logoUrl: string | null
    userId: string
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    logoUrl?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>



  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    logoUrl?: boolean
    userId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "url" | "logoUrl" | "userId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      url: string
      logoUrl: string | null
      userId: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * @param {ProjectFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const project = await prisma.project.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ProjectFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Project.
     * @param {ProjectAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const project = await prisma.project.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ProjectAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly content: FieldRef<"Project", 'String'>
    readonly url: FieldRef<"Project", 'String'>
    readonly logoUrl: FieldRef<"Project", 'String'>
    readonly userId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project findRaw
   */
  export type ProjectFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Project aggregateRaw
   */
  export type ProjectAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    url: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    url: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    title: number
    content: number
    url: number
    createdAt: number
    userId: number
    _all: number
  }


  export type PortfolioMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    createdAt?: true
    userId?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    createdAt?: true
    userId?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    title: string
    content: string
    url: string
    createdAt: Date
    userId: string
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>



  export type PortfolioSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type PortfolioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "url" | "createdAt" | "userId", ExtArgs["result"]["portfolio"]>
  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      url: string
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portfolios that matches the filter.
     * @param {PortfolioFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const portfolio = await prisma.portfolio.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PortfolioFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Portfolio.
     * @param {PortfolioAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const portfolio = await prisma.portfolio.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PortfolioAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio model
   */
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly title: FieldRef<"Portfolio", 'String'>
    readonly content: FieldRef<"Portfolio", 'String'>
    readonly url: FieldRef<"Portfolio", 'String'>
    readonly createdAt: FieldRef<"Portfolio", 'DateTime'>
    readonly userId: FieldRef<"Portfolio", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to delete.
     */
    limit?: number
  }

  /**
   * Portfolio findRaw
   */
  export type PortfolioFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Portfolio aggregateRaw
   */
  export type PortfolioAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    content: number
    createdAt: number
    userId: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    userId?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    userId?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    content: string
    createdAt: Date
    userId: string
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>



  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "createdAt" | "userId", ExtArgs["result"]["article"]>
  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * @param {ArticleFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const article = await prisma.article.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ArticleFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Article.
     * @param {ArticleAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const article = await prisma.article.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ArticleAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly content: FieldRef<"Article", 'String'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly userId: FieldRef<"Article", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article findRaw
   */
  export type ArticleFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Article aggregateRaw
   */
  export type ArticleAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>



  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * @param {PasswordResetTokenFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const passwordResetToken = await prisma.passwordResetToken.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PasswordResetTokenFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a PasswordResetToken.
     * @param {PasswordResetTokenAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const passwordResetToken = await prisma.passwordResetToken.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PasswordResetTokenAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken findRaw
   */
  export type PasswordResetTokenFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PasswordResetToken aggregateRaw
   */
  export type PasswordResetTokenAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    gender: 'gender'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserDetailsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    bio: 'bio',
    phone: 'phone',
    imageUrl: 'imageUrl'
  };

  export type UserDetailsScalarFieldEnum = (typeof UserDetailsScalarFieldEnum)[keyof typeof UserDetailsScalarFieldEnum]


  export const PaintingScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    userDetailsId: 'userDetailsId'
  };

  export type PaintingScalarFieldEnum = (typeof PaintingScalarFieldEnum)[keyof typeof PaintingScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    url: 'url',
    logoUrl: 'logoUrl',
    userId: 'userId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    url: 'url',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    gender?: StringFilter<"User"> | string
    portfolios?: PortfolioListRelationFilter
    details?: XOR<UserDetailsNullableScalarRelationFilter, UserDetailsWhereInput> | null
    articles?: ArticleListRelationFilter
    passwordResetTokens?: PasswordResetTokenListRelationFilter
    Project?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    portfolios?: PortfolioOrderByRelationAggregateInput
    details?: UserDetailsOrderByWithRelationInput
    articles?: ArticleOrderByRelationAggregateInput
    passwordResetTokens?: PasswordResetTokenOrderByRelationAggregateInput
    Project?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    gender?: StringFilter<"User"> | string
    portfolios?: PortfolioListRelationFilter
    details?: XOR<UserDetailsNullableScalarRelationFilter, UserDetailsWhereInput> | null
    articles?: ArticleListRelationFilter
    passwordResetTokens?: PasswordResetTokenListRelationFilter
    Project?: ProjectListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: StringWithAggregatesFilter<"User"> | string
  }

  export type UserDetailsWhereInput = {
    AND?: UserDetailsWhereInput | UserDetailsWhereInput[]
    OR?: UserDetailsWhereInput[]
    NOT?: UserDetailsWhereInput | UserDetailsWhereInput[]
    id?: StringFilter<"UserDetails"> | string
    userId?: StringFilter<"UserDetails"> | string
    firstName?: StringFilter<"UserDetails"> | string
    lastName?: StringFilter<"UserDetails"> | string
    bio?: StringNullableFilter<"UserDetails"> | string | null
    phone?: StringNullableFilter<"UserDetails"> | string | null
    imageUrl?: StringNullableFilter<"UserDetails"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    paintings?: PaintingListRelationFilter
  }

  export type UserDetailsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    imageUrl?: SortOrder
    user?: UserOrderByWithRelationInput
    paintings?: PaintingOrderByRelationAggregateInput
  }

  export type UserDetailsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserDetailsWhereInput | UserDetailsWhereInput[]
    OR?: UserDetailsWhereInput[]
    NOT?: UserDetailsWhereInput | UserDetailsWhereInput[]
    firstName?: StringFilter<"UserDetails"> | string
    lastName?: StringFilter<"UserDetails"> | string
    bio?: StringNullableFilter<"UserDetails"> | string | null
    phone?: StringNullableFilter<"UserDetails"> | string | null
    imageUrl?: StringNullableFilter<"UserDetails"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    paintings?: PaintingListRelationFilter
  }, "id" | "userId">

  export type UserDetailsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    imageUrl?: SortOrder
    _count?: UserDetailsCountOrderByAggregateInput
    _max?: UserDetailsMaxOrderByAggregateInput
    _min?: UserDetailsMinOrderByAggregateInput
  }

  export type UserDetailsScalarWhereWithAggregatesInput = {
    AND?: UserDetailsScalarWhereWithAggregatesInput | UserDetailsScalarWhereWithAggregatesInput[]
    OR?: UserDetailsScalarWhereWithAggregatesInput[]
    NOT?: UserDetailsScalarWhereWithAggregatesInput | UserDetailsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserDetails"> | string
    userId?: StringWithAggregatesFilter<"UserDetails"> | string
    firstName?: StringWithAggregatesFilter<"UserDetails"> | string
    lastName?: StringWithAggregatesFilter<"UserDetails"> | string
    bio?: StringNullableWithAggregatesFilter<"UserDetails"> | string | null
    phone?: StringNullableWithAggregatesFilter<"UserDetails"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"UserDetails"> | string | null
  }

  export type PaintingWhereInput = {
    AND?: PaintingWhereInput | PaintingWhereInput[]
    OR?: PaintingWhereInput[]
    NOT?: PaintingWhereInput | PaintingWhereInput[]
    id?: StringFilter<"Painting"> | string
    title?: StringFilter<"Painting"> | string
    content?: StringFilter<"Painting"> | string
    userDetailsId?: StringFilter<"Painting"> | string
    userDetails?: XOR<UserDetailsScalarRelationFilter, UserDetailsWhereInput>
  }

  export type PaintingOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    userDetailsId?: SortOrder
    userDetails?: UserDetailsOrderByWithRelationInput
  }

  export type PaintingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaintingWhereInput | PaintingWhereInput[]
    OR?: PaintingWhereInput[]
    NOT?: PaintingWhereInput | PaintingWhereInput[]
    title?: StringFilter<"Painting"> | string
    content?: StringFilter<"Painting"> | string
    userDetailsId?: StringFilter<"Painting"> | string
    userDetails?: XOR<UserDetailsScalarRelationFilter, UserDetailsWhereInput>
  }, "id">

  export type PaintingOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    userDetailsId?: SortOrder
    _count?: PaintingCountOrderByAggregateInput
    _max?: PaintingMaxOrderByAggregateInput
    _min?: PaintingMinOrderByAggregateInput
  }

  export type PaintingScalarWhereWithAggregatesInput = {
    AND?: PaintingScalarWhereWithAggregatesInput | PaintingScalarWhereWithAggregatesInput[]
    OR?: PaintingScalarWhereWithAggregatesInput[]
    NOT?: PaintingScalarWhereWithAggregatesInput | PaintingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Painting"> | string
    title?: StringWithAggregatesFilter<"Painting"> | string
    content?: StringWithAggregatesFilter<"Painting"> | string
    userDetailsId?: StringWithAggregatesFilter<"Painting"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    content?: StringFilter<"Project"> | string
    url?: StringFilter<"Project"> | string
    logoUrl?: StringNullableFilter<"Project"> | string | null
    userId?: StringFilter<"Project"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    content?: StringFilter<"Project"> | string
    url?: StringFilter<"Project"> | string
    logoUrl?: StringNullableFilter<"Project"> | string | null
    userId?: StringFilter<"Project"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    userId?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    content?: StringWithAggregatesFilter<"Project"> | string
    url?: StringWithAggregatesFilter<"Project"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    userId?: StringWithAggregatesFilter<"Project"> | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    content?: StringFilter<"Portfolio"> | string
    url?: StringFilter<"Portfolio"> | string
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    userId?: StringFilter<"Portfolio"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    title?: StringFilter<"Portfolio"> | string
    content?: StringFilter<"Portfolio"> | string
    url?: StringFilter<"Portfolio"> | string
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    userId?: StringFilter<"Portfolio"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Portfolio"> | string
    title?: StringWithAggregatesFilter<"Portfolio"> | string
    content?: StringWithAggregatesFilter<"Portfolio"> | string
    url?: StringWithAggregatesFilter<"Portfolio"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
    userId?: StringWithAggregatesFilter<"Portfolio"> | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    userId?: StringFilter<"Article"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    userId?: StringFilter<"Article"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    content?: StringWithAggregatesFilter<"Article"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    userId?: StringWithAggregatesFilter<"Article"> | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    details?: UserDetailsCreateNestedOneWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    Project?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    details?: UserDetailsUncheckedCreateNestedOneWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    Project?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    details?: UserDetailsUpdateOneWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    Project?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    details?: UserDetailsUncheckedUpdateOneWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
  }

  export type UserDetailsCreateInput = {
    id?: string
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    imageUrl?: string | null
    user: UserCreateNestedOneWithoutDetailsInput
    paintings?: PaintingCreateNestedManyWithoutUserDetailsInput
  }

  export type UserDetailsUncheckedCreateInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    imageUrl?: string | null
    paintings?: PaintingUncheckedCreateNestedManyWithoutUserDetailsInput
  }

  export type UserDetailsUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDetailsNestedInput
    paintings?: PaintingUpdateManyWithoutUserDetailsNestedInput
  }

  export type UserDetailsUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paintings?: PaintingUncheckedUpdateManyWithoutUserDetailsNestedInput
  }

  export type UserDetailsCreateManyInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    imageUrl?: string | null
  }

  export type UserDetailsUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserDetailsUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaintingCreateInput = {
    id?: string
    title: string
    content: string
    userDetails: UserDetailsCreateNestedOneWithoutPaintingsInput
  }

  export type PaintingUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    userDetailsId: string
  }

  export type PaintingUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userDetails?: UserDetailsUpdateOneRequiredWithoutPaintingsNestedInput
  }

  export type PaintingUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userDetailsId?: StringFieldUpdateOperationsInput | string
  }

  export type PaintingCreateManyInput = {
    id?: string
    title: string
    content: string
    userDetailsId: string
  }

  export type PaintingUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PaintingUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userDetailsId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    content: string
    url: string
    logoUrl?: string | null
    user: UserCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    url: string
    logoUrl?: string | null
    userId: string
  }

  export type ProjectUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    content: string
    url: string
    logoUrl?: string | null
    userId: string
  }

  export type ProjectUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PortfolioCreateInput = {
    id?: string
    title: string
    content: string
    url: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPortfoliosInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    url: string
    createdAt?: Date | string
    userId: string
  }

  export type PortfolioUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPortfoliosNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PortfolioCreateManyInput = {
    id?: string
    title: string
    content: string
    url: string
    createdAt?: Date | string
    userId: string
  }

  export type PortfolioUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutArticlesInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    userId: string
  }

  export type ArticleUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleCreateManyInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    userId: string
  }

  export type ArticleUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetTokensInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type UserDetailsNullableScalarRelationFilter = {
    is?: UserDetailsWhereInput | null
    isNot?: UserDetailsWhereInput | null
  }

  export type ArticleListRelationFilter = {
    every?: ArticleWhereInput
    some?: ArticleWhereInput
    none?: ArticleWhereInput
  }

  export type PasswordResetTokenListRelationFilter = {
    every?: PasswordResetTokenWhereInput
    some?: PasswordResetTokenWhereInput
    none?: PasswordResetTokenWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PaintingListRelationFilter = {
    every?: PaintingWhereInput
    some?: PaintingWhereInput
    none?: PaintingWhereInput
  }

  export type PaintingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserDetailsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    imageUrl?: SortOrder
  }

  export type UserDetailsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    imageUrl?: SortOrder
  }

  export type UserDetailsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    imageUrl?: SortOrder
  }

  export type UserDetailsScalarRelationFilter = {
    is?: UserDetailsWhereInput
    isNot?: UserDetailsWhereInput
  }

  export type PaintingCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    userDetailsId?: SortOrder
  }

  export type PaintingMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    userDetailsId?: SortOrder
  }

  export type PaintingMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    userDetailsId?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioCreateNestedManyWithoutUserInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type UserDetailsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserDetailsCreateWithoutUserInput, UserDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserDetailsCreateOrConnectWithoutUserInput
    connect?: UserDetailsWhereUniqueInput
  }

  export type ArticleCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleCreateWithoutUserInput, ArticleUncheckedCreateWithoutUserInput> | ArticleCreateWithoutUserInput[] | ArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutUserInput | ArticleCreateOrConnectWithoutUserInput[]
    createMany?: ArticleCreateManyUserInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type PasswordResetTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type UserDetailsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserDetailsCreateWithoutUserInput, UserDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserDetailsCreateOrConnectWithoutUserInput
    connect?: UserDetailsWhereUniqueInput
  }

  export type ArticleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleCreateWithoutUserInput, ArticleUncheckedCreateWithoutUserInput> | ArticleCreateWithoutUserInput[] | ArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutUserInput | ArticleCreateOrConnectWithoutUserInput[]
    createMany?: ArticleCreateManyUserInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type PortfolioUpdateManyWithoutUserNestedInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutUserInput | PortfolioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutUserInput | PortfolioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutUserInput | PortfolioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type UserDetailsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserDetailsCreateWithoutUserInput, UserDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserDetailsCreateOrConnectWithoutUserInput
    upsert?: UserDetailsUpsertWithoutUserInput
    disconnect?: UserDetailsWhereInput | boolean
    delete?: UserDetailsWhereInput | boolean
    connect?: UserDetailsWhereUniqueInput
    update?: XOR<XOR<UserDetailsUpdateToOneWithWhereWithoutUserInput, UserDetailsUpdateWithoutUserInput>, UserDetailsUncheckedUpdateWithoutUserInput>
  }

  export type ArticleUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleCreateWithoutUserInput, ArticleUncheckedCreateWithoutUserInput> | ArticleCreateWithoutUserInput[] | ArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutUserInput | ArticleCreateOrConnectWithoutUserInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutUserInput | ArticleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleCreateManyUserInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutUserInput | ArticleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutUserInput | ArticleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type PasswordResetTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutUserInput | PortfolioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutUserInput | PortfolioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutUserInput | PortfolioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type UserDetailsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserDetailsCreateWithoutUserInput, UserDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserDetailsCreateOrConnectWithoutUserInput
    upsert?: UserDetailsUpsertWithoutUserInput
    disconnect?: UserDetailsWhereInput | boolean
    delete?: UserDetailsWhereInput | boolean
    connect?: UserDetailsWhereUniqueInput
    update?: XOR<XOR<UserDetailsUpdateToOneWithWhereWithoutUserInput, UserDetailsUpdateWithoutUserInput>, UserDetailsUncheckedUpdateWithoutUserInput>
  }

  export type ArticleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleCreateWithoutUserInput, ArticleUncheckedCreateWithoutUserInput> | ArticleCreateWithoutUserInput[] | ArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutUserInput | ArticleCreateOrConnectWithoutUserInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutUserInput | ArticleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleCreateManyUserInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutUserInput | ArticleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutUserInput | ArticleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDetailsInput = {
    create?: XOR<UserCreateWithoutDetailsInput, UserUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDetailsInput
    connect?: UserWhereUniqueInput
  }

  export type PaintingCreateNestedManyWithoutUserDetailsInput = {
    create?: XOR<PaintingCreateWithoutUserDetailsInput, PaintingUncheckedCreateWithoutUserDetailsInput> | PaintingCreateWithoutUserDetailsInput[] | PaintingUncheckedCreateWithoutUserDetailsInput[]
    connectOrCreate?: PaintingCreateOrConnectWithoutUserDetailsInput | PaintingCreateOrConnectWithoutUserDetailsInput[]
    createMany?: PaintingCreateManyUserDetailsInputEnvelope
    connect?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
  }

  export type PaintingUncheckedCreateNestedManyWithoutUserDetailsInput = {
    create?: XOR<PaintingCreateWithoutUserDetailsInput, PaintingUncheckedCreateWithoutUserDetailsInput> | PaintingCreateWithoutUserDetailsInput[] | PaintingUncheckedCreateWithoutUserDetailsInput[]
    connectOrCreate?: PaintingCreateOrConnectWithoutUserDetailsInput | PaintingCreateOrConnectWithoutUserDetailsInput[]
    createMany?: PaintingCreateManyUserDetailsInputEnvelope
    connect?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDetailsNestedInput = {
    create?: XOR<UserCreateWithoutDetailsInput, UserUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDetailsInput
    upsert?: UserUpsertWithoutDetailsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDetailsInput, UserUpdateWithoutDetailsInput>, UserUncheckedUpdateWithoutDetailsInput>
  }

  export type PaintingUpdateManyWithoutUserDetailsNestedInput = {
    create?: XOR<PaintingCreateWithoutUserDetailsInput, PaintingUncheckedCreateWithoutUserDetailsInput> | PaintingCreateWithoutUserDetailsInput[] | PaintingUncheckedCreateWithoutUserDetailsInput[]
    connectOrCreate?: PaintingCreateOrConnectWithoutUserDetailsInput | PaintingCreateOrConnectWithoutUserDetailsInput[]
    upsert?: PaintingUpsertWithWhereUniqueWithoutUserDetailsInput | PaintingUpsertWithWhereUniqueWithoutUserDetailsInput[]
    createMany?: PaintingCreateManyUserDetailsInputEnvelope
    set?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    disconnect?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    delete?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    connect?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    update?: PaintingUpdateWithWhereUniqueWithoutUserDetailsInput | PaintingUpdateWithWhereUniqueWithoutUserDetailsInput[]
    updateMany?: PaintingUpdateManyWithWhereWithoutUserDetailsInput | PaintingUpdateManyWithWhereWithoutUserDetailsInput[]
    deleteMany?: PaintingScalarWhereInput | PaintingScalarWhereInput[]
  }

  export type PaintingUncheckedUpdateManyWithoutUserDetailsNestedInput = {
    create?: XOR<PaintingCreateWithoutUserDetailsInput, PaintingUncheckedCreateWithoutUserDetailsInput> | PaintingCreateWithoutUserDetailsInput[] | PaintingUncheckedCreateWithoutUserDetailsInput[]
    connectOrCreate?: PaintingCreateOrConnectWithoutUserDetailsInput | PaintingCreateOrConnectWithoutUserDetailsInput[]
    upsert?: PaintingUpsertWithWhereUniqueWithoutUserDetailsInput | PaintingUpsertWithWhereUniqueWithoutUserDetailsInput[]
    createMany?: PaintingCreateManyUserDetailsInputEnvelope
    set?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    disconnect?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    delete?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    connect?: PaintingWhereUniqueInput | PaintingWhereUniqueInput[]
    update?: PaintingUpdateWithWhereUniqueWithoutUserDetailsInput | PaintingUpdateWithWhereUniqueWithoutUserDetailsInput[]
    updateMany?: PaintingUpdateManyWithWhereWithoutUserDetailsInput | PaintingUpdateManyWithWhereWithoutUserDetailsInput[]
    deleteMany?: PaintingScalarWhereInput | PaintingScalarWhereInput[]
  }

  export type UserDetailsCreateNestedOneWithoutPaintingsInput = {
    create?: XOR<UserDetailsCreateWithoutPaintingsInput, UserDetailsUncheckedCreateWithoutPaintingsInput>
    connectOrCreate?: UserDetailsCreateOrConnectWithoutPaintingsInput
    connect?: UserDetailsWhereUniqueInput
  }

  export type UserDetailsUpdateOneRequiredWithoutPaintingsNestedInput = {
    create?: XOR<UserDetailsCreateWithoutPaintingsInput, UserDetailsUncheckedCreateWithoutPaintingsInput>
    connectOrCreate?: UserDetailsCreateOrConnectWithoutPaintingsInput
    upsert?: UserDetailsUpsertWithoutPaintingsInput
    connect?: UserDetailsWhereUniqueInput
    update?: XOR<XOR<UserDetailsUpdateToOneWithWhereWithoutPaintingsInput, UserDetailsUpdateWithoutPaintingsInput>, UserDetailsUncheckedUpdateWithoutPaintingsInput>
  }

  export type UserCreateNestedOneWithoutProjectInput = {
    create?: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProjectNestedInput = {
    create?: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInput
    upsert?: UserUpsertWithoutProjectInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectInput, UserUpdateWithoutProjectInput>, UserUncheckedUpdateWithoutProjectInput>
  }

  export type UserCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfoliosInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutPortfoliosNestedInput = {
    create?: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfoliosInput
    upsert?: UserUpsertWithoutPortfoliosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPortfoliosInput, UserUpdateWithoutPortfoliosInput>, UserUncheckedUpdateWithoutPortfoliosInput>
  }

  export type UserCreateNestedOneWithoutArticlesInput = {
    create?: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
    upsert?: UserUpsertWithoutArticlesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArticlesInput, UserUpdateWithoutArticlesInput>, UserUncheckedUpdateWithoutArticlesInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    upsert?: UserUpsertWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, UserUpdateWithoutPasswordResetTokensInput>, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PortfolioCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    url: string
    createdAt?: Date | string
  }

  export type PortfolioUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    url: string
    createdAt?: Date | string
  }

  export type PortfolioCreateOrConnectWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput>
  }

  export type PortfolioCreateManyUserInputEnvelope = {
    data: PortfolioCreateManyUserInput | PortfolioCreateManyUserInput[]
  }

  export type UserDetailsCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    imageUrl?: string | null
    paintings?: PaintingCreateNestedManyWithoutUserDetailsInput
  }

  export type UserDetailsUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    imageUrl?: string | null
    paintings?: PaintingUncheckedCreateNestedManyWithoutUserDetailsInput
  }

  export type UserDetailsCreateOrConnectWithoutUserInput = {
    where: UserDetailsWhereUniqueInput
    create: XOR<UserDetailsCreateWithoutUserInput, UserDetailsUncheckedCreateWithoutUserInput>
  }

  export type ArticleCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
  }

  export type ArticleUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
  }

  export type ArticleCreateOrConnectWithoutUserInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutUserInput, ArticleUncheckedCreateWithoutUserInput>
  }

  export type ArticleCreateManyUserInputEnvelope = {
    data: ArticleCreateManyUserInput | ArticleCreateManyUserInput[]
  }

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenCreateManyUserInputEnvelope = {
    data: PasswordResetTokenCreateManyUserInput | PasswordResetTokenCreateManyUserInput[]
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    url: string
    logoUrl?: string | null
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    url: string
    logoUrl?: string | null
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
  }

  export type PortfolioUpsertWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutUserInput, PortfolioUncheckedUpdateWithoutUserInput>
    create: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutUserInput, PortfolioUncheckedUpdateWithoutUserInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutUserInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutUserInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    content?: StringFilter<"Portfolio"> | string
    url?: StringFilter<"Portfolio"> | string
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    userId?: StringFilter<"Portfolio"> | string
  }

  export type UserDetailsUpsertWithoutUserInput = {
    update: XOR<UserDetailsUpdateWithoutUserInput, UserDetailsUncheckedUpdateWithoutUserInput>
    create: XOR<UserDetailsCreateWithoutUserInput, UserDetailsUncheckedCreateWithoutUserInput>
    where?: UserDetailsWhereInput
  }

  export type UserDetailsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserDetailsWhereInput
    data: XOR<UserDetailsUpdateWithoutUserInput, UserDetailsUncheckedUpdateWithoutUserInput>
  }

  export type UserDetailsUpdateWithoutUserInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paintings?: PaintingUpdateManyWithoutUserDetailsNestedInput
  }

  export type UserDetailsUncheckedUpdateWithoutUserInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paintings?: PaintingUncheckedUpdateManyWithoutUserDetailsNestedInput
  }

  export type ArticleUpsertWithWhereUniqueWithoutUserInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutUserInput, ArticleUncheckedUpdateWithoutUserInput>
    create: XOR<ArticleCreateWithoutUserInput, ArticleUncheckedCreateWithoutUserInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutUserInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutUserInput, ArticleUncheckedUpdateWithoutUserInput>
  }

  export type ArticleUpdateManyWithWhereWithoutUserInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutUserInput>
  }

  export type ArticleScalarWhereInput = {
    AND?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    OR?: ArticleScalarWhereInput[]
    NOT?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    userId?: StringFilter<"Article"> | string
  }

  export type PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetTokenScalarWhereInput
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetTokenScalarWhereInput = {
    AND?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    OR?: PasswordResetTokenScalarWhereInput[]
    NOT?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    content?: StringFilter<"Project"> | string
    url?: StringFilter<"Project"> | string
    logoUrl?: StringNullableFilter<"Project"> | string | null
    userId?: StringFilter<"Project"> | string
  }

  export type UserCreateWithoutDetailsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    Project?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDetailsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    Project?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDetailsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDetailsInput, UserUncheckedCreateWithoutDetailsInput>
  }

  export type PaintingCreateWithoutUserDetailsInput = {
    id?: string
    title: string
    content: string
  }

  export type PaintingUncheckedCreateWithoutUserDetailsInput = {
    id?: string
    title: string
    content: string
  }

  export type PaintingCreateOrConnectWithoutUserDetailsInput = {
    where: PaintingWhereUniqueInput
    create: XOR<PaintingCreateWithoutUserDetailsInput, PaintingUncheckedCreateWithoutUserDetailsInput>
  }

  export type PaintingCreateManyUserDetailsInputEnvelope = {
    data: PaintingCreateManyUserDetailsInput | PaintingCreateManyUserDetailsInput[]
  }

  export type UserUpsertWithoutDetailsInput = {
    update: XOR<UserUpdateWithoutDetailsInput, UserUncheckedUpdateWithoutDetailsInput>
    create: XOR<UserCreateWithoutDetailsInput, UserUncheckedCreateWithoutDetailsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDetailsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDetailsInput, UserUncheckedUpdateWithoutDetailsInput>
  }

  export type UserUpdateWithoutDetailsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    Project?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDetailsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PaintingUpsertWithWhereUniqueWithoutUserDetailsInput = {
    where: PaintingWhereUniqueInput
    update: XOR<PaintingUpdateWithoutUserDetailsInput, PaintingUncheckedUpdateWithoutUserDetailsInput>
    create: XOR<PaintingCreateWithoutUserDetailsInput, PaintingUncheckedCreateWithoutUserDetailsInput>
  }

  export type PaintingUpdateWithWhereUniqueWithoutUserDetailsInput = {
    where: PaintingWhereUniqueInput
    data: XOR<PaintingUpdateWithoutUserDetailsInput, PaintingUncheckedUpdateWithoutUserDetailsInput>
  }

  export type PaintingUpdateManyWithWhereWithoutUserDetailsInput = {
    where: PaintingScalarWhereInput
    data: XOR<PaintingUpdateManyMutationInput, PaintingUncheckedUpdateManyWithoutUserDetailsInput>
  }

  export type PaintingScalarWhereInput = {
    AND?: PaintingScalarWhereInput | PaintingScalarWhereInput[]
    OR?: PaintingScalarWhereInput[]
    NOT?: PaintingScalarWhereInput | PaintingScalarWhereInput[]
    id?: StringFilter<"Painting"> | string
    title?: StringFilter<"Painting"> | string
    content?: StringFilter<"Painting"> | string
    userDetailsId?: StringFilter<"Painting"> | string
  }

  export type UserDetailsCreateWithoutPaintingsInput = {
    id?: string
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    imageUrl?: string | null
    user: UserCreateNestedOneWithoutDetailsInput
  }

  export type UserDetailsUncheckedCreateWithoutPaintingsInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    imageUrl?: string | null
  }

  export type UserDetailsCreateOrConnectWithoutPaintingsInput = {
    where: UserDetailsWhereUniqueInput
    create: XOR<UserDetailsCreateWithoutPaintingsInput, UserDetailsUncheckedCreateWithoutPaintingsInput>
  }

  export type UserDetailsUpsertWithoutPaintingsInput = {
    update: XOR<UserDetailsUpdateWithoutPaintingsInput, UserDetailsUncheckedUpdateWithoutPaintingsInput>
    create: XOR<UserDetailsCreateWithoutPaintingsInput, UserDetailsUncheckedCreateWithoutPaintingsInput>
    where?: UserDetailsWhereInput
  }

  export type UserDetailsUpdateToOneWithWhereWithoutPaintingsInput = {
    where?: UserDetailsWhereInput
    data: XOR<UserDetailsUpdateWithoutPaintingsInput, UserDetailsUncheckedUpdateWithoutPaintingsInput>
  }

  export type UserDetailsUpdateWithoutPaintingsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDetailsNestedInput
  }

  export type UserDetailsUncheckedUpdateWithoutPaintingsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutProjectInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    details?: UserDetailsCreateNestedOneWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    details?: UserDetailsUncheckedCreateNestedOneWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
  }

  export type UserUpsertWithoutProjectInput = {
    update: XOR<UserUpdateWithoutProjectInput, UserUncheckedUpdateWithoutProjectInput>
    create: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectInput, UserUncheckedUpdateWithoutProjectInput>
  }

  export type UserUpdateWithoutProjectInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    details?: UserDetailsUpdateOneWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    details?: UserDetailsUncheckedUpdateOneWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPortfoliosInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    details?: UserDetailsCreateNestedOneWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    Project?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    details?: UserDetailsUncheckedCreateNestedOneWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    Project?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPortfoliosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
  }

  export type UserUpsertWithoutPortfoliosInput = {
    update: XOR<UserUpdateWithoutPortfoliosInput, UserUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<UserCreateWithoutPortfoliosInput, UserUncheckedCreateWithoutPortfoliosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPortfoliosInput, UserUncheckedUpdateWithoutPortfoliosInput>
  }

  export type UserUpdateWithoutPortfoliosInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    details?: UserDetailsUpdateOneWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    Project?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPortfoliosInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    details?: UserDetailsUncheckedUpdateOneWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutArticlesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    details?: UserDetailsCreateNestedOneWithoutUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    Project?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArticlesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    details?: UserDetailsUncheckedCreateNestedOneWithoutUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    Project?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArticlesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
  }

  export type UserUpsertWithoutArticlesInput = {
    update: XOR<UserUpdateWithoutArticlesInput, UserUncheckedUpdateWithoutArticlesInput>
    create: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArticlesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArticlesInput, UserUncheckedUpdateWithoutArticlesInput>
  }

  export type UserUpdateWithoutArticlesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    details?: UserDetailsUpdateOneWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    Project?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArticlesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    details?: UserDetailsUncheckedUpdateOneWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPasswordResetTokensInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioCreateNestedManyWithoutUserInput
    details?: UserDetailsCreateNestedOneWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutUserInput
    Project?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    gender?: string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    details?: UserDetailsUncheckedCreateNestedOneWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutUserInput
    Project?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
  }

  export type UserUpsertWithoutPasswordResetTokensInput = {
    update: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type UserUpdateWithoutPasswordResetTokensInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput
    details?: UserDetailsUpdateOneWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutUserNestedInput
    Project?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    details?: UserDetailsUncheckedUpdateOneWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutUserNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PortfolioCreateManyUserInput = {
    id?: string
    title: string
    content: string
    url: string
    createdAt?: Date | string
  }

  export type ArticleCreateManyUserInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    title: string
    content: string
    url: string
    logoUrl?: string | null
  }

  export type PortfolioUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaintingCreateManyUserDetailsInput = {
    id?: string
    title: string
    content: string
  }

  export type PaintingUpdateWithoutUserDetailsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PaintingUncheckedUpdateWithoutUserDetailsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PaintingUncheckedUpdateManyWithoutUserDetailsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}