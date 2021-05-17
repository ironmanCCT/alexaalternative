/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
    $filter: ModelPhraseFilterInput
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
