/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPhrase = /* GraphQL */ `
  mutation CreatePhrase(
    $input: CreatePhraseInput!
    $condition: ModelPhraseConditionInput
  ) {
    createPhrase(input: $input, condition: $condition) {
      id
      word
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updatePhrase = /* GraphQL */ `
  mutation UpdatePhrase(
    $input: UpdatePhraseInput!
    $condition: ModelPhraseConditionInput
  ) {
    updatePhrase(input: $input, condition: $condition) {
      id
      word
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deletePhrase = /* GraphQL */ `
  mutation DeletePhrase(
    $input: DeletePhraseInput!
    $condition: ModelPhraseConditionInput
  ) {
    deletePhrase(input: $input, condition: $condition) {
      id
      word
      description
      image
      createdAt
      updatedAt
    }
  }
`;
