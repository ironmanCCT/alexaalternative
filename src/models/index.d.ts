import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Note {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  constructor(init: ModelInit<Note>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

export declare class phrase {
  readonly id: string;
  readonly word: string;
  readonly description?: string;
  readonly image?: string;
  constructor(init: ModelInit<phrase>);
  static copyOf(source: phrase, mutator: (draft: MutableModel<phrase>) => MutableModel<phrase> | void): phrase;
}