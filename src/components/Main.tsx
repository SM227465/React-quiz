import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Main = (props: Props) => {
  const { children } = props;

  return <main className='main'>{children}</main>;
};

export default Main;
