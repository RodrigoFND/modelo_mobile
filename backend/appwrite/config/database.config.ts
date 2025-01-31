import Env from '../../../src/env';

export const DATABASE_CONFIG = {
    databaseId: Env.appwriteDatabaseId,
    collections: {
      users: Env.appwriteCollectionUsersId
    }
  };
  