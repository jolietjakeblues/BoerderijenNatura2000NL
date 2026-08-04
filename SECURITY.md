# Security Policy

## Supported versions

This project publishes a static website and open datasets through GitHub Pages.

Security fixes are applied to the current version on the `main` branch. When
relevant, a new dataset release may be published after the fix. Older commits,
branches, and releases are not maintained separately.

## Reporting a vulnerability

Please report suspected security vulnerabilities through GitHub's private
vulnerability reporting feature:

1. Open the repository's **Security and quality** tab.
2. Select **Advisories**.
3. Select **Report a vulnerability**.

Please do not disclose exploit details, credentials, personal data, or other
sensitive information in a public issue before the report has been assessed.

If possible, include:

- the affected file, page, commit, release, or URL;
- steps to reproduce the issue safely;
- the potential security impact;
- relevant browser or environment information;
- a suggested mitigation, if known.

We aim to acknowledge reports within 7 days. After assessment, the reporter
will be informed whether the issue has been accepted, needs more information,
or is outside the security scope. Disclosure should preferably take place
after a fix or mitigation is available.

## In scope

Examples of issues that are in scope:

- cross-site scripting or other browser-side injection;
- unsafe processing of data by the build scripts;
- unauthorized modification of generated pages or published datasets;
- vulnerabilities in this repository's GitHub Actions workflows;
- accidentally committed credentials, tokens, or personal data;
- supply-chain vulnerabilities in dependencies used by the project.

## Out of scope

The following are outside the scope of this project:

- attacks against GitHub, GitHub Pages, RCE, PDOK, Kadaster, CARTO,
  OpenStreetMap, unpkg, or other external services;
- denial-of-service, load, or stress testing against external services;
- social engineering, phishing, or physical attacks;
- reports that concern only the factual accuracy or interpretation of source
  data and have no security impact.

Data-quality problems and factual corrections may be reported through a
regular GitHub issue, provided that no sensitive information is disclosed.

## Research guidelines

Security research must be limited to systems, data, and accounts for which the
researcher has permission.

Do not:

- disrupt the availability of this project or an external service;
- access or attempt to access another person's account or private data;
- modify or destroy data;
- use automated testing that places a significant load on any service;
- retain or disclose credentials or personal data.

Researchers acting in good faith, respecting these guidelines, and reporting
a vulnerability promptly will not be subject to legal action initiated by the
project maintainer solely because of that research.
