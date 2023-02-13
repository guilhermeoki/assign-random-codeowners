# v0.2.7 (Mon Feb 13 2023)

#### 🐞 Fixes

- Prevent assigning PR authors to their own PRs [#39](https://github.com/pleo-io/assign-random-codeowners/pull/39) ([@marcos-arranz](https://github.com/marcos-arranz))

#### ⚠️ Pushed to `main`

- Commit from GitHub Actions (Release) (andersfischernielsen@users.noreply.github.com)
- Reset Renovate configuration ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### 🏠 Internal

- Ensure project is built correctly pre-release [#40](https://github.com/pleo-io/assign-random-codeowners/pull/40) ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Configure Renovate [#37](https://github.com/pleo-io/assign-random-codeowners/pull/37) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate) [@andersfischernielsen](https://github.com/andersfischernielsen))
- Rename pleo-oss to pleo-io [#38](https://github.com/pleo-io/assign-random-codeowners/pull/38) ([@jsfr](https://github.com/jsfr))
- Update dependency @types/jest to v29.2.6 [#36](https://github.com/pleo-io/assign-random-codeowners/pull/36) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate))

#### Authors: 5

- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- andersfischernielsen (andersfischernielsen@users.noreply.github.com)
- Jens Fredskov ([@jsfr](https://github.com/jsfr))
- Marcos Arranz ([@marcos-arranz](https://github.com/marcos-arranz))
- Renovate (Pleo) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate))

---

# v0.2.6 (Thu Jan 19 2023)

### Release Notes

#### Update typescript-eslint monorepo to v5.48.2 ([#33](https://github.com/pleo-io/assign-random-codeowners/pull/33))

<details>
<summary>typescript-eslint/typescript-eslint (@&#8203;typescript-eslint/eslint-plugin)</summary>

### [`v5.48.2`](https://togithub.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/CHANGELOG.md#&#8203;5482-httpsgithubcomtypescript-eslinttypescript-eslintcomparev5481v5482-2023-01-16)

[Compare Source](https://togithub.com/typescript-eslint/typescript-eslint/compare/v5.48.1...v5.48.2)

**Note:** Version bump only for package [@&#8203;typescript-eslint/eslint-plugin](https://togithub.com/typescript-eslint/eslint-plugin)

</details>

<details>
<summary>typescript-eslint/typescript-eslint (@&#8203;typescript-eslint/parser)</summary>

### [`v5.48.2`](https://togithub.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/parser/CHANGELOG.md#&#8203;5482-httpsgithubcomtypescript-eslinttypescript-eslintcomparev5481v5482-2023-01-16)

[Compare Source](https://togithub.com/typescript-eslint/typescript-eslint/compare/v5.48.1...v5.48.2)

**Note:** Version bump only for package [@&#8203;typescript-eslint/parser](https://togithub.com/typescript-eslint/parser)

</details>

---

#### Update dependency @swc/core to v1.3.27 ([#31](https://github.com/pleo-io/assign-random-codeowners/pull/31))

<details>
<summary>swc-project/swc</summary>

### [`v1.3.27`](https://togithub.com/swc-project/swc/blob/HEAD/CHANGELOG.md#&#8203;1327---2023-01-17)

[Compare Source](https://togithub.com/swc-project/swc/compare/v1.3.26...v1.3.27)

##### Bug Fixes

-   **(es/codegen)** Skip space if jsx attrs is empty ([#&#8203;6823](https://togithub.com/swc-project/swc/issues/6823)) ([e9fdac2](https://togithub.com/swc-project/swc/commit/e9fdac216c0a578f266a7a16000e2675d722068c))

-   **(es/compat)** Ignore `this` in nested scopes in `classes` pass ([#&#8203;6796](https://togithub.com/swc-project/swc/issues/6796)) ([07676d5](https://togithub.com/swc-project/swc/commit/07676d5515321c50206b3f0ea9f1473b6b2c3192))

-   **(es/plugin)** Fix starter template ([#&#8203;6815](https://togithub.com/swc-project/swc/issues/6815)) ([38fb70c](https://togithub.com/swc-project/swc/commit/38fb70c237f122a8d8f8fdf187bd341326e39f22))

-   **(es/renamer)** Handle rest params correctly ([#&#8203;6821](https://togithub.com/swc-project/swc/issues/6821)) ([ebce18b](https://togithub.com/swc-project/swc/commit/ebce18b221c50dedba9e3a4078148473822be949))

-   **(es/transform)** Apply `hygiene` and `resolver` if minify is specified ([#&#8203;6793](https://togithub.com/swc-project/swc/issues/6793)) ([c145409](https://togithub.com/swc-project/swc/commit/c14540905f81e1c1677e7c9d723e71b1b6a9740b))

##### Features

-   **(css/parser)** Normalize at-rules ([#&#8203;6705](https://togithub.com/swc-project/swc/issues/6705)) ([43e7519](https://togithub.com/swc-project/swc/commit/43e75194e546997d6524bbfb7f0a7ff531bb443f))

-   **(es/ast)** Add `EsNext` to `EsVersion` ([#&#8203;6816](https://togithub.com/swc-project/swc/issues/6816)) ([ff78b8f](https://togithub.com/swc-project/swc/commit/ff78b8f7e077bad599f9b740ca4e831f835a347b))

-   **(es/helper)** Use `require` to load polyfills and helpers in Script ([#&#8203;6778](https://togithub.com/swc-project/swc/issues/6778)) ([ad8d043](https://togithub.com/swc-project/swc/commit/ad8d043f1d75b2df5a5e2fe43fba1ec843d2fad4))

-   **(es/minifier)** Remove noop spreads ([#&#8203;6803](https://togithub.com/swc-project/swc/issues/6803)) ([8f683e3](https://togithub.com/swc-project/swc/commit/8f683e3f77fe9f4fd84a5bf64c067ae9526fb330))

-   **(es/quote)** Allow using `Str` as a var ([#&#8203;6797](https://togithub.com/swc-project/swc/issues/6797)) ([224eff9](https://togithub.com/swc-project/swc/commit/224eff91eb06808e2c79bb4fbe06ccf46121758f))

-   **(es/renamer)** Support `safari10` from the name mangler ([#&#8203;6801](https://togithub.com/swc-project/swc/issues/6801)) ([631dd78](https://togithub.com/swc-project/swc/commit/631dd7872b78b8698bb4923c1e81a9a8770c1fea))

-   **(es/renamer)** Rename synthesized identifiers even on `eval` ([#&#8203;6818](https://togithub.com/swc-project/swc/issues/6818)) ([82bd5c2](https://togithub.com/swc-project/swc/commit/82bd5c2041ba95f6d0260e03c446496b7eb37cb4))

##### Testing

-   **(es)** Enable execution tests for fixed issues ([#&#8203;6805](https://togithub.com/swc-project/swc/issues/6805)) ([e7ea054](https://togithub.com/swc-project/swc/commit/e7ea054c6389b43b0e7b104e9337e11a82bb23f7))

-   **(es/compat)** Add a test to verify parameters passs ([#&#8203;6792](https://togithub.com/swc-project/swc/issues/6792)) ([7dc5ccb](https://togithub.com/swc-project/swc/commit/7dc5ccb0fc217abdb7ab4e76ac7f646c5087b3a8))

-   **(es/minifier)** Add a test for an invalid issue ([#&#8203;6802](https://togithub.com/swc-project/swc/issues/6802)) ([a299fd0](https://togithub.com/swc-project/swc/commit/a299fd04180c77a97817d9e817b247efa1973e06))

-   **(es/preset-env)** Add a test for a wrong issue ([#&#8203;6794](https://togithub.com/swc-project/swc/issues/6794)) ([b29aa5b](https://togithub.com/swc-project/swc/commit/b29aa5b5a0d4f78795eaf3784c84a18ba1b88bfa))

</details>

---

#### Update dependency eslint-plugin-import to v2.27.5 ([#32](https://github.com/pleo-io/assign-random-codeowners/pull/32))

<details>
<summary>import-js/eslint-plugin-import</summary>

### [`v2.27.5`](https://togithub.com/import-js/eslint-plugin-import/blob/HEAD/CHANGELOG.md#&#8203;2275---2023-01-16)

[Compare Source](https://togithub.com/import-js/eslint-plugin-import/compare/v2.27.4...v2.27.5)

##### Fixed

-   \[`order]`: Fix group ranks order when alphabetizing (\[[#&#8203;2674](https://togithub.com/import-js/eslint-plugin-import/issues/2674)], thanks \[[@&#8203;Pearce-Ropion](https://togithub.com/Pearce-Ropion)])

</details>

---

#### Update dependency eslint to v8.32.0 ([#30](https://github.com/pleo-io/assign-random-codeowners/pull/30))

<details>
<summary>eslint/eslint</summary>

#### Update dependency prettier to v2.8.3 ([#29](https://github.com/pleo-io/assign-random-codeowners/pull/29))

<details>
<summary>prettier/prettier</summary>

### [`v2.8.3`](https://togithub.com/prettier/prettier/blob/HEAD/CHANGELOG.md#&#8203;283)

[Compare Source](https://togithub.com/prettier/prettier/compare/2.8.2...2.8.3)

[diff](https://togithub.com/prettier/prettier/compare/2.8.2...2.8.3)

##### Allow self-closing tags on custom elements ([#&#8203;14170](https://togithub.com/prettier/prettier/pull/14170) by [@&#8203;fisker](https://togithub.com/fisker))

See [Angular v15.1.0 release note](https://togithub.com/angular/angular/releases/tag/15.1.0) for details.

<!-- prettier-ignore -->

```html
// Input
<app-test/>

// Prettier 2.8.2
SyntaxError: Only void and foreign elements can be self closed "app-test" (1:1)
> 1 | <app-test/>
    | ^^^^^^^^^
  2 |

// Prettier 2.8.3
<app-test />
```

</details>

---

---

#### 🐞 Fixes

- Prefer 'pleo-io' to 'pleo-oss' [#35](https://github.com/pleo-io/assign-random-codeowners/pull/35) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### ⚠️ Pushed to `main`

- Commit from GitHub Actions (Release) (andersfischernielsen@users.noreply.github.com)
- Update CODEOWNERS ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Update dependency eslint-plugin-import to v2.27.4 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.26 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.48.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency prettier to v2.8.2 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.25 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update actions/checkout action to v3.3.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.48.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint-config-prettier to v8.6.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint to v8.31.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @types/jest to v29.2.5 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.47.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.24 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.47.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint to v8.30.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.23 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update actions/checkout action to v3.2.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.46.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/jest to v0.2.24 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.46.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.22 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency typescript to v4.9.4 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency prettier to v2.8.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.45.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint to v8.29.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @types/jest to v29.2.4 ([@renovate[bot]](https://github.com/renovate[bot]))

#### 🏠 Internal

- Update typescript-eslint monorepo to v5.48.2 [#33](https://github.com/pleo-io/assign-random-codeowners/pull/33) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate))
- Update dependency @swc/core to v1.3.27 [#31](https://github.com/pleo-io/assign-random-codeowners/pull/31) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate) [@marcos-arranz](https://github.com/marcos-arranz))
- Update dependency eslint-plugin-import to v2.27.5 [#32](https://github.com/pleo-io/assign-random-codeowners/pull/32) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate))
- Update dependency eslint to v8.32.0 [#30](https://github.com/pleo-io/assign-random-codeowners/pull/30) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate) [@andersfischernielsen](https://github.com/andersfischernielsen))
- Update dependency prettier to v2.8.3 [#29](https://github.com/pleo-io/assign-random-codeowners/pull/29) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate))

#### Authors: 5

- [@renovate[bot]](https://github.com/renovate[bot])
- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- andersfischernielsen (andersfischernielsen@users.noreply.github.com)
- Marcos Arranz ([@marcos-arranz](https://github.com/marcos-arranz))
- Renovate (Pleo) ([@pleo-bot-renovate](https://github.com/pleo-bot-renovate))

---

# v0.2.5 (Thu Dec 01 2022)

#### 🐞 Fixes

- Avoid assigning PR authors as reviewers [#27](https://github.com/pleo-io/assign-random-codeowners/pull/27) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### ⚠️ Pushed to `main`

- Commit from GitHub Actions (Release) (andersfischernielsen@users.noreply.github.com)
- Build distribution ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Update dependency @swc/core to v1.3.21 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.45.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.20 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency prettier to v2.8.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.44.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint to v8.28.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.19 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency typescript to v4.9.3 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.18 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.43.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @types/jest to v29.2.3 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.17 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.16 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency jest to v29.3.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency jest to v29.3.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.42.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint to v8.27.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @types/jest to v29.2.2 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.14 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.42.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @types/jest to v29.2.1 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.11 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.41.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency jest to v29.2.2 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint to v8.26.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.10 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update webfactory/ssh-agent action to v0.7.0 ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency jest to v29.2.1 ([@renovate[bot]](https://github.com/renovate[bot]))

#### 🏠 Internal

- Pin dependency typescript to 4.8.4 [#26](https://github.com/pleo-io/assign-random-codeowners/pull/26) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.40.1 [#25](https://github.com/pleo-io/assign-random-codeowners/pull/25) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.9 [#24](https://github.com/pleo-io/assign-random-codeowners/pull/24) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update jest monorepo to v29.2.0 [#23](https://github.com/pleo-io/assign-random-codeowners/pull/23) ([@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- andersfischernielsen (andersfischernielsen@users.noreply.github.com)

---

# v0.2.4 (Fri Oct 14 2022)

#### 🐞 Fixes

- Update typescript-eslint monorepo to v5.40.0 [#22](https://github.com/pleo-io/assign-random-codeowners/pull/22) ([@renovate[bot]](https://github.com/renovate[bot]))

#### ⚠️ Pushed to `main`

- Commit from GitHub Actions (Release) (andersfischernielsen@users.noreply.github.com)
- Update renovate.json ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- andersfischernielsen (andersfischernielsen@users.noreply.github.com)

---

# v0.2.3 (Fri Oct 14 2022)

#### 🐞 Fixes

- Update dependency @swc/core to v1.3.8 [#20](https://github.com/pleo-io/assign-random-codeowners/pull/20) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency eslint to v8.25.0 [#21](https://github.com/pleo-io/assign-random-codeowners/pull/21) ([@renovate[bot]](https://github.com/renovate[bot]))

#### ⚠️ Pushed to `main`

- Commit from GitHub Actions (Release) (renovate[bot]@users.noreply.github.com)
- Create opslevel.yml ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- renovate[bot] (renovate[bot]@users.noreply.github.com)

---

# v0.2.2 (Fri Oct 07 2022)

#### 🐞 Fixes

- Update dependency @swc/core to v1.3.5 [#18](https://github.com/pleo-io/assign-random-codeowners/pull/18) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @types/jest to v29.1.2 [#19](https://github.com/pleo-io/assign-random-codeowners/pull/19) ([@renovate[bot]](https://github.com/renovate[bot]))

#### ⚠️ Pushed to `main`

- Commit from GitHub Actions (Release) (renovate[bot]@users.noreply.github.com)
- Update CODEOWNERS ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Disable push of production dependencies ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Commit from GitHub Actions (Release) ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Reorder steps ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Move and extend Renovate configuration ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### 🏠 Internal

- Pin dependencies [#12](https://github.com/pleo-io/assign-random-codeowners/pull/12) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update jest monorepo [#15](https://github.com/pleo-io/assign-random-codeowners/pull/15) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update typescript-eslint monorepo to v5.39.0 [#17](https://github.com/pleo-io/assign-random-codeowners/pull/17) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update actions/checkout action to v3.1.0 [#16](https://github.com/pleo-io/assign-random-codeowners/pull/16) ([@renovate[bot]](https://github.com/renovate[bot]))
- Update dependency @swc/core to v1.3.4 [#13](https://github.com/pleo-io/assign-random-codeowners/pull/13) ([@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- renovate[bot] (renovate[bot]@users.noreply.github.com)

---

# v0.2.1 (Wed Oct 05 2022)

#### 🐞 Fixes

- Assign team individuals from teams until no team members remain [#10](https://github.com/pleo-io/assign-random-codeowners/pull/10) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### 🏠 Internal

- Configure Renovate [#11](https://github.com/pleo-io/assign-random-codeowners/pull/11) ([@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 2

- [@renovate[bot]](https://github.com/renovate[bot])
- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))

---

# v0.2.0 (Thu Sep 29 2022)

#### 🎁 Features

- Support assigning individuals from reviewer teams [#8](https://github.com/pleo-io/assign-random-codeowners/pull/8) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### ⚠️ Pushed to `main`

- Update README.md ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Remove redundant release steps ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Skip tests on 'main' ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Simplify distribution and release jobs ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### 🏠 Internal

- Restore tsconfig to repository state post-build when releasing [#9](https://github.com/pleo-io/assign-random-codeowners/pull/9) ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Improve testing [#3](https://github.com/pleo-io/assign-random-codeowners/pull/3) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### Authors: 1

- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))

---

# v0.1.0 (Thu Sep 29 2022)

#### 🎁 Features

- Ensure tag presence in release job [#7](https://github.com/pleo-io/assign-random-codeowners/pull/7) ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Ensure pushes to main in release [#6](https://github.com/pleo-io/assign-random-codeowners/pull/6) ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Ensure production dependencies only in release [#5](https://github.com/pleo-io/assign-random-codeowners/pull/5) ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Minimize Action size [#4](https://github.com/pleo-io/assign-random-codeowners/pull/4) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### ⚠️ Pushed to `main`

- Ensure plugin installation pre-release ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Avoid NPM publish ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Commit from GitHub Actions (Release) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### Authors: 1

- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
