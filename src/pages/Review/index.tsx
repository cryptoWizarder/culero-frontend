import { api } from "@/store/culero.api";
import { selectAuthToken } from "@/store/status";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from 'react-stars';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { selectUser } from '@/store/status';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Review = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [addReview, ] = api.useAddReviewMutation();
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState("");

    const token = useSelector(selectAuthToken);

    const { register, handleSubmit, getValues } = useForm({
        defaultValues: {
            platform: '',
            link: '',
            text: '',
            score: 0,
        },
    });

    const ratingChanged = (newRating: number) => {
        setRating(newRating);
        console.log(newRating);
    };

    const descriptionChange = (e: any) => {
        setReviewText(e);
    };

    const onSubmit = async () => {
        console.log(token);
        await addReview({
            payload: {
                platform: getValues('platform'),
                link: getValues('link'),
                text: reviewText,
                score: rating
            },
            token
        });
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    return (
        <div className='h-screen flex flex-col justify-center bg-gradient-to-t from-[#3231b2ad] to-[#aeb3e97d] '>
            <div className="mx-auto flex flex-col justify-center w-[60%] border-2 rounded-md p-8">
                <form

                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full pb-5">
                        <p className="font-[600] text-[14px] py-2">Please choose the social platform and input user's name who you want to leave the review</p>
                        <div className="flex items-center w-full gap-2">
                            <div className="flex items-center">
                                <select id="countries" className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" {...register('platform', { required: true })}>
                                    <option defaultValue="Choose a social platform" disabled selected>Choose a social platform</option>
                                    <option value="GITHUB"><FaGithub />Github</option>
                                    <option value="LINKEDIN">Linkedin</option>
                                </select>
                            </div>
                            <input type="input" className="w-full border-2 px-2 py-1 text-center rounded-md bg-transparent outline-none" {...register('link', { required: true })} />
                        </div>
                    </div>

                    <div className="flex flex-col py-2 w-full">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col item-center gap-6 w-full">
                                <div className="w-full">
                                    {/* <input type="text" placeholder='Leave reviews' className="placeholder:italic placeholder:text-[#00000078] w-full h-[80px] border-2 p-4 rounded-[10px] border-[#5f6fdb] bg-transparent" {...register('text', { required: true, minLength: 6 })} /> */}
                                    <ReactQuill
                                        value={reviewText}
                                        onChange={descriptionChange}
                                        placeholder="Leave reviews..."
                                        className="placeholder:italic placeholder:text-[#00000078] w-full h-[150px] rounded-[10px]"
                                    />
                                </div>
                                <div className="flex justify-start items-center py-4 gap-2">
                                    Rating:
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={ratingChanged}
                                        size={25}
                                        color2={'#ffd700'}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="border-2 px-4 py-2 text-center rounded-[10px] border-[#5f6fdb] bg-[#5f6fdb] hover:bg-transparent duration-200">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
