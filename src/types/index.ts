export type ObjectID = string;

export interface DefaultContent {
  to: string;
  subject: string;
  html: string;
  plainText: string;
  layout?: ObjectID;
}

export interface TriggeredContent {
  trigger: string;
  variables?: Record<string, any>;
  to: string;
}

export interface SendArgs {
  triggeredContent?: TriggeredContent;
  defaultContent: DefaultContent;
}
