"use client"
import LandingWrapper from "@/components/landing/LandingWrapper";

export default function Page() {
  return (
    <LandingWrapper>
      <div className="bg-lightPrimary pb-12">
        <div className="grid h-full grid-cols-1 gap-5 xl:grid-cols-5 2xl:grid-cols-5 mx-12">
          <div className="mt-12 col-span-1 h-fit w-9/12 xl:col-span-5 mx-auto 2xl:col-span-3">
            {/* NFt Banner */}
            <div
              className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px] justify-center"
              style={{backgroundImage: `url(/assets/img/nfts/NftBanner1.png)`}}
            >
              <div className="w-full">
                <h4
                  className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
                  Terms and Condition
                </h4>
                <p
                  className="mt-12 mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
                  This page outlines the rules, guidelines, and legal agreements for using our platform. By accessing or
                  using our services, you agree to comply with these terms. Please read them carefully to understand
                  your rights and responsibilities.
                </p>
              </div>

            </div>
            <div className={"w-9/12 mt-4"}>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl ">Terms & Condition</h1>
                <h2 className={"font-semibold text-xl"}>Conditions of Use</h2>
                <p className={"text-md"}>Welcome to Tenjin. By accessing or using our services, you agree to comply with
                  and be bound by these terms and conditions, including our privacy policy. If you do not agree with any
                  of these terms, you are advised to discontinue using our services. Tenjin reserves the right to
                  restrict
                  or terminate your access if you violate these terms.
                </p>
                <h2 className={"font-semibold text-xl"}>Overview</h2>
                <p className={"text-md"}>Tenjin is a platform designed to connect mentors with cohorts, allowing cohorts
                  to schedule online meetings with mentors. The platform aims to facilitate knowledge sharing, skill
                  development, and professional growth through virtual mentoring sessions.
                </p>
                <h2 className={"font-semibold text-xl"}>Modification of the Site and These Terms & Conditions</h2>
                <p className={"text-md"}>
                  Tenjin reserves the right to modify or discontinue any part of the platform or its features, either
                  temporarily or permanently, with or without notice. Similarly, we may update these terms and
                  conditions at our discretion. Your continued use of the platform after any changes indicates your
                  acceptance of the updated terms. We encourage you to review these terms periodically.
                </p>
                <h2 className={"font-semibold text-xl"}>Copyright</h2>
                <p className={"text-md"}>
                  All content, materials, designs, logos, trademarks, and intellectual property displayed on the Tenjin
                  platform are the sole property of Tenjin or its content providers and are protected under applicable
                  copyright laws. Unauthorized use, reproduction, distribution, or modification of any content without
                  prior written consent is strictly prohibited. You are granted a limited license to use the platform
                  solely for its intended purpose.
                </p>
                <h2 className={"font-semibold text-xl"}>Sign Up</h2>
                <p className={"text-md"}>
                  To access certain features of Tenjin, users are required to create an account. You must provide
                  accurate, complete, and up-to-date information during the registration process. It is your
                  responsibility to maintain the confidentiality of your account credentials and to notify us
                  immediately if you suspect unauthorized access to your account. Tenjin reserves the right to suspend
                  or terminate your account if any information provided is found to be false or if you violate these
                  terms.
                </p>
                <h2 className={"font-semibold text-xl"}>Electronic Communications</h2>
                <p className={"text-md"}>
                  By using Tenjin, you consent to receive communications from us electronically, including but not
                  limited to emails, notifications, or messages through the platform. These communications may include
                  updates, promotional offers, or important information regarding your account or the platform. You
                  agree that any electronic communications sent by Tenjin satisfy legal requirements for written
                  communication.
                </p>
                <h2 className={"font-semibold text-xl"}>Service Descriptions</h2>
                <p className={"text-md"}>
                  Tenjin strives to ensure that the descriptions of services provided on our platform are accurate and
                  up-to-date. However, we do not guarantee that all information, including mentor profiles, schedules,
                  or features, is entirely error-free, complete, or current. We reserve the right to correct any errors,
                  omissions, or inaccuracies and to modify or update service details at any time without prior notice.
                </p>
                <h2 className={"font-semibold text-xl"}>Privacy Policy</h2>
                <p className={"text-md"}>
                  Your privacy is important to us. By using Tenjin, you agree to the collection, use, and sharing of
                  your information as outlined in our Privacy Policy. This includes the data provided during account
                  registration, service usage, and communications. Please review our Privacy Policy to understand how
                  your information is handled.
                </p>
                <h2 className={"font-semibold text-xl"}>Indemnity</h2>
                <div className={"text-md"}>
                  <p>
                    You agree to indemnify, defend, and hold harmless Tenjin, its affiliates, officers, directors,
                    employees, and agents from any claims, liabilities, damages, losses, or expenses (including legal
                    fees) arising out of:
                  </p>
                  <ul className={"list-disc ml-6"}>
                    <li>
                      <p>Your use or misuse of the platform.</p>
                    </li>
                    <li>Your viliation of these terms.</li>
                    <li>Any infringement of third-party rights, including intellectual property or privacy rights.</li>
                  </ul>
                  <p>
                    Tenjin reserves the right to assume exclusive defense and control of any matter subject to
                    indemnification, and you agree to cooperate with us in such cases.
                  </p>
                </div>
                <h2 className={"font-semibold text-xl"}>Disclaimer</h2>
                <p className={"text-md"}>
                  The services provided by Tenjin are on an `&quot;`as-is`&quot;` and `&quot;`as available`&quot;`
                  basis. Tenjin makes no
                  representations or warranties of any kind, express or implied, regarding the operation or availability
                  of the platform, the accuracy of the information, or the quality of services provided. Tenjin
                  disclaims all warranties, including but not limited to implied warranties of merchantability and
                  fitness for a particular purpose. You acknowledge and agree that your use of the platform is at your
                  sole risk.
                </p>
                <h2 className={"font-semibold text-xl"}>Applicable Laws</h2>
                <p className={"text-md"}>
                  These Terms and Conditions are governed by the law in force in Indonesia
                </p>
                <h2 className={"font-semibold text-xl"}>Questions and Feedback</h2>
                <p className={"text-md"}>
                  If you have any questions, concerns, or feedback regarding these Terms and Conditions or your
                  experience with Tenjin, please contact us at adityaalfarezyd@gmail.com. We value your input and will
                  make every effort to address any issues you raise.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </LandingWrapper>
  )

}