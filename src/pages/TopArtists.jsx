import { useGetTopChartsQuery } from '../redux/services/shazamcore';
import { ArtistCard, Error, Loader } from '../components';

const TopArtists = () => {
	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title='Loading top charts...' />;

	if (error) return <Error />;

	return (
		<section>
			<h2 className='mt-4 mb-10 font-bold text-3xl text-white text-left'>
				Cream of the Crop Artists
			</h2>
			<div className='flex flex-wrap justify-center md:justify-start gap-8'>
				{data?.map((track) => {
					return <ArtistCard key={track.key} track={track} />;
				})}
			</div>
		</section>
	);
};

export default TopArtists;
