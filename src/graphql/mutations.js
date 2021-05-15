/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createPhrase = /* GraphQL */ `
  mutation CreatePhrase(
    $input: CreatePhraseInput!
    $condition: ModelphraseConditionInput
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
    $condition: ModelphraseConditionInput
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
    $condition: ModelphraseConditionInput
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
