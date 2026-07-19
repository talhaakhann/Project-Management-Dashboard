'use client'

import SettingsProfile from '@/components/profile/settings-profile'
import api from '@/lib/axios'
import { User } from '@/types/enums/user.enum'
import ApiResponse from '@/types/ApiResponse'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

function page() {
    return (
        <SettingsProfile />
    )
}

export default page

