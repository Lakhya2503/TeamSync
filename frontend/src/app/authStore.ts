import { type StoreApi }  from 'zustand'
import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware"
import type { AuthLogin, AuthRegister, AuthResponse, userType } from '../types/user.type'
import { authRegister, authLogin, authLogout } from '../apis/apis';
import type { AxiosResponse } from 'axios';

interface AuthStore {
    user : userType | null;
    isAuthenticated : boolean;
    userRegister : (data : AuthRegister) => Promise<void>
    userLogin : (data : AuthLogin) => Promise<AxiosResponse<AuthResponse>>
    userLogout : () => Promise<void>
}

const authStore = (
    set : StoreApi<AuthStore>['setState']
):AuthStore => ({
    user : null,
    isAuthenticated : false,
    userRegister : async(data:AuthRegister) => {
        const res = await authRegister(data)
        set ({
            user : null,
            isAuthenticated : false
        })
        return res.data
    },
    userLogin : async(data:AuthLogin) => {
        const res = await authLogin(data)
        set ({
            user : res.data.data.user,
            isAuthenticated : true
        })
        return res.data
    },
     userLogout : async() => {
        const res = await authLogout()
        set ({
            user : null,
            isAuthenticated : false
        })
        return res.data
    },
})

const useAuthStore = create(
    devtools(
        persist(authStore,{
            name : "auth"
        })
    )
)

export default useAuthStore;
