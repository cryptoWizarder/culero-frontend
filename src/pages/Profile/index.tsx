// import DefaultAvatar from '@/assets/images/default_avatar.png';
import {  useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Detail } from '@/components/Profile/Detail';
import Pagination from '@/components/Pagination/pagniation';
import { api } from '@/store/culero.api';
import { selectUser, selectAuthToken, selectUserReviewData, selectTotalUserReviewCount } from '@/store/status';
import { IReviewDetail } from '@/store/interface';
import { ReviewDetail } from '@/components/UI/Review';

export const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [skip, ] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [showReviewButton, setShowReviewButton] = useState(false);

    const user = useSelector(selectUser);

    useEffect(()=> {
        if(!user) {
            navigate('/');
        }
    }, [user]);

    const token = useSelector(selectAuthToken);

    const userReviewData = useSelector(selectUserReviewData);
    const totalReviewCount = useSelector(selectTotalUserReviewCount);

    const [getReviewData] = api.useGetReviewByUserMutation();

    useEffect(() => {
        const current_page = location.pathname.split('/')[2]
        if(current_page != user._id){
            setShowReviewButton(true);
        }
        console.log(current_page)
    }, [location])
    const getReviewDataHandler = async () => {
        await getReviewData({
            payload: {
                user_id: user._id,
                skip,
                index: pageIndex,
            },
            token
        })
    }
    useEffect(() => {
        getReviewDataHandler()
    }, [pageIndex])
    return (
        <div className='pt-20 flex flex-col justify-center bg-gradient-to-t from-[#3231b2ad] to-[#aeb3e97d]'>
            <div className="mx-auto flex justify-between items-center w-[60%]">
                <Detail picture={user.picture} username={user.username} />
                {
                    showReviewButton ?
                    <button className="bg-gradient-to-r from-[#3231b2ad] to-[#4e59ce7d]">Leave Review</button>
                    :
                    <button className="bg-gradient-to-r from-[#3231b2ad] to-[#4e59ce7d]">Leave Review</button>
                }
                
            </div>
            <div className='flwx flex-col mx-auto bg-[#5250d9a6] border border-white w-[60%] h-full rounded-lg mb-5'>
                <div className="p-20 mx-auto flex flex-col space-y-16 justify-center w-full">
                    {
                        userReviewData?
                                userReviewData?.review?.map((item: IReviewDetail, index: number) => (
                                    <ReviewDetail key={index} name={item.reviewer_id.username} avatar={item.reviewer_id.picture} star={item.score} review={item.content} />
                                ))
                            :
                            <p className="flex justify-center items-center">No Review</p>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center py-4">
                <Pagination
                    totalCount={totalReviewCount}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    skip={skip}
                />
            </div>
        </div>
    );
}
