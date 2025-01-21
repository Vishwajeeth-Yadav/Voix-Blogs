import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Logo from '../../assets/Logo_4.png'
import Bg from '../../assets/bg6.png'


function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <section 
            // style={{ background: mode === 'dark' ? '#111111' : 'white' }}
            style={{backgroundImage:`url(${Bg})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}
            className='w-full h-[80vh]'
            >

            {/* Hero Section  */}
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                {/* Main Content  */}
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            {/* Image  */}
                            <div className="flex justify-center">
                                <img src={Logo} className='animate-[bounce_2s_ease-in-out_infinite] md:w-[25vw]   h-auto' alt="" />
                            </div>

                            {/* Text  */}
                            {/* <h1 className=' text-5xl font-bold' style={{ color: mode === 'dark' ? 'white' : 'Black', fontFamily:'Brush Script MT'  }}>Voix</h1> */}
                        </div>

                        {/* Paragraph  */}
                        <p
                            style={{ color: mode === 'dark' ? 'white' : 'Black' ,
                                textShadow:'-2px 1px gray'
                            }}
                            className="sm:text-3xl xs:text-2xl text-xl font-semibold sm:mx-auto ">
                            Here are some blogs and tutorials contributed by Voix.
                        </p>
                    </div>

                </main>
            </div>
        </section>
    )
}

export default HeroSection

