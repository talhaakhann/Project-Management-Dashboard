"use client"
import api from '@/lib/axios'
import { login, logout, setLoading } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AppLoader } from '@/components/skeletons/app-loader';

function AuthInitializer({ children }:
    { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);


    useEffect(() => {

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
        return <AppLoader />
    }

    return (
        <>
            {children}
        </>
    )
}


export default AuthInitializer