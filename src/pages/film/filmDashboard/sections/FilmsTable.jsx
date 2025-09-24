import { Link } from 'react-router-dom';
import {
    Eye,
} from 'lucide-react';

import Pagination from "./Pagination";
import { GENRE_NAMES, getGenreColor } from "../../../../utils/mappers/genre";
import { timeToMinutes } from "../../../../utils/convertors/time";

const MovieRow = ({ film }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 overflow-hidden whitespace-nowrap text-ellipsis">
                <div className="flex items-center">
                    <img
                        className="object-cover w-20 rounded h-28 hover:cursor-pointer"
                        src={film.posterUrl === "NONE" ? "/placeholder-movie.png" : film.posterUrl}
                        alt="Movie poster"
                        onError={(e) => {
                            e.target.src = "/placeholder-movie.png";
                        }}
                    />
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{film.title}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1 hover:cursor-pointer">
                    {
                        film.genres.map((genre, index) => (
                            <span
                                key={index}
                                className={
                                    `px-2 py-1 text-xs font-medium rounded-full ${getGenreColor(genre)}`
                                }
                            >
                                {GENRE_NAMES[genre]}
                            </span>
                        ))
                    }
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {timeToMinutes(film.duration)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {film.releaseDate}
            </td>
            <td className="px-6 py-4 space-x-2 text-sm font-medium whitespace-nowrap">
                <Link
                    to={`film/edit/${film.id}`}
                    className="relative inline-block text-green-600 group hover:text-green-900">
                    <Eye className="w-6 h-6" />
                    {/* Tooltip */}
                    <span className="absolute px-2 py-1 mt-1 text-xs text-white transition -translate-x-1/2 bg-gray-500 rounded opacity-0 left-1/2 group-hover:opacity-100">
                        Chỉnh sửa
                    </span>
                </Link>
            </td>

        </tr>
    );
};

const FilmsTable = ({ films, paginationProps, error, onRetry, loading }) => {
    return (
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Phim
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Thể loại
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Thời lượng
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Ngày phát hành
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            error ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4">
                                        <ErrorMessage error={error} onRetry={onRetry} />
                                    </td>
                                </tr>
                            ) : loading && films.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                                            <span className="ml-2 text-gray-600">Đang tải...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : films.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        Không có phim nào
                                    </td>
                                </tr>
                            ) : (
                                films.map((film) => (
                                    <MovieRow key={film.id} film={film} />
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
            {!error && <Pagination {...paginationProps} />}
        </div>
    );
};

export default FilmsTable;
