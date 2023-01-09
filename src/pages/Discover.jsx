import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamcore';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamcore';

const Discover = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying, genreListId } = useSelector(
		(state) => state.player,
	);
	const { data, isFetching, error } = useGetSongsByGenreQuery(
		genreListId || 'POP',
	);
	if (isFetching) return <Loader title='Getting Songs...' />;
	if (error) return <Error />;
	const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
	return (
		<div className='flex flex-col'>
			<div className='min-w-full flex justify-between items-center flex-row md:flex-col  mt-4 mb-10'>
				<h2 className='font-bold text-3xl text-white text-left'>
					Discover {genreTitle}
				</h2>
				<select
					onChange={(e) => {
						dispatch(selectGenreListId(e.target.value));
					}}
					value={genreListId || 'pop'}
					className='p-3 mt-0 md:mt-5 text-sm text-gray-300 outline-none rounded-lg bg-black'>
					{genres.map((genre) => (
						<option key={genre.value} value={genre.value}>
							{genre.title}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-wrap justify-center md:justify-start gap-8'>
				{data.map((song, index) => (
					<SongCard
						key={song.key}
						song={song}
						i={index}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
					/>
				))}
			</div>
		</div>
	);
};

export default Discover;
