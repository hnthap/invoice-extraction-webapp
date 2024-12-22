import { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const Header = () => {

  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div className='flex flex-col justify-center
    items-center text-center my-20 '
    initial={{opacity: 0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    >

        <motion.div className='text-stone-500 inline-flex text-center gap-2
        bg-white px-6 py-1 rounded-full border border-neutral-500'
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2, duration: 0.8}}
        >

            <p>Premier Automated Invoice Extraction Solution</p>
            <img src={assets.star_icon} alt=""/>
        </motion.div>

        <motion.h1 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.4, duration: 2}}
        className='text-4xl max-w-[300px] sm:text-6xl sm:max-w-[1000px]
        mx-auto mt-10 text-center'>Immediate Extraction of 
        <span className='text-blue-600'> Invoice</span> Information.</motion.h1>

        <motion.p className='text-center max-w-xl mx-auto mt-5'
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.6, duration: 0.8}}
        >If you&apos;re looking to streamline your workflow, effortlessly extract invoice data in seconds—just upload your invoice and watch the process unfold.</motion.p>

        <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 
        px-12 py-2.5 flex items-center gap-2 rounded-full'
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{default: { duration: 0.5}, 
        opacity: {delay: 0.8, duration: 1}}}
        >
          Extract Invoice Data
          <img className='h-6' src={assets.star_group} alt=""/>
        </motion.button>

        <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1, duration: 1}}
        >
          {Array(6).fill('').map((item, index)=>(
            <motion.img 
            whileHover={{scale: 1.05, duration: 0.1}}
            className='rounded hover:scale-105 transition-all duration-300 
            cursor-pointer max-sm:w-10'
            src={index % 2 === 0 ? assets.invoice_sample_1 : assets.invoice_sample_2} 
            alt="" width={100} key={index} />
          ))}
        </motion.div>

        <motion.p 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.2, duration: 0.8}}
        className='mt-2 text-neutral-600'>Extract Invoice data from Boboiboy</motion.p>
    </motion.div>
  )
}

export default Header