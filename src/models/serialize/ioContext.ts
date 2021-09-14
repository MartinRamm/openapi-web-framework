import { path } from 'src/models/serialize/internal/io-context/path';

export const ioContexts = Object.freeze({
  path: path,
  query: true,
  headers: true,
  cookies: true,
  content: Object.freeze({
    json: true,
    yaml: true,
    xml: true,
    plainText: true,
    formData: true,
    csv: true,
    tsv: true,
    messagePack: true,
    cbor: true,
    protobuf: true,
  }),
});
