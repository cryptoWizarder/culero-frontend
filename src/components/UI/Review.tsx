import { ReviewDetailType } from "@/types/feed";
import ReactStars from 'react-stars'
import parse from "html-react-parser";

export const ReviewDetail: React.FC<ReviewDetailType> = ({ name, avatar, star, review }: ReviewDetailType) => {
    return (
        <div className="p-2 flex flex-col space-x-6">
            <div className='flex justify-end items-center gap-2'>
                <ReactStars
                    count={5}
                    value={star}
                    size={22}
                    edit={false}
                    color2={'#ffd700'} />
            </div>

            <div className="text-white text-sm">
                <p>
                    {parse(review)}
                </p>
            </div>
            <div className="flex justify-end">
                <div className="flex items-center gap-4 w-20%">
                    <p>
                        {name}
                    </p>
                    <img className="h-12 w-12 object-cover rounded-full" src={avatar? avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"} alt="Current profile photo" />
                </div>

            </div>
        </div>
    )
}