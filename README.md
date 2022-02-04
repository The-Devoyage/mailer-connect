# Mailer Connect

This package is used to create an easy connection to the server running the `@the-devoyage/graphql-mailer` package.

## Install

After secure purchase from our [basetools account](https://basetools.io/checkout/wp7QYNNO), you will be granted access to the repo and package.

`npm i @the-devoyage/mailer-connect`

## Usage

### Initialize

Create as many connections as you need. Each can be exported under a different name.

```ts
// mailer.ts
import { MailerConnect } from '@nickisyourfan/mailer-connect';

export const mailer = new Mailer({ uri: 'http://mailer:5008/send' });
export const devMailer = new Mailer({ uri: 'http://localhost:5008/send' });
```

### Send Mail

**Import Module**

Import the configured mailer throughout your project to call the `send` method.

```ts
// Routes.ts
import { mailer } from '../mailer';

app.post('/register', (req, res) => {
  // ... Register Logic
  if (success) {
    mailer.send({});
  }
});
```

**Default Content**

The required `defaultContent` property allows local HTML and email generation.

```ts
mailer.send({
  defaultContent: {
    subject: 'Email Updated',
    to: account.email,
    plainText:
      'Your email has been updated. Please re-verify your account at www.my-business.com',
    html:
      '<h3>Success!</h3><p>Your email has been updated. Please re-verify your account at www.my-business.com.</p>',
  },
});
```

**Triggered Content**

The optional `triggeredContent` property allows you to pass a `trigger` to the mailer service. The `graphql-mailer` service can then use the passed string to reference a HTML template that is stored on that server.

```ts
mailer.send({
  triggeredContent: {
    trigger: 'UPDATE_EMAIL',
    to: account.email,
  },
  defaultContent: {
    subject: 'Email Updated',
    to: account.email,
    plainText:
      'Your email has been updated. Please re-verify your account at www.my-business.com',
    html:
      '<h3>Success!</h3><p>Your email has been updated. Please re-verify your account at <a href="www.my-business.com">Our Website</a>.</p>',
  },
});
```

**Dynamic Variables**

You can dynamically inject variables into both `HTML` and `plainText` properties.

```ts
mailer.send({
  defaultContent: {
    subject: 'Email Updated',
    to: account.email,
    plainText: `Hello, ${firat_name}, Your email has been updated. Please re-verify your account at www.my-business.com`,
    html: `<h3>Success!</h3><p>Hello, ${first_name} Your email has been updated. Please re-verify your account at <a href="www.my-business.com">Our Website</a>.</p>`,
  },
});
```

Variables may also be passed to `triggeredContent`. They will be injected into the email content from the `graphql-mailer` service.

```ts
mailer.send({
  triggeredContent: {
    trigger: 'UPDATE_EMAIL',
    to: account.email,
    variables: account,
  },
  defaultContent: {
    subject: 'Email Updated',
    to: account.email,
    plainText: `Hello, ${first_name}, Your email has been updated. Please re-verify your account at www.my-business.com`,
    html: `<h3>Success!</h3><p>Hello, ${first_name} Your email has been updated. Please re-verify your account at <a href="www.my-business.com">Our Website</a>.</p>`,
  },
});
```

### Responses

The `graphql-mailer` service will respond with a json object.

```ts
interface MailerPostResponse {
  ok: boolean;
  error?: string;
  info?: SMTPTransport.SentMailInfo;
}

// From NodeMailer
interface SentMessageInfo {
  envelope: MimeNode.Envelope;
  messageId: string;
  accepted: Array<string | Mail.Address>;
  rejected: Array<string | Mail.Address>;
  pending: Array<string | Mail.Address>;
  response: string;
}
```
