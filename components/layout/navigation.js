import React from 'react'
import Link from 'next/link'

const Navigation = ({links, currentStory}) => (
    <nav className="flex justify-center flex-row gap-6">
        {links?.map((link, index) => {
            return (
                <Link href={link.linktype === 'story' ? `/${link.slug}` : link.real_path} key={index}>
                    <a className={`text-lg px-5 py-5 lowercase transition duration-300 hover:text-[#983d2e] border-b-4 border-transparent hover:border-[#983d2e] ${link.slug === currentStory.slug ? 'border-[#983d2e] text-[#983d2e]' : ''}`}>
                        {link.name}
                    </a>
                </Link>
            );
        })}
    </nav>
)

export default Navigation
