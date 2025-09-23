export const getRandomBgColor = (name) => {
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-red-500',
        'bg-yellow-500',
        'bg-indigo-500',
        'bg-pink-500',
        'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;

    return colors[index];
};

export const getTagColor = (text) => {
    const colors = [
        'bg-blue-100 text-blue-800',
        'bg-green-100 text-green-800',
        'bg-purple-100 text-purple-800',
        'bg-red-100 text-red-800',
        'bg-yellow-100 text-yellow-800',
        'bg-pink-100 text-pink-800',
        'bg-indigo-100 text-indigo-800',
        'bg-teal-100 text-teal-800',
    ];
    const index = text.charCodeAt(0) % colors.length;
    
    return colors[index];
};