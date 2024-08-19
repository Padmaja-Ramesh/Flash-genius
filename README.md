
# 📚 Flash Genius: Battle Your Knowledge

**Flash Genius** is a gamified flashcard application that lets users create, study, and challenge their friends with multimedia flashcards. Built with **Next.js** for fast performance, **Clerk** for secure authentication, and **Stripe** for monetization features, it offers a modern, engaging learning experience.

## 🚀 Demo

You can view the live app [here](https://flashgenius.vercel.app).

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Authentication:** [Clerk](https://clerk.dev/)
- **Payments:** [Stripe](https://stripe.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 📂 Project Structure

```bash
📦 flash-genius
├── 📁 app
│   ├── 📄 page.js         # Main landing page
│   ├── 📁 flashcards      # Flashcard creation and study feature
│   ├── 📁 battles         # Real-time flashcard battles
├── 📁 components          # Reusable UI components (Navbar, Flashcard, etc.)
├── 📁 styles              # Global and component-specific styles
├── 📁 utils               # Utility functions and API wrappers
├── 📄 package.json        # Project dependencies and scripts
└── 📄 README.md           # Project documentation
```

## 🧩 Features

- **User Authentication:** Powered by **Clerk** for secure login and signup (social logins supported).
- **Flashcard Creation:** Users can create and organize flashcards with text, images, and multimedia content.
- **Flashcard Battles:** Users can challenge friends or others in real-time flashcard battles.
- **Stripe Integration:** Offers in-app purchases for premium flashcard sets and additional features.
- **Progress Tracking:** Keep track of learning streaks, flashcard mastery, and performance.
- **Leaderboards & Achievements:** Gamified experience with global leaderboards and rewards for achievements.

## 🛠️ Installation

### Prerequisites

Before you begin, ensure you have:

- Node.js installed (v14 or higher)
- A Stripe and Clerk account with respective API keys
- A Vercel account for deployment

### Clone the Repository

```bash
git clone https://github.com/yourusername/flash-genius.git
cd flash-genius
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```bash
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key

NEXT_PUBLIC_VERCEL_URL=https://flashgenius.vercel.app
```

### Running the App Locally

```bash
npm run dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

## 💳 Payments Setup with Stripe

To enable in-app purchases:

1. [Sign up](https://stripe.com/) for a Stripe account.
2. Configure your Stripe API keys in the `.env.local` file.
3. Add your product listings to the Stripe dashboard.
4. Implement payment processing with Stripe on the `/premium` route.

## 🔑 Authentication Setup with Clerk

1. [Sign up](https://clerk.dev/) for a Clerk account.
2. Configure your Clerk API keys in the `.env.local` file.
3. Wrap your app with the `ClerkProvider` to enable authentication features.
4. Use Clerk hooks (like `useUser`) to access user data.

## 🚀 Deployment on Vercel

1. Push your repository to GitHub or any Git provider.
2. [Sign up](https://vercel.com/signup) for a Vercel account.
3. Link your repository to Vercel and follow the deployment instructions.
4. Add your environment variables (`NEXT_PUBLIC_CLERK_FRONTEND_API`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, etc.) in the Vercel dashboard.

Your app will be automatically deployed once you push to the main branch.

## 📦 Dependencies

- **Next.js** – Frontend framework
- **Clerk** – User authentication
- **Stripe** – Payment processing
- **React** – UI library
- **Vercel** – Hosting and deployment platform

## 🤝 Contributing

If you'd like to contribute to Flash Genius, feel free to open a pull request or issue. We welcome all suggestions to improve the app.

## 📧 Contact

For any queries, reach out to us at [support@flashgenius.com](mailto:padmajaramesh1205@gmail.com).
