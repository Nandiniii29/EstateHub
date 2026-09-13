import { useLocation } from 'react-router-dom';
import './SimplePage.css';
import './Legal.css';

const content = {
  '/privacy-policy': {
    title: 'Privacy Policy',
    label: 'YOUR PRIVACY MATTERS',
    intro:
      'EstateHub is designed to make property discovery simple and transparent. This page explains the type of information the website may collect and how it is used within the platform.',
    updated: 'Last updated: September 2026',
    sections: [
      {
        title: 'Information we collect',
        text:
          'When you use features such as account registration, contact forms or property enquiries, you may provide information such as your name, email address and phone number.',
      },
      {
        title: 'How we use your information',
        text:
          'Information you provide may be used to respond to enquiries, provide account features, improve the website and make the property search experience more useful.',
      },
      {
        title: 'Property enquiries',
        text:
          'When you submit an enquiry about a property, the information you provide is used to help respond to that enquiry. Please avoid submitting information that is not necessary for your request.',
      },
      {
        title: 'Local browser storage',
        text:
          'EstateHub may use browser storage to remember certain preferences and activity, such as saved properties, comparison selections and account information within this demo application.',
      },
      {
        title: 'Third-party services',
        text:
          'Some website features may rely on external services or APIs. Information handled by those services is subject to their own policies and terms.',
      },
      {
        title: 'Your choices',
        text:
          'You can contact EstateHub if you have questions about information you have submitted through the website or want to discuss changes to that information where applicable.',
      },
    ],
  },

  '/terms': {
    title: 'Terms & Conditions',
    label: 'USING ESTATEHUB',
    intro:
      'These terms describe the basic conditions for using the EstateHub website, including property listings, accounts, enquiries and calculator tools.',
    updated: 'Last updated: September 2026',
    sections: [
      {
        title: 'Using the website',
        text:
          'EstateHub should be used responsibly and only for lawful purposes. You should not attempt to interfere with the operation or security of the website.',
      },
      {
        title: 'Property listings',
        text:
          'Property information is provided to help users explore available options. Listing details should be independently verified before making a purchase, rental or investment decision.',
      },
      {
        title: 'Accounts',
        text:
          'When creating an account, provide accurate information and keep your account details secure. Account features are intended for the person who created the account.',
      },
      {
        title: 'Saved and comparison features',
        text:
          'Favorites and comparison tools are provided to help you organize properties you are interested in. They do not constitute an offer, reservation or guarantee of availability.',
      },
      {
        title: 'EMI calculator',
        text:
          'EMI calculations are estimates based on the values entered by the user. Results are for informational purposes and should not be treated as a loan offer or financial advice.',
      },
      {
        title: 'Content and availability',
        text:
          'We aim to keep information useful and accurate, but property availability, prices and other listing details may change. Users should confirm important information before making decisions.',
      },
    ],
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const page = content[pathname] || content['/privacy-policy'];

  return (
    <div className="simple-page legal-page">
      <section className="legal-header">
        <div className="container">
          <span className="legal-label">{page.label}</span>

          <h1>{page.title}</h1>

          <p className="legal-intro">{page.intro}</p>

          <span className="legal-updated">{page.updated}</span>
        </div>
      </section>

      <section className="section legal-content-section">
        <div className="container">
          <div className="legal-sections">
            {page.sections.map((section, index) => (
              <section className="card legal-section" key={section.title}>
                <span className="legal-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </div>
              </section>
            ))}
          </div>

          <div className="legal-help card">
            <div>
              <h3>Have a question?</h3>
              <p>
                If you need clarification about these pages or how EstateHub
                handles information, get in touch with our team.
              </p>
            </div>

            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}