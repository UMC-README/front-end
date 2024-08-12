import { useNavigate } from 'react-router-dom';
import defaultProfileSrc from '../../../assets/pngs/default_profile_3.png';
import settingSrc from '../../../assets/svgs/setting.svg';
import { ProfileContainer } from './style';
import Image from '../image';

export default function Profile({ roomId, profileImage, nickname, roomName }) {
  const navigate = useNavigate();

  const handleNavTo = () =>
    roomName
      ? navigate('/my-page/notice-edit', {
          state: { profileImage, nickname, roomId, roomName },
        })
      : navigate('/my-page/default-edit');

  return (
    <ProfileContainer>
      <div className="profile">
        <Image url={profileImage || defaultProfileSrc} small />
        <div>
          <span className="medium-18 nickname">{nickname}</span>
          <br />
          <span className="regular-12">{roomName || '기본 프로필'} </span>
        </div>
      </div>
      <button className="setting" onClick={handleNavTo}>
        <img src={settingSrc} alt="설정 아이콘" />
      </button>
    </ProfileContainer>
  );
}
