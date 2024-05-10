<br>
<img src="https://github.com/pan7k/fluid/blob/main/docs/fluid.svg" />

### Fluid

Component library

---

#### Installation

If you are using [bun](https://bun.sh), start by creating a new file named `bunfig.toml` in the root directory of your project and insert the following code:

```toml
[install.scopes]
"@pan7k" = { url = "https://npm.pkg.github.com", token = "$GITHUB_TOKEN" }
```

Next, place the `.env` file in your project's root directory and fill it in by adding your GitHub token:

```
GITHUB_TOKEN=
```

Finally, add the **@pan7k/fluid** dependency to your `package.json` and run `bun i` to install the package.

#### License

© 2024 Tomáš Pánik. All rights reserved.<br>
