# data-research-labs-challenge

This project is a Developer Challenge solution in a React app using Tailwind CSS and TypeScript. The form dynamically renders fields based on JSON configuration, handle dependent fields and conditional visibility, and perform validation. It also features persistent storage using `localStorage` to retain user data across sessions, along with options to clear and restore form state

## Features

- **Dynamic Form Generation**: Renders form fields dynamically based on a JSON schema. Each field is configured by its type, label, placeholder, and options (for select fields).
- **Dependent Fields**: Shows certain fields based on the values of others, as per a `visibilityConditions` property in the JSON schema.
- **Validation**: Enforces field-specific validation rules, displaying errors when input does not meet criteria such as `required`, `minLength`, `maxLength`, or `pattern`.
- **State Persistence**: Saves form data to `localStorage` on each update. On page load, the saved form state is restored.
- **Control Buttons**:
  - **Clear Form**: Resets the form to its initial state and clears `localStorage`.
  - **Restore Saved State**: Reloads the form from the last saved state in `localStorage`.
- **Live JSON Preview**: Displays a live preview of the current form state as JSON, updating with user interactions.

## Installation

To set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/vkorshunovv/data-research-labs-challenge.git

   ```

2. **Navigate to the project directory**:

   ```bash
   cd data-research-labs-challenge

   ```

3. **Install dependencies**:

   ```bash
   npm install or yarn install

   ```

4. **Install Taiwind CSS**:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

   ```

5. **Configure Taiwind CSS**:
   Add the paths to all of your template files in your tailwind.config.js file.

   ```bash
    export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
   };

   ```

6. **Add directives to your CSS**:
   Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

   ```bash
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   ```

7. **Start your local development server**:

   ```bash
   npm run dev

   ```


** `Tip: After setting up Tailwind, you may need to restart the development server for the styles to load properly. Enjoy :)` **

# data-research-labs-challenge
