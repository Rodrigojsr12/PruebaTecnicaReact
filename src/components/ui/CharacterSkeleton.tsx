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