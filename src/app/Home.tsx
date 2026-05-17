import React from 'react'

const data = [
    { number: '1', text: '' },
    { number: '2', text: 'abc' },
    { number: '3', text: 'def' },
    { number: '4', text: 'ghi' },
    { number: '5', text: 'jkl' },
    { number: '6', text: 'mno' },
    { number: '7', text: 'pqrs' },
    { number: '8', text: 'tuv' },
    { number: '9', text: 'wxyz' },
    { number: '*', text: '+' },
    { number: '0', text: '-' },
    { number: '#', text: '|' },
]

export function Home() {
    return (
        <div className='w-screen flex justify-center'>
            <div className=' flex flex-col border-2 border-[#1a1a1a] rounded-xl bg-[#444444]'>
            {data.map((d)=> (
                 <div key='data.number' className='px-6 py-4 bg-[#333333] rounded-lg'>{data.number}</div>
            ))}

                <div className='flex gap-6'>
                   
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>2</div>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>3</div>
                </div>
                <div className='flex gap-6'>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>1</div>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>2</div>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>3</div>
                </div>
                <div className='flex gap-6'>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>1</div>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>2</div>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>3</div>
                </div>
                <div className='flex gap-6'>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>1</div>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>2</div>
                    <div className='px-6 py-4 bg-[#333333] rounded-lg'>3</div>
                </div>
            </div>
        </div>
    )
}

