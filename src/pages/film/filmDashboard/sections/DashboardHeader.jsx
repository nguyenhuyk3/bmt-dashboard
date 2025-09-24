import {
    Search,
    Menu,
} from 'lucide-react';

const DashboardHeader = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <button className="mr-4 lg:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-800">Quản lý phim</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                        />
                        <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;