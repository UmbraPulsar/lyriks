import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamcore';

const Search = () => {
	const { searchTerm } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
	const songs = data?.tracks?.hits?.map((song) => song.track);

	if (isFetching) return <Loader title='Loading top charts...' />;

	if (error) return <Error />;

	return (
		<section>
			<h2 className='mt-4 mb-10 font-bold text-3xl text-white text-left'>
				Showing Results for{' '}
				<span className='font-black'>{searchTerm}</span>
			</h2>
			<div className='flex flex-wrap justify-center md:justify-start gap-8'>
				{songs?.map((song, i) => {
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

export default Search;
