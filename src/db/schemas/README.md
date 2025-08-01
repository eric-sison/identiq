# client

| Prop                        | Description                                         | Type                                                                     | Required      |
| --------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ | ------------- |
| id                          | Primary client's indentification key.               | `cuid`                                                                   | yes           |
| client_secret               | Secret issued to confidential clients.              | `string`                                                                 | no (optional) |
| client_name                 | Human-readable name of the client.                  | `string`                                                                 | yes           |
| client_type                 | Type of client: `public` or `confidential`.         | [`confidential`, `public`]                                               | yes           |
| application_type            | Type of application: `web`, `native`, or `spa`.     | [`web`, `native`, `spa`]                                                 | yes           |
| token_endpoint_auth_method  | Authentication method at token endpoint.            | [`client_secret_basic`, `client_secret_post`,`client_secret_jwt`,`none`] | yes           |
| client_description          | Description of the client for internal use.         | `string`                                                                 | no (optional) |
| client_uri                  | URL of the client's homepage.                       | `string`                                                                 | no (optional) |
| logo_uri                    | URL of the client's logo.                           | `string`                                                                 | no (optional) |
| tos_uri                     | Terms of service URL.                               | `string`                                                                 | no (optional) |
| policy_uri                  | Privacy policy URL.                                 | `string`                                                                 | no (optional) |
| created_at                  | Timestamp when the client was registered.           | `timestamp`                                                              | no (default)  |
| updated_at                  | Timestamp when the client was last updated.         | `timestamp`                                                              | no (default)  |
| is_active                   | Indicates whether the client is active.             | `boolean`                                                                | no (default)  |
| created_by                  | User or system that registered the client.          | `string`                                                                 | no (optional) |
| require_pkce                | Whether the client requires PKCE.                   | `boolean`                                                                | no (default)  |
| allow_plain_pkce            | Allow PKCE with plain (not hashed) code challenges. | `boolean`                                                                | no (default)  |
| access_token_lifetime       | Lifetime of access tokens in seconds.               | `integer`                                                                | no (default)  |
| refresh_token_lifetime      | Lifetime of refresh tokens in seconds.              | `integer`                                                                | no (default)  |
| id_token_lifetime           | Lifetime of ID tokens in seconds.                   | `integer`                                                                | no (default)  |
| authorization_code_lifetime | Lifetime of authorization codes in seconds.         | `integer`                                                                | no (default)  |
