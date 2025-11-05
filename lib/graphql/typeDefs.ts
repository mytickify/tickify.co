import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const __dirname = import.meta.dirname;
const typesArray = loadFilesSync(path.join(__dirname, './'), {
  extensions: ['graphql', 'gql'], // Specify the extensions of your schema files
});

export default mergeTypeDefs(typesArray);
