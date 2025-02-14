import React, { useState } from 'react';
import VerticalNavLink from './VerticalNavLink';
import VerticalNavSectionTitle from './VerticalNavSectionTitle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const resolveNavItemComponent = (item) => {
  if (item.sectionTitle) return VerticalNavSectionTitle;

  return VerticalNavLink;
};

const SubmenuIcon = ({ submenuRotation }) => (
  <ArrowRightIcon
    style={{
      marginRight: '8px',
      marginTop: '10px',
      transform: submenuRotation ? 'rotate(90deg)' : 'rotate(5deg)',
      transition: 'transform 0.3s ease',
    }}
  />
);

const VerticalNavItems = (props) => {
  const { verticalNavItems } = props;

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [submenuRotation, setSubmenuRotation] = useState(false);

  const handleSubmenuToggle = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
    setSubmenuRotation(!submenuRotation);
  };

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item);

    const hasSubmenu = item.children && item.children.length > 0;

    return (
      <div key={index}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: hasSubmenu ? 'pointer' : 'default',
          }}
          onClick={() => hasSubmenu && handleSubmenuToggle(index)}
        >
          <TagName {...props} item={item} />

          {hasSubmenu && (
            <div className='sub-icon'>
              <SubmenuIcon submenuRotation={submenuRotation} />
            </div>
            
           
          )}
        </div>
        {hasSubmenu && openSubmenu === index && (
          <div style={{ marginLeft: '20px' }}>
            {item.children.map((child, childIndex) => (
              <div key={childIndex}>
                <TagName {...props} item={child} />
              </div>
            ))}
          </div>
        )}
      </div>     
    );
  });

  return <>{RenderMenuItems}</>;
};

export default VerticalNavItems;
