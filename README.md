# inventory-app

## Table of Contents

-   [Introduction](#introduction)
-   [Key Features](#key-features)
    -   [Search Functionality (`/search`)](#search-functionality-search)
    -   [Item Information and Editing (`/{itemId}`)](#item-information-and-editing-itemid)
    -   [Item Adding (`/add-item`)](#item-adding-add-item)
    -   [List Management (`/makelist`)](#list-management-makelist)
    -   [List Item Management (`/makelist/{listId}`)](#list-item-management-makelistlistid)
-   [Architecture](#architecture)
-   [Install \& Run](#install--run)
-   [Development tools](#development-tools)
-   [Code Guidelines](#code-guidelines)
    -   [Files and Folders](#files-and-folders)
    -   [Issues](#issues)
    -   [Branches](#branches)
    -   [Commit Messages](#commit-messages)
    -   [Pull Requests](#pull-requests)

## Introduction

This is the app for the [WellPartner Inventory API](https://github.com/OptiCorp/inventory-api).
The system keeps track of their items: **Units**, **Assemblies**, **Subassemblies** and **Parts**.

-   **Units**: These are the largest components in the inventory, composed of various Assemblies.
-   **Assemblies**: Assemblies are constituent parts of a Unit. They are composed of Subassemblies and/or Parts.
-   **Subassemblies**: These are smaller components that make up an Assembly. They consist solely of Parts.
-   **Parts**: These are the most fundamental components in the inventory. They form the building blocks of Subassemblies, Assemblies, and ultimately, Units.

## Key Features

This section contains information about the app pages.

#### Search Functionality (`/search`)

-   Users can perform searches using various identifiers such as ID, WellPartner ID, serial number, or description.

#### Item Information and Editing (`/{itemId}`)

-   Users can access detailed information about a specific item, and edit its properties.

#### Item Adding (`/add-item`)

-   Users can add new items to the database.

#### List Management (`/makelist`)

-   Users can view, create, and delete lists.

#### List Item Management (`/makelist/{listId}`)

-   Users can add and remove items from a list.

## Architecture

-   TypeScript
-   React
-   Vite
-   [ReactQuery](https://tanstack.com/query/v3/)
-   Azure App Service with Entra authentication and authorization
-   Deployment to Azure using GitHub Actions

## Install & Run

Clone and Run the application:

1. Clone the repo
2. Navigate to project folder: `inventory-app`
3. Install modules: `npm i`
4. Run the app: `npm run dev`

Additional commands:

-   Run tests: `npm run test`
-   Run Storybook: `npm run storybook`
-   Run linting: `npm run lint`

## Development tools

-   [Prettier](https://prettier.io/)
-   [ESLint](https://eslint.org/)
-   [Storybook](https://storybook.js.org/)
-   [Vitest](https://vitest.dev/)

## Code Guidelines

### Files and Folders

-   Apply camelCase for folder names, such as `userProfilePage`, with the exception of component folder names that should be capitalized, i.e `UserProfile`.
-   Choose descriptive names for component files. For instance, use `UserProfile.tsx` instead of generic names like `Component1.tsx` or `Index.tsx`.
-   Organize folder structure hierarchically, considering trees and pages. Fro example, use `src/pages/add-item/.../batch`, where the batch directory is a subdirectory of its parent, and so forth.
-   Ensure page folders align with their corresponding URL segments. For example, name the page folder as `add-item-form` in `src/pages/add-item/add-item-form`, resulting in the URL `https://.../add-item/add-item-form`.
-   All components should be in the `src/components` directory.
-   Use named exports for components, hooks, and other modules. For example, use `export function MyComponent() {...}` instead of `export default function MyComponent() {...}`.
-   Use the `.tsx` extension for React components and `.ts` for other TypeScript files such as hooks, utilities, and services, that do not contain JSX.
-   Use the `.test.tsx` extension for test files.
-   Imports should not contain the `.tsx` or `.ts` extension.

### Issues

Issues should have the following format:

1. **Type**: Use one of the following prefixes to specify the nature of the change:
    - **feat** for new features or enhancements.
    - **fix** for bug fixes.
    - **chore** for routine tasks or maintenance.
    - **refactor** for code restructuring.
2. **Descriptive Text**: Add a concise descriptive text.

If applicable, also give the issue a label.

**Example**

```
fix: Failed to Login BrowserAuthError
```

### Branches

Branches should have the auto-generated name given to branches created from issues.

**Example**

```
205-fix-failed-to-login-browserautherror
```

### Commit Messages

Commit messages should follow the same format as issues, but can contain an optional body for more detailed information.

### Pull Requests

Guidelines for pull requests:

-   Pull requests must be linked to the issue they are addressing.
-   Pull requests should have the same name as the issue they are addressing.
-   When creating a pull request, use the template provided.
-   If applicable, give the pull request a label.
-   Pull requests must be reviewed by at least one other team member before merging.
-   If you make changes to the pull request after the review, you should request a new review.
