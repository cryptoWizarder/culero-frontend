
export const RevewForm = () => {
    return (
        <div className="flex flex-col gap-8 px-16 py-14 w-full">

            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col item-center gap-10 px-16 w-full">
                    <div className="w-full">
                        <input type="text" placeholder='Leave reviews' className="placeholder:italic placeholder:text-[#00000078] w-full h-[80px] border-2 p-4 rounded-[10px] border-[#5f6fdb] bg-transparent" />
                    </div>

                    <div className="flex justify-end">
                        <button className="border-2 px-4 py-2 text-center rounded-[10px] border-[#5f6fdb] bg-[#5f6fdb] hover:bg-transparent duration-200">Submit</button>
                    </div>
                </div>
            </div>
            <hr className="border-[#505258] " />
        </div>
    )
}