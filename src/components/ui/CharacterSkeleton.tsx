export const CharacterSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse border border-gray-100">
            <div className="w-full h-56 bg-gray-300"></div>
            <div className="p-5">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    );
};

export const CharacterDetailSkeleton = () => {
    return (
        <div className="bg-mystery-teal rounded-2xl shadow-xl overflow-hidden md:flex mb-8 animate-pulse">
            <div className="w-full md:w-1/2 h-72 bg-mystery-teal/50" />
            <div className="p-8 md:w-1/2 flex flex-col justify-center gap-4">
                <div className="h-10 bg-tardis-blue/30 rounded w-3/4" />
                <div className="h-5 bg-tardis-blue/20 rounded w-1/2" />
                <div className="h-5 bg-tardis-blue/20 rounded w-1/2" />
                <div className="h-5 bg-tardis-blue/20 rounded w-2/3" />
                <div className="h-5 bg-tardis-blue/20 rounded w-2/3" />
            </div>
        </div>
    );
};