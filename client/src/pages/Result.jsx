import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'


const Result = () => {

  const [image, setImage] = useState(assets.blank)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedButton, setSelectedButton] = useState('parsed');

  const [input, setInput] = useState('Flying Cats')
  const [result, setResult] = useState()

  const [scale, setScale] = useState(1);
  const [stretch, setStretch] = useState(0);

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        if (input) {
          const jsonData  = await generateImage(input);
          console.log(jsonData);
            if (jsonData) {
                setIsImageLoaded(true);
                setResult(jsonData);
            } else {
                toast.error(error.message || "Image generation failed.");
            }
        }
    } catch (error) {
        toast.error(error.message || "An error occurred.");
    } finally {
        setLoading(false);
    }
};

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
      setInput(file);
      setLoading(false);
      setIsImageLoaded(false);
  }
};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  
        setInput(file);
        setLoading(false);
        setIsImageLoaded(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoomIn = () => {
      setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
      setScale(scale > 0.1 ? scale - 0.1 : scale);
  };

  const handleStretchVertical = () => {
    setStretch(1);
    setScale(1);
  };

  const handleStretchHorizontal = () => {
    setStretch(0);
    setScale(1);
  };

  const getInvoiceData = (data) => {
    if (data == null) {
      return { menuItems: [], subTotal: 0, tax: 0, total: 0 };
    }
  
    const menuItems = data.pr_parse.slice(0, 5);
    const subTotal = data.pr_parse[5][0]["sub_total.subtotal_price"] || 0;
    const tax = data.pr_parse[5][1]["sub_total.tax_price"] || 0;
    const total = data.pr_parse[6][0]["total.total_price"] || 0;
  
    return { menuItems, subTotal, tax, total };
  };
  
  const { menuItems, subTotal, tax, total } = getInvoiceData(result);

  return (
    <motion.form 
    initial={{opacity: 0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y: 0}}  
    viewport={{once: true}}
    className='flex flex-col min-h-[90vh] min-w-[90vh] justify-center items-center'>
      <div className='flex flex-col gap-6'>
      <div
            className='relative border-dashed border-2 border-gray-400 min-h-[15vh] min-w-[120vh] items-center flex justify-center cursor-pointer' 
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload').click()} 
          >

            <p className='text-gray-900'>Drag and drop or select an image here</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className='hidden'
              id="file-upload"
            />
          </div>


          <div
            className='relative max-h-[60vh] min-h-[30vh] min-w-[120vh] 
            items-center flex justify-center cursor-pointer gap-6 rounded-lg'
          > 
            <div className='rounded-lg border border-gray-300 flex flex-col max-w-[60vh] min-w-[60vh] 
            min-h-[50vh] max-h-[50vh] bg-[#f5f5f5] overflow-auto'>
              <div className="w-full flex gap-2 items-center justify-center bg-[#ffffff] border border-gray-300 rounded-tl-lg rounded-tr-lg">
                <button type="button" className="h-8 px-2" onClick={handleZoomIn}>
                      <img src={assets.zoom_in} alt="" className='h-6 w-auto' />
                  </button>
                  <button type="button" className="h-8 px-2" onClick={handleZoomOut}>
                      <img src={assets.zoom_out} alt="" className='h-6 w-auto' />
                  </button>
                  <button type="button" className="h-8 px-2" onClick={handleStretchVertical}>
                      <img src={assets.stretch_ver} alt="" className='h-4 w-auto' />
                  </button>
                  <button type="button" className="h-8 px-2" onClick={handleStretchHorizontal}>
                      <img src={assets.stretch_hor} alt="" className='h-4 w-auto' />
                  </button>
              </div>
              <div className='rounded-bl-lg rounded-br-lg overflow-auto'>
                <img 
                  src={image} 
                  alt="Manipulated" 
                  className='p-1'
                  style={{
                    height: stretch === 1 ? '100%' : 'auto',
                    width: stretch === 1 ? 'auto' : '100%',
                    transform: `scale(${scale})`
                  }} 
                />
              </div>
            </div>


            <div className='rounded-lg border border-gray-300 flex flex-col max-w-[60vh] min-w-[60vh] 
            min-h-[50vh] max-h-[50vh] bg-[#f5f5f5] overflow-auto'>
              <div className="w-full flex gap-2 items-center justify-left bg-[#ffffff] border border-gray-300 rounded-tl-lg rounded-tr-lg">
                <button
                  type="button"
                  className={`h-8 px-2 text-sm ${selectedButton === 'parsed' ? 'border-b-4 border-red-500' : ''}`}
                  onClick={() => setSelectedButton('parsed')}
                >
                  Parsed
                </button>
                <button
                  type="button"
                  className={`h-8 px-2 text-sm ${selectedButton === 'json' ? 'border-b-4 border-red-500' : ''}`}
                  onClick={() => setSelectedButton('json')}
                >
                  JSON
                </button>
              </div>
              {selectedButton === 'json' ? (
                <div className="rounded-bl-lg rounded-br-lg overflow-auto" style={{ fontSize: '18px' }}>
                    <pre className="p-1">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
              )
              :
              (
                <div style={{fontSize: '18px', padding: '10px'}}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'left' }}>Name</th>
                            <th style={{  }}>Quantity</th>
                            <th style={{  }}>Price</th>
                            <th style={{  }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {menuItems.map((item, index) => {
                            const menuName = item.find(obj => obj["menu.nm"])?.["menu.nm"] || "";
                            const quantity = item.find(obj => obj["menu.cnt"])?.["menu.cnt"] || "";
                            const price = item.find(obj => obj["menu.price"])?.["menu.price"] || "";
                            
                            const quantityNumber = parseFloat(quantity);
                            const priceNumber = parseFloat(price.replace(/,/g, '')) || 0;
                            const total = quantityNumber * priceNumber;

                            return (
                              <tr key={index}>
                                <td style={{ }}>{menuName}</td>
                                <td style={{ textAlign: 'center' }}>{quantity}</td>
                                <td style={{ textAlign: 'right' }}>{price}</td>
                                <td style={{ textAlign: 'right' }}>{total}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', marginRight: '10px' }}>
                        <tbody>
                          <tr>
                            <td style={{ fontWeight: 'bold', textAlign: 'right', paddingTop: '10px'}}>Sub Total</td>
                            <td style={{ textAlign: 'right', borderTop: '1px solid #000', paddingTop: '10px' }}>{subTotal}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 'bold', textAlign: 'right' }}>Tax</td>
                            <td style={{ textAlign: 'right' }}>{tax}</td>
                          </tr>
                          <tr>
                            <td style={{  fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                            <td style={{ textAlign: 'right' }}>{total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
              )}
            </div>
            
            <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
          </div>
          <p className={!loading ? 'hidden' : ''}>Loading...</p>
      </div>



      {!isImageLoaded && (
        <div className='flex items-center gap-2 mt-10'>
          <button 
            onClick={onSubmitHandler} 
            type='submit' 
            className='bg-zinc-700 w-full sm:w-auto px-10  py-2 text-white rounded-full'
          >
            Extract
          </button>
        </div>
      )}
      
      {isImageLoaded &&
        <div className='flex gap-8 flex-wrap justify-center text-white
        text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={()=>setIsImageLoaded(false)}
          className='bg-transparent border border-zinc-900
          text-black px-8 py-2 rounded-full cursor-pointer'>Extract Another</p>
          <a href={image} download
          className='bg-zinc-900 px-10 py-2 rounded-full cursor-pointer'>Download</a>
        </div>
      }
    </motion.form>
  )
}

export default Result