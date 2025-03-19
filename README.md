# console-extended

## `deno.json`

```json
{
  "imports": {
    "@mod-by-cis/console-extended": "https://raw.githubusercontent.com/mod-by-cis/console-extended/refs/tags/v0.0.1/mod.ts",
    "@mod-by-cis/console-style-text": "https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.0.2/mod.ts"
  }
}
```

## `main.ts`

```ts
import { ConsoleStyleText as t } from "@mod-by-cis/console-style-text";
import { ConsoleExtended } from "@mod-by-cis/console-extended";
const c = new ExtendedConsole();

c.log(`${
  t.t(" Hello, World! ").s("b")
    .c(0xE4D5D3, 0x215732)._
}`);

c.logWithPrefix(
  " aaa",
  `${
    t.t(" Hello, Moon! ").s(["i", "u", "b"])
      .c({ r: 25, g: 56, b: 100 }, 45)._
  }`,
);
```

---

---
