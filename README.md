# 📰 Responsive News Dashboard with Payout System

A modern React-based dashboard that fetches live news articles from the News API and provides filtering, admin-level payout management, export options, and a secure login system.

## 🚀 Features

### ✅ User Functionality

- Secure login system (admin vs user roles)
- Live news fetching with:
  - Search
  - Category
  - Author
  - Date range filters
- News overview with article cards and meta info
- Article payout calculation for users

### 🛡️ Admin Functionality

- Admin-only access to payout summary table
- Dynamic rate per article configuration
- Total payout calculation
- Role-based restrictions for payout management

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/               # Login, Auth form components
│   ├── Dashboard/          # Admin/User dashboard layout
│   ├── News/
│   │   ├── Filters.js      # Filter component (search, category, date, author)
│   │   ├── NewsList.js     # Lists all news articles
│   │   ├── Overview.js     # Shows stats like total articles
│   │   ├── PayoutCalculator.js # Calculates total payout
│   │   └── PayoutTable.js  # Admin-only payout table
├── redux/
│   ├── store.js            # Redux store configuration
│   └── reducers/
│       ├── newsReducer.js  # Handles API fetch + payout data
│       └── authReducer.js  # Handles login/user state
├── utils/
│   └── api.js              # Axios or Fetch API utility
└── App.js
```

## 🧠 Technologies Used

- **React** (with Hooks)
- **Redux Toolkit** for state management
- **React Router DOM** for routing
- **NewsAPI.org** integration
- **Conditional rendering** for admin-only access
- **LocalStorage** for storing payout rates
- **CSS/SCSS** (custom or framework) for UI styling

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/news-dashboard.git](https://github.com/dwitia007/newspost_api.git)
cd news-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variable

Create a `.env.local` file in the root of the project and add your News API key:

```
REACT_APP_NEWS_API_KEY=your_api_key_here
```

> Get your free API key from: [https://newsapi.org](https://newsapi.org)

### 4. Run the Development Server

```bash
npm start
```

## ✍️ Important Files Summary

| File                  | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `Filters.js`          | User input fields to filter news by query, category, etc. |
| `NewsList.js`         | Renders news articles as cards with loading/error states  |
| `Overview.js`         | Dashboard stats like total articles                       |
| `PayoutCalculator.js` | Allows users to view total payout for displayed articles  |
| `PayoutTable.js`      | Admin-only table to manage payouts                        |
| `newsReducer.js`      | Handles news fetch and payout state                       |
| `authReducer.js`      | Stores and manages login session and role                 |
| `.env.local`          | Contains your API key (never commit this)                 |

## 🔒 Admin Access

Admins can:

- View and manage all payouts
- Adjust rate per article
- View full payout breakdown table

Role-based checks are handled via `auth.user.role === 'admin'`.

## 📤 Future Enhancements

- Export payouts as PDF/CSV
- Pagination support
- Add charts/graphs for stats
- Email notifications
- OAuth-based login (Google/GitHub)

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Dwitia Sisodia
