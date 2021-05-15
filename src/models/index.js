// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, phrase } = initSchema(schema);

export {
  Note,
  phrase
};