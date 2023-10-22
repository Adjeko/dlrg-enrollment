'use client'

import '@/css/globals.css'

import type { Metadata } from 'next'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Logo from './(Layout)/logo'
import Profile from './(Layout)/profile'
import MenuButton from './(Layout)/menuButton'
import Navigation from './(Layout)/navigation'
import MenuContent from './(Layout)/menuContent'
import Footer from './(Layout)/footer'
import FeedbackButton from './(Layout)/feedbackButton'

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children, }: RootLayoutProps) {

  return (
    <html lang="en">
      <body>
        <div className="min-h-full">
          <Popover as="header" className="pb-24 bg-[#FF222B]">
            {({ open }) => (
              <>
                <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="relative flex items-center justify-center py-7 lg:py-5 sm:py-10 lg:justify-between">
                    <Logo />
                    <Profile />
                    <MenuButton open={open} />
                    <FeedbackButton/>
                  </div>
                  <Navigation />
                </div>

                {/* HamburgerMenu im mobile Modus */}
                <Transition.Root as={Fragment}>
                  <div className="lg:hidden">
                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel
                        focus
                        className="absolute inset-x-0 top-0 z-30 w-full max-w-3xl p-2 mx-auto transition origin-top transform"
                      >
                        <MenuContent />
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </>
            )}
          </Popover>
          <main className="pb-8 -mt-24">
            <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="sr-only">Page title</h1>
              {/* Main 3 column grid */}
              <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                  <section aria-labelledby="section-1-title">
                    <h2 className="sr-only" id="section-1-title">
                      Section title
                    </h2>
                    <div className="overflow-hidden bg-white rounded-lg shadow">
                      {/* CONTENT */}
                      <div className="p-6">{children}</div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
