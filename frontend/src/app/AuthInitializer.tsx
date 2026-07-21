"use client"
import api from '@/lib/axios'
import { login, logout, setLoading } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DashboardContentSkeleton } from '@/components/skeletons/dashboard-content-skeleton';

function AuthInitializer({ children }:
    { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector((state) => state.auth);


    useEffect(() => {
         console.log("AuthInitializer mounted");
        async function reloadUser() {
            try {
                const res = await api.get("/get-user")
                dispatch(login(res.data.data))
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    dispatch(logout());
                }
                else {
                    console.error(error);
                }
            } finally {
                dispatch(setLoading(false))
            }
        }
        reloadUser()

       
    }, [dispatch])

    if (loading) {
        return <DashboardContentSkeleton />
    }

    return (
        <>
            {children}
        </>
    )
}


export default AuthInitializer