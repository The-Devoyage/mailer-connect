export type ObjectID = string;

export interface Custom {
  to: string;
  subject: string;
  html: string;
  plainText: string;
  layout?: ObjectID;
}

export interface Triggered {
  trigger: string;
  variables?: Record<string, any>[];
  to: string;
}

interface TriggeredEmail {
  triggered: Triggered;
  custom?: never;
}

interface CustomEmail {
  triggered?: never;
  custom: Custom;
}

export type SendArgs = TriggeredEmail | CustomEmail;
