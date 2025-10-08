import React from 'react';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  return (
    <form className={`${className} consultation-form`}>
      <h3>联系表单</h3>
      <p>这是一个简化版的联系表单。</p>
    </form>
  );
};

export default ContactForm;