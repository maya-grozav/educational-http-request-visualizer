# HTTP Request Visualizer

An educational full-stack web application designed to illustrate how the internet works. This project features a custom-built "pseudo-browser" that runs inside your actual browser. As users navigate through mock websites, an integrated inspection panel visualizes the underlying HTTP requests, responses, and network traffic in real-time.

## Key Features

* **Simulated Browser Interface:** A fully functional mock browser featuring an address bar, multi-tab support, back/forward history navigation, and a refresh button.
* **Real-time Network Inspection:** A dedicated side-panel that captures and breaks down the network requests happening behind the scenes as users interact with the simulated web pages.
* **Integrated Mock Websites:** Includes built-in, functional mock websites, including a Search Engine and a Wiki platform, served by the custom backend.
* **Dynamic AI Overviews:** Integrates the Gemini API to generate intelligent fallback content for unindexed search terms, simulating a modern, realistic browsing experience.
* **Authentication & Premium Tiers:** Full user account system with JWT authentication and Stripe integration to manage billing and premium feature access.

## Tech Stack

### Frontend
* **Framework:** React
* **State Management:** React Context API
* **Architecture:** Component-driven design separating the browser UI, mock websites, and the data inspector

### Backend
* **Runtime:** Node.js with Express
* **Database:** MongoDB
* **Integrations:** Gemini API (AI generation), Stripe API (Payments)

## Administration
The application includes a dedicated `/admin` route allowing administrators to easily populate the database with mock content (`AddSearchIndex`, `AddWikiPage`) for the integrated search engine and wiki platforms.
