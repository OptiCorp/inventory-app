# inventory-app

This is the app for the [WellPartner Inventory API](https://github.com/OptiCorp/inventory-api).
The system keeps track of their items: **Units**, **Assemblies**, **Subassemblies** and **Parts**.

- Units consists of Assemblies
- Assemblies consists of Subassemblies and/or Parts
- Subassemblies consists of Parts

## Key Features
This section contains information about the app pages.

### /search

- Search for items containing the search string in Id, WellPartner Id, serial number or description


### /{itemId}

- View and edit an item's information

### /add-part

- Add a new part

### /makelist

- View, delete and add new lists

### /makelist/{listId}

- Add and remove items in a list


## Architecture

- TypeScript
- React
- Vite
- [ReactQuery](https://tanstack.com/query/v3/)
- Azure App Service with Entra authentication and authorization
- Deployment to Azure using GitHub Actions

## Install & Run

Clone and Run the application:

1. Clone the repo
2. Navigate to project folder: `inventory-app`
3. Run the app: `npm run dev`

## Development tools
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## Branch name convention
1. type (feat, fix, chore, refactor)
2. Issue number
3. Descriptive text.

### Example:

```
feat/#1/users-endpoint
```