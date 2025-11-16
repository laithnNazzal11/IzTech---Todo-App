# Task Management Application

A modern, full-featured task management web application built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for managing tasks with custom statuses, user authentication, and a polished user experience.

## 🚀 Features

### Design & Styling

- **Pixel-Perfect Design**: Built with Tailwind CSS and shadcn/ui components, following Figma design specifications exactly. Every component is styled to match the provided design with precise spacing, colors, and typography.

- **Full Responsiveness**: Seamlessly works on desktop and mobile devices with adaptive layouts. The application automatically adjusts its layout, pagination, and component sizes based on screen width. Mobile devices show 4 items per page, while desktop shows 7 items per page.

- **Theme Support**: Complete light and dark theme implementation with smooth transitions. Theme preference is stored in localStorage and persists across sessions. All components are theme-aware with proper contrast and color schemes.

### Internationalization

- **Multi-Language Support**: Full support for English (en) and Arabic (ar) languages using i18next. All text content is translatable and stored in JSON translation files.

- **RTL/LTR Handling**: Proper Right-to-Left (RTL) and Left-to-Right (LTR) text direction handling. The application automatically adjusts layout, alignment, and navigation arrows based on the selected language. Arabic interface displays correctly with RTL support.

### User Authentication

- **Sign Up**: Complete registration system allowing users to create accounts with name, email, password, and optional avatar upload. Includes form validation for name uniqueness, email format validation, and password strength requirements (minimum 8 characters).

- **Sign In**: Login functionality with email and password authentication. Validates credentials against stored user data and provides clear error messages for incorrect credentials.

- **Route Protection**: Authentication guards that automatically redirect authenticated users away from sign-in/sign-up pages, and redirect unauthenticated users from protected routes like the dashboard. Ensures proper access control throughout the application.

- **Session Management**: Persistent login state using localStorage. Users remain logged in across browser sessions until they explicitly log out.

- **Logout Functionality**: Secure logout feature that clears the current user session and redirects to the sign-in page.

### User Profile

- **Avatar Upload**: Users can upload profile pictures during sign-up. The system validates image file type and size (maximum 2MB), converts images to base64 format for localStorage storage, and displays the avatar in the dashboard header.

- **Profile Display**: User avatar is displayed in the dashboard header with a fallback to default avatar if none is uploaded. Avatar popover provides access to profile options and logout.

### Task Management

- **Create Tasks**: Add new tasks with title, description, and status assignment. Tasks are immediately saved to localStorage and displayed in the task table.

- **Edit Tasks**: Update existing task details including title, description, and status. Edit modal is pre-populated with current task data for easy modification.

- **Delete Tasks**: Remove tasks with proper data cleanup. Deletion is handled securely with loading states and immediate UI updates.

- **Task Table**: Well-organized, responsive table displaying all tasks with columns for favorite status, title, description, status badge, and actions. The table adapts to screen size, hiding description column on mobile devices.

- **Task Favorites**: Star/favorite system allowing users to mark important tasks. Favorite status is visually indicated with a filled star icon and persists across sessions.

- **Search Functionality**: Real-time task search with debounced input (300ms delay) to filter tasks by title. Includes loading states during search operations and automatically resets pagination when search results change.

- **Status Updates**: Change task status dynamically from the task table using a dropdown menu. Status changes include loading indicators and immediate UI updates.

### Status Management

- **Create Statuses**: Add custom task statuses with a name and color selection. Statuses are user-specific and stored in localStorage.

- **Color-Coded Badges**: Visual status indicators with custom colors. Status badges display with the selected color and a semi-transparent background for better visibility.

- **Status Filter**: Filter and manage statuses from the dashboard. Status popover shows all available statuses and allows creation of new ones.

- **Delete Statuses**: Remove statuses with automatic cleanup of all associated tasks. When a status is deleted, all tasks using that status are also removed to maintain data consistency.

### Data Display & Navigation

- **Pagination**: Intelligent pagination system that adapts to screen size (4 items on mobile, 7 on desktop). Includes previous/next navigation buttons, current page indicators, and item count display. Properly handles RTL layout for Arabic language.

- **Empty States**: Beautiful animated empty state components for both statuses and tasks. Includes theme-aware illustrations, helpful messages, and call-to-action buttons to guide users on what to do next.

### User Experience Enhancements

- **Loading States**: Comprehensive loading indicators including skeleton loaders for initial page load, loading spinners for async operations (create, update, delete), and search loading states. Provides visual feedback during all data operations.

- **Animations**: Smooth Framer Motion animations throughout the application including page transitions, hover effects, button interactions, staggered list animations, and empty state animations. All animations use easing functions for natural movement.

- **Form Validation**: Comprehensive client-side validation for all forms. Sign-up validates name uniqueness, email format, and password strength. Sign-in validates credentials. All forms display clear, user-friendly error messages.

- **Error Handling**: Robust error handling throughout the application with user-friendly error messages displayed in modals and form fields. Errors are caught and displayed appropriately without breaking the user experience.

### Data Management

- **Local Storage**: All application data (users, tasks, statuses) is stored and managed via localStorage. Data persists across browser sessions and page refreshes.

- **Multi-User Support**: Data isolation with separate tasks and statuses per user. Each user maintains their own independent data set. User data is stored in a users array, and the current user's data is tracked separately.

- **Data Synchronization**: Changes to tasks and statuses are immediately synchronized between the current user object and the users array in localStorage, ensuring data consistency.

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Internationalization**: i18next, react-i18next
- **Storage**: localStorage


The built files will be in the `dist` directory.

## 📁 Project Structure

```
todoApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── brand/          # Brand components (Logo)
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React Context providers
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.ts
│   ├── i18n/               # Internationalization config
│   │   ├── config.ts
│   │   └── locales/        # Translation files
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   └── dashboard/      # Dashboard pages
│   ├── routes/             # Route configuration
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   │   ├── auth.ts        # Authentication utilities
│   │   ├── dashboard.ts   # Dashboard utilities
│   │   └── storage.ts     # localStorage utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                 # Static assets
│   ├── fonts/             # Custom fonts
│   └── images/            # Images and illustrations
└── dist/                  # Build output
```

## 🌐 Internationalization

The application supports two languages:
- **English (en)**: Default language with LTR text direction
- **Arabic (ar)**: Full RTL support with proper text alignment

Language preference is stored in localStorage and persists across sessions.

## 🎨 Theming

The application supports two themes:
- **Light Theme**: Default light color scheme
- **Dark Theme**: Dark mode with proper contrast

Theme preference is stored in localStorage and persists across sessions.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 391px (4 items per page in pagination)
- **Desktop**: ≥ 391px (7 items per page in pagination)

## 🔒 Data Storage

All data is stored in localStorage:
- **Users**: Array of all registered users
- **Current User**: Currently authenticated user
- **Tasks**: User-specific tasks
- **Statuses**: User-specific statuses

Each user's data is isolated and stored separately.


## 📝 Notes

- This is a frontend-only application with no backend server
- All data persists in browser localStorage
- Image uploads are converted to base64 for storage
- Maximum image size: 2MB
- Password minimum length: 8 characters

## 🎓 Best Practices

- TypeScript for type safety
- Component-based architecture
- Reusable utility functions
- Proper error handling
- Loading states for async operations
- Form validation
- Accessibility considerations
- Clean code structure
