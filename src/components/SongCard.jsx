import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useDispatch } from 'react-redux';

const SongCard = ({ data, song, i, isPlaying, activeSong }) => {
	const dispatch = useDispatch();
	const handlePauseClick = () => {
		dispatch(playPause(false));
	};
	const handlePlayClick = () => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};
	return (
		<div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slide-up rounded-lg cursor-pointer'>
			<div className='relative min-w-full h-56 bg-black bg-opacity-50 group'>
				<div
					className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
						activeSong?.title === song.title
							? 'flex bg-black bg-opacity-70'
							: 'hidden'
					}`}>
					<PlayPause
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						handlePause={handlePauseClick}
						handlePlay={handlePlayClick}
					/>
				</div>
				<img src={song.images?.coverart} alt='song_cover' />
			</div>
			<div className='flex flex-col mt-4'>
				<Link to={`/songs/${song?.key}`}>
					<p className='font-semibold text-lg text-white truncate'>
						{song.title}
					</p>
				</Link>
				<Link
					to={
						song.artists
							? `/artists/${song?.artists[0]?.adamid}`
							: '/top-artists'
					}>
					<p className='mt-1 text-sm text-gray-300'>
						{song.subtitle}
					</p>
				</Link>
			</div>
		</div>
	);
};

export default SongCard;
