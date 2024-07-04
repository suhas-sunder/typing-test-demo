import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="my-20 flex flex-col items-center justify-center gap-8 font-nunito text-defaultblue">
      <header className="max-w-[1200px]">
        <h1 className="mb-5 flex py-2 text-4xl">PRIVACY POLICY</h1>
        <h2 className="flex py-2 text-2xl">Last updated December 02, 2023</h2>
        <p className="flex flex-col gap-4 py-2">
          <span>
            This privacy notice for https://freetypingcamp.com ("we," "us," or
            "our"), describes how and why we might collect, store, use, and/or
            share ("process") your information when you use our services
            ("Services"), such as when you:
          </span>
          <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
            <li>
              Visit our website at http://freetypingcamp.com, or any website of
              ours that links to this privacy notice
            </li>
            <li>
              Engage with us in other related ways, including any sales,
              marketing, or events
            </li>
          </ul>
          <span>
            Questions or concerns? Reading this privacy notice will help you
            understand your privacy rights and choices. If you do not agree with
            our policies and practices, please do not use our Services.
          </span>
        </p>
      </header>
      <main className="flex max-w-[1200px] flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">SUMMARY OF KEY POINTS</h2>
          <p>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our table of contents
            below to find the section you are looking for.
          </p>
          <p>
            What personal information do we process? When you visit, use, or
            navigate our Services, we may process personal information depending
            on how you interact with us and the Services, the choices you make,
            and the products and features you use.{" "}
          </p>
          <p>
            How do we process your information? We process your information to
            provide, improve, and administer our Services, communicate with you,
            for security and fraud prevention, and to comply with law. We may
            also process your information for other purposes with your consent.
            We process your information only when we have a valid legal reason
            to do so.
          </p>
          <p>
            In what situations and with which parties do we share personal
            information? We may share information in specific situations and
            with specific third parties.{" "}
          </p>
          <p>
            What are your rights? Depending on where you are located
            geographically, the applicable privacy law may mean you have certain
            rights regarding your personal information.{" "}
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            1. WHAT INFORMATION DO WE COLLECT?
          </h2>
          <h3>Personal information you disclose to us</h3>
          <p>
            In Short: We collect personal information that you provide to us.
          </p>
          <p>
            We collect personal information that you voluntarily provide to us
            when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Services, or otherwise when you
            contact us.
          </p>
          <p>
            <span>
              Personal Information Provided by You. The personal information
              that we collect depends on the context of your interactions with
              us and the Services, the choices you make, and the products and
              features you use. The personal information we collect may include
              the following:
            </span>
            <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
              <li>email addresses</li>
              <li>usernames</li>
              <li>passwords</li>
              <li>contact preferences</li>
              <li>billing addresses</li>
              <li>debit/credit card numbers</li>
              <li>mailing addresses</li>
              <li>phone numbers</li>
              <li>names</li>
              <li>contact or authentication data</li>
            </ul>
          </p>
          <p>Sensitive Information. We do not process sensitive information.</p>
          <p>
            Payment Data. We may collect data necessary to process your payment
            if you make purchases, such as your payment instrument number, and
            the security code associated with your payment instrument. All
            payment data is stored by Stripe. You may find their privacy notice
            link(s) here:{" "}
            <Link to={"https://stripe.com/en-ca/privacy"}>
              https://stripe.com/en-ca/privacy
            </Link>
            .
          </p>
          <p>
            Social Media Login Data. We may provide you with the option to
            register with us using your existing social media account details,
            like your Facebook, Twitter, or other social media account. If you
            choose to register in this way, we will collect the information
            described in the section called "HOW DO WE HANDLE YOUR SOCIAL
            LOGINS?" below.
          </p>
          <p>
            All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
          </p>
          <h2 className="flex py-2 text-2xl">
            Information automatically collected
          </h2>
          <h3>
            In Short: Some information — such as your Internet Protocol (IP)
            address and/or browser and device characteristics — is collected
            automatically when you visit our Services.
          </h3>
          <p>
            We automatically collect certain information when you visit, use, or
            navigate the Services. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about how and when you use our Services, and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Services, and for our
            internal analytics and reporting purposes.
          </p>
          <p>
            Like many businesses, we also collect information through cookies
            and similar technologies. You can find out more about this in our
            Cookie Notice: http://freetypingcamp.com/cookiespolicy.
          </p>
          <p className="flex flex-col gap-4">
            <span>The information we collect includes:</span>
            <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
              <li>
                Log and Usage Data. Log and usage data is service-related,
                diagnostic, usage, and performance information our servers
                automatically collect when you access or use our Services and
                which we record in log files. Depending on how you interact with
                us, this log data may include your IP address, device
                information, browser type, and settings and information about
                your activity in the Services (such as the date/time stamps
                associated with your usage, pages and files viewed, searches,
                and other actions you take such as which features you use),
                device event information (such as system activity, error reports
                (sometimes called "crash dumps"), and hardware settings).
              </li>
              <li>
                Device Data. We collect device data such as information about
                your computer, phone, tablet, or other device you use to access
                the Services. Depending on the device used, this device data may
                include information such as your IP address (or proxy server),
                device and application identification numbers, location, browser
                type, hardware model, Internet service provider and/or mobile
                carrier, operating system, and system configuration information.
              </li>
              <li>
                Location Data. We collect location data such as information
                about your device's location, which can be either precise or
                imprecise. How much information we collect depends on the type
                and settings of the device you use to access the Services. For
                example, we may use GPS and other technologies to collect
                geolocation data that tells us your current location (based on
                your IP address). You can opt out of allowing us to collect this
                information either by refusing access to the information or by
                disabling your Location setting on your device. However, if you
                choose to opt out, you may not be able to use certain aspects of
                the Services.
              </li>
            </ul>
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </h2>
          <p>
            In Short: We process your information to provide, improve, and
            administer our Services, communicate with you, for security and
            fraud prevention, and to comply with law. We may also process your
            information for other purposes with your consent.
          </p>
          <p>
            <span>
              We process your personal information for a variety of reasons,
              depending on how you interact with our Services, including:
            </span>

            <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
              <li>
                To facilitate account creation and authentication and otherwise
                manage user accounts. We may process your information so you can
                create and log in to your account, as well as keep your account
                in working order.
              </li>
              <li>
                To deliver and facilitate delivery of services to the user. We
                may process your information to provide you with the requested
                service.
              </li>
              <li>
                To respond to user inquiries/offer support to users. We may
                process your information to respond to your inquiries and solve
                any potential issues you might have with the requested service.
              </li>
              <li>
                To send administrative information to you. We may process your
                information to send you details about our products and services,
                changes to our terms and policies, and other similar
                information.
              </li>
              <li>
                To fulfill and manage your orders. We may process your
                information to fulfill and manage your orders, payments,
                returns, and exchanges made through the Services.
              </li>
              <li>
                To enable user-to-user communications. We may process your
                information if you choose to use any of our offerings that allow
                for communication with another user.
              </li>
              <li>
                To request feedback. We may process your information when
                necessary to request feedback and to contact you about your use
                of our Services.
              </li>
              <li>
                To send you marketing and promotional communications. We may
                process the personal information you send to us for our
                marketing purposes, if this is in accordance with your marketing
                preferences. You can opt out of our marketing emails at any
                time. For more information, see "WHAT ARE YOUR PRIVACY RIGHTS?"
                below.
              </li>
              <li>
                To deliver targeted advertising to you. We may process your
                information to develop and display personalized content and
                advertising tailored to your interests, location, and more. For
                more information see our Cookie Notice:
                http://freetypingcamp.com/cookiecollection.
              </li>
              <li>
                To protect our Services. We may process your information as part
                of our efforts to keep our Services safe and secure, including
                fraud monitoring and prevention.
              </li>
              <li>
                To identify usage trends. We may process information about how
                you use our Services to better understand how they are being
                used so we can improve them.
              </li>
              <li>
                To determine the effectiveness of our marketing and promotional
                campaigns. We may process your information to better understand
                how to provide marketing and promotional campaigns that are most
                relevant to you.
              </li>
              <li>
                To save or protect an individual's vital interest. We may
                process your information when necessary to save or protect an
                individual’s vital interest, such as to prevent harm.
              </li>
            </ul>
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
          </h2>
          <p>
            In Short: We only process your personal information when we believe
            it is necessary and we have a valid legal reason (i.e., legal basis)
            to do so under applicable law, like with your consent, to comply
            with laws, to provide you with services to enter into or fulfill our
            contractual obligations, to protect your rights, or to fulfill our
            legitimate business interests.
          </p>
          <h3>
            If you are located in the EU or UK, this section applies to you.
          </h3>
          <p>
            <span>
              The General Data Protection Regulation (GDPR) and UK GDPR require
              us to explain the valid legal bases we rely on in order to process
              your personal information. As such, we may rely on the following
              legal bases to process your personal information:
            </span>
            <span>
              Consent. We may process your information if you have given us
              permission (i.e., consent) to use your personal information for a
              specific purpose. You can withdraw your consent at any time. Learn
              more about withdrawing your consent.
            </span>
            <span>
              Performance of a Contract. We may process your personal
              information when we believe it is necessary to fulfill our
              contractual obligations to you, including providing our Services
              or at your request prior to entering into a contract with you.
            </span>
            <span>
              Legitimate Interests. We may process your information when we
              believe it is reasonably necessary to achieve our legitimate
              business interests and those interests do not outweigh your
              interests and fundamental rights and freedoms. For example, we may
              process your personal information for some of the purposes
              described in order to:
              <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
                <li>
                  Send users information about special offers and discounts on
                  our products and services
                </li>
                <li>
                  Develop and display personalized and relevant advertising
                  content for our users
                </li>
                <li>
                  Analyze how our Services are used so we can improve them to
                  engage and retain users
                </li>
                <li>Support our marketing activities</li>
                <li>Diagnose problems and/or prevent fraudulent activities</li>
                <li>
                  Understand how our users use our products and services so we
                  can improve user experience
                </li>
              </ul>
            </span>
            <span>
              Legal Obligations. We may process your information where we
              believe it is necessary for compliance with our legal obligations,
              such as to cooperate with a law enforcement body or regulatory
              agency, exercise or defend our legal rights, or disclose your
              information as evidence in litigation in which we are involved.
            </span>
            <span>
              Vital Interests. We may process your information where we believe
              it is necessary to protect your vital interests or the vital
              interests of a third party, such as situations involving potential
              threats to the safety of any person.
            </span>
          </p>
          <h3>If you are located in Canada, this section applies to you.</h3>
          <p>
            <span>
              We may process your information if you have given us specific
              permission (i.e., express consent) to use your personal
              information for a specific purpose, or in situations where your
              permission can be inferred (i.e., implied consent).{" "}
            </span>
            <span>
              In some exceptional cases, we may be legally permitted under
              applicable law to process your information without your consent,
              including, for example:
              <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
                <li>
                  If collection is clearly in the interests of an individual and
                  consent cannot be obtained in a timely way
                </li>
                <li>For investigations and fraud detection and prevention</li>
                <li>
                  For business transactions provided certain conditions are met
                </li>
                <li>
                  If it is contained in a witness statement and the collection
                  is necessary to assess, process, or settle an insurance claim
                </li>
                <li>
                  For identifying injured, ill, or deceased persons and
                  communicating with next of kin
                </li>
                <li>
                  If we have reasonable grounds to believe an individual has
                  been, is, or may be victim of financial abuse
                </li>
                <li>
                  If it is reasonable to expect collection and use with consent
                  would compromise the availability or the accuracy of the
                  information and the collection is reasonable for purposes
                  related to investigating a breach of an agreement or a
                  contravention of the laws of Canada or a province
                </li>
                <li>
                  If disclosure is required to comply with a subpoena, warrant,
                  court order, or rules of the court relating to the production
                  of records
                </li>
                <li>
                  If it was produced by an individual in the course of their
                  employment, business, or profession and the collection is
                  consistent with the purposes for which the information was
                  produced
                </li>
                <li>
                  If the collection is solely for journalistic, artistic, or
                  literary purposes
                </li>
                <li>
                  If the information is publicly available and is specified by
                  the regulations
                </li>
              </ul>
            </span>
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h2>
          <p>
            In Short: We may share information in specific situations described
            in this section and/or with the following third parties.
          </p>
          <p>
            <span>
              We may need to share your personal information in the following
              situations:
            </span>

            <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
              <li>
                Business Transfers. We may share or transfer your information in
                connection with, or during negotiations of, any merger, sale of
                company assets, financing, or acquisition of all or a portion of
                our business to another company.
              </li>
              <li>
                Other Users. When you share personal information (for example,
                by posting comments, contributions, or other content to the
                Services) or otherwise interact with public areas of the
                Services, such personal information may be viewed by all users
                and may be publicly made available outside the Services in
                perpetuity. If you interact with other users of our Services and
                register for our Services through a social network (such as
                Facebook), your contacts on the social network will see your
                name, profile photo, and descriptions of your activity.
                Similarly, other users will be able to view descriptions of your
                activity, communicate with you within our Services, and view
                your profile.
              </li>
            </ul>
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES? AND WITH WHOM DO WE
            SHARE YOUR PERSONAL INFORMATION?
          </h2>
          <p>
            In Short: We are not responsible for the safety of any information
            that you share with third parties that we may link to or who
            advertise on our Services, but are not affiliated with, our
            Services.
          </p>
          <p>
            The Services may link to third-party websites, online services, or
            mobile applications and/or contain advertisements from third parties
            that are not affiliated with us and which may link to other
            websites, services, or applications. Accordingly, we do not make any
            guarantee regarding any such third parties, and we will not be
            liable for any loss or damage caused by the use of such third-party
            websites, services, or applications. The inclusion of a link towards
            a third-party website, service, or application does not imply an
            endorsement by us. We cannot guarantee the safety and privacy of
            data you provide to any third parties. Any data collected by third
            parties is not covered by this privacy notice. We are not
            responsible for the content or privacy and security practices and
            policies of any third parties, including other websites, services,
            or applications that may be linked to or from the Services. You
            should review the policies of such third parties and contact them
            directly to respond to your questions.
          </p>
          <h3>Google Adsense</h3>
          <ul>
            <li>
              Third party vendors, including Google, use cookies to serve ads
              based on a user's prior visits to your website or other websites.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to
              serve ads to your users based on their visit to your sites and/or
              other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting Ads
              Settings. (Alternatively, you can direct users to opt out of a
              third-party vendor's use of cookies for personalized advertising
              by visiting{" "}
              <Link to="https://optout.aboutads.info/?c=2&lang=EN">
                www.aboutads.info
              </Link>
              .)
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </h2>
          <p>
            In Short: We may use cookies and other tracking technologies to
            collect and store your information.
          </p>
          <p>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Notice:
            http://freetypingcamp.com/cookiecollection.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </h2>
          <p>
            Our Services offer you the ability to register and log in using your
            third-party social media account details (like your Facebook or
            Twitter logins). Where you choose to do this, we will receive
            certain profile information about you from your social media
            provider. The profile information we receive may vary depending on
            the social media provider concerned, but will often include your
            name, email address, friends list, and profile picture, as well as
            other information you choose to make public on such a social media
            platform.
          </p>
          <p>
            We will use the information we receive only for the purposes that
            are described in this privacy notice or that are otherwise made
            clear to you on the relevant Services. Please note that we do not
            control, and are not responsible for, other uses of your personal
            information by your third-party social media provider. We recommend
            that you review their privacy notice to understand how they collect,
            use, and share your personal information, and how you can set your
            privacy preferences on their sites and apps.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            8. HOW LONG DO WE KEEP YOUR INFORMATION?
          </h2>
          <p>
            In Short: We keep your information for as long as necessary to
            fulfill the purposes outlined in this privacy notice unless
            otherwise required by law.
          </p>
          <p>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
          </p>
          <p>
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            9. DO WE COLLECT INFORMATION FROM MINORS?
          </h2>
          <p>
            In Short: We do not knowingly collect data from or market to
            children under 18 years of age.
          </p>
          <p>
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Services, you represent that you are at
            least 18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent’s use of the Services. If we learn
            that personal information from users less than 18 years of age has
            been collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we may have collected from children under
            age 18, please contact us at admin@freetypingcamp.com.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            10. WHAT ARE YOUR PRIVACY RIGHTS?
          </h2>
          <p>
            In Short: In some regions, such as the European Economic Area (EEA),
            United Kingdom (UK), Switzerland, and Canada, you have rights that
            allow you greater access to and control over your personal
            information. You may review, change, or terminate your account at
            any time.
          </p>
          <p>
            In some regions (like the EEA, UK, Switzerland, and Canada), you
            have certain rights under applicable data protection laws. These may
            include the right (i) to request access and obtain a copy of your
            personal information, (ii) to request rectification or erasure;
            (iii) to restrict the processing of your personal information; (iv)
            if applicable, to data portability; and (v) not to be subject to
            automated decision-making. In certain circumstances, you may also
            have the right to object to the processing of your personal
            information. You can make such a request by contacting us at
            admin@freetypingcamp.com.
          </p>
          <p>
            We will consider and act upon any request in accordance with
            applicable data protection laws.
          </p>
          <p>
            <span>
              If you are located in the EEA or UK and you believe we are
              unlawfully processing your personal information, you also have the
              right to complain to your
            </span>
            <Link to={"https://ec.europa.eu/newsroom/article29/items/612080"}>
              {" "}
              Member State data protection authority
            </Link>
            or
            <Link
              to={
                "https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/ "
              }
            >
              UK data protection authority
            </Link>
            .
          </p>
          <p>
            If you are located in Switzerland, you may contact the{" "}
            <Link to={"https://www.edoeb.admin.ch/edoeb/en/home.html"}>
              Federal Data Protection and Information Commissioner
            </Link>
            .
          </p>
          <p>
            Withdrawing your consent: If we are relying on your consent to
            process your personal information, which may be express and/or
            implied consent depending on the applicable law, you have the right
            to withdraw your consent at any time. You can withdraw your consent
            at any time by contacting us at admin@freetypingcamp.com.
          </p>
          <p>
            However, please note that this will not affect the lawfulness of the
            processing before its withdrawal nor, when applicable law allows,
            will it affect the processing of your personal information conducted
            in reliance on lawful processing grounds other than consent.
          </p>
          <h3>Account Information</h3>
          <p>
            If you would at any time like to review or change the information in
            your account or terminate your account, you can: Log in to your
            account settings and update your user account.
          </p>
          <p>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal
            requirements.
          </p>
          <p>
            Cookies and similar technologies: Most Web browsers are set to
            accept cookies by default. If you prefer, you can usually choose to
            set your browser to remove cookies and to reject cookies. If you
            choose to remove cookies or reject cookies, this could affect
            certain features or services of our Services. For further
            information, please see our Cookie Notice:
            http://freetypingcamp.com/cookiecollection.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            11. CONTROLS FOR DO-NOT-TRACK FEATURES
          </h2>
          <p>
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track ("DNT") feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. At
            this stage no uniform technology standard for recognizing and
            implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If
            a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version
            of this privacy notice.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </h2>
          <p>
            In Short: If you are a resident of Virginia, Connecticut, Colorado,
            California or Utah, you are granted specific rights regarding access
            to your personal information.
          </p>
          <p>How do we use and share your personal information?</p>
          <p>
            Learn about how we use your personal information in the section,
            "HOW DO WE PROCESS YOUR INFORMATION?"
          </p>
          <p>Will your information be shared with anyone else?</p>
          <p>
            We may disclose your personal information with our service providers
            pursuant to a written contract between us and each service provider.
            Learn more about how we disclose personal information to in the
            section, "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"
          </p>
          <p>
            We may use your personal information for our own business purposes,
            such as for undertaking internal research for technological
            development and demonstration. This is not considered to be
            "selling" of your personal information.
          </p>
          <p>
            We have not disclosed, sold, or shared any personal information to
            third parties for a business or commercial purpose in the preceding
            twelve (12) months. We will not sell or share personal information
            in the future belonging to website visitors, users, and other
            consumers.
          </p>
          <h3>California Residents</h3>
          <p>
            California Civil Code Section 1798.83, also known as the "Shine The
            Light" law permits our users who are California residents to request
            and obtain from us, once a year and free of charge, information
            about categories of personal information (if any) we disclosed to
            third parties for direct marketing purposes and the names and
            addresses of all third parties with which we shared personal
            information in the immediately preceding calendar year. If you are a
            California resident and would like to make such a request, please
            submit your request in writing to us using the contact information
            provided below.
          </p>
          <p>
            If you are under 18 years of age, reside in California, and have a
            registered account with the Services, you have the right to request
            removal of unwanted data that you publicly post on the Services. To
            request removal of such data, please contact us using the contact
            information provided below and include the email address associated
            with your account and a statement that you reside in California. We
            will make sure the data is not publicly displayed on the Services,
            but please be aware that the data may not be completely or
            comprehensively removed from all our systems (e.g., backups, etc.).
          </p>
          <h3>CCPA Privacy Notice</h3>
          <p>
            This section applies only to California residents. Under the
            California Consumer Privacy Act (CCPA), you have the rights listed
            below.
          </p>
          <p>The California Code of Regulations defines a "residents" as:</p>
          <p>
            (1) every individual who is in the State of California for other
            than a temporary or transitory purpose and
          </p>
          <p>
            (2) every individual who is domiciled in the State of California who
            is outside the State of California for a temporary or transitory
            purpose
          </p>
          <p>All other individuals are defined as "non-residents."</p>
          <p>
            If this definition of "resident" applies to you, we must adhere to
            certain rights and obligations regarding your personal information.
          </p>
          <h3>Your rights with respect to your personal data</h3>
          <p>Right to request deletion of the data — Request to delete</p>
          <p>
            You can ask for the deletion of your personal information. If you
            ask us to delete your personal information, we will respect your
            request and delete your personal information, subject to certain
            exceptions provided by law, such as (but not limited to) the
            exercise by another consumer of his or her right to free speech, our
            compliance requirements resulting from a legal obligation, or any
            processing that may be required to protect against illegal
            activities.
          </p>
          <p>Right to be informed — Request to know</p>
          <p>
            <span>
              Depending on the circumstances, you have a right to know:
            </span>

            <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
              <li>whether we collect and use your personal information;</li>
              <li>the categories of personal information that we collect;</li>
              <li>
                the purposes for which the collected personal information is
                used;
              </li>
              <li>
                whether we sell or share personal information to third parties;
              </li>
              <li>
                the categories of personal information that we sold, shared, or
                disclosed for a business purpose;
              </li>
              <li>
                the categories of third parties to whom the personal information
                was sold, shared, or disclosed for a business purpose;
              </li>
              <li>
                the business or commercial purpose for collecting, selling, or
                sharing personal information; and
              </li>
              <li>
                the specific pieces of personal information we collected about
                you.
              </li>
            </ul>
          </p>
          <p>
            In accordance with applicable law, we are not obligated to provide
            or delete consumer information that is de-identified in response to
            a consumer request or to re-identify individual data to verify a
            consumer request.
          </p>
          <p>
            Right to Non-Discrimination for the Exercise of a Consumer’s Privacy
            Rights
          </p>
          <p>
            We will not discriminate against you if you exercise your privacy
            rights.
          </p>
          <p>
            Right to Limit Use and Disclosure of Sensitive Personal Information
          </p>
          <p>We do not process consumer's sensitive personal information.</p>
          <p>Verification process</p>
          <p>
            Upon receiving your request, we will need to verify your identity to
            determine you are the same person about whom we have the information
            in our system. These verification efforts require us to ask you to
            provide information so that we can match it with information you
            have previously provided us. For instance, depending on the type of
            request you submit, we may ask you to provide certain information so
            that we can match the information you provide with the information
            we already have on file, or we may contact you through a
            communication method (e.g., phone or email) that you have previously
            provided to us. We may also use other verification methods as the
            circumstances dictate.
          </p>
          <p>
            We will only use personal information provided in your request to
            verify your identity or authority to make the request. To the extent
            possible, we will avoid requesting additional information from you
            for the purposes of verification. However, if we cannot verify your
            identity from the information already maintained by us, we may
            request that you provide additional information for the purposes of
            verifying your identity and for security or fraud-prevention
            purposes. We will delete such additionally provided information as
            soon as we finish verifying you.
          </p>
          <p>Other privacy rights</p>
          <p>
            You may object to the processing of your personal information. You
            may request correction of your personal data if it is incorrect or
            no longer relevant, or ask to restrict the processing of the
            information. You can designate an authorized agent to make a request
            under the CCPA on your behalf. We may deny a request from an
            authorized agent that does not submit proof that they have been
            validly authorized to act on your behalf in accordance with the
            CCPA. You may request to opt out from future selling or sharing of
            your personal information to third parties. Upon receiving an
            opt-out request, we will act upon the request as soon as feasibly
            possible, but no later than fifteen (15) days from the date of the
            request submission.
          </p>
          <p>
            To exercise these rights, you can contact us by submitting a data
            subject access request, by email at admin@freetypingcamp.com, or by
            referring to the contact details at the bottom of this document. If
            you have a complaint about how we handle your data, we would like to
            hear from you.
          </p>
          <h3>Colorado Residents</h3>
          <p>
            This section applies only to Colorado residents. Under the Colorado
            Privacy Act (CPA), you have the rights listed below. However, these
            rights are not absolute, and in certain cases, we may decline your
            request as permitted by law.
          </p>

          <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
            <li>
              Right to be informed whether or not we are processing your
              personal data
            </li>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccuracies in your personal data</li>
            <li>Right to request deletion of your personal data</li>
            <li>
              Right to obtain a copy of the personal data you previously shared
              with us
            </li>
            <li>
              Right to opt out of the processing of your personal data if it is
              used for targeted advertising, the sale of personal data, or
              profiling in furtherance of decisions that produce legal or
              similarly significant effects ("profiling")
            </li>
          </ul>
          <h3>Connecticut Residents</h3>
          <p>
            This section applies only to Connecticut residents. Under the
            Connecticut Data Privacy Act (CTDPA), you have the rights listed
            below. However, these rights are not absolute, and in certain cases,
            we may decline your request as permitted by law.
          </p>

          <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
            <li>
              Right to be informed whether or not we are processing your
              personal data
            </li>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccuracies in your personal data</li>
            <li>Right to request deletion of your personal data</li>
            <li>
              Right to obtain a copy of the personal data you previously shared
              with us
            </li>
            <li>
              Right to opt out of the processing of your personal data if it is
              used for targeted advertising, the sale of personal data, or
              profiling in furtherance of decisions that produce legal or
              similarly significant effects ("profiling")
            </li>
          </ul>
          <h3>Utah Residents</h3>
          <p>
            This section applies only to Utah residents. Under the Utah Consumer
            Privacy Act (UCPA), you have the rights listed below. However, these
            rights are not absolute, and in certain cases, we may decline your
            request as permitted by law.
          </p>

          <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
            <li>
              Right to be informed whether or not we are processing your
              personal data
            </li>
            <li>Right to access your personal data</li>
            <li>Right to request deletion of your personal data</li>
            <li>
              Right to obtain a copy of the personal data you previously shared
              with us
            </li>
            <li>
              Right to opt out of the processing of your personal data if it is
              used for targeted advertising or the sale of personal data
            </li>
          </ul>
          <h3>Virginia Residents</h3>
          <p>Under the Virginia Consumer Data Protection Act (VCDPA):</p>
          <p>
            "Consumer" means a natural person who is a resident of the
            Commonwealth acting only in an individual or household context. It
            does not include a natural person acting in a commercial or
            employment context.
          </p>
          <p>
            "Personal data" means any information that is linked or reasonably
            linkable to an identified or identifiable natural person. "Personal
            data" does not include de-identified data or publicly available
            information.
          </p>
          <p>
            "Sale of personal data" means the exchange of personal data for
            monetary consideration.
          </p>
          <p>
            If this definition of "consumer" applies to you, we must adhere to
            certain rights and obligations regarding your personal data.
          </p>
          <p>Your rights with respect to your personal data</p>

          <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
            <li>
              Right to be informed whether or not we are processing your
              personal data
            </li>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccuracies in your personal data</li>
            <li>Right to request deletion of your personal data</li>
            <li>
              Right to obtain a copy of the personal data you previously shared
              with us
            </li>
            <li>
              Right to opt out of the processing of your personal data if it is
              used for targeted advertising, the sale of personal data, or
              profiling in furtherance of decisions that produce legal or
              similarly significant effects ("profiling")
            </li>
          </ul>

          <p>Exercise your rights provided under the Virginia VCDPA</p>
          <p>
            If you are using an authorized agent to exercise your rights, we may
            deny a request if the authorized agent does not submit proof that
            they have been validly authorized to act on your behalf.
          </p>
          <p>Verification process</p>
          <p>
            We may request that you provide additional information reasonably
            necessary to verify you and your consumer's request. If you submit
            the request through an authorized agent, we may need to collect
            additional information to verify your identity before processing
            your request.
          </p>
          <p>
            Upon receiving your request, we will respond without undue delay,
            but in all cases, within forty-five (45) days of receipt. The
            response period may be extended once by forty-five (45) additional
            days when reasonably necessary. We will inform you of any such
            extension within the initial 45-day response period, together with
            the reason for the extension.
          </p>
          <p>Right to appeal</p>
          <p>
            If we decline to take action regarding your request, we will inform
            you of our decision and reasoning behind it. If you wish to appeal
            our decision, please email us at admin@freetypingcamp.com. Within sixty
            (60) days of receipt of an appeal, we will inform you in writing of
            any action taken or not taken in response to the appeal, including a
            written explanation of the reasons for the decisions. If your appeal
            is denied, you may contact the{" "}
            <Link
              to={
                "https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint"
              }
            ></Link>{" "}
            Attorney General to submit a complaint.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            13. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
          </h2>
          <p>
            In Short: You may have additional rights based on the country you
            reside in.
          </p>
          <h3>Australia and New Zealand</h3>
          <p>
            We collect and process your personal information under the
            obligations and conditions set by Australia's Privacy Act 1988 and
            New Zealand's Privacy Act 2020 (Privacy Act).
          </p>
          <p>
            This privacy notice satisfies the notice requirements defined in
            both Privacy Acts, in particular: what personal information we
            collect from you, from which sources, for which purposes, and other
            recipients of your personal information.
          </p>
          <p>
            <span>
              If you do not wish to provide the personal information necessary
              to fulfill their applicable purpose, it may affect our ability to
              provide our services, in particular:
            </span>

            <ul className="flex list-inside list-disc flex-col gap-5 py-2 pl-5 dark:text-gray-400">
              <li>offer you the products or services that you want</li>
              <li>respond to or help with your requests</li>
              <li>manage your account with us</li>
              <li>confirm your identity and protect your account</li>
            </ul>
          </p>
          <p>
            If you believe we are unlawfully processing your personal
            information, you have the right to submit a complaint about a breach
            of the Australian Privacy Principles to the
            <Link
              to={
                "https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us"
              }
            >
              Office of the Australian Information Commissioner
            </Link>{" "}
            and a breach of New Zealand's Privacy Principles to the{" "}
            <Link
              to={"https://www.privacy.org.nz/your-rights/making-a-complaint/"}
            >
              Office of New Zealand Privacy Commissioner
            </Link>
            .
          </p>
          <h3>Republic of South Africa</h3>
          <p>
            At any time, you have the right to request access to or correction
            of your personal information. You can make such a request by
            contacting us by using the contact details provided in the section
            "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?"
          </p>
          <p>
            If you are unsatisfied with the manner in which we address any
            complaint with regard to our processing of personal information, you
            can contact the office of the regulator, the details of which are:
          </p>
          <p>General enquiries: enquiries@inforegulator.org.za</p>
          <p>
            Complaints (complete POPIA/PAIA form 5):
            PAIAComplaints@inforegulator.org.za &
            POPIAComplaints@inforegulator.org.za
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            14. DO WE MAKE UPDATES TO THIS NOTICE?
          </h2>
          <p>
            In Short: Yes, we will update this notice as necessary to stay
            compliant with relevant laws.
          </p>
          <p>
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated "Revised" date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy notice, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="flex py-2 text-2xl">
            15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </h2>
          <p>
            If you have questions or comments about this notice, you may email
            us at admin@freetypingcamp.com or contact us by post at:
          </p>
          <p>https://freetypingcamp.com/</p>
          <p>Toronto, Ontario</p>
          <p>Canada</p>
        </section>
      </main>
    </div>
  );
}

export default PrivacyPolicy;
