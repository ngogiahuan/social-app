import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='select-none'>
                <div className='w-full font-semibold text-center text-9xl'>404</div>
                <div className='text-5xl'>Page Not Found</div>
            </div>
            <Button className='mt-6'>
                <Link to={"/"}>
                    Back to Home
                </Link>
            </Button>
        </div >
    )
}

export default NotFound