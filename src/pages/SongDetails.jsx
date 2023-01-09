import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

import {
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
} from '../redux/services/shazamcore';

const SongDetails = () => {
	const dispatch = useDispatch();
	const { songid, id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);

	const { data: songData, isFetching: isFetchingSongDetails } =
		useGetSongDetailsQuery({ songid });
	const { data, isFetching, error } = useGetSongRelatedQuery({ songid });

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};
	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	if (isFetching || isFetchingSongDetails)
		return <Loader title='Getting Song Details' />;
	if (error) return <Error />;

	return (
		<section className='flex flex-col'>
			<DetailsHeader artistId='' songData={songData} />
			<div className='mb-10'>
				<h2 className='text-3xl font-bold text-white'>Lryics: </h2>
				<div className='mt-5'>
					{songData?.sections[1].type === 'LYRICS' ? (
						songData?.sections[1].text.map((line, i) => (
							<p
								key={line}
								className='my-1 text-gray-400 text-base'>
								{line}
							</p>
						))
					) : (
						<p className='text-gray-400 text-base'>
							No Lyrics Available
						</p>
					)}
				</div>
			</div>
			<RelatedSongs
				data={data}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</section>
	);
};

export default SongDetails;
