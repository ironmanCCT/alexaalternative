/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPhrase = /* GraphQL */ `
  query GetPhrase($id: ID!) {
    getPhrase(id: $id) {
      id
      word
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listPhrases = /* GraphQL */ `
  query ListPhrases(
    $filter: ModelphraseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhrases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        word
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
