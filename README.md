# Daisy Yin Academic Homepage

This repository contains a pure front-end academic homepage built with React Native Web components. It is designed to deploy directly to GitHub Pages from the `main` branch.

## Edit Content

Update the homepage data in `src/profile.js`:

- name, affiliation, location, and email
- research interests
- publications
- projects
- academic timeline

## Deploy

The repository is already configured with a GitHub Pages workflow in `.github/workflows/deploy.yml`.

After pushing to GitHub:

```bash
git push -u origin main
```

GitHub Actions will deploy the site. The expected Pages URL is:

```text
https://daisyinb612.github.io/daisyinb612/
```

If GitHub asks for a Pages source, choose **GitHub Actions**.
