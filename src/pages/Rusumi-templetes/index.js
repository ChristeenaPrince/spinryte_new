// CurriculumVitae.jsx

import React, { useState } from 'react';

const CurriculumVitae = () => {
  const [isExpanded, setExpanded] = useState(false);

  const containerStyle = {
    // padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '21px'
  };

  const headingStyle = {
    fontSize: '24px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const detailsStyle = {
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '14px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
    color:'#black'
  };
  
  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const imageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  };

  const personalDetailsStyle = {
    marginBottom: '20px',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const sectionHeadingStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '10px',
  };

  const detailLabelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const detailValueStyle = {
    marginBottom: '15px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const openCVCompiler = () => {
    // Replace the URL with the actual URL of your online CV compiler service
    const cvCompilerUrl = 'https://www.canva.com/design/DAF3sGrRyOU/JIfS81WCpiACU9pUjrySqA/edit';

    // Open a new window with the CV compiler URL
    window.open(cvCompilerUrl, '_blank');
  };

  const openView = () => {
    // Replace the URL with the actual URL of your online CV compiler service
    const cvCompilerUrl = 'https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit';

    // Open a new window with the CV compiler URL
    window.open(cvCompilerUrl, '_blank');
  };

  const moreTemplatesContainerStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };
  
  const moreTemplatesLinkStyle = {
    textDecoration: 'none',
  };
  
  const moreTemplatesButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const viewAllButtonStyle = {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>
        Create CV
        <div className='buttons'>
        <button style={viewAllButtonStyle} onClick={openView}>
          View
        </button>
        <button style={buttonStyle} onClick={openCVCompiler}>
          Open CV Compiler
        </button>
        </div>
       
      </h2>

      <div style={detailsStyle}>
   
        <img
          src="https://d18jg6w55vcmy1.cloudfront.net/media/resume_images/e234c0bdc7c4499fa24320e7ba7a8306.png"
          alt="Your Name"
          style={imageStyle}
        />

        
        <div style={personalDetailsStyle}>
          <p style={detailLabelStyle}>Name:</p>
          <p style={detailValueStyle}>John Smith</p>

          <p style={detailLabelStyle}>Email:</p>
          <p style={detailValueStyle}>John123@gmail.com</p>

        
          <p style={detailLabelStyle}>Phone:</p>
          <p style={detailValueStyle}>123-456-7890</p>

          <p style={detailLabelStyle}>LinkedIn:</p>
          <p style={detailValueStyle}>
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/johnSmit
            </a>
          </p>
         
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Education:</p>
          <ul style={listStyle}>
            <li>Degree in XYZ - University XYZ (Year)</li>
            
          </ul>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Work Experience:</p>
          <ul style={listStyle}>
            <li>Job Title - Company Xyz (Year)</li>
           
          </ul>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Skills:</p>
          <ul style={listStyle}>
            <li>Skill 1</li>
            <li>Skill 2</li>
        
          </ul>
        </div>


        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Projects:</p>
          <ul style={listStyle}>
            <li>Project 1 - Description (Year)</li>
            
          </ul>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Languages:</p>
          <ul style={listStyle}>
            <li>Language 1</li>
            <li>Language 2</li>
            {/* Add more language details as needed */}
          </ul>
        </div>
      </div>

      {/* CV Templates */}
      <div className='template'>
        <h2>Choose a CV Template:</h2>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EAFBL8KRmSA/1/0/1131w/canva-white-simple-student-cv-resume-NXs7xSf0K8I.jpg"  // Replace with the actual image URL
            alt="Template 1"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
    src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/988/posts/93140/image-upload/canva_beige_minimalist_academic_resume.jpg"
    alt="Template 2"
    style={{
      width: '283px',
      height: '316px',
      margin: '10px',
      cursor: 'pointer',
      transition: 'transform .6s ease-in-out', 
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
  />
        </a>
        <a
          href="https://www.canva.com/design/DAF3w0Elt1w/CLkWzyfz0uA_zlter4GpRw/edit?referrer=resumes-landing-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"  // Replace with the actual image URL
            alt="Template 1"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://gosumo-cvtemplate.com/wp-content/uploads/2019/06/Word-CV-Template-Dublin.png"  // Replace with the actual image URL
            alt="Template 2"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EAFRESUwVtc/1/0/1131w/canva-white-and-violet-simple-clean-corporate-cv-resume-3yHGAYDidp8.jpg"  // Replace with the actual image URL
            alt="Template 1"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://i.pinimg.com/564x/ff/4b/1c/ff4b1cb548beb857781110695bb7e47b.jpg"  // Replace with the actual image URL
            alt="Template 2"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EAE3KpZ6aUE/1/0/1131w/canva-green-modern-professional-resume-E1jho8ljqNU.jpg"  // Replace with the actual image URL
            alt="Template 1"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAF3w0Elt1w/CLkWzyfz0uA_zlter4GpRw/edit?referrer=resumes-landing-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EAFjRZP7Qy4/1/0/1131w/canva-minimalist-modern-professional-cv-resume-xkDELtpQH94.jpg"  // Replace with the actual image URL
            alt="Template 2"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EAFRESUwVtc/1/0/1131w/canva-white-and-violet-simple-clean-corporate-cv-resume-3yHGAYDidp8.jpg"  // Replace with the actual image URL
            alt="Template 1"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://i.pinimg.com/564x/ff/4b/1c/ff4b1cb548beb857781110695bb7e47b.jpg"  // Replace with the actual image URL
            alt="Template 2"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAFy65i2QIk/XKLCPnfvRBASwgiI59Gmhg/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EADZ35aI-EQ/4/0/309w/canva-universal-community-manager-resume-4zAMH5vXk5I.jpg"  // Replace with the actual image URL
            alt="Template 2"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
        <a
          href="https://www.canva.com/design/DAF3w0Elt1w/CLkWzyfz0uA_zlter4GpRw/edit?referrer=resumes-landing-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg"  // Replace with the actual image URL
            alt="Template 2"
            style={{
                width: '283px',
                height: '316px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform .6s ease-in-out', 
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
      </div>
      <div style={moreTemplatesContainerStyle}>
        <a
          href="https://www.canva.com/templates/resumes/"
          target="_blank"
          rel="noopener noreferrer"
          style={moreTemplatesLinkStyle}
        >
          <button style={moreTemplatesButtonStyle}>More Templates</button>
        </a>
      </div>
    </div>
  );
};

export default CurriculumVitae;
