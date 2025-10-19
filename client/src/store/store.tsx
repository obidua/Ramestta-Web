import { create } from 'zustand';

const BASE_URL = "https://newapi.ramestta.com";

type Permissions = {
    postBlog?: boolean;
    replyMessage?: boolean;
    editBlog?: boolean;
    deleteBlog?: boolean;
    manageUsers?: boolean;
};

interface AuthState {
    userToken: string | null;
    userId: string | null;
    isAdmin: boolean;
    permissions: Permissions | null;
    isLoading: boolean;
    error: string | null;

    loginUser: (email: string, password: string) => Promise<void>;
    loginAdmin: (email: string, password: string) => Promise<void>;
    logout: () => void;

    fetchPermissions: (userId: string) => Promise<void>;
    updatePermissions: (
        userId: string,
        adminId: string,
        newPermissions: Partial<Permissions>
    ) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    userToken: localStorage.getItem('userToken'),
    userId: localStorage.getItem('userId'),
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    permissions: null,
    isLoading: false,
    error: null,




    // ========================================================
    // Admin Related Functionality
    // ========================================================

    loginAdmin: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch(`${BASE_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Admin login failed');

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('isAdmin', 'true');


            set({
                userToken: data.token,
                isAdmin: true,
                isLoading: false
            });
        } catch (err: any) {
            set({ error: err.message || 'Admin login failed', isLoading: false });
        }
    },

    logout: () => {
        localStorage.clear();
        set({
            userToken: null,
            userId: null,
            isAdmin: false,
            permissions: null,
            isLoading: false,
            error: null
        });



    },


    // ========================================================
    // User Related Functionality
    // ========================================================

    loginUser: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch(`${BASE_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            console.log("response data ", data)
            if (!res.ok) throw new Error(data.message || 'Login failed');

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userToken', 'false');


            set({
                userToken: data.token,
                isAdmin: false,
                isLoading: false
            });
        } catch (err: any) {
            set({ error: err.message || 'User login failed', isLoading: false });
        }
    },




    fetchPermissions: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch(`${BASE_URL} / user / ${userId}`);
            const data = await res.json();
            set({
                permissions: data?.user?.permission?.permissions || null,
                isLoading: false
            });
        } catch (err) {
            set({ error: 'Failed to fetch permissions', isLoading: false });
        }
    },

    updatePermissions: async (userId, adminId, newPermissions) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch(`${BASE_URL} / admin / assign - permission`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    adminId,
                    permissions: newPermissions
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Update failed');
            set({
                permissions: data?.user?.permission?.permissions || null,
                isLoading: false
            });
        } catch (err: any) {
            set({ error: err.message || 'Failed to update permissions', isLoading: false });
        }
    }
}));
