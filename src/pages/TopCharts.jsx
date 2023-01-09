import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamcore';
import { Error, Loader, SongCard } from '../components';

const TopCharts = () => {
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title='Loading top charts...' />;

	if (error) return <Error />;

	return (
		<section>
			<h2 className='mt-4 mb-10 font-bold text-3xl text-white text-left'>
				Cream of the Crop Songs
			</h2>
			<div className='flex flex-wrap justify-center md:justify-start gap-8'>
				{data?.map((song, i) => {
					return (
						<SongCard
							key={song.key}
							song={song}
							isPlaying={isPlaying}
							activeSong={activeSong}
							data={data}
							i={i}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default TopCharts;
