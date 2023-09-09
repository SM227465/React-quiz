import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Footer = (props: Props) => {
  const { children } = props;
  return <footer>{children}</footer>;
};

export default Footer;
