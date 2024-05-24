// import { ReviewDetail } from '@/components/UI/Review';
// import { IReviewDetail } from '@/store/interface';
// // import { selectDummyReviewData } from '@/store/status';
// import { FeedDetailType } from '@/types/feed';
// import { FaGithub } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import ReactStars from 'react-stars'

// export const FeedDetail: React.FC<FeedDetailType> = ({selectedItem, backWard} : FeedDetailType) => {

//     const dummyReviewData = useSelector(selectDummyReviewData);
//     const back = () => {
//         backWard();
//     }
    
//     return (
//         <div className='flex flex-col space-y-20 relative'>
//             <button className='absolute right-0 top-[-3] w-[20%] px-10 bg-[#4747cbe3] text-white hover:border hover:border-[#4747cbe3] hover:bg-white hover:text-[#4747cbe3] transition-all duration-500' onClick={()=>back()}>Back</button>

//             <div className="flex items-center space-x-6">
//                 <div className="">
//                     <img className="h-20 w-20 object-cover rounded-full" src={dummyReviewData[selectedItem].picture} alt="Current profile photo" />
//                 </div>
//                 <div className="grid grid-cols-6 gap-2 w-1/2 text-white">
//                     <div className='col-span-3 flex flex-col justify-center items-center gap-2'>
//                         <p className="">{dummyReviewData[selectedItem].username}</p>

//                         <ReactStars
//                             count={5}
//                             value={dummyReviewData[selectedItem].avgscore}
//                             size={25}
//                             edit={false}
//                             color2={'#ffd700'} />
//                     </div>
//                     <div className="col-span-2 flex items-center">
//                         {
//                             dummyReviewData[selectedItem].platform == 'GITHUB' ?
//                                 <a href={`https://github.com/${dummyReviewData[selectedItem].link}`} target='_blank' className='cursor-pointer text-white'>
//                                     <FaGithub className='w-8 h-8' />
//                                 </a>
//                                 :
//                                 <a href={`https://www.linkedin.com/in/${dummyReviewData[selectedItem].link}`} target='_blank' className='cursor-pointer text-white'>
//                                     <FaLinkedin className='w-8 h-8' />
//                                 </a>
//                         }
//                     </div>
//                 </div>
//             </div>
//             <div className='flex flex-col space-y-20 w-full'>
//                 {
//                     dummyReviewData[selectedItem].reviews.map((item: IReviewDetail, index: number) => (
//                         <ReviewDetail key={index} name={item.reviewer_info.username} avatar={item.reviewer_info.picture} star={item.score} review={item.content} />
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }