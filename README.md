# tLab a TVMaze Vue Application

## Requirements

* Node version: `v25.2.1`
* Npm version: `11.6.2`

## Project Setup

### Install all packages

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Run unit tests

```bash
npm run test
```

### Project Structure

```bash
src/
├─ api/
├─ components/
├─ helpers/
├─ locales/
├─ mock-data/
├─ pages/
├─ plugins/
├─ router/
├─ stores/
└─ styles/
```

## Technical Choices

The Vue Options API was chosen to keep component structure explicit and predictable for the scope of this application.

Components are intentionally kept focused on presentation responsibilities. Application behavior, data manipulation, and API communication are centralized within stores and helper utilities whenever possible.

This approach makes it easier to:

* reuse data in different ways
* keep components maintainable
* simplify testing
* separate rendering from business logic

Routing was added early to make future page expansion more scalable and maintainable.

Additionally, small reusable helper functions are preferred whenever possible. This allows logic to be:

* reusable across the application
* independently unit tested
* easier to maintain and extend

## Architecture

The application architecture separates:

* UI rendering (Vue components)
* state management (Pinia stores)
* API communication (API service layer)
* reusable business logic (helper utilities)

This keeps components primarily focused on rendering while stores and helpers manage application behavior and business logic.


## Localization

Localization has been added to make future multilingual support easier to implement.

An additional advantage is that text labels and interface copy can be adjusted without requiring direct access to application logic.

For a small application like this, a simple helper-based solution could also have been a valid option. However, the localization setup provides more flexibility for future growth and scalability.

## State Management

The application uses Pinia for centralized state management.

Stores are responsible for:

* asynchronous data fetching
* filtering and grouping logic
* caching
* shared application state

Getters are intentionally kept synchronous and focused on derived state only, while asynchronous operations are handled through actions.

## Local Storage

The application uses localStorage instead of CacheStorage.

This decision was made because:

* the application is relatively small
* implementation is straightforward
* no asynchronous storage layer is required
* the cached data is simple and lightweight

A custom `setWithExpiry(key, value, ttl)` helper is used to provide TTL-based caching behavior within localStorage.

Cached data uses this TTL-based invalidation strategy to reduce stale API responses and unnecessary network requests.

For larger or offline-first applications, CacheStorage or IndexedDB could be more suitable alternatives.

## Data Fetching

Shows are cached locally to reduce unnecessary API requests and improve perceived performance during navigation and repeated searches.

Filtering and grouping logic are centralized within the store layer to reduce duplicated computations across components.

## Search functionality
Search functionality makes use of the TVmaze API. Search results are cached in localStorage per query for 24 hours to reduce unnecessary API requests and improve perceived responsiveness for repeated searches.

A minimum query length of 3 characters is required before triggering a search request. This helps reduce unnecessary API calls, improves result relevance, and avoids excessive network requests during typing.

Search behavior includes:
* displaying an error message when the search contains fewer than 3 characters
* accessible keyboard shortcuts

  * Focus on search field (`Cmd + K` / `Ctrl + K`)
  * Close search results (`Escape`)

Search-related logic is centralized within the store layer to:

* avoid duplicated filtering behavior across components
* simplify maintenance and testing
* keep components focused on presentation responsibilities
* provide a single source of truth for search state and behavior

Search results are normalized before entering application state to keep component rendering predictable and reduce transformation logic within the UI layer.

## Sorting functionality
Feature is to implement on later stage lazy loading of more shows. When shows are already sorted it looks `Quirky` when new shows are added. This is also not intuetive, my recommandation is to load the first 1000 shows (4 pages).

Additional sorting strategies can be added to `showHelper` without requiring changes to the store.

## Show Detail

A show can be loaded directly via its `ID`.

If the requested show is not already available in the store, it will be fetched from the API and cached separately with a TTL of 1 day.

The fetched show is intentionally not merged into the primary show listing cache. This keeps the overview dataset lightweight while still allowing direct detail page access and efficient repeated navigation.

## Styling

The project uses SCSS with reusable mixins, utilities, and design tokens.

Open Props is used to provide a lightweight and modern design foundation while still allowing flexibility in styling and theming.

## Responsive Design

The interface is built mobile-first and optimized for both touch and desktop interactions.

Horizontal scrolling areas make use of scroll snapping to improve navigation and usability on smaller screens.

## Accessibility

Semantic HTML and accessible form controls have been preferred where possible.

This includes:

* button labels
* semantic form structure
* keyboard interactions such as:

  * Escape to close active search results
  * Command + K / Ctrl + K to focus the search field

## Testing

The project includes unit tests for:

* reusable helper functions
* component rendering
* store logic
* validation flows

The goal is to keep business logic independently testable whenever possible.

## Trade-offs

Some solutions were intentionally kept lightweight to avoid overengineering for the scale of this application.

Examples include:

* using localStorage instead of more advanced browser storage solutions
* limiting abstraction layers where unnecessary
* keeping components focused on rendering responsibilities

## Potential Future Improvements

Potential future improvements could include:

* infinite scrolling
* lazy-loaded routes
* expanded localization support
* skeleton loading states
* offline-first caching strategies
* end-to-end testing
* improved filtering and discovery features
