import React from 'react'

const Total = () => {
    return (
        <>
            <div className="total mt-16 mx-5 lg:mx-28">
                <h2 className='font-bold text-3xl'> Cart Totals</h2>
                <div className='mt-4'>
                    <div className='border-b border-black justify-between flex w-80'>
                        <p className='mx-2' id='sub'>Subtotal</p>
                        <p className='mx-2'>0</p>
                    </div>
                    <div className='mt-3 border-b border-black w-80 justify-between flex'>
                        <p className='mx-2'>Delivery fee</p>
                        <p className='mx-2'>50</p>
                    </div>
                    <div  className='mt-3 w-80 justify-between flex'>
                    <p className='mx-2'>Total</p>
                        <p className='mx-2'>0</p>
                    </div>
                </div>
            </div>
<br /><br /><br /><br /><br />
        </>
    )
}

export default Total