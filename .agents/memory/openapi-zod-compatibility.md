---
name: OpenAPI and generated Zod compatibility
description: A code-generation compatibility constraint discovered while extending the school API.
---

Use `type: number` for numeric OpenAPI fields in this workspace's API contracts when they are consumed by the generated Zod client.

**Why:** The installed generated-client toolchain targets a Zod version that does not expose the `z.int()` helper, so OpenAPI `integer` fields produce a library typecheck failure after codegen.

**How to apply:** If an API needs integer semantics, validate/coerce the value at the server boundary while keeping the generated contract numeric.