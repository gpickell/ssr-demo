## Description
This is an example of a hybrid application using React, React-SSR, Express, and Rollup with some
JIT support.
## Target Uses
- Appropriate for simple multi-page apps w/wo/ routes
- Appropriate for light/presentation-only page
- REPL Behavior (GET, POST, REDIRECT, GET)
- Hide business logic on server
- Hybrid and seamless experience between app/server
## Other Concepts
- Build tooling is out-of-the-box (almost)
- Build tooling is very small (no large package tree)
- Demonstrates rollup 
- Watch support
- Assets are "chunk-hashed"
- Demonstrates SSR in action
  - Useful for immediatele page visibility
  - Useful for "pure presentation" pages like docs
  - Stateless pages can be pre-rendered and cached
