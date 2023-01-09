import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistsId, artistsData, songData }) => {
	const artist = artistsData?.artists[artistsId]?.attributes;
	return (
		<div className='relative w-full flex flex-col'>
			<div className='w-full bg-gradient-to-l from-transparent to-black h-48 md:28' />
			<div className='absolute inset-0 flex items-center'>
				<img
					alt='art'
					src={
						artistsId
							? artist?.artwork?.url
									.replace('{w}', '500')
									.replace('{h}', '500')
							: songData?.images?.coverart
					}
					className='w-48 md:w-28 h-48 md:h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
				/>
				<div className='ml-5'>
					<p className='font-bold text-3xl md:text-xl text-white'>
						{artistsId ? artist?.name : songData?.title}
					</p>
					{!artistsId && (
						<Link to={`/artists/${songData?.artists[0].adamid}`}>
							<p className='mt-2 text-base text-gray-400'>
								{songData?.subtitle}
							</p>
						</Link>
					)}
					<p className='mt-2 text-base text-gray-400'>
						{artistsId
							? artist?.genreNames[0]
							: songData?.genres?.primary}
					</p>
				</div>
			</div>
			<div className='w-full h-44 md:h-24' />
		</div>
	);
};

export default DetailsHeader;
