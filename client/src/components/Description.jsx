import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
  return (
    <motion.div 
    initial={{opacity: 0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    className='flex flex-col items-center
    justify-center my-32 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl
        font-semibold mb-2'>Extract Invoice Data</h1>
        <p className='text-gray-500 mb-8'>Transform Your Invoice Information Effortlessly</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row 
        items-center'>
            <img className='w-80 xl:2-96 rounded-lg' 
            src={assets.invoice_sample_3} alt="" />
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>
                    Introducing the AI-Powered Invoice Extraction Tool.
                </h2>
                <p className='text-gray-600 mb-4'>
                    Easily streamline your workflow with our advanced solution. Whether you need to capture crucial data or organize your invoices, our tool extracts information quickly and accurately with just a few clicks. Upload your invoice, and watch the data come to life instantly.
                </p>
                <p className='text-gray-600 mb-4'>
                    Effortlessly manage your invoices with our cutting-edge extraction tool. Capture essential details in seconds and improve your efficiency. Just upload your document, and see the results unfold instantly.
                </p>
            </div>
            
        </div>
    </motion.div>
  )
}

export default Description