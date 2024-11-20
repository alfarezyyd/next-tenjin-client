"use client"
import {Disclosure} from '@headlessui/react'
import {ChevronUpIcon} from '@heroicons/react/20/solid'

const FAQ = () => {
  return (
    <div id="faq-section" className='mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg'>
      <h3 className='text-xl font-normal text-white text-center mb-6'>FAQ</h3>
      <h2 className='text-4xl lg:text-6xl font-semibold text-center text-white'>Frequently asked <br/> questions.</h2>
      <div className="w-full px-4 pt-16">
        <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5">
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button
                  className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                  <span>Apa itu Tenjin, dan bagaimana cara kerjanya?</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                  Tenjin adalah platform online yang menghubungkan mentor dan cohort untuk kolaborasi dan pembelajaran
                  yang bermakna. Cohort dapat menjadwalkan pertemuan virtual dengan mentor untuk mendapatkan panduan,
                  wawasan, dan keterampilan yang sesuai dengan kebutuhan mereka.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5">
          <Disclosure as="div" className="mt-2">
            {({open}) => (
              <>
                <Disclosure.Button
                  className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                  <span>Siapa yang bisa menjadi mentor atau cohort di Tenjin?</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                  Siapa saja yang memiliki keahlian untuk dibagikan dapat menjadi mentor, dan siapa saja yang ingin
                  belajar dan berkembang dapat menjadi cohort.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6">
          <Disclosure as="div" className="mt-2">
            {({open}) => (
              <>
                <Disclosure.Button
                  className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                  <span>Apakah saya perlu membayar untuk menggunakan Tenjin?</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                  Biaya layanan Tenjin tergantung pada mentor yang dipilih dan durasi pertemuan. Mentor memiliki harga
                  yang bervariatif dan mungkin
                  menawarkan diskon khusus.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

      </div>
    </div>
  )
}

export default FAQ;