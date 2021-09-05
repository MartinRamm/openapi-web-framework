# OpenAPI Web Framework (OWF)
OWF is an opinionated web framework based on `Typescript` and `OpenAPI` (formally known as `Swagger`). It allows you to
focus on *what data* you want to deliver in your web interface, not *how* (formatting of the data, character encoding,
etc.).

## Status of this project
This project is currently being developed by the author. **No suitable, working version or stable SDKs are available**
yet!!

## Philosophy
While web frameworks are usually highly flexible and unopiniated, this one isn't. If you share the following beliefs of
the author, this framework is for you:
* API documentation, schemas, etc. should be generated from code, not maintained in a separate file.
* The [OpenAPI Specification](https://swagger.io/specification/) is a good format to do this in.
* The requests and responses delivered from an API should be fully typed. This includes errors.
* The API should be flexible in the data-formats it supports (JSON, XML, YAML, FORMDATA, PROTOBUF, etc.). The consumer
  of the API should specify what formats it wants. The framework should handle this.
* Data input should be validated by the framework against the specification.
* The representation of the data in the runtime environment (character encoding, number precision, etc.) must be taken
  into account by the framework during parsing/serialization operations.

## Idea
This formats and SDKs are still being actively developed and will likely change before the first release!!

Firstly, you define a schema of a model:
```ts
import {types} from 'owf/models';

export const person = types.object.typed({
  id: types.string.uuid.withMetadata({
      readonly: true, //as defined in swagger: https://swagger.io/docs/specification/data-models/data-types/#readonly-writeonly
      xmlAttribute: true //as defined in swagger: https://swagger.io/docs/specification/data-models/representing-xml/
  }),
  name: types.string.any,
  dob: types.string.date
}).withMetadata({xmlName: 'person'}); //as defined in swagger: https://swagger.io/docs/specification/data-models/representing-xml/
```

Now, add a request handler:
```ts
import {owf, route, RequestDataStore, RequestHandler} from 'owf';
import {types, SchemaToWriteonly} from 'owf/models';
import {authMiddleware} from './authMiddleware';

const error = types.object.typed({
  code: types.number.integer,
  message: types.string.any,
}).withMetadata({xmlName: 'error'});

const authMiddleware = <S extends RequestDataStore>(req: Request, reqDataStore: S) => {
  const apiKey = req.headders["X-Auth"];
  if (typeof apiKey !== string) {
    return error.response(401, {code: 401, message: "X-Auth header missing"}); //returning a response causes the RequestHandler to not be called.
  }
  const user = authenticateUser(apiKey);
  if (!user) {
    return error.response(401, {code: 401, message: "Invalid X-Auth header"});
  }
  return requestDataStore.append({user: user}); //this is then available to all RequestHandlers (including in the typescript type!)
}

const server = owf({
  port: 1337,
  routes: {
    '/api': {
      middlewares: {
        before: [authMiddleware]
      },
      [`/person/${route.pathParam('personId', types.string.uuid)}`]: {
        get: {
          handler: (req, reqDataStore) => {
            console.log(req.path); // "/api/person/123e4567-e89b-12d3-a456-426614174000"
            const id = req.pathParam.personId; //this is typed to be a string, and when reaching here it has already been verified to be a uuid
            if (!reqDataStore.user.allowedToAccess('person', personId)) { //user is typed to be a user
              return error.resposne(403, {code: 403, message: 'You are not allowed to access this resource.'});
            }
            const person: SchemaToWriteonly<typeof person> //you can convert the schema to a typescript type like this
              = getPerson(id);
            if (person === null) {
              return error.resposne(404, {code: 404, message: `Person with ID "${id} not found.`})
            }
            return person.response(200, person); //typescript checks here that person matches the defined schema
          }
        }
      }
    }
  }
});
```

The framework will take care of serializing the given `person` object (or `error` ) to the content type the client
requested (see [Response Content Format](#Response-Content-Format).

Furthermore, the framework may decide to return the following responses:
* 404 if the route is not found in the config.
* 405 if the route can be mapped, but not to a specific method handler.
* 400 if parsing the pathParams or body fails.
* 406 if the media type specified in the `Accept` request header is not supported (including invalid encodings).
* 415 if the media type specified in the `Content-Type` request header is not supported.
* 500 if an error is thrown by the handler.

## Response Content Format
The incoming request can decide how the response should be formatted, via the `Accept` header:

### Request Header: Accept
Format: `<Media-Type>[;charset=<Encoding>][;disposition=<Disposition>][;q=<Number>][, <Accept>]`.
Optional parts of the header are marked in `[<Optional>]`.

`<Media-Type>` can be a:
* Media Type from the table below (e.g.: `text/plain`)
* `<Media-Type-Prefix>/*` like `text/*`
* `*/*` for any media type (let the server decide)

`<Encoding>` can be an encoding from the table below.

`<Disposition>` can be `inline` or `attachment` and will override the
[`Content-Disposition` response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition)
on the table below.

`<Number>` A number between 0 and 1 (with up to 3 decimal points) as per
[HTTP standard](https://developer.mozilla.org/en-US/docs/Glossary/Quality_values). If this is not present, it is assumed
to be `1`.

`<Accept>` another description as defined above. Basically, the header can be a comma separated list of entries.
If two entries have the same `q` values (explicit or implicitly), the leftmost takes presidence.

### Supported MIME Types, default encoding, default disposition

⬤ = Default; ○ = Supported; ✕ not supported (will result in a 406/415 response)

| Name          | Media Type                                                               | Disposition | File Extension | utf-8 | utf-16le | ascii | ucs2 | latin1 | base64 | binary | hex |
|---------------|--------------------------------------------------------------------------|-------------|----------------|-------|----------|-------|------|--------|--------|--------|-----|
| JSON          | application/json<br/>text/json                                           | inline      | .json          |   ⬤   |     ○    |   ○   |   ○  |   ○    |   ✕    |    ✕   |  ✕  |
| YAML          | application/x-yaml<br/>application/yaml<br/>text/yaml                    | inline      | .yml           |   ⬤   |     ○    |   ○   |   ○  |   ○    |   ✕    |    ✕   |  ✕  |
| XML           | application/xml                                                          | inline      | .xml           |   ⬤   |     ○    |   ○   |   ○  |   ○    |   ✕    |    ✕   |  ✕  |
| Plain Text    | text/plain                                                               | inline      | .txt           |   ○   |     ○    |   ○   |   ○  |   ⬤    |   ✕    |    ✕   |  ✕  |
| Form Data     | text/plain<br/>application/x-www-form-urlencoded<br/>multipart/form-data | inline      | .txt           |   ○   |     ○    |   ○   |   ○  |   ⬤    |   ✕    |    ✕   |  ✕  |
| CSV           | text/csv                                                                 | attachment  | .csv           |   ○   |     ⬤    |   ○   |   ○  |   ○    |   ✕    |    ✕   |  ✕  |
| TSV           | text/tab-separated-values                                                | attachment  | .tsv           |   ⬤   |     ○    |   ○   |   ○  |   ○    |   ✕    |    ✕   |  ✕  |
| Message Pack  | application/x-msgpack<br/>application/msgpack                            | inline      | .msgpack       |   ✕   |     ✕    |   ✕   |   ✕  |   ✕    |   ○    |    ⬤   |  ○  |
| CBOR          | application/cbor                                                         | inline      | .cbor          |   ✕   |     ✕    |   ✕   |   ✕  |   ✕    |   ○    |    ⬤   |  ○  |
| Protobuf      | application/protobuf<br/>application/vnd.google.protobuf                 | inline      | .proto         |   ✕   |     ✕    |   ✕   |   ✕  |   ✕    |   ○    |    ⬤   |  ○  |

Support also varies based on the data you are trying to send:

| Name          | Array | Object | Nested Object | String | Number |
|---------------|-------|--------|---------------|--------|--------|
| JSON          |   ○   |    ○   |        ○      |   ○    |    ○   |
| YAML          |   ○   |    ○   |        ○      |   ○    |    ○   |
| XML           |   ○   |    ○   |        ○      |   ○    |    ○   |
| Plain Text    |   ✕   |    ✕   |        ✕      |   ○    |    ○   |
| Form Data     |   ○   |    ○   |        ✕      |   ✕    |    ✕   |
| CSV           |   ○   |    ○   |        ✕      |   ○    |    ○   |
| TSV           |   ○   |    ○   |        ✕      |   ○    |    ○   |
| Message Pack  |   ○   |    ○   |        ○      |   ○    |    ○   |
| CBOR          |   ○   |    ○   |        ○      |   ○    |    ○   |
| Protobuf      |   ○   |    ○   |        ○      |   ○    |    ○   |

### Determining the format

* If a `Accept` header is present, the format is determined via the [rules described above](#Request-Header-Accept).
  * If no valid format can be determined from the header, a 406 response is sent.
* If a body is present, the format of the body is going to be used.
* Else, the default is used, based on either the initialization options of owf or the framework default.
