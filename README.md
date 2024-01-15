# inventory-app

This is the app for the [WellPartner Inventory API](https://github.com/OptiCorp/inventory-api).
The system keeps track of their items: **Units**, **Assemblies**, **Subassemblies** and **Parts**.

-   Units consists of Assemblies
-   Assemblies consists of Subassemblies and/or Parts
-   Subassemblies consists of Parts

## Key Features

This section contains information about the app pages.

### /search

-   Search for items containing the search string in Id, WellPartner Id, serial number or description

### /{itemId}

-   View and edit an item's information

### /add-part

-   Add a new part

### /makelist

-   View, delete and add new lists

### /makelist/{listId}

-   Add and remove items in a list

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

## Development tools

-   [Prettier](https://prettier.io/)
-   [ESLint](https://eslint.org/)

## Proper Code Etiquette Guidelines

### Naming Conventions

#### Files and Folders
- Apply camelCase for folder names, such as `userProfilePage`, with the exception of component folder names that should be capitalized, i.e `UserProfile`.
- Choose descriptive names for component files. For instance, use `UserProfile.tsx` instead of generic names like `Component1.tsx` or `Index.tsx`.
- Organize folder structure hierarchically, considering trees and pages. Fro example, use `src/pages/add-part/.../batch`, where the batch directory is a subdirectory of its parent, and so forth.
- Ensure page folders align with their corresponding URL segments. For example, name the page folder as `add-part-form` in `src/pages/add-part/add-part-form`, resulting in the URL `https://.../add-part/add-part-form`.

#### Issues

Issues should have the following format:

1. **Type**: Use one of the following prefixes to specify the nature of the change:
    - **feat** for new features or enhancements.
    - **fix** for bug fixes.
    - **chore** for routine tasks or maintenance.
    - **refactor** for code restructuring.
2. **Descriptive Text**: Add a concise descriptive text.

```
fix: Failed to Login BrowserAuthError
```

#### Branches

Branches should have the auto-generated given to branches created from issues.

```
205-fix-failed-to-login-browserautherror
```

#### Commit Messages
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

