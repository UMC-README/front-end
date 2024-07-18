import React from 'react';
import { UnconfirmedNotice } from '../../components/Notice/UnconfirmedNotice';
import { NoticeItem } from '../../components/Notice/NoticeItem';

const Main = () => {
  return (
    <div>
      <UnconfirmedNotice />
      <NoticeItem />
    </div>
  );
};

export default Main;
