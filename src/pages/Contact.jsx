import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconPhone, IconMail, IconLocation } from '../components/icons.jsx';
import './Contact.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function Contact() {
  const [searchParams] = useSearchParams();

  const intent = searchParams.get('intent');

  const isListingInquiry = intent === 'list-property';
  const isCareerInquiry = intent === 'careers';

  const getInitialMessage = () => {
    if (isListingInquiry) {
      return 'I would like to list my property on EstateHub. Please share the next steps.';
    }

    if (isCareerInquiry) {
      return 'I am interested in joining EstateHub. Please share more information about the available career opportunities.';
    }

    return '';
  };

  const [form, setForm] = useState(() => ({
    ...initialForm,
    message: getInitialMessage(),
  }));

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setSubmitted(false);
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Please enter a message';
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // No backend in this project — we simply acknowledge the submission.
    setSubmitted(true);
    setForm(initialForm);
  }

  const pageTitle = isCareerInquiry
    ? 'Join EstateHub'
    : isListingInquiry
      ? 'List Your Property'
      : 'Contact Us';

  const pageDescription = isCareerInquiry
    ? 'Interested in working with us? Share your details and our team will get back to you.'
    : isListingInquiry
      ? 'Share your property details and our team will guide you through the listing process.'
      : "Have a question about a listing or want to list your own property? We'd love to hear from you.";

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>{pageTitle}</h1>
          <p>{pageDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <form
            className="card contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2>
              {isCareerInquiry
                ? 'Send your details'
                : 'Send us a message'}
            </h2>

            <div className="field">
              <label htmlFor="contact-name">Name</label>

              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />

              {errors.name && (
                <span className="field-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="contact-email">Email</label>

              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              {errors.email && (
                <span className="field-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="contact-phone">
                Phone (optional)
              </label>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="field">
              <label htmlFor="contact-message">
                {isCareerInquiry ? 'Message' : 'Message'}
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder={
                  isCareerInquiry
                    ? 'Tell us about yourself and the role you are interested in…'
                    : "Tell us what you're looking for…"
                }
              />

              {errors.message && (
                <span className="field-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              {isCareerInquiry ? 'Submit Application' : 'Send Message'}
            </button>

            {submitted && (
              <p className="contact-success">
                Thanks — your message has been received.
              </p>
            )}
          </form>

          <div className="contact-info">
            <div className="card contact-info-card">
              <h3>Our Office</h3>

              <p>
                <IconLocation />
                SCO 123, Sector 17, Chandigarh, India
              </p>

              <p>
                <IconPhone />
                +91 98765 43210
              </p>

              <p>
                <IconMail />
                hello@estatehub.com
              </p>
            </div>

            <div className="card contact-info-card">
              <h3>Office Hours</h3>

              <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
              <p>Sunday: 10:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}