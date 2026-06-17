'use client'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import MainLayout from '@/components/MainLayout'
import { ThemeProvider, useTheme } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

const Providers: FC<PropsWithChildren> = ({ children }) => {

    const [client] = useState(() => new QueryClient());

    return (

        <ThemeProvider attribute="class" defaultTheme="light">
            <QueryClientProvider client={client}>
                <SessionProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </SessionProvider>
            </QueryClientProvider>
        </ThemeProvider>

    )
}

export default Providers