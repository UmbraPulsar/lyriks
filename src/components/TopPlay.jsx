import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamcore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({
	song,
	i,
	isPlaying,
	activeSong,
	handlePauseClick,
	handlePlayClick,
}) => (
	<div className='flex flex-row items-center w-full py-2 p-4 hover:bg-[#4c426e] rounded-lg cursor-pointer'>
		<h3 className='mr-3 font-bold text-base text-white'>{i + 1}.</h3>
		<div className='flex-1 flex flex-row justify-between items-center'>
			<img
				src={song?.images?.coverart}
				alt={song?.title}
				className='w-20 h-20 rounded-lg'
			/>
			<div className='flex-1 flex flex-col justify-center mx-3'>
				<Link to={`/songs/${song.key}`}>
					<p className='text-xl font-bold text-white'>{song.title}</p>
				</Link>
				<Link to={`/artists/${song?.artists[0].adamid}`}>
					<p className='text-base text-gray-300 mt-1'>
						{song?.subtitle}
					</p>
				</Link>
			</div>
		</div>
		<PlayPause
			isPlaying={isPlaying}
			activeSong={activeSong}
			song={song}
			handlePause={handlePauseClick}
			handlePlay={handlePlayClick}
		/>
	</div>
);

const TopPlay = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data } = useGetTopChartsQuery();

	const divRef = useRef(null);
	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: 'smooth' });
	});
	const topPlays = data?.slice(0, 5);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};
	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};
	return (
		<section
			ref={divRef}
			className='flex flex-col flex-1 xl:max-w-[500px] max-w-full ml-0 xl:ml-6 mb-6 xl:mb-0'>
			<div className='flex flex-col w-full'>
				<div className='flex flex-row justify-between items-center'>
					<h2 className='font-bold text-2xl text-white'>
						Top Charts
					</h2>
					<Link to='/top-charts'>
						<p className='text-gray-300 text-base cursor-pointer'>
							See more
						</p>
					</Link>
				</div>
				<div className='flex flex-col gap-1 mt-4'>
					{topPlays?.map((song, i) => {
						return (
							<TopChartCard
								song={song}
								i={i}
								key={song.key}
								isPlaying={isPlaying}
								activeSong={activeSong}
								handlePauseClick={handlePauseClick}
								handlePlayClick={() => handlePlayClick(song, i)}
							/>
						);
					})}
				</div>
			</div>
			<div className='flex flex-col mt-8 w-full'>
				<div className='flex flex-row justify-between items-center'>
					<h2 className='font-bold text-2xl text-white'>
						Top Artists
					</h2>
					<Link to='/top-artists'>
						<p className='text-gray-300 text-base cursor-pointer'>
							See more
						</p>
					</Link>
				</div>
				<Swiper
					slidesPerView='auto'
					spaceBetween={15}
					freeMode
					centeredSlides
					centeredSlidesBounds
					modules={[FreeMode]}
					className='mt-4'>
					{topPlays?.map((song, i) => (
						<SwiperSlide
							key={song}
							style={{ width: '25%', height: 'auto' }}
							className='shadow-lg rounded-full animate-slideright'>
							<Link to={`/artists/${song?.artists[0].adamid}`}>
								<img
									src={song?.images.background}
									alt='name'
									className='rounded-full w-full object-cover'
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default TopPlay;
