# Version 1.0.1 (2021-05-18)

## Fixes
- no prepending  of new changelog if there are no changes ([4b3138e](https://github.com/John A. Kallergis/changelog-generator/commit/4b3138edd9d7b66b161a7255c5ea3b795c1571b9))
## Chores
- tranfered generateChangelog.ts into the utils directory ([5aa755e](https://github.com/John A. Kallergis/changelog-generator/commit/5aa755e9686cf2e2aff1559227b8ec587f6b1a92))


# Version 1.0.0 (2021-05-18)

## Features
- changed the release scripts to release:type ([9ef4beb](https://github.com/John A. Kallergis/changelog-generator/commit/9ef4beb08d82e66ee292b7c41e94bcd9fedbce06))
- cleaned up the package.json and implemented the cli command ([7db5647](https://github.com/John A. Kallergis/changelog-generator/commit/7db5647ac90c617663e2ef804ad106ced2f44a53))
- cleaned up the action to use github.context ([bbc4ed3](https://github.com/John A. Kallergis/changelog-generator/commit/bbc4ed37b32167575133f6c3d5639aee5f355911))
- added yarnrc for customised versioning messages ([14ef274](https://github.com/John A. Kallergis/changelog-generator/commit/14ef274774b87cde75e113b390c285a6fd3de21c))
- finished the Github Action implementation ([6f63dbf](https://github.com/John A. Kallergis/changelog-generator/commit/6f63dbf4ebfe5b61040b591c9aa47e2c1557e84d))
- implemented logic to only check for last n tags only ([3dbb87f](https://github.com/John A. Kallergis/changelog-generator/commit/3dbb87fd7fe48813ed3213447f380bd6a5f410b8))
## Fixes
- now staging all files after command is finished ([9364639](https://github.com/John A. Kallergis/changelog-generator/commit/93646399d31850f51270c0df84dc6451812aad8e))
- typo in the package script ([d91b30c](https://github.com/John A. Kallergis/changelog-generator/commit/d91b30c626538a7db58619d1259cdddc64bc27a2))
- Fixed core action import ([1c79d45](https://github.com/John A. Kallergis/changelog-generator/commit/1c79d451b20f187452b7c6af01dc36be56d5a01e))
## Chores
- reverted the deleted action file ([efcef06](https://github.com/John A. Kallergis/changelog-generator/commit/efcef0685f34d86ca152df3a5c77efbddf20458b))
- removed redundant file ([3b6c824](https://github.com/John A. Kallergis/changelog-generator/commit/3b6c82466602a95f84d6589fd0a282d4f691b5f5))
- changed the repo url ([94b6b2f](https://github.com/John A. Kallergis/changelog-generator/commit/94b6b2feeae4f956be7540fae6cea5a461072fda))
## Changed Dependencies
- **[deps-dev]** bump semver from 6.3.0 to 7.3.5 ([d1aeb77](https://github.com/John A. Kallergis/changelog-generator/commit/d1aeb7772f08aa69454107b48cef4f34989531a8))
- **[deps-dev]** bump eslint from 7.17.0 to 7.26.0 ([33fab8f](https://github.com/John A. Kallergis/changelog-generator/commit/33fab8f6b0008b43c271310ef325f9e8992b2132))
- **[deps-dev]** removed semantic-release and added semver ([c026a14](https://github.com/John A. Kallergis/changelog-generator/commit/c026a14dbca12a3349e319b551c3a2261c7883aa))
- **[deps-dev]** added semantic-release package ([e5b1cde](https://github.com/John A. Kallergis/changelog-generator/commit/e5b1cde7583b0a6cefd56841538235eba04e8f69))
- **[deps-dev]** bump js-yaml from 3.14.0 to 4.1.0 ([c846af0](https://github.com/John A. Kallergis/changelog-generator/commit/c846af0d05d1e66fa29250ab1a9f9fd84ade1cba))
- **[deps-dev]** bump @typescript-eslint/parser from 4.23.0 to 4.24.0 ([820fc16](https://github.com/John A. Kallergis/changelog-generator/commit/820fc16a23ce81c801a5cdff59dec305e3f75682))
- **[deps-dev]** bump @types/node from 14.14.9 to 15.3.0 ([2947a57](https://github.com/John A. Kallergis/changelog-generator/commit/2947a57816082acfcd05be34815244d6aee93cd5))


# Version 0.0.1 (2021-05-17)

## Features
- basic implementation of creating a changelog ([61ba683](https://github.com///commit/61ba6830d6853d8f4f4a51ebaa736207852c41ff)))
- now also taking the git body into account ([a325c40](https://github.com///commit/a325c40316a625d456a41ed926b576ebb37005bf)))
- basic implementation of fetching git messages ([f70ab56](https://github.com///commit/f70ab56f3a5a4e18c359769967866b7421c62ac8)))
## Chores
- Version Bump ([2dbaaa2](https://github.com///commit/2dbaaa262bb99ac2c6d2fb9eda8d48daac389aa1)))
- Merge branch 'dependabot/npm_and_yarn/prettier-2.3.0' into main ([922140b](https://github.com///commit/922140b1413669e3800975fceb2d3828437a8eed)))
- Merge branch 'dependabot/npm_and_yarn/eslint-plugin-github-4.1.3' into main ([97f234f](https://github.com///commit/97f234fbd7ff02c269ecaecdd07673d5a78c3485)))
- Merge branch 'dependabot/npm_and_yarn/ts-jest-26.5.6' into main ([beba336](https://github.com///commit/beba3369a841c4fc998b5d2c150b6df73005369e)))
- Merge branch 'dependabot/npm_and_yarn/typescript-eslint/parser-4.23.0' into main ([746f3aa](https://github.com///commit/746f3aa2ccc928c675b6896ccd443f1e741bc752)))
- Merge branch 'dependabot/npm_and_yarn/actions/core-1.2.7' into main ([9cb49c2](https://github.com///commit/9cb49c2e373553be8db677b4eb018aedbf1391a2)))
- bump prettier from 2.2.1 to 2.3.0 ([6f35bb5](https://github.com///commit/6f35bb58fef3ac5fac275237d6d746f547915793)))
- bump eslint-plugin-github from 4.1.1 to 4.1.3 ([992b3db](https://github.com///commit/992b3dba53d8818be77d1eea6ca66f9fcff0ad20)))
- bump ts-jest from 26.4.4 to 26.5.6 ([2714419](https://github.com///commit/2714419d4bd22ca8defc792043751b6d0b9cba0b)))
- bump @typescript-eslint/parser from 4.8.1 to 4.23.0 ([91916e6](https://github.com///commit/91916e65ba26e2542262488d12fb2ed95d2fcc6d)))
- bump @actions/core from 1.2.6 to 1.2.7 ([3c04133](https://github.com///commit/3c041334d008fefca06537a538a1d3ad58a3c8bf)))
- added .idea folder ([9c9dc32](https://github.com///commit/9c9dc3219ec66911229409e57ab29676cef1858b)))
- Merge pull request #2 from jakallergis/dependabot/npm_and_yarn/vercel/ncc-0.28.5 ([be3d661](https://github.com///commit/be3d6614649c877a99b95b3c06419ecd1a633b48)))
- Merge pull request #3 from jakallergis/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.6 ([38736f8](https://github.com///commit/38736f83161612a8206de1c51f80bf7d9f330d9a)))
- Merge pull request #4 from jakallergis/dependabot/npm_and_yarn/types/jest-26.0.23 ([d7648cc](https://github.com///commit/d7648cc2404b418152078570971966d3b90a351d)))
- Merge pull request #5 from jakallergis/dependabot/npm_and_yarn/typescript-4.2.4 ([9f9e819](https://github.com///commit/9f9e819483439a1a446456651a77cd2701a38b5b)))
- Bump typescript from 4.1.3 to 4.2.4 ([2f1371a](https://github.com///commit/2f1371a134d6a2ad93cfd7ea61d5dcae2842d6e3)))
- Bump @types/jest from 26.0.15 to 26.0.23 ([23c1112](https://github.com///commit/23c11128158351e006b4037ad2e69dee4c193359)))
- Bump eslint-plugin-jest from 24.1.3 to 24.3.6 ([82583e5](https://github.com///commit/82583e590d7dd24bbd00224fc5c2bf74d13d72c1)))
- Bump @vercel/ncc from 0.25.1 to 0.28.5 ([e0a8d4e](https://github.com///commit/e0a8d4e7166eca0aee8c57c338860907d5354075)))
- Initial commit ([cfd6a3a](https://github.com///commit/cfd6a3a897596dd1af47194001543eebf94ffe0c)))
