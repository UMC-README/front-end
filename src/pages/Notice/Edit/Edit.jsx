import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/Header';
import { useParams } from 'react-router-dom';
import FirstStep from '../../../components/Notice/Write/first-step';
import SecondStep from '../../../components/Notice/Write/second-step';
import ThirdStep from '../../../components/Notice/Write/third-step';
import {
  DeleteAxiosInstance,
  PostAxiosInstance,
} from '../../../axios/axios.method';
import { getNoticedetails } from '../../../api/Notice/details';
import { getSubmitInfo } from '../../../api/Notice/noticeSubmit';

const Edit = () => {
  const [step, setStep] = useState(1);
  const { roomId, postId } = useParams();
  const [post, setPost] = useState();
  const [imageURLs, setImageURLs] = useState([]);
  const [submitData, setSubmitData] = useState();
  const [postData, setPostData] = useState({
    room_id: roomId,
    type: post.postType,
    title: post.postTitle,
    content: post.postBody,
    imgURLs: imageURLs,
    start_date: post.startDate,
    end_date: post.endDate,
    question: submitData.question,
    quiz_answer: submitData.type === 'QUIZ' ? submitData.answer : '',
  });

  const getNoticeDetailData = async () => {
    try {
      const response = await getNoticedetails(postId);
      setPost(response.data.result.post[0]);
      setImageURLs(response.data.result.imageURLs);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubmit = async () => {
    try {
      const response = await getSubmitInfo(postId);
      setSubmitData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePostData = ({ type, value }) => {
    setPostData((prev) => ({ ...prev, [type]: value }));
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append('file', file);
      });

      const s3Response = await PostAxiosInstance('/user/s3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      handleUpdatePostData({
        type: 'imgURLs',
        value: [...postData.imgURLs, ...s3Response.data.result.images].slice(
          0,
          10,
        ),
      });
    }
  };

  const handleDeleteImage = async (url) => {
    try {
      await DeleteAxiosInstance(`/user/s3`, { data: { url } });
      handleUpdatePostData({
        type: 'imgURLs',
        value: postData.imgURLs.filter((img) => img !== url),
      });
    } catch (err) {
      alert('이미지 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleCreatePost = async () => {
    const response = await PostAxiosInstance(`/admin/post`, postData);
    if (response.data.isSuccess) window.location.replace(`/notice/${roomId}`);
    else console.error(response.data.message);
  };

  useEffect(() => {
    getNoticeDetailData();
    getSubmit();
  }, []);

  return (
    <>
      <Header
        title="공지 작성"
        isSearch={false}
        url={`/notice/${roomId}`}
        write={true}
      />
      {step === 1 && (
        <FirstStep
          handleNextStep={handleNextStep}
          postData={postData}
          handleUpdatePostData={handleUpdatePostData}
        />
      )}
      {step === 2 && (
        <SecondStep
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleImageUpload={handleImageUpload}
          handleDeleteImage={handleDeleteImage}
          postData={postData}
          handleUpdatePostData={handleUpdatePostData}
          isQuiz={postData.type === 'QUIZ'}
        />
      )}
      {step === 3 && (
        <ThirdStep
          handlePrevStep={handlePrevStep}
          postData={postData}
          handleCreatePost={handleCreatePost}
        />
      )}
    </>
  );
};

export default Edit;
