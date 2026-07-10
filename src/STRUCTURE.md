# Frontend Project Structure

## 📁 Folder Organization

```
src/
├── components/          # Reusable React components
│   ├── owner/          # Owner-specific components
│   ├── tenant/         # Tenant-specific components
│   └── ...             # Other components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   └── index.js        # Store configuration
├── constants/          # Application constants
├── types/              # Type definitions
├── middlewares/        # API and other middlewares
├── utils/              # Utility functions
├── services/           # API services
├── styles/             # Global styles
└── context/            # React Context providers
```

## 🪝 Custom Hooks

### Available Hooks in `/src/hooks/`

#### 1. **useAuth()**
Manages authentication state and operations.

```javascript
import { useAuth } from '@/hooks';

function MyComponent() {
  const { user, isAuthenticated, loading, error, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <>
      {isAuthenticated ? (
        <div>
          Welcome {user?.name}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Please login</div>
      )}
    </>
  );
}
```

#### 2. **useUI()**
Manages UI state like sidebar, theme, notifications, modals.

```javascript
import { useUI } from '@/hooks';

function MyComponent() {
  const { 
    sidebarOpen, 
    theme, 
    notifications,
    toggleSidebar,
    setTheme,
    addNotification,
    openModal 
  } = useUI();
  
  const handleNotify = () => {
    addNotification({
      message: 'Success!',
      type: 'success',
      duration: 3000,
    });
  };
  
  return (
    <>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <button onClick={handleNotify}>Show Notification</button>
    </>
  );
}
```

#### 3. **useFetch(url, options)**
Fetches data from API with automatic loading/error handling.

```javascript
import { useFetch } from '@/hooks';

function PropertyList() {
  const { data: properties, loading, error, fetch } = useFetch(
    'http://api.example.com/properties'
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {properties?.map(prop => (
        <li key={prop.id}>{prop.title}</li>
      ))}
    </ul>
  );
}
```

#### 4. **useLocalStorage(key, initialValue)**
Manages localStorage with JSON serialization.

```javascript
import { useLocalStorage } from '@/hooks';

function MyComponent() {
  const [settings, setSettings, removeSettings] = useLocalStorage(
    'userSettings', 
    { theme: 'light' }
  );
  
  return (
    <div>
      <p>Current theme: {settings.theme}</p>
      <button onClick={() => setSettings({ theme: 'dark' })}>
        Change Theme
      </button>
    </div>
  );
}
```

#### 5. **useAppDispatch() & useAppSelector()**
Redux hooks with better typing.

```javascript
import { useAppDispatch, useAppSelector } from '@/hooks';
import { someAction } from '@/store/slices/someSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.someName.data);
  
  return (
    <button onClick={() => dispatch(someAction())}>
      Do Something
    </button>
  );
}
```

## 🔴 Redux Store

### Store Structure

The Redux store is configured in `/src/store/index.js` and includes:

- **auth**: Authentication state (user, token, loading, error)
- **ui**: UI state (sidebar, theme, notifications, modals)

### Available Actions

#### Auth Actions
```javascript
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout,
  setUser,
  clearError 
} from '@/store/slices/authSlice';
```

#### UI Actions
```javascript
import { 
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
  setLoading 
} from '@/store/slices/uiSlice';
```

### Using Redux in Components

```javascript
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/store/slices/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
}
```

## 📋 Constants

Constants are stored in `/src/constants/` and include:

- **API endpoints**
- **HTTP methods**
- **HTTP status codes**

```javascript
import { ENDPOINTS, API_BASE_URL } from '@/constants';

// Usage
const url = `${API_BASE_URL}${ENDPOINTS.PROPERTIES.LIST}`;
```

## 🔧 Setting Up Redux Provider

Make sure to wrap your app with Redux Provider in `main.jsx`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

## 📦 Creating New Slices

To add a new Redux slice:

1. Create a new file in `/src/store/slices/mySlice.js`
2. Use `createSlice` from Redux Toolkit
3. Export the reducer and actions
4. Add to store configuration in `/src/store/index.js`

Example:
```javascript
import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
  name: 'myFeature',
  initialState: { data: null, loading: false },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = mySlice.actions;
export default mySlice.reducer;
```

## 🪝 Creating New Hooks

To create a new custom hook:

1. Create a new file in `/src/hooks/useMyHook.js`
2. Follow the pattern of existing hooks
3. Export it from `/src/hooks/index.js`

Example:
```javascript
import { useState, useCallback } from 'react';

export const useMyHook = () => {
  const [state, setState] = useState(null);
  
  const updateState = useCallback((value) => {
    setState(value);
  }, []);
  
  return { state, updateState };
};
```

## 📝 Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Paband
```

## ✅ Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
