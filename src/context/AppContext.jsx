import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext(null);

const ADMIN_ACCOUNT = {
  name: 'EstateHub Admin',
  email: 'admin@estatehub.com',
  phone: '',
  city: '',
  role: 'admin',
};

export function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage('estatehub_user', null);

  const [registeredUsers, setRegisteredUsers] = useLocalStorage(
    'estatehub_registered_users',
    []
  );

  /*
   * Favorites are now stored separately for each user.
   *
   * Example:
   * {
   *   "user-id-1": [1, 4],
   *   "user-id-2": [2],
   *   "admin-account": []
   * }
   */
  const [favoriteStore, setFavoriteStore] = useLocalStorage(
    'estatehub_favorites_by_user',
    {}
  );

  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    'estatehub_recent',
    []
  );

  const [compareIds, setCompareIds] = useLocalStorage(
    'estatehub_compare',
    []
  );

  /*
   * Get favorites only for the currently logged-in user.
   *
   * If there is no logged-in user, return an empty array.
   */
  const favorites = useMemo(() => {
    if (!user?.id) {
      return [];
    }

    return favoriteStore[user.id] || [];
  }, [user, favoriteStore]);

  /*
   * Register a new user account.
   */
  const register = useCallback(
    (userData) => {
      const newUser = {
        id: Date.now().toString(),
        name: userData.name.trim(),
        email: userData.email.trim().toLowerCase(),
        phone: userData.phone.trim(),
        city: userData.city?.trim() || '',
        password: userData.password,
        role: 'user',
        joined: new Date().toLocaleDateString('en-IN', {
          month: 'short',
          year: 'numeric',
        }),
      };

      setRegisteredUsers((prev) => {
        const withoutDuplicate = prev.filter(
          (account) => account.email !== newUser.email
        );

        return [...withoutDuplicate, newUser];
      });

      /*
       * Create an empty favorites list for the new user.
       */
      setFavoriteStore((prev) => ({
        ...prev,
        [newUser.id]: [],
      }));

      setUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        city: newUser.city,
        role: newUser.role,
        joined: newUser.joined,
      });

      return {
        success: true,
        user: newUser,
      };
    },
    [setRegisteredUsers, setFavoriteStore, setUser]
  );

  /*
   * Login an existing account.
   */
  const login = useCallback(
    (email, password) => {
      const normalizedEmail = email.trim().toLowerCase();

      /*
       * Admin account.
       */
      if (
        normalizedEmail === 'admin@estatehub.com' &&
        password === 'admin123'
      ) {
        const adminUser = {
          ...ADMIN_ACCOUNT,
          id: 'admin-account',
          joined: 'Admin Account',
        };

        /*
         * Make sure admin has its own empty favorites list.
         */
        setFavoriteStore((prev) => ({
          ...prev,
          'admin-account': prev['admin-account'] || [],
        }));

        setUser(adminUser);

        return {
          success: true,
          user: adminUser,
        };
      }

      /*
       * Find the account created through Sign Up.
       */
      const account = registeredUsers.find(
        (entry) =>
          entry.email === normalizedEmail &&
          entry.password === password
      );

      if (!account) {
        return {
          success: false,
          message: 'Invalid email or password.',
        };
      }

      const loggedInUser = {
        id: account.id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        city: account.city,
        role: 'user',
        joined: account.joined,
      };

      /*
       * If this user has never had favorites before,
       * create an empty list.
       *
       * Existing favorites for this user are preserved.
       */
      setFavoriteStore((prev) => ({
        ...prev,
        [account.id]: prev[account.id] || [],
      }));

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    },
    [registeredUsers, setUser, setFavoriteStore]
  );

  /*
   * Logout current account.
   *
   * Favorites are NOT deleted.
   * They remain saved for that specific user.
   */
  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  /*
   * Update profile information.
   */
  const updateProfile = useCallback(
    (updates) => {
      setUser((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          ...updates,
          email: updates.email
            ? updates.email.trim().toLowerCase()
            : prev.email,
          name: updates.name?.trim() || prev.name,
          phone: updates.phone?.trim() || prev.phone,
          city: updates.city?.trim() || prev.city,
        };
      });

      setRegisteredUsers((prev) =>
        prev.map((account) =>
          account.email === user?.email
            ? {
                ...account,
                ...updates,
                email: updates.email
                  ? updates.email.trim().toLowerCase()
                  : account.email,
                name: updates.name?.trim() || account.name,
                phone: updates.phone?.trim() || account.phone,
                city: updates.city?.trim() || account.city,
              }
            : account
        )
      );
    },
    [setUser, setRegisteredUsers, user]
  );

  /*
   * Add or remove a favorite for the CURRENT USER only.
   */
  const toggleFavorite = useCallback(
    (propertyId) => {
      if (!user?.id) {
        return;
      }

      setFavoriteStore((prev) => {
        const currentFavorites = prev[user.id] || [];

        const updatedFavorites = currentFavorites.includes(propertyId)
          ? currentFavorites.filter((id) => id !== propertyId)
          : [...currentFavorites, propertyId];

        return {
          ...prev,
          [user.id]: updatedFavorites,
        };
      });
    },
    [user, setFavoriteStore]
  );

  /*
   * Compare properties.
   */
  const toggleCompare = useCallback(
    (propertyId) => {
      setCompareIds((prev) =>
        prev.includes(propertyId)
          ? prev.filter((id) => id !== propertyId)
          : prev.length < 4
            ? [...prev, propertyId]
            : prev
      );
    },
    [setCompareIds]
  );

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, [setCompareIds]);

  /*
   * Recently viewed properties.
   */
  const addRecentlyViewed = useCallback(
    (propertyId) => {
      setRecentlyViewed((prev) => {
        const withoutCurrent = prev.filter(
          (id) => id !== propertyId
        );

        return [propertyId, ...withoutCurrent].slice(0, 5);
      });
    },
    [setRecentlyViewed]
  );

  const value = useMemo(
    () => ({
      user,

      register,
      login,
      logout,
      updateProfile,

      registeredUsers,

      favorites,
      toggleFavorite,

      recentlyViewed,
      addRecentlyViewed,

      compareIds,
      toggleCompare,
      clearCompare,
    }),
    [
      user,
      register,
      login,
      logout,
      updateProfile,
      registeredUsers,
      favorites,
      toggleFavorite,
      recentlyViewed,
      addRecentlyViewed,
      compareIds,
      toggleCompare,
      clearCompare,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}